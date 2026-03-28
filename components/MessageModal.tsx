'use client'

import { useState, useEffect } from 'react'
import { X, Copy, Check } from 'lucide-react'
import type { Business } from '@/lib/types'
import { generateOutreachMessage } from '@/lib/scoring'

interface MessageModalProps {
  business: Business | null
  onClose: () => void
}

export function MessageModal({ business, onClose }: MessageModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!business) return null

  const message = generateOutreachMessage(business)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-2 border border-border rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div>
            <p className="text-xs text-text-tertiary font-mono mb-1">MESSAGE D'APPROCHE</p>
            <h3 className="text-base font-semibold text-text-primary">{business.name}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{business.city}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-3 transition-colors text-text-tertiary hover:text-text-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <div className="p-5">
          <pre className="whitespace-pre-wrap text-sm text-text-secondary leading-relaxed font-sans bg-surface-1 rounded-xl p-4 border border-border-subtle max-h-72 overflow-y-auto">
            {message}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 p-5 pt-0">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-surface-0 font-semibold text-sm py-3 rounded-xl hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copier le message
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 text-sm text-text-secondary hover:text-text-primary border border-border rounded-xl hover:border-border-strong transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
