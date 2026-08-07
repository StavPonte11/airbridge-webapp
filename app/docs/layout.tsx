import type React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'AirBridge documentation — everything you need to ship your first bundle across the air gap.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="relative min-h-screen pt-20">
        {/* Subtle grid background */}
        <div className="pointer-events-none fixed inset-0 grid-bg opacity-[0.08]" />

        <div className="relative mx-auto flex max-w-7xl gap-0 px-4 py-12 lg:px-6">
          {/* Sidebar — fixed on desktop */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-28">
              <div className="mb-6 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--brand-cyan)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
                  Docs
                </span>
              </div>
              <DocsSidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 lg:pl-12 xl:pr-60">
            {children}
          </main>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
