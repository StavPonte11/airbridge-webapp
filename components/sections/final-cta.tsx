'use client'

import Link from 'next/link'
import { Github, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

export function FinalCta() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="gradient-border overflow-hidden p-1">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-card/60 px-6 py-16 text-center backdrop-blur-md sm:px-16 sm:py-20">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />
              <div className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-violet/20 blur-[100px]" />
              <div className="relative flex flex-col items-center gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                  Develop outside · Deploy inside
                </span>
                <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                  Ship your first bundle across the gap
                </h2>
                <p className="max-w-xl text-pretty text-muted-foreground">
                  Join the platform teams delivering modern applications into the world&apos;s most
                  secure environments.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/docs"
                    className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                  >
                    Get Started
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="https://github.com"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition-colors hover:border-cyan/40"
                  >
                    <Github className="size-4" />
                    Star on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
