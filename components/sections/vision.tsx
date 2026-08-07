'use client'

import type React from 'react'
import { motion } from 'motion/react'
import { Cloud, Cpu, Sparkles, Boxes, Lock, ServerCog, ShieldCheck, Package, ArrowRight } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/ui/reveal'

export function Vision() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-20" />
      {/* Dramatic center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Vision"
          title={
            <>
              Factories belong{' '}
              <span className="gradient-text">outside</span>. Applications belong{' '}
              <span className="gradient-text">inside</span>.
            </>
          }
          description="The tools that build software thrive on connectivity, scale, and constant iteration. The applications that run in secure environments demand isolation and immutability. AirBridge splits the two and bridges the gap."
        />

        <Reveal className="mt-16">
          <div className="gradient-border overflow-hidden p-[1px]">
            <div className="grid gap-0 rounded-[calc(var(--radius-xl)-1px)] bg-card/50 backdrop-blur-md lg:grid-cols-[1fr_auto_1fr]">
              {/* Outside — Connected */}
              <Zone
                tone="cyan"
                badge="Connected"
                status="Online"
                title="The Software Factory"
                blurb="Lives in the cloud where builds are fast, tooling is current, and AI is state of the art. No constraints."
                items={[
                  { icon: Cloud, label: 'Elastic cloud build farm' },
                  { icon: Sparkles, label: 'Latest AI models & tooling' },
                  { icon: Boxes, label: 'Full dependency graph access' },
                  { icon: Package, label: 'Produces the .aib bundle' },
                ]}
              />

              {/* Air Gap separator */}
              <div className="relative flex flex-col items-center justify-center gap-4 border-y border-border/50 px-6 py-10 lg:border-x lg:border-y-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  Air Gap
                </span>

                {/* Animated crossing */}
                <div className="relative flex h-44 w-px flex-col items-center justify-center bg-gradient-to-b from-transparent via-border/50 to-transparent">
                  <svg className="absolute h-44 w-10" viewBox="0 0 40 176" fill="none" aria-hidden="true">
                    <line
                      x1="20" y1="0" x2="20" y2="176"
                      stroke="var(--brand-cyan)"
                      strokeWidth="1.5"
                      strokeDasharray="4 8"
                      strokeOpacity="0.3"
                    />
                  </svg>

                  {/* Traveling bundle animation */}
                  <motion.div
                    className="absolute flex size-10 items-center justify-center rounded-xl border border-cyan/50 bg-cyan/15 text-cyan"
                    initial={{ y: -80, opacity: 0 }}
                    whileInView={{ y: [null, 80], opacity: [0, 1, 1, 0] }}
                    viewport={{ once: false }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                  >
                    <Package className="size-5" />
                  </motion.div>
                </div>

                {/* Gap label */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="max-w-[9rem] text-xs text-muted-foreground">
                    Only a signed, verified bundle crosses.
                  </span>
                  <span className="font-mono text-[10px] text-cyan/60">Nothing else.</span>
                </div>

                {/* Arrow indicators */}
                <div className="flex items-center gap-2">
                  <ArrowRight className="size-3 rotate-90 text-cyan/40" />
                  <span className="font-mono text-[9px] text-muted-foreground/40">one way</span>
                </div>
              </div>

              {/* Inside — Isolated */}
              <Zone
                tone="violet"
                badge="Isolated"
                status="Air-Gapped"
                title="The Secure Enclave"
                blurb="Runs fully disconnected. Receives only immutable, verified applications ready to deploy. Zero internet access."
                items={[
                  { icon: Lock, label: 'Fully air-gapped network' },
                  { icon: ShieldCheck, label: 'Signature + SBOM verified' },
                  { icon: ServerCog, label: 'Kubernetes-native deploy' },
                  { icon: Cpu, label: 'Reproducible at runtime' },
                ]}
              />
            </div>
          </div>
        </Reveal>

        {/* Philosophy callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <blockquote className="max-w-2xl text-center text-lg font-light italic text-muted-foreground">
            "Build with the full power of the cloud. Deploy with the security of isolation.{' '}
            <span className="text-foreground not-italic font-medium">Never compromise on either.</span>"
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

function Zone({
  tone, badge, status, title, blurb, items,
}: {
  tone: 'cyan' | 'violet'
  badge: string
  status: string
  title: string
  blurb: string
  items: { icon: React.ComponentType<{ className?: string }>; label: string }[]
}) {
  const cyan = tone === 'cyan'
  return (
    <div className="flex flex-col gap-5 p-7 sm:p-9">
      <div className="flex items-center gap-2">
        <span
          className={
            cyan
              ? 'rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan'
              : 'rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-violet'
          }
        >
          {badge}
        </span>
        <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/50">
          <span className={`size-1.5 rounded-full ${cyan ? 'bg-cyan animate-pulse' : 'bg-violet/50'}`} />
          {status}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: cyan ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 text-sm"
            >
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
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
