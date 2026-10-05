import { describe, expect, it } from "vitest"
import { BACKGROUND, INK, WHITE, brandCssVars, contrastRatio, findPlaceholders, readableOn } from "@/lib/brand"

describe("contrastRatio", () => {
  it("is 21 for black on white and 1 for identical colors", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1)
    expect(contrastRatio("#FAF7F2", "#FAF7F2")).toBeCloseTo(1, 5)
  })
  it("is symmetric", () => {
    expect(contrastRatio("#0F4C5C", BACKGROUND)).toBeCloseTo(contrastRatio(BACKGROUND, "#0F4C5C"), 10)
  })
  it("rejects malformed hex", () => {
    expect(() => contrastRatio("teal", WHITE)).toThrow(/Invalid hex/)
  })
})

describe("readableOn", () => {
  it("picks white on dark brand primaries", () => {
    for (const c of ["#0F4C5C", "#2B2D6E", "#1F3D2B"]) expect(readableOn(c)).toBe(WHITE)
  })
  it("picks ink on bright brand accents", () => {
    for (const c of ["#E8735A", "#2EC4A6", "#C9A24A"]) expect(readableOn(c)).toBe(INK)
  })
  it("every brand pair meets WCAG AA (4.5:1)", () => {
    for (const c of ["#0F4C5C", "#2B2D6E", "#1F3D2B", "#E8735A", "#2EC4A6", "#C9A24A"]) {
      expect(contrastRatio(c, readableOn(c))).toBeGreaterThanOrEqual(4.5)
    }
  })
})

describe("brandCssVars", () => {
  it("emits colors and computed foregrounds", () => {
    expect(brandCssVars({ colors: { primary: "#0F4C5C", accent: "#E8735A" } })).toEqual({
      "--brand-primary": "#0F4C5C",
      "--brand-primary-fg": WHITE,
      "--brand-accent": "#E8735A",
      "--brand-accent-fg": INK,
    })
  })
})

describe("findPlaceholders", () => {
  it("returns dotted paths of placeholder strings, sample flags, and example.com URLs", () => {
    const value = {
      name: "Real",
      region: { label: "[PLACEHOLDER REGION]", states: [] },
      contact: { phone: "(000) 000-0000", email: "hello@real.com" },
      seo: { url: "https://medivance.example.com" },
      testimonials: [{ quote: "Great", sample: true }, { quote: "Real one" }],
    }
    expect(findPlaceholders(value)).toEqual([
      "region.label",
      "contact.phone",
      "seo.url",
      "testimonials[0].sample",
    ])
  })
  it("returns nothing for a fully real config", () => {
    expect(findPlaceholders({ a: "x", b: [{ c: "y", sample: false }] })).toEqual([])
  })
})
