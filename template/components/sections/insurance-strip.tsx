import Image from "next/image"
import { Container } from "@/components/ui/container"
import { INSURERS } from "@/lib/insurers"

export function InsuranceStrip() {
  return (
    <section id="insurance" aria-labelledby="insurance-title" className="border-y border-line bg-surface py-14 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="insurance-title" className="text-2xl text-ink md:text-3xl">
            We work with the plans you already have
          </h2>
          <p className="mt-2 text-muted">
            Plus most Medicare Advantage and Medicaid plans. Not sure about yours?{" "}
            <a href="#contact" className="font-semibold text-primary underline underline-offset-4">
              We&apos;ll check for free.
            </a>
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-4 lg:grid-cols-8">
          {INSURERS.map((insurer) => (
            <li key={insurer.name} className="flex h-16 items-center justify-center">
              <Image
                src={insurer.logo}
                alt={insurer.name}
                width={160}
                height={64}
                className="h-12 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
