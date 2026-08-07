'use client'

import { Users, ScrollText, Building2, KeyRound, Scale, FileSignature, ListTree, Fingerprint } from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const badges = [
  { label: 'RBAC', icon: Users, desc: 'Granular role-based access control' },
  { label: 'Audit', icon: ScrollText, desc: 'Tamper-evident action logs' },
  { label: 'LDAP', icon: Building2, desc: 'Directory-backed identity' },
  { label: 'OIDC', icon: KeyRound, desc: 'Federated single sign-on' },
  { label: 'Policy Engine', icon: Scale, desc: 'Declarative delivery gates' },
  { label: 'Bundle Signing', icon: FileSignature, desc: 'Cosign / Sigstore trust' },
  { label: 'SBOM', icon: ListTree, desc: 'Complete component inventory' },
  { label: 'Provenance', icon: Fingerprint, desc: 'SLSA-aligned build attestation' },
]

export function Enterprise() {
  return (
    <section id="enterprise" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.15]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Enterprise & Defense"
          title="Compliance is not an afterthought"
          description="AirBridge is engineered for the most regulated environments on earth — with the controls security teams demand built into the core."
        />

        <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <StaggerItem key={badge.label}>
                <div className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-violet/30">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-violet transition-transform group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wide">
                    {badge.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{badge.desc}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
