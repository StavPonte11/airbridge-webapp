'use client'

import Link from 'next/link'
import { Rocket, FileCode2, Puzzle, Terminal, Network, Ship, FlaskConical, ArrowRight } from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const docs = [
  { title: 'Getting Started', desc: 'Install the CLI and ship your first bundle in minutes.', icon: Rocket },
  { title: 'Bundle Specification', desc: 'The complete .aib format reference and schema.', icon: FileCode2 },
  { title: 'Plugin SDK', desc: 'Build and publish custom artifact and deploy plugins.', icon: Puzzle },
  { title: 'REST API', desc: 'Automate every operation with the HTTP API.', icon: Terminal },
  { title: 'Architecture', desc: 'How the gateway, workers, and registry fit together.', icon: Network },
  { title: 'Deployment', desc: 'Install AirBridge into your air-gapped cluster.', icon: Ship },
  { title: 'Examples', desc: 'Reference bundles for common application patterns.', icon: FlaskConical },
]

export function DocsCards() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Documentation"
          title="Everything you need to get shipping"
          description="Deep, practical docs written for engineers who deploy into disconnected environments."
        />

        <StaggerGroup className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => {
            const Icon = doc.icon
            return (
              <StaggerItem key={doc.title}>
                <Link
                  href="/docs"
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-cyan/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-cyan">
                      <Icon className="size-5" />
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-1 text-base font-semibold">{doc.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{doc.desc}</p>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
