import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { GithubIcon, XIcon } from '@/components/ui/brand-icons'
import { Logo } from '@/components/ui/logo'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Architecture', href: '/#architecture' },
      { label: 'The Bundle', href: '/#bundle' },
      { label: 'Features', href: '/#features' },
      { label: 'Roadmap', href: '/#roadmap' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Getting Started', href: '/docs' },
      { label: 'Bundle Spec', href: '/docs' },
      { label: 'Plugin SDK', href: '/docs' },
      { label: 'REST API', href: '/docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Examples', href: '/docs' },
      { label: 'Deployment', href: '/docs' },
      { label: 'Changelog', href: '/#roadmap' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Discord', href: '#' },
      { label: 'Discussions', href: '#' },
      { label: 'License (Apache 2.0)', href: '#' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The open-source application delivery platform for air-gapped environments. Develop
              anywhere, deploy everywhere.
            </p>
            <div className="mt-2 flex items-center gap-2">
              {[GithubIcon, XIcon, MessageCircle].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-cyan/40 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AirBridge. Apache 2.0 Licensed.</p>
          <p className="font-mono text-xs">
            Develop outside. <span className="text-cyan">Deploy inside.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
