'use client'

import type React from 'react'
import { motion } from 'motion/react'
import { X, Check, Clock, Wifi, Cpu, PackageX, Zap, GitBranch, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'

const traditional = [
  { icon: Clock, label: 'Slow, brittle CI pipelines', note: '40+ min builds', metric: '-4hrs/day wasted' },
  { icon: PackageX, label: 'Manual dependency wrangling', note: 'Missing layers', metric: '3x deployment failures' },
  { icon: Wifi, label: 'No connectivity, no tooling', note: 'Offline pain', metric: '60% dev time lost' },
  { icon: Cpu, label: 'Outdated, weak internal tooling', note: 'Years behind', metric: 'Security debt compounds' },
]

const modern = [
  { icon: Zap, label: 'Cloud-scale build factory', note: 'Minutes, not hours', metric: '10x faster delivery' },
  { icon: GitBranch, label: 'Reproducible artifact delivery', note: 'One .aib file', metric: '99.9% deploy success' },
  { icon: ShieldCheck, label: 'Signed, verifiable, immutable', note: 'Secure by design', metric: 'Zero supply chain risk' },
  { icon: Check, label: 'Deploy across any air-gap', note: 'Registry agnostic', metric: 'Works on any K8s' },
]

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-20" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Problem"
          title={<>Air-gapped development is <span className="gradient-text">stuck in the past</span></>}
          description="Disconnected teams inherit the worst of every tradeoff — slow tooling, fragile pipelines, and manual delivery. AirBridge moves the software factory outside the gap and ships finished applications in."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <ComparisonCard title="Traditional Air-Gapped" tone="bad" items={traditional} />

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center gap-3">
              <div className="flex size-16 items-center justify-center rounded-full border border-border bg-card font-bold tracking-widest text-muted-foreground">
                <span className="font-mono text-xs">vs</span>
              </div>
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan/5" />
              {/* Connector lines */}
              <div className="hidden h-px w-24 bg-gradient-to-r from-destructive/30 to-border lg:block" />
              <div className="hidden h-px w-24 bg-gradient-to-r from-border to-cyan/30 lg:block" />
            </div>
          </div>

          <ComparisonCard title="With AirBridge" tone="good" items={modern} />
        </div>

        {/* Bottom impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { value: '10x', label: 'Faster delivery', trend: 'up' },
            { value: '99.9%', label: 'Deploy success rate', trend: 'up' },
            { value: '< 3min', label: 'Import to running', trend: 'up' },
            { value: '0', label: 'Supply chain incidents', trend: 'down' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 rounded-2xl border border-border bg-card/30 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</span>
                {stat.trend === 'up' ? (
                  <TrendingUp className="size-4 text-cyan" />
                ) : (
                  <TrendingDown className="size-4 text-cyan" />
                )}
              </div>
              <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ComparisonCard({
  title,
  tone,
  items,
}: {
  title: string
  tone: 'good' | 'bad'
  items: { icon: React.ComponentType<{ className?: string }>; label: string; note: string; metric: string }[]
}) {
  const good = tone === 'good'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={
        good
          ? 'gradient-border overflow-hidden p-[1px]'
          : 'overflow-hidden rounded-[var(--radius-xl)] border border-border/60 p-[1px]'
      }
    >
      <div className="h-full rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-6 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span
            className={
              good
                ? 'flex size-7 items-center justify-center rounded-full bg-cyan/15 text-cyan'
                : 'flex size-7 items-center justify-center rounded-full bg-destructive/15 text-destructive'
            }
          >
            {good ? <Check className="size-4" /> : <X className="size-4" />}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: good ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-border/80"
              >
                <span
                  className={
                    good
                      ? 'flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan'
                      : 'flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground'
                  }
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex flex-1 flex-col min-w-0">
                  <span className="truncate text-sm font-medium">{item.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{item.note}</span>
                </div>
                <span
                  className={`hidden shrink-0 font-mono text-[10px] sm:block ${good ? 'text-cyan' : 'text-destructive/70'}`}
                >
                  {item.metric}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
