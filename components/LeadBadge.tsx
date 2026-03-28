import clsx from 'clsx'

interface LeadBadgeProps {
  score: number
  badge: 'hot' | 'warm' | 'cold'
  size?: 'sm' | 'md'
}

const CONFIG = {
  hot: { emoji: '🔥', label: 'Hot', className: 'badge-hot' },
  warm: { emoji: '🟡', label: 'Warm', className: 'badge-warm' },
  cold: { emoji: '❄️', label: 'Cold', className: 'badge-cold' },
}

export function LeadBadge({ score, badge, size = 'sm' }: LeadBadgeProps) {
  const { emoji, label, className } = CONFIG[badge]

  return (
    <div className="flex items-center gap-2">
      <span
        className={clsx(
          'inline-flex items-center gap-1 rounded-md font-mono font-medium',
          className,
          size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
        )}
      >
        {emoji} {label}
      </span>
      <span className="text-xs text-text-tertiary font-mono">{score}</span>
    </div>
  )
}
