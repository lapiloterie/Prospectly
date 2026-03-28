'use client'

import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Globe, PhoneOff, Copy, Check, MessageSquare, Phone } from 'lucide-react'
import type { Business, SortField, SortDir } from '@/lib/types'
import { LeadBadge } from './LeadBadge'
import { OpportunityTags } from './OpportunityTags'
import { SkeletonTable } from './SkeletonTable'
import clsx from 'clsx'

interface ResultsTableProps {
  businesses: Business[]
  loading: boolean
  onOpenMessage: (b: Business) => void
  onOpenPanel?: (b: Business) => void
}

type CopiedState = { id: string; type: 'phone' | 'msg' } | null

export function ResultsTable({ businesses, loading, onOpenMessage, onOpenPanel }: ResultsTableProps) {
  const [sortField, setSortField] = useState<SortField>('leadScore')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [copied, setCopied] = useState<CopiedState>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const sorted = [...businesses].sort((a, b) => {
    let va: string | number = a[sortField]
    let vb: string | number = b[sortField]
    if (typeof va === 'string') va = va.toLowerCase()
    if (typeof vb === 'string') vb = vb.toLowerCase()
    if (va < vb) return sortDir === 'asc' ? -1 : 1
    if (va > vb) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const copyPhone = async (b: Business) => {
    if (!b.phone) return
    await navigator.clipboard.writeText(b.phone)
    setCopied({ id: b.id, type: 'phone' })
    setTimeout(() => setCopied(null), 2000)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-30" />
    return sortDir === 'asc'
      ? <ArrowUp className="w-3 h-3 text-accent" />
      : <ArrowDown className="w-3 h-3 text-accent" />
  }

  const SortTh = ({ field, label, className = '' }: { field: SortField; label: string; className?: string }) => (
    <th
      onClick={() => handleSort(field)}
      className={clsx(
        'px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider cursor-pointer select-none whitespace-nowrap group',
        className
      )}
    >
      <div className="flex items-center gap-1.5 hover:text-text-secondary transition-colors">
        {label}
        <SortIcon field={field} />
      </div>
    </th>
  )

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface-1 border-b border-border">
          <tr>
            <SortTh field="name" label="Entreprise" />
            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider whitespace-nowrap">Téléphone</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider whitespace-nowrap">Site Web</th>
            <SortTh field="rating" label="Rating" />
            <SortTh field="reviews" label="Avis" />
            <SortTh field="leadScore" label="Score" />
            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider whitespace-nowrap">Opportunités</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider whitespace-nowrap">Actions</th>
          </tr>
        </thead>

        {loading ? (
          <SkeletonTable />
        ) : (
          <tbody className="divide-y divide-border-subtle">
            {sorted.map((b, i) => (
              <tr
                key={b.id}
                onClick={() => onOpenPanel?.(b)}
                className={clsx(
                  'table-row-hover transition-colors',
                  onOpenPanel && 'cursor-pointer'
                )}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Name + city */}
                <td className="px-4 py-3.5">
                  <div className="font-medium text-text-primary">{b.name}</div>
                  <div className="text-xs text-text-tertiary mt-0.5 flex items-center gap-1">
                    <span>{b.city}</span>
                    <span>·</span>
                    <span className="text-text-tertiary/70">{b.category}</span>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 py-3.5">
                  {b.phone ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); copyPhone(b) }}
                      className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors group"
                    >
                      <span className="font-mono text-xs">{b.phone}</span>
                      {copied?.id === b.id && copied.type === 'phone' ? (
                        <Check className="w-3 h-3 text-accent" />
                      ) : (
                        <Phone className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary" />
                      )}
                    </button>
                  ) : (
                    <span className="text-text-tertiary text-xs">—</span>
                  )}
                </td>

                {/* Website */}
                <td className="px-4 py-3.5">
                  {b.website ? (
                    <a
                      href={b.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs"
                    >
                      <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate max-w-[120px]">{b.website.replace(/^https?:\/\//, '')}</span>
                    </a>
                  ) : (
                    <span className="no-website-badge text-xs px-2 py-0.5 rounded-md font-medium inline-flex items-center gap-1">
                      <PhoneOff className="w-3 h-3" />
                      No website
                    </span>
                  )}
                </td>

                {/* Rating */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <span className={clsx(
                      'text-sm font-semibold',
                      b.rating >= 4.5 ? 'text-emerald-400' :
                      b.rating >= 4 ? 'text-text-primary' :
                      b.rating >= 3 ? 'text-yellow-400' : 'text-red-400'
                    )}>
                      {b.rating.toFixed(1)}
                    </span>
                    <span className="text-text-tertiary text-xs">★</span>
                  </div>
                </td>

                {/* Reviews */}
                <td className="px-4 py-3.5">
                  <span className={clsx(
                    'font-mono text-sm',
                    b.reviews < 20 ? 'text-blue-400' : 'text-text-secondary'
                  )}>
                    {b.reviews}
                  </span>
                </td>

                {/* Score */}
                <td className="px-4 py-3.5">
                  <LeadBadge score={b.leadScore} badge={b.badge} />
                </td>

                {/* Opportunities */}
                <td className="px-4 py-3.5 max-w-[200px]">
                  <OpportunityTags opportunities={b.opportunities} />
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenMessage(b) }}
                    className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-accent border border-border hover:border-accent/40 px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap"
                  >
                    <MessageSquare className="w-3 h-3" />
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {!loading && businesses.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-text-secondary text-sm font-medium">Aucun lead ne correspond aux filtres</p>
          <p className="text-text-tertiary text-xs mt-1">Modifiez vos filtres pour afficher plus de résultats</p>
        </div>
      )}
    </div>
  )
}
