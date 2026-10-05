import { describe, expect, it } from "vitest"
import { isPlaceholder } from "@/lib/brand"
import { getFaqs } from "@/lib/faq"

describe("isPlaceholder", () => {
  it.each(["[PLACEHOLDER: city]", "(000) 000-0000", "hi@example.com"])("flags %s", (v) => {
    expect(isPlaceholder(v)).toBe(true)
  })
  it.each(["Northern California", "(415) 555-0100", ""])("passes %s", (v) => {
    expect(isPlaceholder(v)).toBe(false)
  })
})

describe("getFaqs service area", () => {
  const base = { name: "Acme DME", contact: { phone: "(415) 555-0100", phoneHref: "tel:+14155550100", email: "a@acme.test", hours: "9-5" } }
  const area = (label: string) =>
    getFaqs({ ...base, region: { label, states: [] } }).find((f) => f.q === "Which areas do you serve?")!.a

  it("uses the real region when set", () => {
    expect(area("Northern California")).toContain("serves Northern California")
  })
  it("uses generic copy for a placeholder region", () => {
    expect(area("[PLACEHOLDER region]")).toBe(
      "Acme DME delivers across our local service area. Call us and we'll confirm service at your address.",
    )
  })
})
