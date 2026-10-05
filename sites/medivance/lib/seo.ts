import type { Brand } from "@/lib/brand"
import type { FaqItem } from "@/lib/faq"

export function businessJsonLd(brand: Brand) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: brand.name,
    legalName: brand.legalName,
    description: brand.seo.description,
    url: brand.seo.url,
    telephone: brand.contact.phone,
    email: brand.contact.email,
    logo: new URL("/brand/mark.svg", brand.seo.url).toString(),
    areaServed: brand.region.states.map((name) => ({ "@type": "State", name })),
  }
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
