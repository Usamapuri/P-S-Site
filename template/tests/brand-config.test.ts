import { existsSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import brand from "@/brand.config"
import { BACKGROUND, contrastRatio, findPlaceholders, readableOn } from "@/lib/brand"
import { resolveCatalog } from "@/lib/catalog"

const publicFile = (p: string) => path.join(process.cwd(), "public", p)

describe(`brand config: ${brand.id}`, () => {
  it("accent buttons and primary bands meet WCAG AA", () => {
    expect(contrastRatio(brand.colors.accent, readableOn(brand.colors.accent))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(brand.colors.primary, readableOn(brand.colors.primary))).toBeGreaterThanOrEqual(4.5)
  })
  it("primary color is readable as text on the page background", () => {
    expect(contrastRatio(brand.colors.primary, BACKGROUND)).toBeGreaterThanOrEqual(4.5)
  })
  it("every referenced image exists", () => {
    const images = [brand.images.hero, ...brand.images.steps, brand.images.lifestyle, ...resolveCatalog(brand).map((p) => p.image)]
    for (const img of images) expect(existsSync(publicFile(img)), img).toBe(true)
  })
  it("has a brand mark", () => {
    expect(existsSync(publicFile("brand/mark.svg"))).toBe(true)
  })
  it("phoneHref is a +1 tel: link matching the displayed phone", () => {
    expect(brand.contact.phoneHref).toMatch(/^tel:\+1\d{10}$/)
    if (findPlaceholders(brand.contact.phone).length === 0) {
      expect(brand.contact.phoneHref.slice(-10)).toBe(brand.contact.phone.replace(/\D/g, "").slice(-10))
    }
  })
  it("seo.url is an absolute https URL", () => {
    expect(() => new URL(brand.seo.url)).not.toThrow()
    expect(brand.seo.url).toMatch(/^https:\/\//)
  })
  it("has exactly three testimonials", () => {
    expect(brand.testimonials).toHaveLength(3)
  })
})
