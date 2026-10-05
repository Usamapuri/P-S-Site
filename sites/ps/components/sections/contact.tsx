import { Clock, Mail, MapPin, Phone } from "lucide-react"
import brand from "@/brand.config"
import { LeadForm } from "@/components/sections/lead-form"
import { Container } from "@/components/ui/container"
import { isPlaceholder, type Product } from "@/lib/brand"

export function Contact({ products }: { products: Product[] }) {
  const equipment = [...products.map((p) => p.name), "Other / not sure"]
  const details = [
    { icon: Phone, label: "Call us", value: brand.contact.phone, href: brand.contact.phoneHref, big: true },
    { icon: Mail, label: "Email", value: brand.contact.email, href: `mailto:${brand.contact.email}` },
    { icon: Clock, label: "Hours", value: brand.contact.hours },
    { icon: MapPin, label: "Service area", value: brand.region.label },
  ].filter((d) => !((d.label === "Hours" || d.label === "Service area") && isPlaceholder(d.value)))

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-primary py-20 text-primary-foreground md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/85">Free coverage check</p>
          <h2 id="contact-title" className="mt-3 text-balance text-4xl leading-tight md:text-5xl">
            Let&apos;s find out what your insurance covers.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Leave your details and a specialist will call you back, usually within one business day. Prefer to talk now? Call us.
          </p>
          <ul className="mt-10 space-y-6">
            {details.map(({ icon: Icon, label, value, href, big }) => (
              <li key={label} className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">{label}</p>
                  <div className={big ? "font-serif text-3xl" : "[overflow-wrap:anywhere] text-lg"}>
                    {href ? (
                      <a href={href} className="underline-offset-4 hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="relative rounded-[28px] bg-surface p-6 text-ink shadow-2xl sm:p-10">
            <LeadForm equipment={equipment} phone={brand.contact.phone} phoneHref={brand.contact.phoneHref} />
          </div>
        </div>
      </Container>
    </section>
  )
}
