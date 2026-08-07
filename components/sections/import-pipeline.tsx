'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Upload, ScanSearch, ShieldCheck, Wand2, UploadCloud, Rocket, BadgeCheck } from 'lucide-react'
import { SectionHeading } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Upload', icon: Upload, detail: 'Stream the .aib into the gateway' },
  { label: 'Detect', icon: ScanSearch, detail: 'Identify artifacts & plugins' },
  { label: 'Validate', icon: ShieldCheck, detail: 'Verify signatures & policy' },
  { label: 'Normalize', icon: Wand2, detail: 'Rewrite refs for the target' },
  { label: 'Publish', icon: UploadCloud, detail: 'Push layers to the registry' },
  { label: 'Deploy', icon: Rocket, detail: 'Apply to the cluster' },
  { label: 'Verify', icon: BadgeCheck, detail: 'Confirm running state' },
]

export function ImportPipeline() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= steps.length ? 0 : p + 1))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Import Pipeline"
          title="From upload to running in seven steps"
          description="Every bundle flows through a deterministic, fully-audited pipeline. Watch it run."
        />

        <div className="mt-16">
          <div className="gradient-border overflow-hidden p-1">
            <div className="rounded-[calc(var(--radius-xl)-1px)] bg-card/60 p-6 backdrop-blur-md sm:p-10">
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                {/* connector line for desktop */}
                <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border lg:block">
                  <motion.div
                    className="h-px bg-gradient-to-r from-cyan to-violet"
                    animate={{ width: `${(progress / steps.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </div>

                {steps.map((step, i) => {
                  const Icon = step.icon
                  const done = i < progress
                  const current = i === progress - 1
                  return (
                    <div
                      key={step.label}
                      className="relative z-10 flex items-center gap-4 lg:w-full lg:flex-col lg:text-center"
                    >
                      <motion.span
                        animate={{
                          scale: current ? 1.12 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                        className={cn(
                          'flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-500',
                          done
                            ? 'border-cyan/50 bg-cyan/15 text-cyan'
                            : 'border-border bg-background text-muted-foreground',
                          current && 'glow-cyan',
                        )}
                      >
                        <Icon className="size-5" />
                      </motion.span>
                      <div className="flex flex-col lg:items-center">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-semibold">{step.label}</span>
                        <span className="mt-0.5 max-w-[10rem] text-xs text-muted-foreground">
                          {step.detail}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-2 animate-pulse rounded-full bg-cyan" />
                  {progress >= steps.length
                    ? 'application running · verified'
                    : `processing: ${steps[Math.max(0, progress - 1)]?.label.toLowerCase() ?? 'idle'}`}
                </span>
                <span>{Math.round((progress / steps.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
