'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'motion/react'
import { Star, GitFork, Users, MessageSquare, Github } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'

const stats = [
  { label: 'Stars', value: 14200, suffix: '', icon: Star },
  { label: 'Forks', value: 1830, suffix: '', icon: GitFork },
  { label: 'Contributors', value: 312, suffix: '', icon: Users },
  { label: 'Community', value: 5600, suffix: '+', icon: MessageSquare },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1400
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
      <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Open Source"
          title="Built in the open, trusted by the community"
          description="AirBridge is Apache 2.0 licensed and developed transparently on GitHub. Own your delivery stack, end to end."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/40 p-8 text-center"
              >
                <Icon className="size-6 text-cyan" />
                <span className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href="https://github.com"
            className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            <Github className="size-4" />
            Explore the repository
          </Link>
        </div>
      </div>
    </section>
  )
}
