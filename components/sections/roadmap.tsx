'use client'

import { motion } from 'motion/react'
import { CircleCheck, CircleDot, Circle, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'

const phases = [
  {
    tag: 'Current',
    version: 'v1.0',
    quarter: 'Q1 2026',
    status: 'shipped',
    icon: CircleCheck,
    color: 'cyan',
    items: [
      'OCI-native bundle format (.aib)',
      'Core workflow engine with DAG',
      'Registry & deploy plugins',
      'RBAC + tamper-evident audit logging',
      'Bundle signing (Cosign/Sigstore)',
      'CLI toolchain (airbridge build/import)',
    ],
  },
  {
    tag: 'Upcoming',
    version: 'v1.1',
    quarter: 'Q3 2026',
    status: 'active',
    icon: CircleDot,
    color: 'violet',
    items: [
      'Visual dependency graph explorer',
      'Policy-as-code editor (Rego/CEL)',
      'Multi-cluster fleet management view',
      'Delta bundle transfer (diffs only)',
      'Air-gapped Helm repository proxy',
      'Plugin marketplace (alpha)',
    ],
  },
  {
    tag: 'Future',
    version: 'v2.0',
    quarter: 'Q1 2027',
    status: 'planned',
    icon: Circle,
    color: 'muted',
    items: [
      'Federated registry mesh',
      'Air-gapped AI coding assistant',
      'Hardware attestation (TPM/HSM)',
      'Marketplace for certified plugins',
      'Multi-tenancy & namespace isolation',
      'WASM plugin sandbox runtime',
    ],
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-20" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Roadmap"
          title={<>Where AirBridge is <span className="gradient-text">headed</span></>}
          description="Built in the open, shaped by the platform teams who depend on it. Every milestone is driven by real user needs in real air-gapped environments."
        />

        {/* Timeline line (desktop) */}
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-border/40 lg:block">
            <motion.div
              className="h-px bg-gradient-to-r from-cyan via-violet to-transparent"
              initial={{ width: '0%' }}
              whileInView={{ width: '67%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {phases.map((phase, i) => {
              const Icon = phase.icon
              const isActive = phase.status === 'active'
              const isShipped = phase.status === 'shipped'
              return (
                <motion.div
                  key={phase.tag}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    isActive
                      ? 'gradient-border overflow-hidden p-[1px]'
                      : 'overflow-hidden rounded-[var(--radius-xl)] border border-border/60 p-[1px]'
                  }
                >
                  <div className="flex h-full flex-col gap-5 rounded-[calc(var(--radius-xl)-1px)] bg-card/50 p-6 backdrop-blur-md">
                    {/* Phase header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          className={
                            isActive
                              ? 'size-5 text-violet'
                              : isShipped
                                ? 'size-5 text-cyan'
                                : 'size-5 text-muted-foreground/40'
                          }
                        />
                        <span
                          className={
                            isActive
                              ? 'font-mono text-xs uppercase tracking-[0.16em] text-violet'
                              : isShipped
                                ? 'font-mono text-xs uppercase tracking-[0.16em] text-cyan'
                                : 'font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground/50'
                          }
                        >
                          {phase.tag}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-[10px] font-bold text-foreground/60">{phase.version}</span>
                        <span className="font-mono text-[10px] text-muted-foreground/40">{phase.quarter}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <ul className="flex flex-col gap-2.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <span
                            className={
                              isShipped
                                ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_6px_var(--brand-cyan)]'
                                : isActive
                                  ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-violet shadow-[0_0_6px_var(--brand-violet)]'
                                  : 'mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/30'
                            }
                          />
                          <span
                            className={
                              phase.status === 'planned'
                                ? 'text-muted-foreground/60'
                                : 'text-foreground/80'
                            }
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Status badge */}
                    <div className="mt-auto pt-3 border-t border-border/30">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] ${
                          isShipped
                            ? 'bg-cyan/10 text-cyan'
                            : isActive
                              ? 'bg-violet/10 text-violet'
                              : 'bg-muted/30 text-muted-foreground/50'
                        }`}
                      >
                        <span className={`size-1.5 rounded-full bg-current ${isActive ? 'animate-pulse' : ''}`} />
                        {isShipped ? 'Generally available' : isActive ? 'In development' : 'On the roadmap'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Contribute CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Have a feature request? Open an issue on GitHub</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
