import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="relative flex size-8 items-center justify-center">
        <svg viewBox="0 0 32 32" fill="none" className="size-8" aria-hidden="true">
          <defs>
            <linearGradient id="abLogo" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--brand-cyan)" />
              <stop offset="1" stopColor="var(--brand-violet)" />
            </linearGradient>
          </defs>
          <path
            d="M16 2.5 27.5 9v14L16 29.5 4.5 23V9L16 2.5Z"
            stroke="url(#abLogo)"
            strokeWidth="1.5"
            className="opacity-60"
          />
          <path
            d="M9 21 16 8l7 13M11.5 17.5h9"
            stroke="url(#abLogo)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Air<span className="text-muted-foreground">Bridge</span>
      </span>
    </div>
  )
}
