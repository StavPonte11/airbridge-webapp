'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  FileText,
  Container,
  Ship,
  Settings2,
  ListTree,
  FileSignature,
  Map,
  BookOpen,
  Puzzle,
  Layers,
  Minimize2,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const layers = [
  { name: 'manifest.yaml', icon: FileText, hint: 'Bundle metadata & versioning' },
  { name: 'OCI Images', icon: Container, hint: 'Content-addressed container layers' },
  { name: 'Helm Charts', icon: Ship, hint: 'Templated Kubernetes resources' },
  { name: 'Configuration', icon: Settings2, hint: 'Environment values & secrets refs' },
  { name: 'SBOM', icon: ListTree, hint: 'Full software bill of materials' },
  { name: 'Signatures', icon: FileSignature, hint: 'Cosign / Sigstore attestations' },
  { name: 'Deployment Plan', icon: Map, hint: 'Ordered apply strategy' },
  { name: 'Documentation', icon: BookOpen, hint: 'Runbooks & release notes' },
  { name: 'Plugins', icon: Puzzle, hint: 'Bundled extension handlers' },
]

export function Bundle() {
  const [exploded, setExploded] = useState(true)

  return (
    <section id="bundle" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-0 size-[36rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Meet the .aib Bundle"
          title={
            <>
              One file. One application.
              <br className="hidden sm:block" /> <span className="gradient-text">Everything included.</span>
            </>
          }
          description="The AirBridge Bundle is a single, immutable, signed artifact that carries your entire application across the gap. Explode it to see what's inside."
        />

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setExploded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2.5 text-sm font-medium backdrop-blur-md transition-colors hover:border-cyan/40"
          >
            {exploded ? <Minimize2 className="size-4" /> : <Layers className="size-4" />}
            {exploded ? 'Assemble bundle' : 'Explode bundle'}
          </button>
        </div>

        <div className="relative mx-auto mt-10 flex min-h-[30rem] max-w-md flex-col items-center justify-center [perspective:1400px]">
          <div className="relative flex w-full flex-col items-center gap-2 [transform-style:preserve-3d]">
            {layers.map((layer, i) => {
              const Icon = layer.icon
              const mid = (layers.length - 1) / 2
              const offset = (i - mid) * 62
              return (
                <motion.div
                  key={layer.name}
                  initial={false}
                  animate={
                    exploded
                      ? { y: 0, rotateX: 52, rotateZ: -32, translateZ: -offset, opacity: 1 }
                      : { y: (i - mid) * -2, rotateX: 52, rotateZ: -32, translateZ: 0, opacity: i === Math.round(mid) ? 1 : 0.85 }
                  }
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: exploded ? i * 0.03 : 0 }}
                  className={cn(
                    'group absolute flex w-64 items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-md',
                    i === 5
                      ? 'border-violet/40 bg-violet/10'
                      : 'border-cyan/25 bg-card/70',
                  )}
                  style={{ boxShadow: '0 10px 30px -12px rgba(0,0,0,0.7)' }}
                >
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-lg border',
                      i === 5 ? 'border-violet/40 bg-violet/15 text-violet' : 'border-cyan/30 bg-cyan/10 text-cyan',
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="font-mono text-xs font-medium">{layer.name}</span>
                </motion.div>
              )
            })}
          </div>

          {/* labels list revealed when exploded */}
          <motion.div
            animate={{ opacity: exploded ? 1 : 0, x: exploded ? 0 : -10 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-[13px] lg:flex"
          >
            {layers.map((layer) => (
              <span key={layer.name} className="text-right text-[11px] text-muted-foreground">
                {layer.hint}
              </span>
            ))}
          </motion.div>
        </div>

        <BundleFlow />
      </div>
    </section>
  )
}

const flow = ['Cloud Development', '.aib Bundle', 'AirBridge', 'Running K8s App']

function BundleFlow() {
  return (
    <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
      {flow.map((step, i) => (
        <div key={step} className="flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'rounded-full border px-4 py-2 font-mono text-xs',
              i === 1
                ? 'border-cyan/40 bg-cyan/10 text-cyan'
                : i === 3
                  ? 'border-violet/40 bg-violet/10 text-violet'
                  : 'border-border bg-card/50 text-muted-foreground',
            )}
          >
            {step}
          </motion.span>
          {i < flow.length - 1 ? <span className="text-muted-foreground/50">→</span> : null}
        </div>
      ))}
    </div>
  )
}
