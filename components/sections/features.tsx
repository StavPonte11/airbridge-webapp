'use client'

import { motion } from 'motion/react'
import {
  Container, Puzzle, Scale, Boxes, Rocket, GitBranch,
  HardDrive, Gauge, ScrollText, Workflow, ShieldCheck, WifiOff,
} from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const features = [
  {
    icon: Container,
    title: 'OCI Native',
    desc: 'Every artifact is content-addressed and OCI-compliant end to end.',
    color: 'cyan',
    glow: 'from-cyan/20 to-transparent',
  },
  {
    icon: Puzzle,
    title: 'Plugin Architecture',
    desc: 'A thin core with sandboxed extensions for everything else.',
    color: 'violet',
    glow: 'from-violet/20 to-transparent',
  },
  {
    icon: Scale,
    title: 'Policy Engine',
    desc: 'Declarative rules gate what can be built, signed, and deployed.',
    color: 'cyan',
    glow: 'from-cyan/20 to-transparent',
  },
  {
    icon: Boxes,
    title: 'Registry Agnostic',
    desc: 'Harbor, ECR, GAR, Nexus — publish anywhere OCI is spoken.',
    color: 'violet',
    glow: 'from-violet/20 to-transparent',
  },
  {
    icon: Rocket,
    title: 'Deployment Agnostic',
    desc: 'Helm, Kustomize, ArgoCD, Flux — deploy however you like.',
    color: 'cyan',
    glow: 'from-cyan/20 to-transparent',
  },
  {
    icon: GitBranch,
    title: 'Git Integration',
    desc: 'GitOps-style delivery synced from any source provider.',
    color: 'violet',
    glow: 'from-violet/20 to-transparent',
  },
  {
    icon: HardDrive,
    title: 'Large Image Support',
    desc: 'Chunked, streaming transfer built for multi-gigabyte layers.',
    color: 'cyan',
    glow: 'from-cyan/20 to-transparent',
  },
  {
    icon: Gauge,
    title: 'Parallel Upload',
    desc: 'Concurrent, resumable pushes saturate your bandwidth.',
    color: 'violet',
    glow: 'from-violet/20 to-transparent',
  },
  {
    icon: ScrollText,
    title: 'Audit Logs',
    desc: 'Every action recorded with tamper-evident provenance.',
    color: 'cyan',
    glow: 'from-cyan/20 to-transparent',
  },
  {
    icon: Workflow,
    title: 'Workflow Engine',
    desc: 'Durable, resumable pipelines that survive restarts.',
    color: 'violet',
    glow: 'from-violet/20 to-transparent',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'RBAC, OIDC, LDAP, and signing baked into the core.',
    color: 'cyan',
    glow: 'from-cyan/20 to-transparent',
  },
  {
    icon: WifiOff,
    title: 'Offline First',
    desc: 'Designed from day one for zero-connectivity environments.',
    color: 'violet',
    glow: 'from-violet/20 to-transparent',
  },
]

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Features"
          title={<>Everything a delivery platform <span className="gradient-text">should be</span></>}
          description="Purpose-built primitives for teams shipping into the most constrained environments on earth."
        />

        <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            const isCyan = feature.color === 'cyan'
            return (
              <StaggerItem key={feature.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-all duration-500 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-16px_rgba(0,0,0,0.6)]">
                  {/* Glow blob on hover */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${feature.glow}`}
                  />
                  {/* Corner accent line */}
                  <div
                    className={`absolute right-0 top-0 h-px w-16 transition-all duration-500 group-hover:w-24 ${isCyan ? 'bg-gradient-to-l from-cyan/40 to-transparent' : 'bg-gradient-to-l from-violet/40 to-transparent'}`}
                  />
                  <div
                    className={`absolute right-0 top-0 h-16 w-px transition-all duration-500 group-hover:h-24 ${isCyan ? 'bg-gradient-to-b from-cyan/40 to-transparent' : 'bg-gradient-to-b from-violet/40 to-transparent'}`}
                  />

                  <span
                    className={`relative flex size-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                      isCyan
                        ? 'border-cyan/20 bg-cyan/10 text-cyan group-hover:border-cyan/50 group-hover:bg-cyan/20 group-hover:shadow-[0_0_20px_-4px_var(--brand-cyan)]'
                        : 'border-violet/20 bg-violet/10 text-violet group-hover:border-violet/50 group-hover:bg-violet/20 group-hover:shadow-[0_0_20px_-4px_var(--brand-violet)]'
                    }`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative mt-5 text-base font-semibold">{feature.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>

                  {/* Bottom tag */}
                  <div className="relative mt-4 flex items-center gap-1.5">
                    <span className={`size-1 rounded-full ${isCyan ? 'bg-cyan' : 'bg-violet'}`} />
                    <span className={`font-mono text-[10px] ${isCyan ? 'text-cyan/60' : 'text-violet/60'}`}>
                      {isCyan ? 'core · stable' : 'extensible · plugin'}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
