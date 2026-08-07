'use client'

import { motion } from 'motion/react'
import {
  LayoutGrid,
  Rocket,
  Workflow,
  Boxes,
  Activity,
  Network,
  Search,
  Bell,
} from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/ui/reveal'

const nav = [
  { label: 'Projects', icon: LayoutGrid, active: true },
  { label: 'Deployments', icon: Rocket },
  { label: 'Workflows', icon: Workflow },
  { label: 'Registry', icon: Boxes },
  { label: 'Metrics', icon: Activity },
  { label: 'Graph', icon: Network },
]

const deployments = [
  { name: 'payments-api', env: 'gov-cluster-01', status: 'Running', tone: 'ok' },
  { name: 'auth-service', env: 'defense-edge-07', status: 'Deploying', tone: 'progress' },
  { name: 'ml-inference', env: 'offline-lab-03', status: 'Verified', tone: 'ok' },
  { name: 'legacy-etl', env: 'gov-cluster-02', status: 'Queued', tone: 'idle' },
]

const bars = [40, 62, 48, 75, 58, 90, 70, 82, 66, 95, 78, 88]

export function DashboardPreview() {
  return (
    <section id="dashboard" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Dashboard"
          title="Command every delivery from one console"
          description="A single pane of glass for projects, deployments, workflows, and live import telemetry — designed for operators who live in the dark."
        />

        <Reveal className="mt-16">
          <div className="gradient-border overflow-hidden p-1">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-1px)] bg-background/90 backdrop-blur-md">
              {/* top bar */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-destructive/70" />
                  <span className="size-3 rounded-full bg-chart-4/70" />
                  <span className="size-3 rounded-full bg-chart-3/70" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
                  <Search className="size-3.5" />
                  airbridge.internal / console
                </div>
                <Bell className="size-4 text-muted-foreground" />
              </div>

              <div className="grid gap-0 md:grid-cols-[190px_1fr]">
                {/* sidebar */}
                <div className="hidden flex-col gap-1 border-r border-border p-3 md:flex">
                  {nav.map((n) => {
                    const Icon = n.icon
                    return (
                      <div
                        key={n.label}
                        className={
                          n.active
                            ? 'flex items-center gap-2.5 rounded-lg bg-cyan/10 px-3 py-2 text-sm text-cyan'
                            : 'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground'
                        }
                      >
                        <Icon className="size-4" />
                        {n.label}
                      </div>
                    )
                  })}
                </div>

                {/* main */}
                <div className="flex flex-col gap-4 p-4 sm:p-6">
                  {/* metric cards */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Active deployments', value: '128', delta: '+12' },
                      { label: 'Bundles imported', value: '4,392', delta: '+318' },
                      { label: 'Avg import time', value: '2.4m', delta: '-18%' },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl border border-border bg-card/50 p-4">
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                        <div className="mt-2 flex items-end justify-between">
                          <span className="text-2xl font-semibold">{m.value}</span>
                          <span className="font-mono text-xs text-cyan">{m.delta}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
                    {/* deployments table */}
                    <div className="rounded-xl border border-border bg-card/50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Deployments</h4>
                        <span className="font-mono text-[10px] text-muted-foreground">live</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {deployments.map((d) => (
                          <div
                            key={d.name}
                            className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5"
                          >
                            <div className="flex flex-col">
                              <span className="font-mono text-xs">{d.name}</span>
                              <span className="font-mono text-[10px] text-muted-foreground">
                                {d.env}
                              </span>
                            </div>
                            <span
                              className={
                                d.tone === 'ok'
                                  ? 'flex items-center gap-1.5 rounded-full bg-cyan/10 px-2.5 py-1 text-[10px] text-cyan'
                                  : d.tone === 'progress'
                                    ? 'flex items-center gap-1.5 rounded-full bg-violet/10 px-2.5 py-1 text-[10px] text-violet'
                                    : 'flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground'
                              }
                            >
                              <span className="size-1.5 rounded-full bg-current" />
                              {d.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* metrics chart */}
                    <div className="rounded-xl border border-border bg-card/50 p-4">
                      <h4 className="mb-3 text-sm font-semibold">Import throughput</h4>
                      <div className="flex h-32 items-end gap-1.5">
                        {bars.map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 rounded-t bg-gradient-to-t from-cyan/30 to-cyan"
                          />
                        ))}
                      </div>
                      <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                        layers/sec · last 12 min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
