import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "default",
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: "center" | "left"
  tone?: "default" | "inverted"
}) {
  const inverted = tone === "inverted"
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("text-sm font-semibold uppercase tracking-[0.14em]", inverted ? "text-primary-foreground/85" : "text-primary")}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn("mt-3 text-balance text-3xl leading-tight md:text-5xl", inverted ? "text-primary-foreground" : "text-ink")}>
        {title}
      </h2>
      {intro && <p className={cn("mt-4 text-lg", inverted ? "text-primary-foreground/90" : "text-muted")}>{intro}</p>}
    </div>
  )
}
