'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Rocket, FileCode2, Puzzle, Terminal, Network, Ship, FlaskConical, ArrowRight } from 'lucide-react'
import { SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui/reveal'

const docs = [
  {
    title: 'Getting Started',
    desc: 'Install the CLI and ship your first bundle in minutes.',
    icon: Rocket,
    color: 'cyan',
    tag: '5 min read',
  },
  {
    title: 'Bundle Specification',
    desc: 'The complete .aib format reference and schema.',
    icon: FileCode2,
    color: 'violet',
    tag: 'Reference',
  },
  {
    title: 'Plugin SDK',
    desc: 'Build and publish custom artifact and deploy plugins.',
    icon: Puzzle,
    color: 'cyan',
    tag: 'Advanced',
  },
  {
    title: 'REST API',
    desc: 'Automate every operation with the HTTP + gRPC API.',
    icon: Terminal,
    color: 'violet',
    tag: 'Reference',
  },
  {
    title: 'Architecture',
    desc: 'How the gateway, workers, and registry fit together.',
    icon: Network,
    color: 'cyan',
    tag: '10 min read',
  },
  {
    title: 'Deployment Guide',
    desc: 'Install AirBridge into your air-gapped Kubernetes cluster.',
    icon: Ship,
    color: 'violet',
    tag: 'Operations',
  },
  {
    title: 'Examples',
    desc: 'Reference bundles for common application patterns.',
    icon: FlaskConical,
    color: 'cyan',
    tag: 'Practical',
  },
]

export function DocsCards() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 size-[40rem] -translate-x-1/2 rounded-full bg-violet/5 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Documentation"
          title={<>Everything you need to <span className="gradient-text">get shipping</span></>}
          description="Deep, practical docs written for engineers who deploy into disconnected environments. No fluff, just signal."
        />

        <StaggerGroup className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc, i) => {
            const Icon = doc.icon
            const isCyan = doc.color === 'cyan'

            return (
              <StaggerItem key={doc.title}>
                <Link
                  href="/docs"
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-16px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`flex size-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                        isCyan
                          ? 'border-cyan/20 bg-cyan/10 text-cyan group-hover:border-cyan/50 group-hover:shadow-[0_0_16px_-4px_var(--brand-cyan)]'
                          : 'border-violet/20 bg-violet/10 text-violet group-hover:border-violet/50 group-hover:shadow-[0_0_16px_-4px_var(--brand-violet)]'
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground/50">{doc.tag}</span>
                      <ArrowRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <h3 className="text-base font-semibold">{doc.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{doc.desc}</p>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        {/* View all docs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:border-cyan/40"
          >
            Browse all documentation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
