'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  MonitorSmartphone, DoorOpen, Workflow, Cog, Boxes, Rocket, Database, Puzzle,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const layers = [
  {
    name: 'Frontend',
    icon: MonitorSmartphone,
    desc: 'React dashboard for projects, deployments, and live import telemetry. WebSocket-powered real-time updates.',
    tag: 'Next.js · WebSocket · React 19',
    color: 'cyan',
  },
  {
    name: 'Gateway',
    icon: DoorOpen,
    desc: 'Authenticated REST + gRPC edge with RBAC, rate limits, audit hooks, and mTLS mutual authentication.',
    tag: 'OIDC · LDAP · mTLS · gRPC',
    color: 'cyan',
  },
  {
    name: 'Workflow Engine',
    icon: Workflow,
    desc: 'Durable, resumable pipelines that orchestrate every import and deploy step. Survives restarts gracefully.',
    tag: 'DAG · Retryable · Distributed',
    color: 'violet',
  },
  {
    name: 'Workers',
    icon: Cog,
    desc: 'Horizontally scaled executors for validation, scanning, normalization, and layer rewriting.',
    tag: 'Parallel · Sandboxed · Scalable',
    color: 'violet',
  },
  {
    name: 'Registry',
    icon: Boxes,
    desc: 'OCI-native artifact store, registry-agnostic across Harbor, ECR, GAR, and more.',
    tag: 'OCI · Content-addressed · Dedup',
    color: 'cyan',
  },
  {
    name: 'Deployment',
    icon: Rocket,
    desc: 'Pluggable deployers that apply bundles to any Kubernetes distribution via Helm, Kustomize, or ArgoCD.',
    tag: 'Helm · Kustomize · ArgoCD',
    color: 'cyan',
  },
  {
    name: 'Storage',
    icon: Database,
    desc: 'Streaming, chunked object storage built for multi-gigabyte image layers with resumable uploads.',
    tag: 'S3 · Chunked · Resumable',
    color: 'violet',
  },
  {
    name: 'Plugins',
    icon: Puzzle,
    desc: 'Extension points for artifacts, registries, scanners, notifications, and Git providers.',
    tag: 'WASM · SDK · Sandboxed',
    color: 'violet',
  },
]

function ArchitectureDiagram({ active }: { active: number }) {
  const layerHeight = 44
  const gap = 8
  const totalHeight = layers.length * (layerHeight + gap)

  return (
    <div className="gradient-border overflow-hidden p-[1px]">
      <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-6 backdrop-blur-md">
        <div className="pointer-events-none absolute right-0 top-0 size-48 rounded-full bg-cyan/8 blur-3xl" />

        {/* SVG stack diagram */}
        <svg
          viewBox={`0 0 280 ${totalHeight}`}
          className="w-full"
          aria-hidden="true"
          style={{ height: totalHeight }}
        >
          {layers.map((layer, i) => {
            const y = i * (layerHeight + gap)
            const isActive = i === active
            const isCyan = layer.color === 'cyan'
            const color = isCyan ? 'var(--brand-cyan)' : 'var(--brand-violet)'
            const depth = Math.min(i, 3) * 8

            return (
              <g key={layer.name} transform={`translate(${depth}, ${y})`}>
                {/* Shadow layer */}
                <rect
                  x="4"
                  y="4"
                  width={280 - depth * 2 - 8}
                  height={layerHeight}
                  rx="8"
                  fill="rgba(0,0,0,0.4)"
                />
                {/* Main layer rect */}
                <motion.rect
                  x="0"
                  y="0"
                  width={280 - depth * 2}
                  height={layerHeight}
                  rx="8"
                  fill={isActive ? (isCyan ? 'rgba(130,210,230,0.12)' : 'rgba(140,90,230,0.12)') : 'rgba(255,255,255,0.03)'}
                  stroke={isActive ? color : 'rgba(255,255,255,0.06)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  animate={{
                    fill: isActive ? (isCyan ? 'rgba(130,210,230,0.12)' : 'rgba(140,90,230,0.12)') : 'rgba(255,255,255,0.03)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Label */}
                <text
                  x="14"
                  y={layerHeight / 2 + 1}
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight={isActive ? '600' : '400'}
                  fontFamily="system-ui, sans-serif"
                  fill={isActive ? (isCyan ? 'var(--brand-cyan)' : 'var(--brand-violet)') : 'rgba(255,255,255,0.6)'}
                >
                  {layer.name}
                </text>
                {/* Layer number */}
                <text
                  x={280 - depth * 2 - 14}
                  y={layerHeight / 2 + 1}
                  dominantBaseline="middle"
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="monospace"
                  fill="rgba(255,255,255,0.2)"
                >
                  L{layers.length - i}
                </text>

                {/* Active indicator */}
                {isActive && (
                  <motion.rect
                    x="0"
                    y="0"
                    width="3"
                    height={layerHeight}
                    rx="1.5"
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </g>
            )
          })}

          {/* Connector lines between layers */}
          {layers.slice(0, -1).map((_, i) => {
            const y1 = i * (layerHeight + gap) + layerHeight / 2
            const y2 = (i + 1) * (layerHeight + gap) + layerHeight / 2
            const midY = (y1 + y2) / 2
            return (
              <line
                key={i}
                x1="12"
                y1={i * (layerHeight + gap) + layerHeight}
                x2="12"
                y2={(i + 1) * (layerHeight + gap)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            )
          })}
        </svg>

        {/* Active layer detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-5 flex flex-col gap-3 border-t border-border/40 pt-5"
        >
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = layers[active].icon
              const isCyan = layers[active].color === 'cyan'
              return (
                <span
                  className={`flex size-10 items-center justify-center rounded-xl border ${
                    isCyan
                      ? 'border-cyan/40 bg-cyan/15 text-cyan'
                      : 'border-violet/40 bg-violet/15 text-violet'
                  }`}
                >
                  <Icon className="size-5" />
                </span>
              )
            })()}
            <div>
              <h3 className="font-semibold">{layers[active].name}</h3>
              <p className="font-mono text-[11px] text-muted-foreground">{layers[active].tag}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{layers[active].desc}</p>
        </motion.div>
      </div>
    </div>
  )
}

export function Architecture() {
  const [active, setActive] = useState(0)

  return (
    <section id="architecture" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.1]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Architecture"
          title={<>A layered platform, <span className="gradient-text">built to extend</span></>}
          description="Every layer is independently scalable and swappable. Hover a layer to inspect its responsibilities and technical stack."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Layer list */}
          <div className="flex flex-col gap-2">
            {layers.map((layer, i) => {
              const Icon = layer.icon
              const isActive = i === active
              const isCyan = layer.color === 'cyan'
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
                      ? isCyan
                        ? 'border-cyan/40 bg-cyan/[0.06] shadow-[0_0_16px_-8px_var(--brand-cyan)]'
                        : 'border-violet/40 bg-violet/[0.06] shadow-[0_0_16px_-8px_var(--brand-violet)]'
                      : 'border-border bg-card/40 hover:border-border/80',
                  )}
                  style={{ marginLeft: `${Math.min(i, 4) * 10}px` }}
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-300',
                      isActive
                        ? isCyan
                          ? 'border-cyan/40 bg-cyan/15 text-cyan'
                          : 'border-violet/40 bg-violet/15 text-violet'
                        : 'border-border bg-background text-muted-foreground group-hover:scale-105',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold">{layer.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{layer.tag}</span>
                  </div>
                  <span className={`font-mono text-xs ${isActive ? (isCyan ? 'text-cyan/60' : 'text-violet/60') : 'text-muted-foreground/40'}`}>
                    L{layers.length - i}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Diagram panel */}
          <div className="lg:sticky lg:top-28">
            <ArchitectureDiagram active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
