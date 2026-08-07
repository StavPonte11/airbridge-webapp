'use client'

import { motion } from 'motion/react'
import { Users, ScrollText, Building2, KeyRound, Scale, FileSignature, ListTree, Fingerprint, ShieldCheck } from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const badges = [
  { label: 'RBAC', icon: Users, desc: 'Granular role-based access control with team hierarchy', color: 'cyan', detail: 'org → team → project' },
  { label: 'Audit', icon: ScrollText, desc: 'Tamper-evident, append-only action logs with retention', color: 'violet', detail: 'every action recorded' },
  { label: 'LDAP', icon: Building2, desc: 'Directory-backed identity with group sync', color: 'cyan', detail: 'Active Directory · LDAP' },
  { label: 'OIDC', icon: KeyRound, desc: 'Federated single sign-on with any IdP', color: 'violet', detail: 'Okta · Keycloak · ADFS' },
  { label: 'Policy Engine', icon: Scale, desc: 'Declarative delivery gates as code (Rego / CEL)', color: 'cyan', detail: 'OPA · CEL expressions' },
  { label: 'Bundle Signing', icon: FileSignature, desc: 'Cosign / Sigstore keyless trust with TSA', color: 'violet', detail: 'SLSA · Sigstore · TSA' },
  { label: 'SBOM', icon: ListTree, desc: 'Complete component inventory in SPDX / CycloneDX', color: 'cyan', detail: 'SPDX 2.3 · CycloneDX 1.5' },
  { label: 'Provenance', icon: Fingerprint, desc: 'SLSA-aligned build attestation chain', color: 'violet', detail: 'SLSA level 3 · in-toto' },
]

export function Enterprise() {
  return (
    <section id="enterprise" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* Dramatic background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/6 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Enterprise & Defense"
          title={<>Compliance is not <span className="gradient-text">an afterthought</span></>}
          description="AirBridge is engineered for the most regulated environments on earth — with the controls security teams demand built into the core, not bolted on after the fact."
        />

        {/* Trust banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {['FedRAMP Ready', 'FIPS 140-2', 'NIST 800-53', 'DoD IL2+', 'SOC 2 Type II'].map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/8 px-4 py-2 font-mono text-xs text-violet/80 backdrop-blur-sm"
            >
              <ShieldCheck className="size-3" />
              {cert}
            </span>
          ))}
        </motion.div>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => {
            const Icon = badge.icon
            const isCyan = badge.color === 'cyan'
            return (
              <StaggerItem key={badge.label}>
                <div
                  className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-400 hover:-translate-y-1 ${
                    isCyan
                      ? 'border-cyan/20 bg-card/40 hover:border-cyan/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)]'
                      : 'border-violet/20 bg-card/40 hover:border-violet/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {/* Corner glow */}
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 size-20 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                      isCyan ? 'bg-cyan/30' : 'bg-violet/30'
                    }`}
                  />

                  <span
                    className={`relative flex size-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                      isCyan
                        ? 'border-cyan/25 bg-cyan/10 text-cyan group-hover:border-cyan/50 group-hover:shadow-[0_0_16px_-4px_var(--brand-cyan)]'
                        : 'border-violet/25 bg-violet/10 text-violet group-hover:border-violet/50 group-hover:shadow-[0_0_16px_-4px_var(--brand-violet)]'
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>

                  <div className="relative flex flex-col gap-1.5">
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-wide">{badge.label}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{badge.desc}</p>
                    <span
                      className={`mt-1 font-mono text-[10px] ${isCyan ? 'text-cyan/60' : 'text-violet/60'}`}
                    >
                      {badge.detail}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card/40 px-6 py-4 backdrop-blur-sm">
            <ShieldCheck className="size-5 text-cyan" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Need a custom security evaluation?</span>
              <span className="font-mono text-xs text-muted-foreground">security@airbridge.dev · enterprise support available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
