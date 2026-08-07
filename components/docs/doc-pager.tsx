import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAdjacent } from '@/lib/docs-nav'

export function DocPager({ slug }: { slug: string }) {
  const { prev, next } = getAdjacent(slug)

  return (
    <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.slug}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 transition-colors hover:border-cyan/40"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" />
            Previous
          </span>
          <span className="font-medium text-foreground">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.slug}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-cyan/40 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5" />
          </span>
          <span className="font-medium text-foreground">{next.title}</span>
        </Link>
      ) : null}
    </div>
  )
}
