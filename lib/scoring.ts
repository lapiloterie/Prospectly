import type { Business, Opportunity } from './types'

export function computeLeadScore(business: {
  website: string | null
  rating: number
  reviews: number
}): number {
  let score = 0
  if (!business.website) score += 50
  if (business.rating < 4) score += 20
  if (business.reviews < 20) score += 15
  if (!business.website && business.rating < 4) score += 10
  if (!business.website && business.reviews < 20) score += 5
  return Math.min(score, 100)
}

export function getScoreBadge(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 80) return 'hot'
  if (score >= 50) return 'warm'
  return 'cold'
}

export function getOpportunities(business: {
  website: string | null
  rating: number
  reviews: number
}): Opportunity[] {
  const ops: Opportunity[] = []
  if (!business.website) ops.push('no_website')
  if (business.rating < 4) ops.push('low_rating')
  if (business.reviews < 20) ops.push('low_reviews')
  if (!business.website && business.reviews >= 20 && business.rating >= 4) ops.push('high_potential')
  return ops
}

export function generateOutreachMessage(business: Business): string {
  const opLines: string[] = []

  if (business.opportunities.includes('no_website')) {
    opLines.push("nous avons constaté que votre entreprise n'a pas encore de site web")
  } else {
    opLines.push('votre présence en ligne pourrait être améliorée')
  }

  if (business.opportunities.includes('low_rating')) {
    opLines.push('votre note en ligne pourrait être boostée')
  }

  if (business.opportunities.includes('low_reviews')) {
    opLines.push("vous manquez d'avis clients visibles sur Google")
  }

  const opsText = opLines.length > 1
    ? opLines.slice(0, -1).join(', ') + ' et ' + opLines[opLines.length - 1]
    : opLines[0] || 'votre présence digitale mérite attention'

  return `Bonjour ${business.name},

En analysant les entreprises locales dans votre secteur, ${opsText}.

Dans un marché de plus en plus digital, une présence web optimisée peut représenter +30% de clients supplémentaires.

Nous accompagnons des entreprises comme la vôtre à ${business.city} pour créer ou refondre leur site web — avec des résultats concrets.

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

Cordialement`
}
