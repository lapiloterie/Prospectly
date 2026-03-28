import { Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-surface-1/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-surface-0" />
          </div>
          <span className="font-bold text-text-primary tracking-tight">Prospectly</span>
          <span className="text-text-tertiary text-xs border border-border px-2 py-0.5 rounded-full font-mono">beta</span>
        </div>

        <nav className="flex items-center gap-4">
          <span className="text-text-tertiary text-xs">Lead Gen for Web Agencies</span>
        </nav>
      </div>
    </header>
  )
}
