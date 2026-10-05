import { isPlaceholder, type Brand } from "@/lib/brand"

export interface FaqItem {
  q: string
  a: string
}

export function getFaqs(brand: Pick<Brand, "name" | "region" | "contact">): FaqItem[] {
  return [
    {
      q: "Will Medicare cover my equipment?",
      a: "Medicare Part B covers many types of durable medical equipment, like walkers, wheelchairs, hospital beds, and oxygen, when your doctor says you need it for use at home. We check your specific coverage for free before anything is ordered.",
    },
    {
      q: "How much will I have to pay?",
      a: "It depends on your plan. Many patients pay little or nothing after insurance. We explain any costs up front, before you commit to anything.",
    },
    {
      q: "Do I need a prescription?",
      a: "For insurance to cover equipment, you'll usually need an order from your doctor. If you don't have one yet, we can contact your doctor's office for you.",
    },
    {
      q: "How quickly will my equipment arrive?",
      a: "Once your coverage is confirmed, we schedule delivery at a time that works for you. We bring it inside, set it up, and show you how to use it.",
    },
    {
      q: "What if something breaks or doesn't fit?",
      a: `Call us at ${brand.contact.phone}. We help with repairs, adjustments, and replacements covered by your plan.`,
    },
    {
      q: "Which areas do you serve?",
      a: isPlaceholder(brand.region.label)
        ? `${brand.name} delivers across our local service area. Call us and we'll confirm service at your address.`
        : `${brand.name} serves ${brand.region.label}. Call us and we'll confirm service at your address.`,
    },
  ]
}
