'use client'

import { useState } from 'react'
import { Download, RefreshCw } from 'lucide-react'
import { Header } from '@/components/Header'
import { SearchForm } from '@/components/SearchForm'
import { FilterBar } from '@/components/FilterBar'
import { ResultsTable } from '@/components/ResultsTable'
import { StatsBar } from '@/components/StatsBar'
import { EmptyState } from '@/components/EmptyState'
import { MessageModal } from '@/components/MessageModal'
import { LeadDetailPanel } from '@/components/LeadDetailPanel'
import { useSearch, useFilters } from '@/hooks/useSearch'
import { exportToCSV } from '@/lib/csv'
import type { Business } from '@/lib/types'

export default function HomePage() {
  const { businesses, loading, error, hasSearched, lastParams, search } = useSearch()
  const { filters, setFilters, filtered } = useFilters(businesses)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [panelBusiness, setPanelBusiness]       = useState<Business | null>(null)

  const handleExport = () => {
    exportToCSV(filtered)
  }

  return (
    <div className="min-h-screen bg-surface-0 grid-bg">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Lead generation automatisé
          </div>
          <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-3">
            Trouvez des clients locaux
            <br />
            <span className="text-accent">qui ont besoin de vous.</span>
          </h1>
          <p className="text-text-secondary text-base max-w-xl">
            Scannez les entreprises locales, identifiez celles sans site web ou avec une présence faible, et contactez-les avec un message personnalisé.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-surface-2 border border-border rounded-2xl p-5 mb-8 shadow-lg">
          <SearchForm onSearch={search} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Results */}
        {(hasSearched || loading) && (
          <div className="space-y-5 animate-fade-in">
            {/* Stats */}
            {!loading && businesses.length > 0 && (
              <StatsBar businesses={businesses} />
            )}

            {/* Toolbar */}
            {!loading && businesses.length > 0 && (
              <div className="flex items-center justify-between flex-wrap gap-3">
                <FilterBar
                  filters={filters}
                  onChange={setFilters}
                  total={businesses.length}
                  filtered={filtered.length}
                />

                <div className="flex items-center gap-2">
                  {lastParams && (
                    <button
                      onClick={() => search(lastParams)}
                      className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Actualiser
                    </button>
                  )}
                  <button
                    onClick={handleExport}
                    disabled={filtered.length === 0}
                    className="flex items-center gap-1.5 text-xs font-medium text-surface-0 bg-accent hover:bg-accent-dim px-3 py-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV ({filtered.length})
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            <ResultsTable
              businesses={filtered}
              loading={loading}
              onOpenMessage={setSelectedBusiness}
              onOpenPanel={setPanelBusiness}
            />
          </div>
        )}

        {/* Empty state */}
        {!hasSearched && !loading && <EmptyState />}
      </main>

      {/* Message Modal */}
      <MessageModal
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
      />

      {/* Lead Detail Panel */}
      <LeadDetailPanel
        business={panelBusiness}
        onClose={() => setPanelBusiness(null)}
      />
    </div>
  )
}
