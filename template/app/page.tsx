import brand from "@/brand.config"
import { Catalog } from "@/components/sections/catalog"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { InsuranceStrip } from "@/components/sections/insurance-strip"
import { MobileCallBar } from "@/components/sections/mobile-call-bar"
import { WhyUs } from "@/components/sections/why-us"
import { resolveCatalog } from "@/lib/catalog"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <InsuranceStrip />
        <HowItWorks />
        <Catalog products={resolveCatalog(brand)} />
        <WhyUs />
      </main>
      <MobileCallBar />
    </>
  )
}
