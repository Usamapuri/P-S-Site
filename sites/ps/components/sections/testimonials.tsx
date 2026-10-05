import { Star } from "lucide-react"
import brand from "@/brand.config"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

export function Testimonials() {
  if (brand.testimonials.every((t) => t.sample === true)) return null
  return (
    <section aria-labelledby="reviews-title" className="bg-primary-soft py-20 md:py-28">
      <Container>
        <SectionHeading id="reviews-title" eyebrow="Kind words" title="Families who trust us" />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {brand.testimonials.map((t, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col rounded-[24px] bg-surface p-8 ring-1 ring-line">
                <div className="flex gap-1 text-primary" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="h-5 w-5 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-xl leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="text-muted"> · {t.location}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
