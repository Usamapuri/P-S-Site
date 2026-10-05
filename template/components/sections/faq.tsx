"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import type { FaqItem } from "@/lib/faq"

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading id="faq-title" eyebrow="Questions" title="Answers to common questions" />
        <Accordion.Root type="single" collapsible className="mt-12 divide-y divide-line overflow-hidden rounded-[24px] bg-surface ring-1 ring-line">
          {items.map((item, i) => (
            <Accordion.Item key={item.q} value={`q${i}`}>
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 px-6 py-5 text-left font-serif text-xl text-ink hover:bg-primary-soft">
                    {item.q}
                    <ChevronDown className="h-6 w-6 shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-6 text-lg text-muted">{item.a}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  )
}
