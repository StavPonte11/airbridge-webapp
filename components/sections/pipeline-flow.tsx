'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Code2, Cloud, Package, Waypoints, Boxes, Rocket, CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const nodes = [
  { label: 'Developer', sub: 'Write code', icon: Code2, zone: 'outside' },
  { label: 'Cloud Build', sub: 'CI factory', icon: Cloud, zone: 'outside' },
  { label: 'Bundle', sub: '.aib artifact', icon: Package, zone: 'bridge', primary: true },
  { label: 'AirBridge', sub: 'Delivery plane', icon: Waypoints, zone: 'bridge', primary: true },
  { label: 'Registry', sub: 'OCI store', icon: Boxes, zone: 'inside' },
  { label: 'Deployment', sub: 'K8s apply', icon: Rocket, zone: 'inside' },
  { label: 'Running App', sub: 'Live inside', icon: CircleCheck, zone: 'inside' },
]

export function PipelineFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="gradient-border overflow-hidden p-[1px]">
      <div className="relative rounded-[calc(var(--radius-xl)-1px)] bg-card/70 p-6 backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 dotted-bg opacity-30" />

        {/* Header bar */}
        <div className="relative flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-chart-4/70" />
            <span className="size-3 rounded-full bg-chart-3/70" />
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-cyan shadow-[0_0_8px_var(--brand-cyan)]" />
            <span className="font-mono text-xs text-muted-foreground/60">
              develop outside → deploy inside the gap
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/40">live simulation</span>
        </div>

        {/* Zone labels */}
        <div className="relative mt-6 flex justify-between px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
          <span>Connected Cloud</span>
          <span>Air Gap</span>
          <span>Secure Enclave</span>
        </div>

        {/* Nodes */}
        <div className="relative mt-4 flex flex-wrap items-stretch justify-center gap-y-8">
          {/* Subtle zone backgrounds */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[28%] rounded-xl bg-cyan/3" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[28%] rounded-xl bg-violet/3" />

          {nodes.map((node, i) => {
            const Icon = node.icon
            const isActive = i === active
            const isBridge = node.zone === 'bridge'
            const isInside = node.zone === 'inside'

            const nodeColor = isBridge
              ? 'violet'
              : isInside
                ? 'cyan'
                : 'cyan'

            return (
              <div key={node.label} className="flex items-center">
                <motion.div
                  animate={{
                    y: isActive ? -6 : 0,
                    scale: isActive ? 1.06 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'flex w-24 flex-col items-center gap-2.5 rounded-2xl border px-2 py-4 text-center transition-all duration-500 sm:w-28',
                    isActive
                      ? nodeColor === 'violet'
                        ? 'border-violet/60 bg-violet/12 shadow-[0_0_24px_-6px_var(--brand-violet)]'
                        : 'border-cyan/60 bg-cyan/12 shadow-[0_0_24px_-6px_var(--brand-cyan)]'
                      : 'border-border/60 bg-background/40',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-xl border transition-all duration-500',
                      isActive
                        ? nodeColor === 'violet'
                          ? 'border-violet/50 bg-violet/20 text-violet'
                          : 'border-cyan/50 bg-cyan/20 text-cyan'
                        : 'border-border bg-card text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className={`text-xs font-semibold leading-tight transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground/70'}`}>
                    {node.label}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/50">{node.sub}</span>
                </motion.div>

                {i < nodes.length - 1 ? (
                  <div className="relative mx-1 hidden h-px w-5 shrink-0 bg-border/40 sm:mx-2 sm:block lg:w-7">
                    {/* Progress fill */}
                    <motion.span
                      className={cn(
                        'absolute inset-y-0 left-0 h-px',
                        i === 2 ? 'bg-violet' : 'bg-cyan',
                      )}
                      animate={{ width: i < active ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Traveling dot */}
                    <motion.span
                      className={`absolute -top-[3px] size-1.5 rounded-full ${i === 2 ? 'bg-violet shadow-[0_0_8px_var(--brand-violet)]' : 'bg-cyan shadow-[0_0_8px_var(--brand-cyan)]'}`}
                      animate={{
                        left: i === active - 1 ? ['0%', '100%'] : '0%',
                        opacity: i === active - 1 ? [0, 1, 1, 0] : 0,
                      }}
                      transition={{ duration: 1.1 }}
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Active label */}
        <div className="relative mt-6 flex items-center justify-between border-t border-border/40 pt-4 font-mono text-xs text-muted-foreground/60">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--brand-cyan)]" />
            active: <span className="text-foreground/70">{nodes[active].label}</span>
          </span>
          <span>step {active + 1}/{nodes.length}</span>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/8 blur-3xl" />
      </div>
    </div>
  )
}
