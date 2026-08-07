'use client'

import { useState, type ReactNode } from 'react'
import { Check, Copy, Info, AlertTriangle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DocTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="mb-10 border-b border-border pb-8">
      {eyebrow ? (
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">{eyebrow}</span>
      ) : null}
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </header>
  )
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="group mt-14 scroll-mt-28 text-xl font-semibold tracking-tight sm:text-2xl">
      <a href={`#${id}`} className="inline-flex items-center gap-2">
        {children}
        <span className="text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </h2>
  )
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-9 scroll-mt-28 text-base font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="mt-4 flex flex-col gap-2.5 text-muted-foreground">{children}</ul>
}

export function Li({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed">
      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan" />
      <span>{children}</span>
    </li>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  )
}

const calloutStyles = {
  info: { icon: Info, cls: 'border-cyan/30 bg-cyan/[0.06]', iconCls: 'text-cyan' },
  warning: { icon: AlertTriangle, cls: 'border-amber/40 bg-amber/[0.06]', iconCls: 'text-amber' },
  tip: { icon: Lightbulb, cls: 'border-violet/30 bg-violet/[0.06]', iconCls: 'text-violet' },
}

export function Callout({ type = 'info', children }: { type?: keyof typeof calloutStyles; children: ReactNode }) {
  const { icon: Icon, cls, iconCls } = calloutStyles[type]
  return (
    <div className={cn('mt-6 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed', cls)}>
      <Icon className={cn('mt-0.5 size-4 shrink-0', iconCls)} />
      <div className="text-muted-foreground [&_strong]:text-foreground">{children}</div>
    </div>
  )
}

export function CodeBlock({ code, lang = 'bash', filename }: { code: string; lang?: string; filename?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-[oklch(0.16_0.012_255)]">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{filename ?? lang}</span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5 text-cyan" /> : <Copy className="size-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  )
}
