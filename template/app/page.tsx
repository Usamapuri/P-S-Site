import brand from "@/brand.config"
import { Catalog } from "@/components/sections/catalog"
import { Contact } from "@/components/sections/contact"
import { Faq } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { InsuranceStrip } from "@/components/sections/insurance-strip"
import { MobileCallBar } from "@/components/sections/mobile-call-bar"
import { Testimonials } from "@/components/sections/testimonials"
import { WhyUs } from "@/components/sections/why-us"
import { resolveCatalog } from "@/lib/catalog"
import { getFaqs } from "@/lib/faq"

export default function Home() {
  const products = resolveCatalog(brand)
  const faqs = getFaqs(brand)

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <InsuranceStrip />
        <HowItWorks />
        <Catalog products={products} />
        <WhyUs />
        <Testimonials />
        <Faq items={faqs} />
        <Contact products={products} />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
