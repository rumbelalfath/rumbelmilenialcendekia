import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Gamepad2, Menu, X } from 'lucide-react'

import { navLinks } from '@/data/site'
import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <img
        src="/img/logo-icon.png"
        alt=""
        width={44}
        height={36}
        className="h-9 w-auto"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Rumah Belajar
        </span>
        <span className="font-display text-xl font-extrabold uppercase tracking-wide text-navy">
          Milenial Cendekia
        </span>
      </span>
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3">
        <Link to="/" aria-label="Beranda Rumah Belajar Milenial Cendekia">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Gamepad2 className="size-4" />
            English Games
          </Link>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 font-semibold hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
