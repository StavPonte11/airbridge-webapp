'use client'

import { motion } from 'motion/react'
import { CircleCheck, CircleDot, Circle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'

const phases = [
  {
    tag: 'Current',
    status: 'shipped',
    icon: CircleCheck,
    items: ['OCI-native bundle format', 'Core workflow engine', 'Registry & deploy plugins', 'RBAC + audit logging'],
  },
  {
    tag: 'Upcoming',
    status: 'active',
    icon: CircleDot,
    items: ['Visual dependency graph', 'Policy-as-code editor', 'Multi-cluster fleet view', 'Delta bundle transfer'],
  },
  {
    tag: 'Future',
    status: 'planned',
    icon: Circle,
    items: ['Federated registries', 'Air-gapped AI assistant', 'Hardware attestation', 'Marketplace for plugins'],
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Roadmap"
          title="Where AirBridge is headed"
          description="Built in the open, shaped by the platform teams who depend on it."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {phases.map((phase, i) => {
            const Icon = phase.icon
            const isActive = phase.status === 'active'
            return (
              <motion.div
                key={phase.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={
                  isActive
                    ? 'gradient-border overflow-hidden p-1'
                    : 'overflow-hidden rounded-[var(--radius-xl)] border border-border p-1'
                }
              >
                <div className="flex h-full flex-col gap-5 rounded-[calc(var(--radius-xl)-1px)] bg-card/50 p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        isActive
                          ? 'font-mono text-xs uppercase tracking-[0.16em] text-cyan'
                          : 'font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground'
                      }
                    >
                      {phase.tag}
                    </span>
                    <Icon className={isActive ? 'size-5 text-cyan' : 'size-5 text-muted-foreground'} />
                  </div>
                  <ul className="flex flex-col gap-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={
                            phase.status === 'shipped'
                              ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan'
                              : phase.status === 'active'
                                ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-violet'
                                : 'mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50'
                          }
                        />
                        <span className={phase.status === 'planned' ? 'text-muted-foreground' : ''}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
