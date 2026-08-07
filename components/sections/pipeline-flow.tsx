'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Code2, Cloud, Package, Waypoints, Boxes, Rocket, CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const nodes = [
  { label: 'Developer', sub: 'Write code', icon: Code2 },
  { label: 'Cloud Build', sub: 'CI factory', icon: Cloud },
  { label: 'Bundle', sub: '.aib artifact', icon: Package },
  { label: 'AirBridge', sub: 'Delivery plane', icon: Waypoints, primary: true },
  { label: 'Registry', sub: 'OCI store', icon: Boxes },
  { label: 'Deployment', sub: 'K8s apply', icon: Rocket },
  { label: 'Running App', sub: 'Live inside', icon: CircleCheck },
]

export function PipelineFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="gradient-border overflow-hidden p-1">
      <div className="relative rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-6 backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 dotted-bg opacity-40" />
        <div className="relative flex items-center justify-between gap-2 border-b border-border pb-4">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-chart-4/70" />
            <span className="size-3 rounded-full bg-chart-3/70" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            develop outside → deploy inside the gap
          </span>
        </div>

        <div className="relative mt-8 flex flex-wrap items-stretch justify-center gap-y-8">
          {nodes.map((node, i) => {
            const Icon = node.icon
            const isActive = i === active
            const isGap = i === 3
            return (
              <div key={node.label} className="flex items-center">
                <motion.div
                  animate={{
                    y: isActive ? -4 : 0,
                    scale: isActive ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'flex w-24 flex-col items-center gap-2.5 rounded-2xl border px-2 py-4 text-center transition-colors duration-500 sm:w-28',
                    isActive
                      ? node.primary
                        ? 'border-violet/50 bg-violet/10 glow-violet'
                        : 'border-cyan/50 bg-cyan/10 glow-cyan'
                      : 'border-border bg-background/40',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-xl border transition-colors duration-500',
                      isActive
                        ? node.primary
                          ? 'border-violet/50 bg-violet/20 text-violet'
                          : 'border-cyan/50 bg-cyan/20 text-cyan'
                        : 'border-border bg-card text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs font-medium leading-tight">{node.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{node.sub}</span>
                </motion.div>

                {i < nodes.length - 1 ? (
                  <div className="relative mx-1 hidden h-px w-6 shrink-0 bg-border sm:mx-2 sm:block lg:w-8">
                    <motion.span
                      className={cn(
                        'absolute inset-y-0 left-0 h-px',
                        isGap ? 'bg-violet' : 'bg-cyan',
                      )}
                      animate={{ width: i < active ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.span
                      className="absolute -top-[3px] size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--brand-cyan)]"
                      animate={{
                        left: i === active - 1 ? ['0%', '100%'] : '0%',
                        opacity: i === active - 1 ? [0, 1, 0] : 0,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-3xl" />
      </div>
    </div>
  )
}
