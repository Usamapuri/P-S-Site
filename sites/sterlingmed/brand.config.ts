import type { Brand } from "@/lib/brand"

const brand: Brand = {
  id: "sterlingmed",
  name: "Sterlingmed",
  shortName: "Sterlingmed",
  legalName: "[PLACEHOLDER LEGAL NAME] Sterlingmed",
  tagline:
    "Thoughtful, dependable care at home. We take care of your insurance and deliver quality medical equipment with a personal touch.",
  region: { label: "[PLACEHOLDER REGION]", states: [] },
  contact: {
    phone: "(000) 000-0000",
    phoneHref: "tel:+10000000000",
    email: "[PLACEHOLDER]@sterlingmed.com",
    hours: "[PLACEHOLDER HOURS]",
  },
  colors: { primary: "#1F3D2B", accent: "#C9A24A" },
  images: {
    hero: "/brand/photos/hero.jpg",
    heroAlt: "Happy senior couple sitting close together at home, laughing as they look at a phone.",
    steps: ["/brand/photos/step-1.jpg", "/brand/photos/step-2.jpg", "/brand/photos/step-3.jpg"],
    lifestyle: "/brand/photos/lifestyle.jpg",
    lifestyleAlt: "Older man and woman sitting side by side at home, holding hands with their heads together.",
  },
  testimonials: [
    { name: "Customer name", location: "City, ST", quote: "Professional from the first call. Mother's hospital bed was delivered and set up with great care.", sample: true },
    { name: "Customer name", location: "City, ST", quote: "They took the stress out of Medicare for us. Clear answers and no surprises.", sample: true },
    { name: "Customer name", location: "City, ST", quote: "The bathroom safety equipment has given my wife real peace of mind. Excellent service.", sample: true },
  ],
  seo: {
    title: "Sterlingmed | Quality Home Medical Equipment",
    description:
      "Sterlingmed provides quality durable medical equipment for seniors at home. We handle insurance billing and deliver and set up every order.",
    url: "https://sterlingmed.example.com",
  },
}

export default brand
