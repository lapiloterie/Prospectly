import type { Opportunity } from '@/lib/types'
import clsx from 'clsx'

interface OpportunityTagsProps {
  opportunities: Opportunity[]
}

const OP_CONFIG: Record<Opportunity, { label: string; className: string }> = {
  no_website: {
    label: 'No website',
    className: 'no-website-badge',
  },
  low_rating: {
    label: 'Low rating',
    className: 'bg-orange-500/10 border border-orange-500/25 text-orange-400',
  },
  low_reviews: {
    label: 'Low reviews',
    className: 'bg-blue-500/10 border border-blue-500/25 text-blue-400',
  },
  high_potential: {
    label: '⚡ High potential',
    className: 'bg-purple-500/10 border border-purple-500/25 text-purple-400',
  },
}

export function OpportunityTags({ opportunities }: OpportunityTagsProps) {
  if (opportunities.length === 0) {
    return <span className="text-text-tertiary text-xs">—</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {opportunities.map((op) => {
        const { label, className } = OP_CONFIG[op]
        return (
          <span
            key={op}
            className={clsx('text-xs px-2 py-0.5 rounded-md font-medium whitespace-nowrap', className)}
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}
