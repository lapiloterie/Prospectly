import type { Business } from '@/lib/types'

interface StatsBarProps {
  businesses: Business[]
}

export function StatsBar({ businesses }: StatsBarProps) {
  const total = businesses.length
  const noWebsite = businesses.filter(b => !b.website).length
  const hot = businesses.filter(b => b.badge === 'hot').length
  const warm = businesses.filter(b => b.badge === 'warm').length
  const avgScore = total > 0
    ? Math.round(businesses.reduce((s, b) => s + b.leadScore, 0) / total)
    : 0

  const stats = [
    { label: 'Leads trouvés', value: total, accent: false },
    { label: 'Sans site web', value: noWebsite, accent: false },
    { label: '🔥 Hot leads', value: hot, accent: true },
    { label: '🟡 Warm leads', value: warm, accent: false },
    { label: 'Score moyen', value: avgScore, accent: false },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map(({ label, value, accent }) => (
        <div
          key={label}
          className="bg-surface-2 border border-border rounded-xl px-4 py-3"
        >
          <p className="text-text-tertiary text-xs font-medium">{label}</p>
          <p className={`text-2xl font-bold mt-1 font-mono ${accent ? 'text-accent' : 'text-text-primary'}`}>
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}
