import Image from "next/image"
import brand from "@/brand.config"
import { Reveal } from "@/components/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const STEPS = [
  {
    title: "Tell us what you need",
    body: "Call us or fill out the short form. Share your insurance and the equipment your doctor recommended.",
  },
  {
    title: "We handle the insurance",
    body: "We verify your coverage, coordinate with your doctor, and take care of the billing paperwork.",
  },
  {
    title: "Delivered and set up at home",
    body: "We bring your equipment to your door, set it up, and show you how to use it.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="Three simple steps. We do the hard part."
          intro="No confusing forms and no runaround. Just the equipment you need, at home."
        />
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 120}>
                <article className="group h-full overflow-hidden rounded-[24px] bg-surface ring-1 ring-line">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={brand.images.steps[i]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden
                      className="absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary font-serif text-xl text-primary-foreground shadow-md"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl text-ink">{step.title}</h3>
                    <p className="mt-2 text-muted">{step.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
