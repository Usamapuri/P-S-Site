import type { Brand } from "@/lib/brand"
import { buildLeadEmail } from "@/lib/lead-email"
import { leadSchema } from "@/lib/lead-schema"
import { clientIp, type RateLimiter } from "@/lib/rate-limit"

export interface LeadHandlerDeps {
  brand: Pick<Brand, "id" | "name">
  env: { RESEND_API_KEY?: string; LEAD_TO_EMAIL?: string; LEAD_FROM_EMAIL?: string }
  limiter: RateLimiter
  fetchImpl?: typeof fetch
  log?: (...args: unknown[]) => void
}

const json = (body: unknown, status = 200) => Response.json(body, { status })

export function createLeadHandler({ brand, env, limiter, fetchImpl = fetch, log = console.error }: LeadHandlerDeps) {
  return async function POST(req: Request): Promise<Response> {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400)
    }

    const honeypot = (body as { website?: unknown } | null)?.website
    if (typeof honeypot === "string" && honeypot.trim() !== "") return json({ ok: true })

    if (!limiter.check(clientIp(req.headers))) return json({ ok: false, error: "rate_limited" }, 429)

    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return json({ ok: false, error: "invalid", fields: parsed.error.flatten().fieldErrors }, 400)
    }

    const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL } = env
    if (!RESEND_API_KEY || !LEAD_TO_EMAIL || !LEAD_FROM_EMAIL) {
      log(`[lead:${brand.id}] RESEND_API_KEY, LEAD_TO_EMAIL and LEAD_FROM_EMAIL must all be set`)
      return json({ ok: false, error: "unavailable" }, 503)
    }

    const email = buildLeadEmail(parsed.data, brand)
    try {
      const res = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: LEAD_FROM_EMAIL, to: [LEAD_TO_EMAIL], subject: email.subject, html: email.html, text: email.text }),
      })
      if (!res.ok) {
        log(`[lead:${brand.id}] Resend responded ${res.status}: ${await res.text()}`)
        return json({ ok: false, error: "unavailable" }, 503)
      }
    } catch (error) {
      log(`[lead:${brand.id}] Resend request failed`, error)
      return json({ ok: false, error: "unavailable" }, 503)
    }
    return json({ ok: true })
  }
}
