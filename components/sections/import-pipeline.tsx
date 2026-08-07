'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Upload, ScanSearch, ShieldCheck, Wand2, UploadCloud, Rocket, BadgeCheck, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const steps = [
  {
    label: 'Upload',
    icon: Upload,
    detail: 'Stream the .aib into the gateway via chunked HTTP/2 with resumable upload support.',
    metric: '1.2 GB/min',
    color: 'cyan',
  },
  {
    label: 'Detect',
    icon: ScanSearch,
    detail: 'Identify all artifact types, plugins required, and dependency graph from the manifest.',
    metric: 'Auto-detect',
    color: 'cyan',
  },
  {
    label: 'Validate',
    icon: ShieldCheck,
    detail: 'Verify bundle signatures (Cosign), check SBOM completeness, and evaluate policy rules.',
    metric: 'Policy gate',
    color: 'violet',
  },
  {
    label: 'Normalize',
    icon: Wand2,
    detail: 'Rewrite image references, Helm values, and configuration for the target environment.',
    metric: 'Env-aware',
    color: 'cyan',
  },
  {
    label: 'Publish',
    icon: UploadCloud,
    detail: 'Push all OCI layers to the internal registry with content-addressed deduplication.',
    metric: 'OCI push',
    color: 'cyan',
  },
  {
    label: 'Deploy',
    icon: Rocket,
    detail: 'Apply the deployment plan to the Kubernetes cluster via the configured deployer plugin.',
    metric: 'K8s apply',
    color: 'violet',
  },
  {
    label: 'Verify',
    icon: BadgeCheck,
    detail: 'Confirm all pods are running and healthy. Emit audit event and notify on success.',
    metric: 'Health check',
    color: 'cyan',
  },
]

export function ImportPipeline() {
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setProgress((p) => (p >= steps.length ? 0 : p + 1))
    }, 1000)
    return () => clearInterval(id)
  }, [paused])

  const activeStep = steps[Math.max(0, progress - 1)]

  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dotted-bg opacity-20" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Import Pipeline"
          title={<>From upload to running <span className="gradient-text">in seven steps</span></>}
          description="Every bundle flows through a deterministic, fully-audited pipeline. Each step is resumable, retryable, and observable in real time."
        />

        <div className="mt-16">
          <div className="gradient-border overflow-hidden p-[1px]">
            <div className="rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-6 backdrop-blur-md sm:p-10">
              {/* Pipeline steps */}
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                {/* Connector line */}
                <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border/40 lg:block">
                  <motion.div
                    className="h-px bg-gradient-to-r from-cyan to-violet"
                    animate={{ width: `${Math.min((progress / steps.length) * 100, 100)}%` }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </div>

                {steps.map((step, i) => {
                  const Icon = step.icon
                  const done = i < progress
                  const current = i === progress - 1
                  const isCyan = step.color === 'cyan'

                  return (
                    <div
                      key={step.label}
                      className="relative z-10 flex cursor-pointer items-center gap-4 lg:w-full lg:flex-col lg:text-center"
                      onMouseEnter={() => { setPaused(true); setProgress(i + 1) }}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <motion.span
                        animate={{ scale: current ? 1.15 : 1 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          'relative flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500',
                          done
                            ? isCyan
                              ? 'border-cyan/50 bg-cyan/15 text-cyan'
                              : 'border-violet/50 bg-violet/15 text-violet'
                            : 'border-border bg-background text-muted-foreground',
                          current && (isCyan
                            ? 'shadow-[0_0_20px_-4px_var(--brand-cyan)]'
                            : 'shadow-[0_0_20px_-4px_var(--brand-violet)]'),
                        )}
                      >
                        <Icon className="size-5" />
                        {current && (
                          <motion.span
                            className={`absolute inset-0 rounded-2xl border-2 ${isCyan ? 'border-cyan' : 'border-violet'}`}
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.span>
                      <div className="flex flex-col lg:items-center">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-sm font-semibold transition-colors duration-300 ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </span>
                        <span className={`mt-0.5 font-mono text-[10px] transition-colors duration-300 ${done ? (isCyan ? 'text-cyan/70' : 'text-violet/70') : 'text-muted-foreground/40'}`}>
                          {step.metric}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Active step detail */}
              <AnimatePresence mode="wait">
                {progress > 0 && progress <= steps.length && (
                  <motion.div
                    key={progress}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 flex items-center gap-3 rounded-xl border border-border/50 bg-background/30 px-4 py-3"
                  >
                    <ChevronRight className="size-4 shrink-0 text-cyan" />
                    <p className="text-sm text-muted-foreground">{activeStep?.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${progress >= steps.length ? 'bg-cyan' : 'animate-pulse bg-cyan'}`} />
                  {progress >= steps.length
                    ? '✓ Application running · All steps verified'
                    : `Processing: ${steps[Math.max(0, progress - 1)]?.label.toLowerCase() ?? 'idle'}`}
                </span>
                <span className="tabular-nums">{Math.round((progress / steps.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
