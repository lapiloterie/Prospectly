import { NextRequest, NextResponse } from 'next/server'
import type { Business } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businesses }: { businesses: Business[] } = body

    if (!businesses || !Array.isArray(businesses)) {
      return NextResponse.json({ error: 'businesses array required' }, { status: 400 })
    }

    const headers = ['Nom', 'Ville', 'Adresse', 'Téléphone', 'Site Web', 'Rating', 'Avis', 'Lead Score', 'Badge', 'Opportunités']
    const rows = businesses.map((b) => [
      b.name, b.city, b.address, b.phone || '', b.website || '',
      b.rating, b.reviews, b.leadScore, b.badge.toUpperCase(), b.opportunities.join(' | '),
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    return new NextResponse('\uFEFF' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="prospectly-${Date.now()}.csv"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
