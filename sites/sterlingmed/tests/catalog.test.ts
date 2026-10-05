import { describe, expect, it } from "vitest"
import { BASE_CATALOG, CATEGORIES, categoryLabel, resolveCatalog } from "@/lib/catalog"

describe("catalog", () => {
  it("has 12 products with unique ids and image paths under /photos/products", () => {
    expect(BASE_CATALOG).toHaveLength(12)
    expect(new Set(BASE_CATALOG.map((p) => p.id)).size).toBe(12)
    for (const p of BASE_CATALOG) expect(p.image).toBe(`/photos/products/${p.id}.jpg`)
  })
  it("every product category has a label", () => {
    for (const p of BASE_CATALOG) expect(categoryLabel(p.category)).toBeTruthy()
    expect(CATEGORIES[0]).toEqual({ id: "all", label: "All equipment" })
  })
  it("returns the base catalog when the brand has no overrides", () => {
    expect(resolveCatalog({})).toEqual(BASE_CATALOG)
  })
  it("hides and adds products", () => {
    const extra = { id: "lift-chair", name: "Lift Chair", category: "living" as const, description: "d", image: "/photos/products/lift-chair.jpg" }
    const result = resolveCatalog({ catalog: { hide: ["cpap"], add: [extra] } })
    expect(result.map((p) => p.id)).not.toContain("cpap")
    expect(result.at(-1)).toEqual(extra)
  })
  it("throws on unknown hide ids and duplicate add ids", () => {
    expect(() => resolveCatalog({ catalog: { hide: ["nope"] } })).toThrow(/unknown product id "nope"/)
    expect(() => resolveCatalog({ catalog: { add: [{ ...BASE_CATALOG[0] }] } })).toThrow(/duplicate product id "wheelchair"/)
  })
})
