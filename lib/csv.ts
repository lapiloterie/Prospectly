import type { Business } from './types'

export function exportToCSV(businesses: Business[]): void {
  const headers = [
    'Nom',
    'Ville',
    'Adresse',
    'Téléphone',
    'Site Web',
    'Rating',
    'Avis',
    'Lead Score',
    'Badge',
    'Opportunités',
  ]

  const rows = businesses.map((b) => [
    b.name,
    b.city,
    b.address,
    b.phone || '',
    b.website || '',
    b.rating.toString(),
    b.reviews.toString(),
    b.leadScore.toString(),
    b.badge.toUpperCase(),
    b.opportunities.join(' | '),
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `prospectly-leads-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
