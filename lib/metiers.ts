export interface Metier {
  label: string
  query: string     // orthographe exacte Google (avec accents)
  fallback: string  // sans accent
}

export const METIERS: Metier[] = [
  { label: 'Électricien',               query: 'Électricien',               fallback: 'Electricien' },
  { label: 'Plombier',                  query: 'Plombier',                  fallback: 'Plombier' },
  { label: 'Maçon',                     query: 'Maçon',                     fallback: 'Macon' },
  { label: 'Couvreur',                  query: 'Couvreur',                  fallback: 'Couvreur' },
  { label: 'Menuisier',                 query: 'Menuisier',                 fallback: 'Menuisier' },
  { label: 'Carreleur',                 query: 'Carreleur',                 fallback: 'Carreleur' },
  { label: 'Peintre en bâtiment',       query: 'Peintre en bâtiment',       fallback: 'Peintre en batiment' },
  { label: 'Chauffagiste',              query: 'Chauffagiste',              fallback: 'Chauffagiste' },
  { label: 'Serrurier',                 query: 'Serrurier',                 fallback: 'Serrurier' },
  { label: 'Vitrier',                   query: 'Vitrier',                   fallback: 'Vitrier' },
  { label: 'Paysagiste',                query: 'Paysagiste',                fallback: 'Paysagiste' },
  { label: 'Déménagement',              query: 'Déménagement',              fallback: 'Demenagement' },
  { label: 'Coiffeur',                  query: 'Coiffeur',                  fallback: 'Coiffeur' },
  { label: 'Garage automobile',         query: 'Garage automobile',         fallback: 'Garage automobile' },
  { label: 'Photographe professionnel', query: 'Photographe professionnel', fallback: 'Photographe professionnel' },
  { label: 'Restaurant',                query: 'Restaurant',                fallback: 'Restaurant' },
  { label: 'Boulangerie',               query: 'Boulangerie',               fallback: 'Boulangerie' },
  { label: 'Architecte',                query: 'Architecte',                fallback: 'Architecte' },
]

export const REGIONS_FR: string[] = [
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté',
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Hauts-de-France',
  'Île-de-France',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Pays de la Loire',
  "Provence-Alpes-Côte d'Azur",
]
