import { HeartHandshake, ShieldCheck, Truck, Wrench } from "lucide-react"
import Image from "next/image"
import brand from "@/brand.config"
import { buttonClasses } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "We handle the insurance",
    body: "We verify coverage and bill Medicare, Medicaid, and private plans directly, so there are no confusing forms for you.",
  },
  { icon: Truck, title: "Free delivery and setup", body: "Equipment arrives at your door, set up and ready, with a clear walkthrough." },
  { icon: HeartHandshake, title: "Real people who listen", body: "Call and talk to a friendly specialist, not a phone tree." },
  { icon: Wrench, title: "Help after delivery", body: "Questions, repairs, or replacements: we're a phone call away." },
]

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-xl">
            <Image src={brand.images.lifestyle} alt={brand.images.lifestyleAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionHeading id="why-title" align="left" eyebrow={`Why ${brand.shortName}`} title="Care that doesn't stop at the delivery" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl text-ink">{title}</h3>
                  <p className="mt-1 text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-primary px-8 py-10 text-primary-foreground md:flex-row md:items-center md:px-12">
          <p className="max-w-2xl font-serif text-2xl leading-snug md:text-3xl">
            We bill your insurance directly, so you&apos;re not stuck with the paperwork.
          </p>
          <a href="#contact" className={buttonClasses({ size: "lg", className: "shrink-0" })}>
            Check my coverage
          </a>
        </div>
      </Container>
    </section>
  )
}
