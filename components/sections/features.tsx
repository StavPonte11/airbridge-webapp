'use client'

import {
  Container,
  Puzzle,
  Scale,
  Boxes,
  Rocket,
  GitBranch,
  HardDrive,
  Gauge,
  ScrollText,
  Workflow,
  ShieldCheck,
  WifiOff,
} from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const features = [
  { icon: Container, title: 'OCI Native', desc: 'Every artifact is content-addressed and OCI-compliant end to end.' },
  { icon: Puzzle, title: 'Plugin Architecture', desc: 'A thin core with sandboxed extensions for everything else.' },
  { icon: Scale, title: 'Policy Engine', desc: 'Declarative rules gate what can be built, signed, and deployed.' },
  { icon: Boxes, title: 'Registry Agnostic', desc: 'Harbor, ECR, GAR, Nexus — publish anywhere OCI is spoken.' },
  { icon: Rocket, title: 'Deployment Agnostic', desc: 'Helm, Kustomize, ArgoCD, Flux — deploy however you like.' },
  { icon: GitBranch, title: 'Git Integration', desc: 'GitOps-style delivery synced from any source provider.' },
  { icon: HardDrive, title: 'Large Image Support', desc: 'Chunked, streaming transfer built for multi-gigabyte layers.' },
  { icon: Gauge, title: 'Parallel Upload', desc: 'Concurrent, resumable pushes saturate your bandwidth.' },
  { icon: ScrollText, title: 'Audit Logs', desc: 'Every action recorded with tamper-evident provenance.' },
  { icon: Workflow, title: 'Workflow Engine', desc: 'Durable, resumable pipelines that survive restarts.' },
  { icon: ShieldCheck, title: 'Enterprise Security', desc: 'RBAC, OIDC, LDAP, and signing baked into the core.' },
  { icon: WifiOff, title: 'Offline First', desc: 'Designed from day one for zero-connectivity environments.' },
]

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything a delivery platform should be"
          description="Purpose-built primitives for teams shipping into the most constrained environments on earth."
        />

        <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={feature.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-cyan/30">
                  <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-cyan/0 blur-2xl transition-all duration-500 group-hover:bg-cyan/20" />
                  <span className="relative flex size-12 items-center justify-center rounded-xl border border-border bg-background text-cyan transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan/40">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative mt-5 text-base font-semibold">{feature.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
