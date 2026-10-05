import brand from "@/brand.config"
import { BrandLogo } from "@/components/brand-logo"
import { Container } from "@/components/ui/container"
import { isPlaceholder } from "@/lib/brand"
import { NAV } from "@/lib/nav"

export function Footer() {
  return (
    <footer className="border-t border-line bg-background pt-14">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <BrandLogo />
          <p className="mt-4 text-muted">
            Durable medical equipment, billed to your insurance and delivered to your home{isPlaceholder(brand.region.label) ? "" : ` across ${brand.region.label}`}.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-1">
          <a href={brand.contact.phoneHref} className="font-serif text-2xl text-primary">
            {brand.contact.phone}
          </a>
          <a href={`mailto:${brand.contact.email}`} className="[overflow-wrap:anywhere] text-muted hover:text-primary">
            {brand.contact.email}
          </a>
          {!isPlaceholder(brand.contact.hours) && <p className="text-muted">{brand.contact.hours}</p>}
        </div>
      </Container>
      <Container className="mt-12 border-t border-line py-6 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          {brand.parentCompany ? ` A ${brand.parentCompany} company.` : ""}
        </p>
        <p className="mt-2">We never sell or share your information. Submitting the form doesn&apos;t commit you to any purchase.</p>
      </Container>
      <div className="h-24 md:hidden" aria-hidden />
    </footer>
  )
}
