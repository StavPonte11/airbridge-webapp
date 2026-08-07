'use client'

import { motion } from 'motion/react'
import { Cloud, Cpu, Sparkles, Boxes, Lock, ServerCog, ShieldCheck, Package } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/ui/reveal'

export function Vision() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Vision"
          title={
            <>
              Factories belong <span className="gradient-text">outside</span>. Applications belong{' '}
              <span className="gradient-text">inside</span>.
            </>
          }
          description="The tools that build software thrive on connectivity, scale, and constant iteration. The applications that run in secure environments demand isolation and immutability. AirBridge splits the two and bridges the gap between them."
        />

        <Reveal className="mt-16">
          <div className="gradient-border overflow-hidden p-1">
            <div className="grid gap-0 rounded-[calc(var(--radius-xl)-1px)] bg-card/50 backdrop-blur-md lg:grid-cols-[1fr_auto_1fr]">
              {/* Outside */}
              <Zone
                tone="cyan"
                badge="Connected"
                title="The Software Factory"
                blurb="Lives in the cloud where builds are fast, tooling is current, and AI is state of the art."
                items={[
                  { icon: Cloud, label: 'Elastic cloud build' },
                  { icon: Sparkles, label: 'Latest AI + tooling' },
                  { icon: Boxes, label: 'Full dependency graph' },
                  { icon: Package, label: 'Produces the .aib bundle' },
                ]}
              />

              {/* The gap */}
              <div className="relative flex flex-col items-center justify-center gap-4 border-y border-border px-6 py-8 lg:border-x lg:border-y-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Air Gap
                </span>
                <div className="relative flex h-40 w-px items-center justify-center bg-gradient-to-b from-transparent via-border to-transparent">
                  <svg className="absolute h-40 w-8" viewBox="0 0 32 160" fill="none" aria-hidden="true">
                    <line
                      x1="16"
                      y1="0"
                      x2="16"
                      y2="160"
                      stroke="var(--brand-cyan)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      className="opacity-40"
                    />
                  </svg>
                  <motion.span
                    className="absolute size-9 rounded-xl border border-cyan/50 bg-cyan/15 text-cyan"
                    initial={{ y: -70, opacity: 0 }}
                    whileInView={{ y: 70, opacity: [0, 1, 1, 0] }}
                    viewport={{ once: false }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Package className="m-2 size-5" />
                  </motion.span>
                </div>
                <span className="max-w-[9rem] text-center text-xs text-muted-foreground">
                  Only a signed bundle crosses. Nothing else.
                </span>
              </div>

              {/* Inside */}
              <Zone
                tone="violet"
                badge="Isolated"
                title="The Secure Enclave"
                blurb="Runs disconnected. Receives only immutable, verified applications ready to deploy."
                items={[
                  { icon: Lock, label: 'Fully air-gapped' },
                  { icon: ShieldCheck, label: 'Signature + SBOM verified' },
                  { icon: ServerCog, label: 'Kubernetes-native deploy' },
                  { icon: Cpu, label: 'Reproducible at runtime' },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Zone({
  tone,
  badge,
  title,
  blurb,
  items,
}: {
  tone: 'cyan' | 'violet'
  badge: string
  title: string
  blurb: string
  items: { icon: React.ComponentType<{ className?: string }>; label: string }[]
}) {
  const cyan = tone === 'cyan'
  return (
    <div className="flex flex-col gap-5 p-7 sm:p-9">
      <span
        className={
          cyan
            ? 'w-fit rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan'
            : 'w-fit rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-violet'
        }
      >
        {badge}
      </span>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.label} className="flex items-center gap-3 text-sm">
              <span
                className={
                  cyan
                    ? 'flex size-8 items-center justify-center rounded-lg bg-cyan/10 text-cyan'
                    : 'flex size-8 items-center justify-center rounded-lg bg-violet/10 text-violet'
                }
              >
                <Icon className="size-4" />
              </span>
              {item.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
