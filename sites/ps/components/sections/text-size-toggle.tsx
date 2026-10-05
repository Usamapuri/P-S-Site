"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function TextSizeToggle({ className }: { className?: string }) {
  const [large, setLarge] = useState(false)

  useEffect(() => {
    setLarge(document.documentElement.classList.contains("text-lg-mode"))
  }, [])

  function toggle() {
    const next = !large
    document.documentElement.classList.toggle("text-lg-mode", next)
    try {
      localStorage.setItem("text-size", next ? "large" : "normal")
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    setLarge(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={large}
      className={cn(
        "inline-flex h-12 items-center gap-1 rounded-full border-2 border-line px-4 font-semibold text-ink transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary-soft",
        className,
      )}
    >
      <span aria-hidden>A+</span>
      <span className="sr-only">Larger text</span>
    </button>
  )
}
