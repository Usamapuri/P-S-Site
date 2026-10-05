"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { buttonClasses } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import type { CategoryId, Product } from "@/lib/brand"
import { CATEGORIES, categoryLabel } from "@/lib/catalog"
import { requestEquipment } from "@/lib/events"
import { cn } from "@/lib/utils"

export function Catalog({ products }: { products: Product[] }) {
  const [active, setActive] = useState<CategoryId | "all">("all")
  const categories = CATEGORIES.filter((c) => c.id === "all" || products.some((p) => p.category === c.id))
  const visible = active === "all" ? products : products.filter((p) => p.category === active)

  function ask(name: string) {
    requestEquipment(name)
    document.getElementById("contact")?.scrollIntoView()
    document.getElementById("lead-equipment")?.focus({ preventScroll: true })
  }

  return (
    <section id="equipment" aria-labelledby="equipment-title" className="bg-primary-soft py-20 md:py-28">
      <Container>
        <SectionHeading
          id="equipment-title"
          eyebrow="Equipment"
          title="Everything you need to stay safe and independent at home"
          intro="Most items are covered by Medicare, Medicaid, or private insurance with a doctor's order."
        />

        <div role="group" aria-label="Filter equipment by category" className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "min-h-12 rounded-full border-2 px-5 font-semibold transition-colors",
                active === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-line bg-surface text-ink hover:border-primary",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} items
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-surface ring-1 ring-line transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] bg-background">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">{categoryLabel(p.category)}</p>
                  <h3 className="mt-1 text-2xl text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-muted">{p.description}</p>
                  <button type="button" onClick={() => ask(p.name)} className={buttonClasses({ variant: "outline", className: "mt-5 self-start" })}>
                    Ask about this
                    <span className="sr-only">: {p.name}</span>
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
