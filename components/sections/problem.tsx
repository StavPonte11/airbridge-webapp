'use client'

import { motion } from 'motion/react'
import { X, Check, Clock, Wifi, Cpu, PackageX, Zap, GitBranch, ShieldCheck } from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const traditional = [
  { icon: Clock, label: 'Slow, brittle CI pipelines', note: '40+ min builds' },
  { icon: PackageX, label: 'Manual dependency wrangling', note: 'Missing layers' },
  { icon: Wifi, label: 'No connectivity, no tooling', note: 'Offline pain' },
  { icon: Cpu, label: 'Outdated, weak internal AI', note: 'Years behind' },
]

const modern = [
  { icon: Zap, label: 'Cloud-scale build factory', note: 'Minutes, not hours' },
  { icon: GitBranch, label: 'Reproducible artifact delivery', note: 'One .aib file' },
  { icon: ShieldCheck, label: 'Signed, verifiable, immutable', note: 'Secure by design' },
  { icon: Check, label: 'Deploy across any air-gap', note: 'Registry agnostic' },
]

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Problem"
          title={<>Air-gapped development is stuck in the past</>}
          description="Disconnected teams inherit the worst of every tradeoff — slow tooling, fragile pipelines, and manual delivery. AirBridge moves the software factory outside the gap and ships finished applications in."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <ComparisonCard
            title="Traditional Air-Gapped"
            tone="bad"
            items={traditional}
          />

          <div className="flex items-center justify-center">
            <div className="relative flex size-14 items-center justify-center rounded-full border border-border bg-card font-mono text-xs uppercase tracking-widest text-muted-foreground">
              vs
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan/10" />
            </div>
          </div>

          <ComparisonCard title="With AirBridge" tone="good" items={modern} />
        </div>
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
  items: { icon: React.ComponentType<{ className?: string }>; label: string; note: string }[]
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
          ? 'gradient-border overflow-hidden p-1'
          : 'overflow-hidden rounded-[calc(var(--radius-xl))] border border-border p-1'
      }
    >
      <div className="rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-6 backdrop-blur-md">
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

        <StaggerGroup className="flex flex-col gap-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.label}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
                  <span
                    className={
                      good
                        ? 'flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan'
                        : 'flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground'
                    }
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{item.note}</span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </motion.div>
  )
}
