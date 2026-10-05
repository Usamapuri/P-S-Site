import type { Brand } from "@/lib/brand"

const brand: Brand = {
  id: "template",
  name: "Template Preview",
  shortName: "Template",
  legalName: "Template Preview",
  tagline:
    "We help seniors and their families get the medical equipment they need, billed to insurance and delivered to their door.",
  region: { label: "[PLACEHOLDER REGION]", states: [] },
  contact: {
    phone: "(000) 000-0000",
    phoneHref: "tel:+10000000000",
    email: "[PLACEHOLDER]@example.com",
    hours: "Monday – Friday, 8 AM – 6 PM",
  },
  colors: { primary: "#0F4C5C", accent: "#E8735A" },
  images: {
    hero: "/brand/photos/hero.jpg",
    heroAlt: "Smiling older woman relaxing in an armchair at home with a cup of tea.",
    steps: ["/brand/photos/step-1.jpg", "/brand/photos/step-2.jpg", "/brand/photos/step-3.jpg"],
    lifestyle: "/brand/photos/lifestyle.jpg",
    lifestyleAlt: "Grandparents playing with their grandchildren on the sofa at home.",
  },
  testimonials: [
    { name: "Customer name", location: "City, ST", quote: "They handled everything with Dad's Medicare plan and had his hospital bed set up the same week. Kind, patient people.", sample: true },
    { name: "Customer name", location: "City, ST", quote: "I dreaded the insurance paperwork. They took care of all of it and walked me through my oxygen concentrator step by step.", sample: true },
    { name: "Customer name", location: "City, ST", quote: "Mom's walker arrived quickly and fit perfectly. Whenever we call, a real person picks up.", sample: true },
  ],
  seo: {
    title: "Template Preview — Medical Equipment Covered by Insurance",
    description: "Durable medical equipment billed to your insurance and delivered to your home.",
    url: "https://template.example.com",
  },
}

export default brand
