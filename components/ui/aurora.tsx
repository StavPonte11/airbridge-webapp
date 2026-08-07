import { cn } from '@/lib/utils'

export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute -left-[10%] top-[-15%] size-[42rem] rounded-full bg-cyan/20 blur-[120px] animate-aurora" />
      <div
        className="absolute right-[-10%] top-[10%] size-[38rem] rounded-full bg-violet/20 blur-[120px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-20%] left-[30%] size-[36rem] rounded-full bg-cyan/10 blur-[130px] animate-aurora"
        style={{ animationDelay: '-11s' }}
      />
    </div>
  )
}
