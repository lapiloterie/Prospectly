import { NextRequest, NextResponse } from 'next/server'
import { generateMockResults } from '@/lib/mockData'
import { computeLeadScore, getScoreBadge, getOpportunities } from '@/lib/scoring'
import type { Business } from '@/lib/types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SerperPlace {
  title?: string
  address?: string
  phoneNumber?: string
  website?: string
  rating?: number
  ratingCount?: number
  category?: string
  cid?: string
  position?: number
  openingHours?: string[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Single Serper.dev Maps call. Returns [] on any failure (silent degradation).
 */
async function serperCall(
  apiKey: string,
  query: string,
  start: number,
): Promise<SerperPlace[]> {
  try {
    const res = await fetch('https://google.serper.dev/maps', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: query,
        gl: 'fr',
        hl: 'fr',
        google_domain: 'google.fr',
        num: 20,
        ...(start > 0 ? { start } : {}),
      }),
    })
    if (!res.ok) {
      console.error(`[Serper] ${res.status} for "${query}" start=${start}`)
      return []
    }
    const data = await res.json()
    return (data.places ?? []) as SerperPlace[]
  } catch (err) {
    console.error(`[Serper] fetch error for "${query}"`, err)
    return []
  }
}

/**
 * Deduplicate by cid then by normalised name+address.
 */
function deduplicate(places: SerperPlace[]): SerperPlace[] {
  const seen = new Set<string>()
  const out: SerperPlace[] = []

  for (const p of places) {
    // Primary key: cid
    const cidKey = p.cid ? `cid:${p.cid}` : null
    if (cidKey) {
      if (seen.has(cidKey)) continue
      seen.add(cidKey)
    }

    // Secondary key: name + address (normalised)
    const nameAddr = `na:${removeDiacritics((p.title ?? '').toLowerCase().trim())}|${removeDiacritics((p.address ?? '').toLowerCase().trim())}`
    if (seen.has(nameAddr)) continue
    seen.add(nameAddr)

    out.push(p)
  }

  return out
}

function transformPlaces(
  places: SerperPlace[],
  locationLabel: string,
  businessType: string,
): Business[] {
  return places.map((item, i) => {
    const raw = {
      website: item.website ?? null,
      rating: item.rating ?? 3.5,
      reviews: item.ratingCount ?? 5,
    }
    const leadScore = computeLeadScore(raw)
    return {
      id: item.cid ?? `serper-${i}-${Date.now()}`,
      name: item.title ?? 'Entreprise inconnue',
      address: item.address ?? '',
      city: locationLabel,
      phone: item.phoneNumber ?? null,
      website: raw.website,
      rating: raw.rating,
      reviews: raw.reviews,
      category: item.category ?? businessType,
      leadScore,
      opportunities: getOpportunities(raw),
      badge: getScoreBadge(leadScore),
      openingHours: item.openingHours,
    }
  })
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessType, radius, city, departement, region } = body

    if (!businessType) {
      return NextResponse.json(
        { error: 'businessType is required' },
        { status: 400 },
      )
    }

    // Build location string: most specific → least specific
    const locationParts = [city, departement, region].filter(
      (v): v is string => typeof v === 'string' && v.trim() !== '',
    )
    const location = locationParts.join(', ')

    // Human-readable label for Business.city
    const locationLabel = city?.trim() || departement?.trim() || region?.trim() || 'France'

    const apiKey = process.env.SERP_API_KEY

    // ── Real data via Serper.dev multi-query strategy ──────────────────────────
    if (apiKey) {
      const mainQuery      = [businessType, location].filter(Boolean).join(' ')
      const fallbackQuery  = [removeDiacritics(businessType), location].filter(Boolean).join(' ')
      const proximityQuery = location ? `${mainQuery} proche` : mainQuery

      // 6 parallel calls → ~80-100 raw results
      const settled = await Promise.allSettled([
        serperCall(apiKey, mainQuery,      0),   // main p.1
        serperCall(apiKey, mainQuery,     20),   // main p.2
        serperCall(apiKey, mainQuery,     40),   // main p.3
        serperCall(apiKey, fallbackQuery,  0),   // fallback p.1
        serperCall(apiKey, fallbackQuery, 20),   // fallback p.2
        serperCall(apiKey, proximityQuery, 0),   // géo variant
      ])

      const allPlaces: SerperPlace[] = settled.flatMap((r) =>
        r.status === 'fulfilled' ? r.value : [],
      )

      const unique  = deduplicate(allPlaces)
      const results = transformPlaces(unique, locationLabel, businessType)

      return NextResponse.json({
        results,
        total: results.length,
        city: locationLabel,
        businessType,
        radius,
      })
    }

    // ── Fallback: mock data (no API key) ──────────────────────────────────────
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500))

    const results = generateMockResults({
      city: locationLabel,
      businessType,
      count: 16 + Math.floor(Math.random() * 8),
    })

    return NextResponse.json({
      results,
      total: results.length,
      city: locationLabel,
      businessType,
      radius,
      mock: true,
    })
  } catch (err) {
    console.error('[/api/search]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
