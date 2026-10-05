import { ArrowRight, CheckCircle2, Clock, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import brand from "@/brand.config"
import { buttonClasses } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const TRUST = ["Medicare accepted", "Free home delivery", "We handle the paperwork"]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 py-12 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
            <MapPin className="h-4 w-4" aria-hidden />
            Serving {brand.region.label}
          </p>
          <h1 id="hero-title" className="mt-6 text-balance text-[2.5rem] leading-[1.05] text-ink sm:text-5xl lg:text-[4.25rem]">
            Medical equipment, <span className="italic text-primary">covered by your insurance</span>, delivered to your door.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{brand.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={brand.contact.phoneHref} className={buttonClasses({ size: "lg" })}>
              <Phone className="h-5 w-5" aria-hidden />
              Call {brand.contact.phone}
            </a>
            <a href="#contact" className={buttonClasses({ variant: "outline", size: "lg" })}>
              Check my coverage
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2 font-medium text-ink">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mb-8 lg:col-span-6 lg:mb-0">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] shadow-xl lg:aspect-[4/5]">
            <Image
              src={brand.images.hero}
              alt={brand.images.heroAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 left-4 right-4 flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-xl ring-1 ring-line sm:left-auto sm:right-6 sm:w-80">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Clock className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Talk to a real person</p>
              <p className="text-ink">{brand.contact.hours}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
