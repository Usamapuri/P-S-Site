import brand from "@/brand.config"
import { cn } from "@/lib/utils"

export function BrandLogo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVG */}
      <img src="/brand/mark.svg" alt="" width={44} height={44} className="h-11 w-11" />
      <span
        className={cn(
          "font-serif text-xl font-semibold leading-none tracking-tight md:text-2xl",
          inverted ? "text-primary-foreground" : "text-primary",
        )}
      >
        {brand.name}
      </span>
    </span>
  )
}
