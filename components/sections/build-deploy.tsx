'use client'

import { motion } from 'motion/react'
import { Server, Cloud, Package, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react'
import { GithubIcon, GitlabIcon } from '@/components/ui/brand-icons'
import { SectionHeading, Reveal } from '@/components/ui/reveal'

const ciProviders = [
  { label: 'GitHub Actions', icon: GithubIcon, tag: 'yml workflow' },
  { label: 'GitLab CI', icon: GitlabIcon, tag: '.gitlab-ci.yml' },
  { label: 'Jenkins', icon: Server, tag: 'Jenkinsfile' },
  { label: 'Azure DevOps', icon: Cloud, tag: 'azure-pipelines.yml' },
]

const clusters = [
  { name: 'gov-cluster-01', zone: 'Zone A · Cleared', status: 'Running', version: 'v2.4.1' },
  { name: 'defense-edge-07', zone: 'Zone B · TS', status: 'Running', version: 'v2.4.1' },
  { name: 'offline-lab-03', zone: 'Zone C · Classified', status: 'Running', version: 'v2.4.1' },
]

const buildSteps = [
  'docker build',
  'helm package',
  'sbom generate',
  'cosign sign',
  'airbridge bundle',
]

export function BuildDeploy() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-20" />
      <div className="pointer-events-none absolute left-0 top-1/2 size-[30rem] -translate-y-1/2 rounded-full bg-cyan/6 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 size-[30rem] -translate-y-1/2 rounded-full bg-violet/6 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Build Once. Deploy Anywhere."
          title={<>Reproducible <span className="gradient-text">by construction</span></>}
          description="The same immutable bundle produced by your CI factory deploys identically into any number of disconnected clusters. Build once, verify once, deploy forever."
        />

        <Reveal className="mt-16">
          <div className="gradient-border overflow-hidden p-[1px]">
            <div className="grid gap-0 rounded-[calc(var(--radius-xl)-1px)] bg-card/60 backdrop-blur-md lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              {/* CI inputs */}
              <div className="flex flex-col gap-3 p-6 sm:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Any CI factory
                </span>
                {ciProviders.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 transition-all hover:border-border/80"
                    >
                      <Icon className="size-5 text-muted-foreground shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm">{p.label}</span>
                        <span className="font-mono text-[10px] text-muted-foreground/60">{p.tag}</span>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Build command sequence */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-2 overflow-hidden rounded-xl border border-cyan/25 bg-[oklch(0.14_0.02_265/0.8)]"
                >
                  <div className="border-b border-border/50 px-3 py-2">
                    <span className="font-mono text-[10px] text-muted-foreground/60">build.yml · airbridge step</span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-3 font-mono text-xs">
                    {buildSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.07 }}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="text-muted-foreground/30">$</span>
                        <span>{step}</span>
                      </motion.div>
                    ))}
                    <div className="mt-1 border-t border-border/30 pt-2 text-cyan">
                      → payments-api-v2.4.1.aib
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center: bundle */}
              <div className="flex flex-col items-center gap-4 border-x-0 border-y border-border/40 p-8 lg:border-x lg:border-y-0">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex size-28 flex-col items-center justify-center gap-1.5 rounded-2xl border border-violet/40 bg-violet/10 shadow-[0_0_60px_-12px_var(--brand-violet)]"
                >
                  <Package className="size-9 text-violet" />
                  <span className="font-mono text-xs font-bold text-violet">.aib</span>
                  {/* Orbit ring */}
                  <div className="absolute inset-[-12px] animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-violet/20" />
                </motion.div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-[10px] text-muted-foreground">
                    <ShieldCheck className="size-3 text-cyan" />
                    immutable · signed · SLSA 3
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/50">1.2 GB · sha256:a8f3c...</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <ArrowRight className="size-5 text-muted-foreground/30 rotate-90" />
                  <span className="font-mono text-[10px] text-muted-foreground/50">air gap crossing</span>
                  <ArrowRight className="size-5 text-muted-foreground/30 rotate-90" />
                </div>
              </div>

              {/* Fan out to clusters */}
              <div className="flex flex-col gap-3 p-6 sm:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Disconnected clusters
                </span>
                {clusters.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 transition-all hover:border-cyan/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan/8 text-cyan">
                        <Server className="size-4" />
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-mono text-xs truncate">{c.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground/60">{c.zone}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-0.5">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan">
                        <span className="size-1.5 animate-pulse rounded-full bg-cyan shadow-[0_0_6px_var(--brand-cyan)]" />
                        {c.status}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground/50">{c.version}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Immutability guarantee */}
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-border/50 bg-background/30 px-3 py-2.5">
                  <CheckCircle className="size-3.5 shrink-0 text-cyan" />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Identical deploy across all clusters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
