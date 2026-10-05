import { cn } from "@/lib/utils"

type Variant = "accent" | "primary" | "outline" | "onPrimary"
type Size = "md" | "lg"

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 min-h-12 disabled:cursor-not-allowed disabled:opacity-60"

const variants: Record<Variant, string> = {
  accent: "bg-accent text-accent-foreground shadow-sm hover:brightness-95 hover:shadow-md",
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  onPrimary: "border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
}

const sizes: Record<Size, string> = {
  md: "px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
}

export function buttonClasses({
  variant = "accent",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className)
}
