import { BrandLogo } from "@/components/brand-logo"
import { buttonClasses } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

export default function Home() {
  return (
    <main id="main" className="py-16">
      <Container className="space-y-10">
        <BrandLogo />
        <SectionHeading eyebrow="Tokens" title="Design foundation" intro="Body text should render at 18px." />
        <div className="flex flex-wrap gap-4">
          <a href="#" className={buttonClasses()}>Accent</a>
          <a href="#" className={buttonClasses({ variant: "primary" })}>Primary</a>
          <a href="#" className={buttonClasses({ variant: "outline" })}>Outline</a>
        </div>
      </Container>
    </main>
  )
}
