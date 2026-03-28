'use client'

import { useState, useMemo } from 'react'
import { Search, MapPin, ChevronDown, Briefcase, PenLine, Globe } from 'lucide-react'
import type { SearchParams } from '@/lib/types'
import { METIERS, REGIONS_FR } from '@/lib/metiers'
import { DEPARTEMENTS } from '@/lib/departements'

interface SearchFormProps {
  onSearch: (params: SearchParams) => void
  loading: boolean
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [city, setCity]                   = useState('')
  const [radiusKm, setRadiusKm]           = useState(50)
  const [region, setRegion]               = useState('')
  const [departement, setDepartement]     = useState('')
  const [metierKey, setMetierKey]         = useState('')   // '' | 'autre' | métier.query
  const [customMetier, setCustomMetier]   = useState('')

  const effectiveBusinessType =
    metierKey === 'autre' ? customMetier.trim() : metierKey

  const canSubmit = !loading && effectiveBusinessType !== ''

  // Départements filtrés par région sélectionnée
  const filteredDepts = useMemo(
    () => (region ? DEPARTEMENTS.filter((d) => d.region === region) : DEPARTEMENTS),
    [region],
  )

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion)
    setDepartement('') // reset département si la région change
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onSearch({
      businessType: effectiveBusinessType,
      city: city.trim() || undefined,
      radius: `${radiusKm}km`,
      region: region || undefined,
      departement: departement || undefined,
    })
  }

  const selectClass =
    'w-full appearance-none bg-surface-2 border border-border rounded-xl pl-11 pr-10 py-3.5 text-sm text-text-primary focus:border-accent/50 focus:bg-surface-3 transition-all cursor-pointer'
  const inputClass =
    'w-full bg-surface-2 border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent/50 focus:bg-surface-3 transition-all'

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">

      {/* Row 1 : Métier | Région | Département */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Métier */}
        <div className="relative group">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-accent transition-colors pointer-events-none" />
          <select
            value={metierKey}
            onChange={(e) => setMetierKey(e.target.value)}
            className={selectClass}
          >
            <option value="">Sélectionner un métier…</option>
            {METIERS.map((m) => (
              <option key={m.query} value={m.query}>{m.label}</option>
            ))}
            <option value="autre">✏️ Autre métier…</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        </div>

        {/* Région */}
        <div className="relative group">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-accent transition-colors pointer-events-none" />
          <select
            value={region}
            onChange={(e) => handleRegionChange(e.target.value)}
            className={selectClass}
          >
            <option value="">Région (optionnel)…</option>
            {REGIONS_FR.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        </div>

        {/* Département */}
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-accent transition-colors pointer-events-none" />
          <select
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            className={selectClass}
          >
            <option value="">Département (optionnel)…</option>
            {filteredDepts.map((d) => (
              <option key={d.num} value={d.nom}>{d.num} – {d.nom}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        </div>
      </div>

      {/* Row 2 : Ville | Rayon */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-3">

        {/* Ville */}
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ville (optionnel) — Paris, Lyon, Marseille…"
            className={inputClass}
          />
        </div>

        {/* Rayon slider */}
        <div className="bg-surface-2 border border-border rounded-xl px-4 py-3 flex flex-col justify-center gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Rayon</span>
            <span className="text-sm font-semibold text-accent tabular-nums">{radiusKm} km</span>
          </div>
          <input
            type="range"
            min={1}
            max={500}
            step={1}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer
              bg-surface-4
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-accent
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(232,255,71,0.4)]
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-accent
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, #e8ff47 0%, #e8ff47 ${(radiusKm / 500) * 100}%, #272727 ${(radiusKm / 500) * 100}%, #272727 100%)`
            }}
          />
          <div className="flex justify-between text-[10px] text-text-tertiary">
            <span>1 km</span>
            <span>500 km</span>
          </div>
        </div>
      </div>

      {/* Autre métier — visible uniquement si "autre" sélectionné */}
      {metierKey === 'autre' && (
        <div className="relative group">
          <PenLine className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            value={customMetier}
            onChange={(e) => setCustomMetier(e.target.value)}
            placeholder="Ex : Carrossier, Ostéopathe…"
            className={inputClass}
            autoFocus
          />
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex items-center gap-2.5 bg-accent text-surface-0 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-accent-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-surface-0/30 border-t-surface-0 rounded-full animate-spin" />
              Analyse en cours…
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Rechercher des leads
            </>
          )}
        </button>
      </div>
    </form>
  )
}
