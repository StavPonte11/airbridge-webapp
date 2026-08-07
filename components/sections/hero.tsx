'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { BookOpen, Play, ArrowRight, Terminal, Package, ShieldCheck, Zap } from 'lucide-react'
import { GithubIcon } from '@/components/ui/brand-icons'
import { Aurora } from '@/components/ui/aurora'
import { ParticleField } from '@/components/ui/particles'
import { PipelineFlow } from '@/components/sections/pipeline-flow'

const ease = [0.16, 1, 0.3, 1] as const

const codeLines = [
  { text: '$ airbridge bundle init payments-api', delay: 0 },
  { text: '✓ Detected 4 OCI images, 2 Helm charts', delay: 0.4 },
  { text: '✓ SBOM generated (2,847 components)', delay: 0.8 },
  { text: '✓ Signed with cosign · SLSA level 3', delay: 1.2 },
  { text: '→ payments-api-v2.4.1.aib (1.2 GB)', delay: 1.6 },
  { text: '$ airbridge import payments-api-v2.4.1.aib', delay: 2.2 },
  { text: '✓ Signature verified · Policy passed', delay: 2.6 },
  { text: '✓ Deployed to gov-cluster-01 ·', delay: 3.0, highlight: true },
]

const stats = [
  { label: 'Bundles shipped', value: '4.3M+' },
  { label: 'Air-gapped clusters', value: '12K+' },
  { label: 'Time to deploy', value: '< 3min' },
]

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers = codeLines.map((line, i) =>
      setTimeout(() => setVisibleLines((v) => Math.max(v, i + 1)), line.delay * 1000 + 1200)
    )
    const reset = setTimeout(() => setVisibleLines(0), codeLines[codeLines.length - 1].delay * 1000 + 3000)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(reset)
    }
  }, [visibleLines])

  useEffect(() => {
    const start = () => setVisibleLines(0)
    start()
  }, [])

  return (
    <div className="gradient-border overflow-hidden p-[1px]">
      <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)-1px)] bg-[oklch(0.13_0.012_265/0.95)] backdrop-blur-xl">
        {/* Terminal header */}
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-chart-4/70" />
            <span className="size-3 rounded-full bg-chart-3/70" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/60">
            <span className="flex size-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--brand-cyan)]" />
            airbridge · secure terminal
          </div>
          <Terminal className="size-3.5 text-muted-foreground/40" />
        </div>

        {/* Code output */}
        <div className="min-h-[200px] p-4 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm">
          {codeLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={
                line.highlight
                  ? 'text-cyan'
                  : line.text.startsWith('$')
                    ? 'text-foreground/90'
                    : line.text.startsWith('✓')
                      ? 'text-chart-3'
                      : line.text.startsWith('→')
                        ? 'text-violet'
                        : 'text-muted-foreground'
              }
            >
              {line.text}
              {line.highlight && (
                <span className="ml-1 inline-flex size-2 animate-pulse rounded-full bg-cyan shadow-[0_0_8px_var(--brand-cyan)]" />
              )}
            </motion.div>
          ))}
          {visibleLines < codeLines.length && visibleLines > 0 && (
            <span className="inline-block h-4 w-px animate-pulse bg-cyan" />
          )}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pb-20 pt-36 sm:pt-48"
    >
      <Aurora />
      <ParticleField className="pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 grid-bg mask-fade-b opacity-40" />

      {/* Radial spotlight */}
      <div className="pointer-events-none absolute left-1/2 top-0 size-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-cyan/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_480px] lg:items-center">
          {/* Left: Hero text */}
          <div className="flex flex-col items-start">
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
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className="mt-7 max-w-2xl text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl"
            >
              The Future of{' '}
              <span className="gradient-text">Air-Gapped</span>
              <br />
              Application Delivery
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease }}
              className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              Develop anywhere. Deploy everywhere. Secure by design.
              <br />
              Package your entire application into a single immutable{' '}
              <span className="font-mono text-cyan">.aib</span> bundle, then ship it across the gap.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="mt-9 flex flex-col items-start gap-3 sm:flex-row"
            >
              <Link
                href="https://github.com"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_-4px_var(--brand-cyan)]"
              >
                <GithubIcon className="size-4" />
                Star on GitHub
                <span className="ml-1 rounded-md bg-background/15 px-1.5 py-0.5 font-mono text-xs">
                  14.2k ⭐
                </span>
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-5 py-3 text-sm font-medium backdrop-blur-md transition-all hover:border-cyan/40 hover:bg-cyan/5"
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease }}
              className="mt-12 flex flex-wrap gap-6 border-t border-border/50 pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-semibold tracking-tight text-foreground">{stat.value}</span>
                  <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {[
                { icon: Package, label: 'OCI Native' },
                { icon: ShieldCheck, label: 'SLSA Level 3' },
                { icon: Zap, label: 'Air-Gapped First' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/30 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur-sm"
                >
                  <Icon className="size-3 text-cyan" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="hidden lg:block"
          >
            <AnimatedTerminal />
          </motion.div>
        </div>

        {/* Pipeline flow - full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="relative mt-20"
        >
          <div className="mb-6 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
              Application delivery pipeline
            </span>
          </div>
          <PipelineFlow />
        </motion.div>
      </div>
    </section>
  )
}
