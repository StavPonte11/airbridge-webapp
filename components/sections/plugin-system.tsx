'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Package, Boxes, Rocket, ShieldAlert, Bell, GitBranch, Plus, Minus } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const plugins = [
  {
    name: 'Artifact Plugins',
    icon: Package,
    short: 'Teach AirBridge new artifact formats.',
    detail:
      'Parse and package Docker images, Helm charts, tarballs, and custom formats. Ship a handler and AirBridge understands your artifact end-to-end.',
    examples: ['oci-image', 'helm-chart', 'raw-tar', 'wasm-module'],
  },
  {
    name: 'Registry Plugins',
    icon: Boxes,
    short: 'Publish to any OCI-compatible store.',
    detail:
      'Connect Harbor, ECR, GAR, Nexus, or an internal registry. Handle auth, retries, and content-addressed pushes transparently.',
    examples: ['harbor', 'ecr', 'gar', 'nexus'],
  },
  {
    name: 'Deployment Plugins',
    icon: Rocket,
    short: 'Deploy to any target platform.',
    detail:
      'Apply bundles via Helm, Kustomize, ArgoCD, or Flux. Deployment strategy, rollout, and rollback are all pluggable.',
    examples: ['helm', 'kustomize', 'argocd', 'flux'],
  },
  {
    name: 'Scanner Plugins',
    icon: ShieldAlert,
    short: 'Enforce security before delivery.',
    detail:
      'Run Trivy, Grype, or a custom scanner during import. Block or gate on CVE thresholds defined by your policy engine.',
    examples: ['trivy', 'grype', 'clair', 'custom-policy'],
  },
  {
    name: 'Notification Plugins',
    icon: Bell,
    short: 'Broadcast pipeline events anywhere.',
    detail:
      'Emit structured events to Slack, Teams, email, or a webhook on every state transition of an import or deployment.',
    examples: ['slack', 'teams', 'webhook', 'email'],
  },
  {
    name: 'Git Plugins',
    icon: GitBranch,
    short: 'Sync bundles from source control.',
    detail:
      'Pull manifests and configuration from GitHub, GitLab, or Bitbucket, enabling GitOps-style delivery across the gap.',
    examples: ['github', 'gitlab', 'bitbucket', 'gitea'],
  },
]

export function PluginSystem() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Plugin System"
          title="Everything is an extension point"
          description="AirBridge ships a thin, opinionated core. Every integration is a sandboxed plugin built on a stable SDK. Click a card to explore."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plugins.map((plugin, i) => {
            const Icon = plugin.icon
            const isOpen = open === i
            return (
              <motion.div
                key={plugin.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ layout: { duration: 0.35 }, duration: 0.5, delay: i * 0.04 }}
                className={cn(
                  'cursor-pointer overflow-hidden rounded-2xl border p-5 transition-colors',
                  isOpen ? 'border-cyan/40 bg-cyan/[0.05]' : 'border-border bg-card/40 hover:border-border/80',
                )}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <motion.div layout="position" className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'flex size-11 items-center justify-center rounded-xl border transition-colors',
                      isOpen ? 'border-cyan/40 bg-cyan/15 text-cyan' : 'border-border bg-background text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground">
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </motion.div>

                <motion.h3 layout="position" className="mt-4 text-base font-semibold">
                  {plugin.name}
                </motion.h3>
                <motion.p layout="position" className="mt-1 text-sm text-muted-foreground">
                  {plugin.short}
                </motion.p>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90">
                        {plugin.detail}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {plugin.examples.map((ex) => (
                          <span
                            key={ex}
                            className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-cyan"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
