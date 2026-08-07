'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Github, BookOpen, Play, ArrowRight } from 'lucide-react'
import { Aurora } from '@/components/ui/aurora'
import { PipelineFlow } from '@/components/sections/pipeline-flow'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <Aurora />
      <div className="pointer-events-none absolute inset-0 grid-bg mask-fade-b opacity-60" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-md"
        >
          <span className="flex size-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--brand-cyan)]" />
          Open Source · OCI-Native · Air-Gapped by design
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          The Future of{' '}
          <span className="gradient-text">Air-Gapped</span> Application Delivery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease }}
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Develop anywhere. Deploy everywhere. Secure by design. Package a complete application into
          a single immutable bundle, then ship it across the gap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="https://github.com"
            className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            <Github className="size-4" />
            Star on GitHub
            <span className="ml-1 rounded-md bg-background/15 px-1.5 py-0.5 font-mono text-xs">
              14.2k
            </span>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-5 py-3 text-sm font-medium backdrop-blur-md transition-colors hover:border-cyan/40"
          >
            <BookOpen className="size-4" />
            Documentation
          </Link>
          <Link
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Play className="size-4" />
            Watch Demo
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease }}
        className="relative mx-auto mt-16 max-w-6xl px-6"
      >
        <PipelineFlow />
      </motion.div>
    </section>
  )
}
