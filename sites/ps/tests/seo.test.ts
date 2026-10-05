import { describe, expect, it } from "vitest"
import brand from "@/brand.config"
import { getFaqs } from "@/lib/faq"
import { businessJsonLd, faqJsonLd, serializeJsonLd } from "@/lib/seo"

describe("seo", () => {
  it("describes the business with contact details and service area", () => {
    const data = businessJsonLd({ ...brand, region: { label: "Ohio and Indiana", states: ["Ohio", "Indiana"] } })
    expect(data).toMatchObject({
      "@type": "MedicalBusiness",
      name: brand.name,
      telephone: brand.contact.phone,
      email: brand.contact.email,
      url: brand.seo.url,
      areaServed: [{ "@type": "State", name: "Ohio" }, { "@type": "State", name: "Indiana" }],
    })
  })
  it("lists every FAQ as a Question with an accepted answer", () => {
    const faqs = getFaqs(brand)
    const data = faqJsonLd(faqs) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }
    expect(data.mainEntity).toHaveLength(faqs.length)
    expect(data.mainEntity[0].name).toBe(faqs[0].q)
    expect(data.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].a)
  })
  it("escapes < so JSON-LD cannot close its script tag", () => {
    expect(serializeJsonLd({ a: "</script><script>alert(1)</script>" })).not.toContain("</script>")
  })
})
