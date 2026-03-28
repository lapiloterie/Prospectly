import { computeLeadScore, getScoreBadge, getOpportunities } from './scoring'
import type { Business } from './types'

const BUSINESS_TEMPLATES = [
  { name: 'Boulangerie Moreau', category: 'Boulangerie' },
  { name: 'Plomberie Express', category: 'Plombier' },
  { name: 'Restaurant Le Provençal', category: 'Restaurant' },
  { name: 'Auto École Dupont', category: 'Auto-école' },
  { name: 'Coiffure & Style', category: 'Coiffeur' },
  { name: 'Électricité Générale Martin', category: 'Électricien' },
  { name: 'Pharmacie Centrale', category: 'Pharmacie' },
  { name: 'Cabinet Dentaire Dr. Leroy', category: 'Dentiste' },
  { name: 'Pizzeria Bella Napoli', category: 'Restaurant' },
  { name: 'Garage Mécanique Rousseau', category: 'Garagiste' },
  { name: 'Épicerie Bio du Quartier', category: 'Épicerie' },
  { name: 'Institut de Beauté Elisa', category: 'Esthétique' },
  { name: 'Menuiserie Artisanale Petit', category: 'Menuisier' },
  { name: 'Yoga & Bien-être', category: 'Fitness' },
  { name: 'Librairie La Page Blanche', category: 'Librairie' },
  { name: 'Traiteur Méditerranée', category: 'Traiteur' },
  { name: 'Fleuriste Les Jardins', category: 'Fleuriste' },
  { name: 'Optique Vision Plus', category: 'Opticien' },
  { name: 'Nettoyage Pro Rapide', category: 'Nettoyage' },
  { name: 'Sushi Palace', category: 'Restaurant' },
]

const STREETS = [
  '12 Rue de la République',
  '47 Avenue Jean Jaurès',
  '3 Place du Marché',
  '89 Boulevard Victor Hugo',
  '5 Rue des Fleurs',
  '22 Impasse des Artisans',
  '156 Avenue de la Gare',
  '8 Rue du Commerce',
  '34 Place de la Mairie',
  '71 Boulevard Gambetta',
]

const PHONES = [
  '01 42 63 78 90',
  '04 91 22 45 67',
  '05 56 33 12 89',
  null,
  '03 88 76 54 32',
  null,
  '02 40 55 88 11',
  '06 12 34 56 78',
  null,
  '04 78 90 12 34',
]

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateMockResults(params: {
  city: string
  businessType: string
  count?: number
}): Business[] {
  const { city, count = 18 } = params

  return Array.from({ length: count }, (_, i) => {
    const template = BUSINESS_TEMPLATES[i % BUSINESS_TEMPLATES.length]
    const hasWebsite = Math.random() > 0.55
    const rating = parseFloat(randomBetween(2.8, 5.0).toFixed(1))
    const reviews = Math.floor(randomBetween(3, 120))
    const phone = randomPick(PHONES)

    const raw = {
      website: hasWebsite ? `https://www.${template.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.fr` : null,
      rating,
      reviews,
    }

    const leadScore = computeLeadScore(raw)

    return {
      id: `biz-${i}-${Date.now()}`,
      name: template.name,
      address: randomPick(STREETS),
      city,
      phone,
      website: raw.website,
      rating,
      reviews,
      category: template.category,
      leadScore,
      opportunities: getOpportunities(raw),
      badge: getScoreBadge(leadScore),
    }
  })
}
