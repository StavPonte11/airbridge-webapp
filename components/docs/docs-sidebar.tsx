'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav } from '@/lib/docs-nav'
import { cn } from '@/lib/utils'

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-7">
      {docsNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-1.5">
          <h4 className="px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">
            {section.title}
          </h4>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.slug
              return (
                <li key={item.slug}>
                  <Link
                    href={item.slug}
                    onClick={onNavigate}
                    className={cn(
                      'relative block rounded-lg px-3 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-secondary/70 font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {active ? (
                      <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-cyan" />
                    ) : null}
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
