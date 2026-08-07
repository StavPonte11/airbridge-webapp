'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowUpRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/brand-icons'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Bundle', href: '/#bundle' },
  { label: 'Features', href: '/#features' },
  { label: 'Enterprise', href: '/#enterprise' },
  { label: 'Roadmap', href: '/#roadmap' },
  { label: 'Docs', href: '/docs' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = ['architecture', 'bundle', 'features', 'enterprise', 'roadmap', 'dashboard']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300',
          scrolled
            ? 'glass border border-border/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]'
            : 'border border-transparent',
        )}
      >
        <Link href="/" aria-label="AirBridge home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => {
            const sectionId = l.href.replace('/#', '')
            const isActive = activeSection === sectionId || (l.href === '/docs' && typeof window !== 'undefined' && window.location.pathname.startsWith('/docs'))
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-secondary/60"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="https://github.com"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
            <span className="font-mono text-[10px] text-muted-foreground/50">14.2k ⭐</span>
          </Link>
          <Link
            href="/docs"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-[0_0_16px_-4px_var(--brand-cyan)]"
          >
            Get Started
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-4 top-20 z-50 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-foreground px-3 py-2.5 text-center text-sm font-medium text-background transition-all hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
