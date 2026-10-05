import type { Brand, CategoryId, Product } from "@/lib/brand"

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All equipment" },
  { id: "mobility", label: "Mobility" },
  { id: "bathroom", label: "Bathroom safety" },
  { id: "bedroom", label: "Bedroom" },
  { id: "respiratory", label: "Respiratory" },
  { id: "living", label: "Daily living" },
]

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id
}

const product = (id: string, name: string, category: CategoryId, description: string): Product => ({
  id,
  name,
  category,
  description,
  image: `/photos/products/${id}.jpg`,
})

export const BASE_CATALOG: Product[] = [
  product("wheelchair", "Wheelchair", "mobility", "Lightweight manual wheelchair for everyday independence."),
  product("rollator", "Walker with Seat", "mobility", "Four-wheel rollator with hand brakes and a built-in seat for resting."),
  product("cane", "Walking Cane", "mobility", "Adjustable, lightweight cane for steady, confident steps."),
  product("hospital-bed", "Hospital Bed", "bedroom", "Adjustable electric bed for safe, comfortable care at home."),
  product("oxygen-concentrator", "Oxygen Concentrator", "respiratory", "A steady supply of medical-grade oxygen, at home or on the go."),
  product("cpap", "CPAP Machine", "respiratory", "Quiet, effective therapy for sleep apnea."),
  product("nebulizer", "Nebulizer", "respiratory", "Turns liquid medication into an easy-to-breathe mist."),
  product("shower-chair", "Shower Chair", "bathroom", "A sturdy, non-slip seat for safer bathing."),
  product("grab-bars", "Grab Bars", "bathroom", "Secure handholds for the bathroom and hallways."),
  product("toilet-safety-frame", "Toilet Safety Frame", "bathroom", "Armrests that make sitting and standing easier."),
  product("reacher", "Reacher Grabber", "living", "Pick things up without bending or stretching."),
  product("pill-organizer", "Pill Organizer", "living", "Keep a week of medications organized and on schedule."),
]

export function resolveCatalog(brand: Pick<Brand, "catalog">): Product[] {
  const ids = new Set(BASE_CATALOG.map((p) => p.id))
  const hide = new Set(brand.catalog?.hide ?? [])
  for (const id of hide) {
    if (!ids.has(id)) throw new Error(`catalog.hide: unknown product id "${id}"`)
  }
  const add = brand.catalog?.add ?? []
  for (const p of add) {
    if (ids.has(p.id)) throw new Error(`catalog.add: duplicate product id "${p.id}"`)
  }
  return [...BASE_CATALOG.filter((p) => !hide.has(p.id)), ...add]
}
