'use client'

import { useState, useCallback } from 'react'
import type { Business, SearchParams, FilterState, SortField, SortDir } from '@/lib/types'

export function useSearch() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastParams, setLastParams] = useState<SearchParams | null>(null)

  const search = useCallback(async (params: SearchParams) => {
    setLoading(true)
    setError(null)
    setLastParams(params)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      if (!res.ok) throw new Error('Erreur lors de la recherche')

      const data = await res.json()
      setBusinesses(data.results)
      setHasSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }, [])

  return { businesses, loading, error, hasSearched, lastParams, search }
}

export function useFilters(businesses: Business[]) {
  const [filters, setFilters] = useState<FilterState>({
    noWebsite: false,
    lowRating: false,
    lowReviews: false,
  })

  const filtered = businesses.filter(b => {
    if (filters.noWebsite && b.website) return false
    if (filters.lowRating && b.rating >= 4) return false
    if (filters.lowReviews && b.reviews >= 20) return false
    return true
  })

  return { filters, setFilters, filtered }
}
