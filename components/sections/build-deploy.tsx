'use client'

import { motion } from 'motion/react'
import { Github, Gitlab, Server, Cloud, Package, ShieldCheck } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/ui/reveal'

const ciProviders = [
  { label: 'GitHub Actions', icon: Github },
  { label: 'GitLab CI', icon: Gitlab },
  { label: 'Jenkins', icon: Server },
  { label: 'Azure DevOps', icon: Cloud },
]

const clusters = ['gov-cluster-01', 'defense-edge-07', 'offline-lab-03']

export function BuildDeploy() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Build Once. Deploy Anywhere."
          title="Reproducible by construction"
          description="The same immutable bundle produced by your CI factory deploys identically into any number of disconnected clusters. Build once, verify once, deploy forever."
        />

        <Reveal className="mt-16">
          <div className="gradient-border overflow-hidden p-1">
            <div className="grid gap-8 rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-8 backdrop-blur-md lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              {/* CI inputs */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Any CI factory
                </span>
                {ciProviders.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3"
                    >
                      <Icon className="size-5 text-muted-foreground" />
                      <span className="text-sm">{p.label}</span>
                    </motion.div>
                  )
                })}
                <div className="mt-2 rounded-xl border border-cyan/30 bg-cyan/[0.06] px-4 py-3 font-mono text-xs text-cyan">
                  $ airbridge build → my-application.aib
                </div>
              </div>

              {/* bundle center */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex size-24 flex-col items-center justify-center gap-1 rounded-2xl border border-violet/40 bg-violet/10 glow-violet"
                >
                  <Package className="size-8 text-violet" />
                  <span className="font-mono text-[10px] text-violet">.aib</span>
                </motion.div>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-[10px] text-muted-foreground">
                  <ShieldCheck className="size-3 text-cyan" />
                  immutable · signed
                </div>
              </div>

              {/* fan out to clusters */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Disconnected clusters
                </span>
                {clusters.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                        <Server className="size-4" />
                      </span>
                      <span className="font-mono text-xs">{c}</span>
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan">
                      <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                      synced
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
