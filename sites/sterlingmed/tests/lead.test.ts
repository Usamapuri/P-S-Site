import { describe, expect, it, vi } from "vitest"
import { buildLeadEmail, escapeHtml, formatPhone } from "@/lib/lead-email"
import { createLeadHandler } from "@/lib/lead-handler"
import { leadSchema } from "@/lib/lead-schema"
import { clientIp, createRateLimiter } from "@/lib/rate-limit"

const valid = {
  name: "  Mary Smith ",
  phone: "(415) 555-0100",
  zip: "94110",
  equipment: "Wheelchair",
  insurance: "Medicare",
  callTime: "Morning",
}
const BRAND = { id: "ps", name: "P&S Med Services" } as const
const ENV = { RESEND_API_KEY: "re_test", LEAD_TO_EMAIL: "leads@ps.test", LEAD_FROM_EMAIL: "site@ps.test" }

describe("leadSchema", () => {
  it("accepts a valid lead, trims the name, and normalizes the phone", () => {
    const lead = leadSchema.parse(valid)
    expect(lead.name).toBe("Mary Smith")
    expect(lead.phone).toBe("4155550100")
  })
  it.each(["415.555.0100", "+1 415 555 0100", "1-415-555-0100", "4155550100"])("accepts phone %s", (phone) => {
    expect(leadSchema.parse({ ...valid, phone }).phone).toBe("4155550100")
  })
  it.each(["555-0100", "415-555-01000", ""])("rejects phone %s with a friendly message", (phone) => {
    const r = leadSchema.safeParse({ ...valid, phone })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.flatten().fieldErrors.phone?.[0]).toBe("Please enter a 10-digit phone number")
  })
  it.each(["94110", "94110-1234"])("accepts ZIP %s", (zip) => {
    expect(leadSchema.safeParse({ ...valid, zip }).success).toBe(true)
  })
  it.each(["9411", "ABCDE", "941101"])("rejects ZIP %s", (zip) => {
    expect(leadSchema.safeParse({ ...valid, zip }).success).toBe(false)
  })
  it("rejects unknown insurance, short names, and newlines", () => {
    expect(leadSchema.safeParse({ ...valid, insurance: "Acme" }).success).toBe(false)
    expect(leadSchema.safeParse({ ...valid, name: "A" }).success).toBe(false)
    expect(leadSchema.safeParse({ ...valid, name: "Mary\nBcc: x@y.z" }).success).toBe(false)
    expect(leadSchema.safeParse({ ...valid, equipment: "Bed\r\nX" }).success).toBe(false)
  })
  it("strips unknown fields such as the honeypot", () => {
    expect(leadSchema.parse({ ...valid, website: "" })).not.toHaveProperty("website")
  })
})

describe("lead email", () => {
  it("escapes HTML", () => {
    expect(escapeHtml(`<script>&"'`)).toBe("&lt;script&gt;&amp;&quot;&#39;")
  })
  it("formats phone numbers", () => {
    expect(formatPhone("4155550100")).toBe("(415) 555-0100")
  })
  it("builds subject, text, and escaped html", () => {
    const lead = leadSchema.parse({ ...valid, name: "Bob <b>Jones</b>" })
    const email = buildLeadEmail(lead, BRAND)
    expect(email.subject).toBe("New lead — P&S Med Services — Wheelchair")
    expect(email.text).toContain("Phone: (415) 555-0100")
    expect(email.text).toContain("Brand: P&S Med Services (ps)")
    expect(email.html).toContain("Bob &lt;b&gt;Jones&lt;/b&gt;")
    expect(email.html).not.toContain("<b>Jones")
  })
})

describe("rate limiter", () => {
  it("allows `limit` hits per window and resets after it", () => {
    let t = 0
    const rl = createRateLimiter({ limit: 2, windowMs: 1000, now: () => t })
    expect(rl.check("a")).toBe(true)
    expect(rl.check("a")).toBe(true)
    expect(rl.check("a")).toBe(false)
    expect(rl.check("b")).toBe(true)
    t = 1001
    expect(rl.check("a")).toBe(true)
  })
  it("uses the first x-forwarded-for address, then x-real-ip, then 'unknown'", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" }))).toBe("203.0.113.5")
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.7" }))).toBe("198.51.100.7")
    expect(clientIp(new Headers())).toBe("unknown")
  })
})

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

function setup(overrides: { env?: Record<string, string | undefined>; fetchImpl?: typeof fetch } = {}) {
  const fetchImpl = overrides.fetchImpl ?? vi.fn(async () => new Response("{}", { status: 200 }))
  const handler = createLeadHandler({
    brand: BRAND,
    env: overrides.env ?? ENV,
    fetchImpl,
    limiter: createRateLimiter({ limit: 5, windowMs: 600_000 }),
    log: () => {},
  })
  return { handler, fetchImpl }
}

describe("POST /api/lead handler", () => {
  it("returns 400 for malformed JSON", async () => {
    const { handler } = setup()
    const res = await handler(post("{not json"))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ ok: false, error: "invalid_json" })
  })
  it("silently accepts honeypot submissions without sending email", async () => {
    const { handler, fetchImpl } = setup()
    const res = await handler(post({ ...valid, website: "http://spam" }))
    expect(res.status).toBe(200)
    expect(fetchImpl).not.toHaveBeenCalled()
  })
  it("returns 400 with field errors for invalid input", async () => {
    const { handler } = setup()
    const res = await handler(post({ ...valid, phone: "123" }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBe("invalid")
    expect(body.fields.phone).toBeDefined()
  })
  it("returns 503 without calling Resend when env vars are missing", async () => {
    const { handler, fetchImpl } = setup({ env: { ...ENV, RESEND_API_KEY: undefined } })
    const res = await handler(post(valid))
    expect(res.status).toBe(503)
    expect(fetchImpl).not.toHaveBeenCalled()
  })
  it("sends the email through Resend and returns 200", async () => {
    const { handler, fetchImpl } = setup()
    const res = await handler(post(valid))
    expect(res.status).toBe(200)
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(url).toBe("https://api.resend.com/emails")
    expect(init.headers.Authorization).toBe("Bearer re_test")
    const sent = JSON.parse(init.body)
    expect(sent).toMatchObject({ from: "site@ps.test", to: ["leads@ps.test"], subject: "New lead — P&S Med Services — Wheelchair" })
  })
  it("returns 503 when Resend responds with an error", async () => {
    const { handler } = setup({ fetchImpl: vi.fn(async () => new Response("boom", { status: 500 })) })
    expect((await handler(post(valid))).status).toBe(503)
  })
  it("returns 503 when the network call throws", async () => {
    const { handler } = setup({ fetchImpl: vi.fn(async () => { throw new Error("ECONNRESET") }) })
    expect((await handler(post(valid))).status).toBe(503)
  })
  it("rate-limits per client IP from x-forwarded-for", async () => {
    const { handler } = setup()
    const ip = { "x-forwarded-for": "203.0.113.5, 10.0.0.1" }
    for (let i = 0; i < 5; i++) expect((await handler(post(valid, ip))).status).toBe(200)
    expect((await handler(post(valid, ip))).status).toBe(429)
    expect((await handler(post(valid, { "x-forwarded-for": "198.51.100.9" }))).status).toBe(200)
  })
  it("handles requests with no forwarding headers", async () => {
    const { handler } = setup()
    expect((await handler(post(valid))).status).toBe(200)
  })
})
