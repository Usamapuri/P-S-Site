import type { MetadataRoute } from "next"
import brand from "@/brand.config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: brand.seo.url, changeFrequency: "monthly", priority: 1 }]
}
