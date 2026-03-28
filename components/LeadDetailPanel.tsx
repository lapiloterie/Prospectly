'use client'

import { useEffect, useState } from 'react'
import {
  X, MapPin, Phone, Globe, Star, Clock,
  Copy, Check, PhoneOff, ExternalLink,
} from 'lucide-react'
import type { Business } from '@/lib/types'
import { LeadBadge } from './LeadBadge'
import { OpportunityTags } from './OpportunityTags'
import { generateOutreachMessage } from '@/lib/scoring'
import clsx from 'clsx'

interface LeadDetailPanelProps {
  business: Business | null
  onClose: () => void
}

export function LeadDetailPanel({ business, onClose }: LeadDetailPanelProps) {
  const [copiedPhone, setCopiedPhone]     = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)

  // Close on Escape
  useEffect(() => {
    if (!business) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [business, onClose])

  // Reset copy state when business changes
  useEffect(() => {
    setCopiedPhone(false)
    setCopiedMessage(false)
  }, [business?.id])

  const copyPhone = async () => {
    if (!business?.phone) return
    await navigator.clipboard.writeText(business.phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const copyMessage = async () => {
    if (!business) return
    await navigator.clipboard.writeText(generateOutreachMessage(business))
    setCopiedMessage(true)
    setTimeout(() => setCopiedMessage(false), 2000)
  }

  const isOpen = business !== null

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/60 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={clsx(
          'fixed top-0 right-0 h-full z-50 bg-surface-1 border-l border-border',
          'w-full md:w-[480px]',
          'transform transition-transform duration-300 ease-in-out',
          'overflow-y-auto flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Détails du lead"
      >
        {business && (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-surface-1 border-b border-border px-6 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-bold text-text-primary text-lg leading-tight truncate">
                  {business.name}
                </h2>
                <p className="text-xs text-text-tertiary mt-0.5">{business.category}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-5 space-y-6">

              {/* Score + Opportunities */}
              <div className="space-y-3">
                <LeadBadge score={business.leadScore} badge={business.badge} />
                <OpportunityTags opportunities={business.opportunities} />
              </div>

              <hr className="border-border" />

              {/* Info */}
              <div className="space-y-3">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-text-tertiary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    {business.address || '—'}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                  {business.phone ? (
                    <button
                      onClick={copyPhone}
                      className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
                    >
                      <span className="font-mono">{business.phone}</span>
                      {copiedPhone ? (
                        <Check className="w-3.5 h-3.5 text-accent" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary" />
                      )}
                    </button>
                  ) : (
                    <span className="text-sm text-text-tertiary">—</span>
                  )}
                </div>

                {/* Website */}
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                  {business.website ? (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span className="truncate max-w-[320px]">
                        {business.website.replace(/^https?:\/\//, '')}
                      </span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  ) : (
                    <span className="no-website-badge text-xs px-2 py-0.5 rounded-md font-medium inline-flex items-center gap-1">
                      <PhoneOff className="w-3 h-3" />
                      Pas de site web
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span className={clsx(
                      'font-semibold text-sm',
                      business.rating >= 4.5 ? 'text-emerald-400' :
                      business.rating >= 4   ? 'text-text-primary' :
                      business.rating >= 3   ? 'text-yellow-400'   : 'text-red-400'
                    )}>
                      {business.rating.toFixed(1)}
                    </span>
                    <span className="text-text-tertiary text-xs">★</span>
                    <span className="text-text-tertiary text-xs">
                      ({business.reviews} avis)
                    </span>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              {business.openingHours && business.openingHours.length > 0 && (
                <>
                  <hr className="border-border" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      Horaires
                    </div>
                    <ul className="space-y-1">
                      {business.openingHours.map((line, i) => (
                        <li key={i} className="text-sm text-text-secondary">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <hr className="border-border" />

              {/* Auto message */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                    Message de prospection
                  </span>
                  <button
                    onClick={copyMessage}
                    className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-accent border border-border hover:border-accent/40 px-2.5 py-1.5 rounded-lg transition-all"
                  >
                    {copiedMessage ? (
                      <><Check className="w-3 h-3 text-accent" /> Copié !</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copier</>
                    )}
                  </button>
                </div>
                <div className="bg-surface-2 border border-border rounded-xl p-4 text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                  {generateOutreachMessage(business)}
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
