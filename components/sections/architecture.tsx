'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  MonitorSmartphone,
  DoorOpen,
  Workflow,
  Cog,
  Boxes,
  Rocket,
  Database,
  Puzzle,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const layers = [
  {
    name: 'Frontend',
    icon: MonitorSmartphone,
    desc: 'React dashboard for projects, deployments, and live import telemetry.',
    tag: 'Next.js · WebSocket',
  },
  {
    name: 'Gateway',
    icon: DoorOpen,
    desc: 'Authenticated REST + gRPC edge with RBAC, rate limits, and audit hooks.',
    tag: 'OIDC · LDAP · mTLS',
  },
  {
    name: 'Workflow Engine',
    icon: Workflow,
    desc: 'Durable, resumable pipelines that orchestrate every import and deploy step.',
    tag: 'DAG · Retryable',
  },
  {
    name: 'Workers',
    icon: Cog,
    desc: 'Horizontally scaled executors for validation, scanning, and normalization.',
    tag: 'Parallel · Sandboxed',
  },
  {
    name: 'Registry',
    icon: Boxes,
    desc: 'OCI-native artifact store, registry-agnostic across Harbor, ECR, and more.',
    tag: 'OCI · Content-addressed',
  },
  {
    name: 'Deployment',
    icon: Rocket,
    desc: 'Pluggable deployers that apply bundles to any Kubernetes distribution.',
    tag: 'Helm · Kustomize',
  },
  {
    name: 'Storage',
    icon: Database,
    desc: 'Streaming, chunked object storage built for multi-gigabyte image layers.',
    tag: 'S3 · Chunked',
  },
  {
    name: 'Plugins',
    icon: Puzzle,
    desc: 'Extension points for artifacts, registries, scanners, and notifications.',
    tag: 'SDK · Sandboxed',
  },
]

export function Architecture() {
  const [active, setActive] = useState(0)

  return (
    <section id="architecture" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Architecture"
          title="A layered platform, built to extend"
          description="Every layer is independently scalable and swappable. Hover a layer to inspect its responsibilities."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="flex flex-col gap-2.5">
            {layers.map((layer, i) => {
              const Icon = layer.icon
              const isActive = i === active
              return (
                <motion.button
                  key={layer.name}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'group flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-300',
                    isActive
                      ? 'border-cyan/40 bg-cyan/[0.06] glow-cyan'
                      : 'border-border bg-card/40 hover:border-border/80',
                  )}
                  style={{ marginLeft: `${Math.min(i, 4) * 8}px` }}
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors',
                      isActive
                        ? 'border-cyan/40 bg-cyan/15 text-cyan'
                        : 'border-border bg-background text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold">{layer.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{layer.tag}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    L{layers.length - i}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="gradient-border overflow-hidden p-1">
              <div className="relative flex min-h-[18rem] flex-col justify-between rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-8 backdrop-blur-md">
                <div className="pointer-events-none absolute right-0 top-0 size-40 rounded-full bg-cyan/10 blur-3xl" />
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col gap-5"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-cyan/40 bg-cyan/15 text-cyan">
                    {(() => {
                      const Icon = layers[active].icon
                      return <Icon className="size-7" />
                    })()}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{layers[active].name}</h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                      {layers[active].desc}
                    </p>
                  </div>
                </motion.div>
                <div className="relative mt-6 flex items-center gap-2 border-t border-border pt-5 font-mono text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-cyan" />
                  {layers[active].tag}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
