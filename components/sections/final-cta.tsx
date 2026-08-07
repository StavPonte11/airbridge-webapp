'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Package, Zap, ShieldCheck } from 'lucide-react'
import { GithubIcon } from '@/components/ui/brand-icons'
import { Aurora } from '@/components/ui/aurora'
import { ParticleField } from '@/components/ui/particles'
import { Reveal } from '@/components/ui/reveal'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="gradient-border overflow-hidden p-[1px]">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-card/60 px-6 py-16 text-center backdrop-blur-md sm:px-16 sm:py-24">
              <Aurora />
              <ParticleField className="pointer-events-none absolute inset-0 opacity-40" />
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" />
              <div className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-violet/15 blur-[90px]" />

              <div className="relative flex flex-col items-center gap-6">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { icon: Package, label: 'OCI Native' },
                    { icon: Zap, label: 'Air-Gapped First' },
                    { icon: ShieldCheck, label: 'SLSA Level 3' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      <Icon className="size-3 text-cyan" />
                      {label}
                    </span>
                  ))}
                </div>

                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                  Develop outside · Deploy inside
                </span>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
                >
                  Ship your first bundle across the gap
                </motion.h2>

                <p className="max-w-xl text-pretty text-muted-foreground">
                  Join the platform teams delivering modern applications into the world&apos;s most
                  secure environments. Open source, community-driven, production-ready.
                </p>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/docs"
                    className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:scale-[1.03] hover:shadow-[0_0_32px_-8px_var(--brand-cyan)]"
                  >
                    Get Started
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="https://github.com"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition-all hover:border-cyan/40 hover:bg-cyan/5"
                  >
                    <GithubIcon className="size-4" />
                    Star on GitHub
                    <span className="ml-1 rounded-md border border-border bg-card/50 px-1.5 py-0.5 font-mono text-xs">
                      14.2k ⭐
                    </span>
                  </Link>
                </div>

                <p className="font-mono text-xs text-muted-foreground/50">
                  Apache 2.0 · Free forever · No vendor lock-in
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
