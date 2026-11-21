import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'

export function GamesLayout({
  title,
  subtitle,
  back = true,
  actions,
  children,
}: {
  title: string
  subtitle?: React.ReactNode
  back?: boolean
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-brand-gradient relative overflow-hidden text-primary-foreground">
          <div className="bg-dots absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-content px-4 py-10 md:py-12">
            {back && (
              <Link
                to="/games"
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold opacity-85 hover:opacity-100"
              >
                <ArrowLeft className="size-4" /> Semua permainan
              </Link>
            )}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold uppercase leading-none md:text-6xl">
                  {title}
                </h1>
                {subtitle && (
                  <div className="mt-3 max-w-2xl text-base opacity-90 md:text-lg">
                    {subtitle}
                  </div>
                )}
              </div>
              {actions}
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-content px-4 py-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}

export function GameLoading() {
  return (
    <div className="mx-auto h-80 max-w-3xl animate-pulse rounded-[2rem] bg-muted" />
  )
}
