import { Phone } from "lucide-react"
import brand from "@/brand.config"
import { buttonClasses } from "@/components/ui/button"

export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-background/95 px-4 pt-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a href={brand.contact.phoneHref} className={buttonClasses({ size: "lg", className: "w-full" })}>
        <Phone className="h-5 w-5" aria-hidden />
        Call {brand.contact.phone}
      </a>
    </div>
  )
}
