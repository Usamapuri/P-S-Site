import type { Brand } from "@/lib/brand"

const brand: Brand = {
  id: "medivance",
  name: "Medivance",
  shortName: "Medivance",
  legalName: "[PLACEHOLDER LEGAL NAME] Medivance",
  tagline:
    "Get back to the life you love. We match you with the right equipment, handle your insurance, and deliver it to your door.",
  region: { label: "[PLACEHOLDER REGION]", states: [] },
  contact: {
    phone: "(000) 000-0000",
    phoneHref: "tel:+10000000000",
    email: "[PLACEHOLDER]@medivance.com",
    hours: "[PLACEHOLDER HOURS]",
  },
  colors: { primary: "#2B2D6E", accent: "#2EC4A6" },
  images: {
    hero: "/brand/photos/hero.jpg",
    heroAlt: "Smiling older woman in a tan jacket standing on a residential sidewalk with a four-wheeled walking aid.",
    steps: ["/brand/photos/step-1.jpg", "/brand/photos/step-2.jpg", "/brand/photos/step-3.jpg"],
    lifestyle: "/brand/photos/lifestyle.jpg",
    lifestyleAlt: "Two women chatting and smiling beside a canal bridge on a tree-lined street, one using a walking aid.",
  },
  testimonials: [
    { name: "Customer name", location: "City, ST", quote: "My new rollator has me walking to the park again. They sorted out the insurance in a couple of days.", sample: true },
    { name: "Customer name", location: "City, ST", quote: "Fast, friendly, and they actually explained my coverage. The CPAP was set up before I knew it.", sample: true },
    { name: "Customer name", location: "City, ST", quote: "They found a wheelchair that fits my dad perfectly and handled every bit of the paperwork.", sample: true },
  ],
  seo: {
    title: "Medivance | Home Medical Equipment, Covered by Insurance",
    description:
      "Medivance delivers mobility, respiratory, and home-safety equipment to seniors, billed directly to Medicare, Medicaid, and private insurance.",
    url: "https://medivance.example.com",
  },
}

export default brand
