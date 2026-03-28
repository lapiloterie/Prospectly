export interface Business {
  id: string
  name: string
  address: string
  city: string
  phone: string | null
  website: string | null
  rating: number
  reviews: number
  category: string
  leadScore: number
  opportunities: Opportunity[]
  badge: 'hot' | 'warm' | 'cold'
  openingHours?: string[]
}

export type Opportunity =
  | 'no_website'
  | 'low_rating'
  | 'low_reviews'
  | 'high_potential'

export interface SearchParams {
  businessType: string
  radius: string
  city?: string
  departement?: string
  region?: string
}

export interface FilterState {
  noWebsite: boolean
  lowRating: boolean
  lowReviews: boolean
}

export type SortField = 'leadScore' | 'rating' | 'reviews' | 'name'
export type SortDir = 'asc' | 'desc'
