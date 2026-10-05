import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { InsuranceStrip } from "@/components/sections/insurance-strip"
import { MobileCallBar } from "@/components/sections/mobile-call-bar"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <InsuranceStrip />
      </main>
      <MobileCallBar />
    </>
  )
}
