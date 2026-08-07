'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  LayoutGrid, Rocket, Workflow, Boxes, Activity, Network,
  Search, Bell, CircleDot, CheckCircle2, Clock, AlertCircle,
  TrendingUp, Server, ArrowUpRight,
} from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Projects', icon: LayoutGrid, active: true },
  { label: 'Deployments', icon: Rocket },
  { label: 'Workflows', icon: Workflow },
  { label: 'Registry', icon: Boxes },
  { label: 'Metrics', icon: Activity },
  { label: 'Dep Graph', icon: Network },
]

const deployments = [
  { name: 'payments-api', version: 'v2.4.1', env: 'gov-cluster-01', status: 'Running', tone: 'ok', time: '2m ago' },
  { name: 'auth-service', version: 'v1.8.0', env: 'defense-edge-07', status: 'Deploying', tone: 'progress', time: 'now' },
  { name: 'ml-inference', version: 'v3.1.2', env: 'offline-lab-03', status: 'Verified', tone: 'ok', time: '14m ago' },
  { name: 'legacy-etl', version: 'v0.9.4', env: 'gov-cluster-02', status: 'Queued', tone: 'idle', time: 'queued' },
  { name: 'data-pipeline', version: 'v1.2.0', env: 'airgap-zone-b', status: 'Error', tone: 'error', time: '1h ago' },
]

const bars = [32, 48, 62, 44, 75, 58, 90, 70, 82, 66, 95, 78]

const importLog = [
  { time: '10:42:31', msg: 'payments-api-v2.4.1.aib uploaded', level: 'info' },
  { time: '10:42:32', msg: 'Signature verified · Cosign OK', level: 'ok' },
  { time: '10:42:33', msg: 'SBOM parsed · 2,847 components', level: 'info' },
  { time: '10:42:35', msg: 'Policy engine: PASS', level: 'ok' },
  { time: '10:42:40', msg: 'Pushing 24 OCI layers → registry', level: 'info' },
  { time: '10:42:58', msg: 'Deploy plan applied · gov-cluster-01', level: 'ok' },
  { time: '10:43:01', msg: 'Health probe passed · Running', level: 'ok' },
]

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="dashboard" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Dashboard"
          title="Command every delivery from one console"
          description="A single pane of glass for projects, deployments, workflows, and live import telemetry — designed for operators who live in the dark."
        />

        <Reveal className="mt-16">
          <div className="gradient-border overflow-hidden p-[1px]">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-1px)] bg-[oklch(0.12_0.012_265/0.95)] backdrop-blur-md">
              {/* Browser chrome */}
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-destructive/70" />
                  <span className="size-3 rounded-full bg-chart-4/70" />
                  <span className="size-3 rounded-full bg-chart-3/70" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground">
                  <Search className="size-3.5" />
                  airbridge.internal / console
                  <span className="ml-2 flex size-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--brand-cyan)]" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground/50">SECURE · TLS 1.3</span>
                  <Bell className="size-4 text-muted-foreground/60" />
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-[180px_1fr]">
                {/* Sidebar */}
                <div className="hidden flex-col gap-1 border-r border-border/40 p-3 md:flex">
                  <div className="mb-2 px-3 py-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                      Navigation
                    </span>
                  </div>
                  {nav.map((n, i) => {
                    const Icon = n.icon
                    return (
                      <button
                        key={n.label}
                        type="button"
                        onClick={() => setActiveTab(i)}
                        className={cn(
                          'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors text-left',
                          activeTab === i
                            ? 'bg-cyan/10 text-cyan'
                            : 'text-muted-foreground hover:bg-card/60 hover:text-foreground',
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        {n.label}
                        {activeTab === i && (
                          <span className="ml-auto size-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--brand-cyan)]" />
                        )}
                      </button>
                    )
                  })}

                  <div className="mt-auto pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2">
                      <div className="size-6 rounded-full bg-gradient-to-br from-cyan to-violet" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-foreground/70">admin@gov</span>
                        <span className="font-mono text-[9px] text-muted-foreground/50">RBAC: admin</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main area */}
                <div className="flex flex-col gap-4 p-4 sm:p-5">
                  {/* Metric cards */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Active deployments', value: '128', delta: '+12', icon: Rocket, color: 'cyan' },
                      { label: 'Bundles imported', value: '4,392', delta: '+318', icon: Boxes, color: 'violet' },
                      { label: 'Avg import time', value: '2.4m', delta: '-18%', icon: TrendingUp, color: 'cyan' },
                    ].map((m) => {
                      const Icon = m.icon
                      return (
                        <div key={m.label} className="group rounded-xl border border-border/50 bg-card/40 p-4 transition-all hover:border-cyan/20">
                          <div className="flex items-start justify-between">
                            <p className="text-xs text-muted-foreground">{m.label}</p>
                            <Icon className={`size-4 ${m.color === 'cyan' ? 'text-cyan/50' : 'text-violet/50'}`} />
                          </div>
                          <div className="mt-2 flex items-end justify-between">
                            <span className="text-2xl font-semibold tracking-tight">{m.value}</span>
                            <span className={`font-mono text-xs ${m.color === 'cyan' ? 'text-cyan' : 'text-violet'}`}>{m.delta}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-[1.5fr_1fr]">
                    {/* Deployments table */}
                    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Live Deployments</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                          <span className="font-mono text-[10px] text-muted-foreground">live</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {deployments.map((d) => (
                          <div
                            key={d.name}
                            className="flex items-center justify-between rounded-lg border border-border/30 bg-background/30 px-3 py-2.5 transition-colors hover:border-border/60"
                          >
                            <div className="flex items-center gap-3">
                              <Server className="size-3.5 text-muted-foreground/50 shrink-0" />
                              <div className="flex flex-col min-w-0">
                                <span className="font-mono text-xs truncate">{d.name}</span>
                                <span className="font-mono text-[9px] text-muted-foreground/60 truncate">{d.env}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="hidden font-mono text-[10px] text-muted-foreground/50 sm:block">{d.version}</span>
                              <span
                                className={cn(
                                  'flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px]',
                                  d.tone === 'ok'
                                    ? 'bg-cyan/10 text-cyan'
                                    : d.tone === 'progress'
                                      ? 'bg-violet/10 text-violet'
                                      : d.tone === 'error'
                                        ? 'bg-destructive/10 text-destructive'
                                        : 'bg-muted/50 text-muted-foreground',
                                )}
                              >
                                <span className="size-1.5 rounded-full bg-current" />
                                {d.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right column: chart + import log */}
                    <div className="flex flex-col gap-3">
                      {/* Chart */}
                      <div className="rounded-xl border border-border/50 bg-card/30 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-sm font-semibold">Import throughput</h4>
                          <ArrowUpRight className="size-3.5 text-muted-foreground/40" />
                        </div>
                        <div className="flex h-24 items-end gap-1">
                          {bars.map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              className="flex-1 rounded-t bg-gradient-to-t from-cyan/20 to-cyan/80 transition-opacity hover:opacity-80"
                            />
                          ))}
                        </div>
                        <p className="mt-2 font-mono text-[10px] text-muted-foreground">layers/sec · last 12 min</p>
                      </div>

                      {/* Import log */}
                      <div className="rounded-xl border border-border/50 bg-card/30 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                          <h4 className="text-sm font-semibold">Import log</h4>
                        </div>
                        <div className="flex flex-col gap-1 font-mono text-[10px]">
                          {importLog.map((log, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="shrink-0 text-muted-foreground/40">{log.time}</span>
                              <span className={log.level === 'ok' ? 'text-chart-3' : 'text-muted-foreground/70'}>{log.msg}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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
