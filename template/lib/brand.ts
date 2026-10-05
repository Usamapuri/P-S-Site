export type BrandId = "template" | "ps" | "medivance" | "sterlingmed"
export type CategoryId = "mobility" | "bathroom" | "bedroom" | "respiratory" | "living"

export interface Product {
  id: string
  name: string
  category: CategoryId
  description: string
  image: string
}

export interface Testimonial {
  name: string
  location: string
  quote: string
  /** Marks invented copy that must be replaced with a real review before launch. */
  sample?: boolean
}

export interface Brand {
  id: BrandId
  name: string
  shortName: string
  legalName: string
  parentCompany?: string
  tagline: string
  region: { label: string; states: string[] }
  contact: { phone: string; phoneHref: string; email: string; hours: string }
  colors: { primary: string; accent: string }
  images: {
    hero: string
    heroAlt: string
    steps: [string, string, string]
    lifestyle: string
    lifestyleAlt: string
  }
  catalog?: { hide?: string[]; add?: Product[] }
  testimonials: Testimonial[]
  seo: { title: string; description: string; url: string }
}

export const INK = "#1A1A1A"
export const WHITE = "#FFFFFF"
export const BACKGROUND = "#FAF7F2"

function channel(value: number) {
  const s = value / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

export function luminance(hex: string): number {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!match) throw new Error(`Invalid hex color: ${hex}`)
  const n = parseInt(match[1], 16)
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export function readableOn(bg: string): typeof WHITE | typeof INK {
  return contrastRatio(bg, WHITE) >= contrastRatio(bg, INK) ? WHITE : INK
}

export function brandCssVars(brand: Pick<Brand, "colors">): Record<string, string> {
  const { primary, accent } = brand.colors
  return {
    "--brand-primary": primary,
    "--brand-primary-fg": readableOn(primary),
    "--brand-accent": accent,
    "--brand-accent-fg": readableOn(accent),
  }
}

const PLACEHOLDER_PATTERNS = ["[PLACEHOLDER", "(000) 000-0000", "example.com"]

/** True when a config string still holds placeholder content. */
export function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERNS.some((p) => value.includes(p))
}

/** Lists the paths of config values that still hold placeholder content. */
export function findPlaceholders(value: unknown, path = ""): string[] {
  if (typeof value === "string") {
    return isPlaceholder(value) ? [path || "(root)"] : []
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => findPlaceholders(item, `${path}[${i}]`))
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, v]) => {
      const childPath = path ? `${path}.${key}` : key
      if (key === "sample") return v === true ? [childPath] : []
      return findPlaceholders(v, childPath)
    })
  }
  return []
}
