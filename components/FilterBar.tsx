'use client'

import { SlidersHorizontal } from 'lucide-react'
import type { FilterState } from '@/lib/types'
import clsx from 'clsx'

interface FilterBarProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  total: number
  filtered: number
}

const FILTERS: { key: keyof FilterState; label: string; color: string }[] = [
  { key: 'noWebsite', label: 'Sans site web', color: 'text-accent border-accent/30 bg-accent/8' },
  { key: 'lowRating', label: 'Rating < 4', color: 'text-orange-400 border-orange-400/30 bg-orange-400/8' },
  { key: 'lowReviews', label: 'Avis < 20', color: 'text-blue-400 border-blue-400/30 bg-blue-400/8' },
]

export function FilterBar({ filters, onChange, total, filtered }: FilterBarProps) {
  const toggle = (key: keyof FilterState) => {
    onChange({ ...filters, [key]: !filters[key] })
  }

  const activeCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-text-tertiary text-xs font-medium">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filtres</span>
        {activeCount > 0 && (
          <span className="bg-accent text-surface-0 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
            {activeCount}
          </span>
        )}
      </div>

      <div className="w-px h-4 bg-border" />

      {FILTERS.map(({ key, label, color }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          className={clsx(
            'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all',
            filters[key]
              ? color
              : 'text-text-tertiary border-border hover:border-border-strong hover:text-text-secondary'
          )}
        >
          <span className={clsx('w-1.5 h-1.5 rounded-full', filters[key] ? 'bg-current' : 'bg-text-tertiary')} />
          {label}
        </button>
      ))}

      {activeCount > 0 && (
        <>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs text-text-tertiary">
            {filtered} / {total} leads
          </span>
          <button
            onClick={() => onChange({ noWebsite: false, lowRating: false, lowReviews: false })}
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Réinitialiser
          </button>
        </>
      )}
    </div>
  )
}
