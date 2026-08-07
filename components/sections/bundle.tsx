'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  FileText, Container, Ship, Settings2, ListTree, FileSignature, Map, BookOpen, Puzzle,
  Layers, Minimize2, ArrowRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const layers = [
  { name: 'manifest.yaml', icon: FileText, hint: 'Bundle metadata & versioning', color: 'cyan', size: '12 KB' },
  { name: 'OCI Images', icon: Container, hint: 'Content-addressed container layers', color: 'violet', size: '892 MB' },
  { name: 'Helm Charts', icon: Ship, hint: 'Templated Kubernetes resources', color: 'cyan', size: '240 KB' },
  { name: 'Configuration', icon: Settings2, hint: 'Environment values & secrets refs', color: 'violet', size: '18 KB' },
  { name: 'SBOM', icon: ListTree, hint: 'Full software bill of materials', color: 'cyan', size: '2.1 MB' },
  { name: 'Signatures', icon: FileSignature, hint: 'Cosign / Sigstore attestations', color: 'violet', size: '4 KB' },
  { name: 'Deployment Plan', icon: Map, hint: 'Ordered apply strategy', color: 'cyan', size: '88 KB' },
  { name: 'Documentation', icon: BookOpen, hint: 'Runbooks & release notes', color: 'violet', size: '340 KB' },
  { name: 'Plugins', icon: Puzzle, hint: 'Bundled extension handlers', color: 'cyan', size: '16 MB' },
]

const flow = [
  { label: 'Cloud Development', sub: 'Any CI factory', color: 'muted' },
  { label: '.aib Bundle', sub: 'Single immutable file', color: 'cyan' },
  { label: 'AirBridge', sub: 'Delivery engine', color: 'violet' },
  { label: 'K8s App', sub: 'Running inside', color: 'muted' },
]

export function Bundle() {
  const [exploded, setExploded] = useState(true)
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <section id="bundle" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 size-[30rem] rounded-full bg-violet/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 size-[24rem] rounded-full bg-cyan/6 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Meet the .aib Bundle"
          title={
            <>
              One file. One application.
              <br className="hidden sm:block" />{' '}
              <span className="gradient-text">Everything included.</span>
            </>
          }
          description="The AirBridge Bundle is a single, immutable, signed artifact that carries your entire application across the air gap. Every layer is content-addressed, verified, and reproducible."
        />

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setExploded((v) => !v)}
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:border-cyan/40 hover:shadow-[0_0_20px_-8px_var(--brand-cyan)]"
          >
            {exploded ? (
              <>
                <Minimize2 className="size-4" />
                Assemble bundle
              </>
            ) : (
              <>
                <Layers className="size-4" />
                Explode bundle
              </>
            )}
          </button>
        </div>

        {/* 3D exploded view + details panel */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* 3D stack */}
          <div className="relative mx-auto flex min-h-[34rem] max-w-lg flex-col items-center justify-center [perspective:1600px]">
            <div className="relative flex w-full flex-col items-center gap-2 [transform-style:preserve-3d]">
              {layers.map((layer, i) => {
                const Icon = layer.icon
                const mid = (layers.length - 1) / 2
                const offset = (i - mid) * 68
                const isCyan = layer.color === 'cyan'

                return (
                  <motion.div
                    key={layer.name}
                    initial={false}
                    animate={
                      exploded
                        ? { y: 0, rotateX: 50, rotateZ: -28, translateZ: -offset, opacity: 1, scale: activeLayer === i ? 1.04 : 1 }
                        : { y: (i - mid) * -2.5, rotateX: 50, rotateZ: -28, translateZ: 0, opacity: i === Math.round(mid) ? 1 : 0.8, scale: 1 }
                    }
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: exploded ? i * 0.035 : 0 }}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    className={cn(
                      'absolute flex w-72 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 backdrop-blur-md transition-shadow',
                      activeLayer === i
                        ? isCyan
                          ? 'border-cyan/60 bg-cyan/15 shadow-[0_8px_32px_-8px_var(--brand-cyan)]'
                          : 'border-violet/60 bg-violet/15 shadow-[0_8px_32px_-8px_var(--brand-violet)]'
                        : isCyan
                          ? 'border-cyan/25 bg-card/70'
                          : 'border-violet/30 bg-violet/[0.07]',
                    )}
                    style={{ boxShadow: activeLayer !== i ? '0 12px 36px -14px rgba(0,0,0,0.8)' : undefined }}
                  >
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        isCyan
                          ? 'border-cyan/35 bg-cyan/12 text-cyan'
                          : 'border-violet/40 bg-violet/15 text-violet',
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="font-mono text-xs font-medium">{layer.name}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground/60">{layer.size}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex flex-col gap-4 lg:pt-4">
            <div className="gradient-border overflow-hidden p-[1px]">
              <div className="rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--brand-cyan)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Bundle anatomy
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {layers.map((layer, i) => {
                    const Icon = layer.icon
                    const isCyan = layer.color === 'cyan'
                    return (
                      <div
                        key={layer.name}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                          activeLayer === i
                            ? isCyan
                              ? 'bg-cyan/10 text-cyan'
                              : 'bg-violet/10 text-violet'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                        onMouseEnter={() => setActiveLayer(i)}
                        onMouseLeave={() => setActiveLayer(null)}
                      >
                        <Icon className="size-3.5 shrink-0" />
                        <span className="flex-1 font-mono text-xs">{layer.name}</span>
                        <span className="font-mono text-[10px] opacity-60">{layer.size}</span>
                      </div>
                    )
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {activeLayer !== null && (
                    <motion.div
                      key={activeLayer}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 rounded-lg border border-border bg-background/40 p-3"
                    >
                      <p className="text-xs text-muted-foreground">{layers[activeLayer].hint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Total size badge */}
            <div className="flex items-center justify-between rounded-xl border border-cyan/20 bg-cyan/5 px-4 py-3">
              <span className="font-mono text-xs text-muted-foreground">Total bundle size</span>
              <span className="font-mono text-sm font-semibold text-cyan">~1.2 GB</span>
            </div>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          {flow.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-xl border px-3 py-2 text-center font-mono sm:px-4',
                  step.color === 'cyan'
                    ? 'border-cyan/40 bg-cyan/8 text-cyan'
                    : step.color === 'violet'
                      ? 'border-violet/40 bg-violet/8 text-violet'
                      : 'border-border bg-card/50 text-muted-foreground',
                )}
              >
                <span className="text-xs font-medium">{step.label}</span>
                <span className="text-[10px] opacity-60">{step.sub}</span>
              </motion.div>
              {i < flow.length - 1 && (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
