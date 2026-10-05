"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Menu, Phone, X } from "lucide-react"
import { useRef, useState } from "react"
import brand from "@/brand.config"
import { BrandLogo } from "@/components/brand-logo"
import { TextSizeToggle } from "@/components/sections/text-size-toggle"
import { buttonClasses } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { NAV } from "@/lib/nav"

export function Header() {
  const [open, setOpen] = useState(false)
  const pendingTarget = useRef<string | null>(null)

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a href="#top" aria-label={`${brand.name}, back to top`} className="rounded-lg">
          <BrandLogo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-base font-medium text-ink/80 transition-colors hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TextSizeToggle className="hidden sm:inline-flex" />
          <a href={brand.contact.phoneHref} className={buttonClasses({ className: "hidden md:inline-flex" })}>
            <Phone className="h-5 w-5" aria-hidden />
            {brand.contact.phone}
          </a>
          <a
            href={brand.contact.phoneHref}
            aria-label={`Call ${brand.contact.phone}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground md:hidden"
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-line lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
              <Dialog.Content
                className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,100%)] flex-col gap-6 bg-background p-6 shadow-2xl"
                onCloseAutoFocus={(event) => {
                  const target = pendingTarget.current
                  if (!target) return
                  event.preventDefault()
                  pendingTarget.current = null
                  history.replaceState(null, "", target)
                  document.querySelector(target)?.scrollIntoView()
                }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-serif text-2xl">Menu</Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-line"
                  >
                    <X className="h-6 w-6" aria-hidden />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Jump to a section of the page</Dialog.Description>
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {NAV.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(event) => {
                            event.preventDefault()
                            pendingTarget.current = item.href
                            setOpen(false)
                          }}
                          className="block border-b border-line py-4 text-xl font-medium"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <TextSizeToggle className="self-start" />
                <a href={brand.contact.phoneHref} className={buttonClasses({ size: "lg", className: "mt-auto w-full" })}>
                  <Phone className="h-5 w-5" aria-hidden />
                  Call {brand.contact.phone}
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  )
}
