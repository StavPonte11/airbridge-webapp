'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'motion/react'
import { Star, GitFork, Users, MessageSquare, ArrowUpRight, GitCommitHorizontal } from 'lucide-react'
import { GithubIcon } from '@/components/ui/brand-icons'
import { SectionHeading } from '@/components/ui/reveal'

const stats = [
  { label: 'GitHub Stars', value: 14200, suffix: '', icon: Star, color: 'cyan' },
  { label: 'Forks', value: 1830, suffix: '', icon: GitFork, color: 'violet' },
  { label: 'Contributors', value: 312, suffix: '', icon: Users, color: 'cyan' },
  { label: 'Community Members', value: 5600, suffix: '+', icon: MessageSquare, color: 'violet' },
]

const recentActivity = [
  { user: 'k8s-platform-team', action: 'opened PR', subject: 'Add fleet-wide policy propagation', time: '2h ago', type: 'pr' },
  { user: 'secops-zero', action: 'merged', subject: 'Sigstore TSA integration', time: '4h ago', type: 'merge' },
  { user: 'infrabot', action: 'released', subject: 'v1.0.3 — patch for chunked upload', time: '6h ago', type: 'release' },
  { user: 'devops-ryan', action: 'opened issue', subject: 'Delta transfer support for large images', time: '1d ago', type: 'issue' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1600
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}

export function OpenSource() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[44rem] -translate-x-1/2 rounded-full bg-cyan/8 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Open Source"
          title={<>Built in the open, <span className="gradient-text">trusted by the community</span></>}
          description="AirBridge is Apache 2.0 licensed and developed transparently on GitHub. Own your delivery stack, end to end. No vendor lock-in. No phone home. No compromise."
        />

        {/* Stats grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            const isCyan = stat.color === 'cyan'
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border p-8 text-center transition-all hover:-translate-y-1 ${
                  isCyan
                    ? 'border-cyan/20 bg-card/40 hover:border-cyan/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)]'
                    : 'border-violet/20 bg-card/40 hover:border-violet/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)]'
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                    isCyan ? 'bg-cyan/3' : 'bg-violet/3'
                  }`}
                />
                <Icon className={`size-6 ${isCyan ? 'text-cyan' : 'text-violet'}`} />
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Activity feed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 gradient-border overflow-hidden p-[1px]"
        >
          <div className="rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-5 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GithubIcon className="size-4 text-muted-foreground" />
                <span className="text-sm font-semibold">Recent Activity</span>
              </div>
              <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/50">
                <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                live
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-3 rounded-lg border border-border/30 bg-background/30 px-3 py-2.5"
                >
                  <GitCommitHorizontal className="size-4 shrink-0 text-muted-foreground/40" />
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-xs">
                    <span className="text-cyan shrink-0">{item.user}</span>
                    <span className="text-muted-foreground/60 shrink-0">{item.action}</span>
                    <span className="truncate text-foreground/70">{item.subject}</span>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground/40">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href="https://github.com"
            className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_-4px_var(--brand-cyan)]"
          >
            <GithubIcon className="size-4" />
            View on GitHub
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="font-mono text-xs text-muted-foreground/50">Apache 2.0 · 312 contributors · actively maintained</p>
        </div>
      </div>
    </section>
  )
}
