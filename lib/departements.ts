export interface Departement {
  num: string
  nom: string
  region: string // correspond exactement à REGIONS_FR
}

export const DEPARTEMENTS: Departement[] = [
  // Auvergne-Rhône-Alpes
  { num: '01', nom: 'Ain',              region: 'Auvergne-Rhône-Alpes' },
  { num: '03', nom: 'Allier',           region: 'Auvergne-Rhône-Alpes' },
  { num: '07', nom: 'Ardèche',          region: 'Auvergne-Rhône-Alpes' },
  { num: '15', nom: 'Cantal',           region: 'Auvergne-Rhône-Alpes' },
  { num: '26', nom: 'Drôme',            region: 'Auvergne-Rhône-Alpes' },
  { num: '38', nom: 'Isère',            region: 'Auvergne-Rhône-Alpes' },
  { num: '42', nom: 'Loire',            region: 'Auvergne-Rhône-Alpes' },
  { num: '43', nom: 'Haute-Loire',      region: 'Auvergne-Rhône-Alpes' },
  { num: '63', nom: 'Puy-de-Dôme',     region: 'Auvergne-Rhône-Alpes' },
  { num: '69', nom: 'Rhône',            region: 'Auvergne-Rhône-Alpes' },
  { num: '73', nom: 'Savoie',           region: 'Auvergne-Rhône-Alpes' },
  { num: '74', nom: 'Haute-Savoie',     region: 'Auvergne-Rhône-Alpes' },

  // Bourgogne-Franche-Comté
  { num: '21', nom: 'Côte-d\'Or',           region: 'Bourgogne-Franche-Comté' },
  { num: '25', nom: 'Doubs',                region: 'Bourgogne-Franche-Comté' },
  { num: '39', nom: 'Jura',                 region: 'Bourgogne-Franche-Comté' },
  { num: '58', nom: 'Nièvre',               region: 'Bourgogne-Franche-Comté' },
  { num: '70', nom: 'Haute-Saône',          region: 'Bourgogne-Franche-Comté' },
  { num: '71', nom: 'Saône-et-Loire',       region: 'Bourgogne-Franche-Comté' },
  { num: '89', nom: 'Yonne',                region: 'Bourgogne-Franche-Comté' },
  { num: '90', nom: 'Territoire de Belfort',region: 'Bourgogne-Franche-Comté' },

  // Bretagne
  { num: '22', nom: 'Côtes-d\'Armor', region: 'Bretagne' },
  { num: '29', nom: 'Finistère',      region: 'Bretagne' },
  { num: '35', nom: 'Ille-et-Vilaine',region: 'Bretagne' },
  { num: '56', nom: 'Morbihan',       region: 'Bretagne' },

  // Centre-Val de Loire
  { num: '18', nom: 'Cher',           region: 'Centre-Val de Loire' },
  { num: '28', nom: 'Eure-et-Loir',   region: 'Centre-Val de Loire' },
  { num: '36', nom: 'Indre',          region: 'Centre-Val de Loire' },
  { num: '37', nom: 'Indre-et-Loire', region: 'Centre-Val de Loire' },
  { num: '41', nom: 'Loir-et-Cher',   region: 'Centre-Val de Loire' },
  { num: '45', nom: 'Loiret',         region: 'Centre-Val de Loire' },

  // Corse
  { num: '2A', nom: 'Corse-du-Sud', region: 'Corse' },
  { num: '2B', nom: 'Haute-Corse',  region: 'Corse' },

  // Grand Est
  { num: '08', nom: 'Ardennes',           region: 'Grand Est' },
  { num: '10', nom: 'Aube',               region: 'Grand Est' },
  { num: '51', nom: 'Marne',              region: 'Grand Est' },
  { num: '52', nom: 'Haute-Marne',        region: 'Grand Est' },
  { num: '54', nom: 'Meurthe-et-Moselle', region: 'Grand Est' },
  { num: '55', nom: 'Meuse',              region: 'Grand Est' },
  { num: '57', nom: 'Moselle',            region: 'Grand Est' },
  { num: '67', nom: 'Bas-Rhin',           region: 'Grand Est' },
  { num: '68', nom: 'Haut-Rhin',          region: 'Grand Est' },
  { num: '88', nom: 'Vosges',             region: 'Grand Est' },

  // Hauts-de-France
  { num: '02', nom: 'Aisne',        region: 'Hauts-de-France' },
  { num: '59', nom: 'Nord',         region: 'Hauts-de-France' },
  { num: '60', nom: 'Oise',         region: 'Hauts-de-France' },
  { num: '62', nom: 'Pas-de-Calais',region: 'Hauts-de-France' },
  { num: '80', nom: 'Somme',        region: 'Hauts-de-France' },

  // Île-de-France
  { num: '75', nom: 'Paris',            region: 'Île-de-France' },
  { num: '77', nom: 'Seine-et-Marne',   region: 'Île-de-France' },
  { num: '78', nom: 'Yvelines',         region: 'Île-de-France' },
  { num: '91', nom: 'Essonne',          region: 'Île-de-France' },
  { num: '92', nom: 'Hauts-de-Seine',   region: 'Île-de-France' },
  { num: '93', nom: 'Seine-Saint-Denis',region: 'Île-de-France' },
  { num: '94', nom: 'Val-de-Marne',     region: 'Île-de-France' },
  { num: '95', nom: 'Val-d\'Oise',      region: 'Île-de-France' },

  // Normandie
  { num: '14', nom: 'Calvados',      region: 'Normandie' },
  { num: '27', nom: 'Eure',          region: 'Normandie' },
  { num: '50', nom: 'Manche',        region: 'Normandie' },
  { num: '61', nom: 'Orne',          region: 'Normandie' },
  { num: '76', nom: 'Seine-Maritime',region: 'Normandie' },

  // Nouvelle-Aquitaine
  { num: '16', nom: 'Charente',              region: 'Nouvelle-Aquitaine' },
  { num: '17', nom: 'Charente-Maritime',     region: 'Nouvelle-Aquitaine' },
  { num: '19', nom: 'Corrèze',               region: 'Nouvelle-Aquitaine' },
  { num: '23', nom: 'Creuse',                region: 'Nouvelle-Aquitaine' },
  { num: '24', nom: 'Dordogne',              region: 'Nouvelle-Aquitaine' },
  { num: '33', nom: 'Gironde',               region: 'Nouvelle-Aquitaine' },
  { num: '40', nom: 'Landes',                region: 'Nouvelle-Aquitaine' },
  { num: '47', nom: 'Lot-et-Garonne',        region: 'Nouvelle-Aquitaine' },
  { num: '64', nom: 'Pyrénées-Atlantiques',  region: 'Nouvelle-Aquitaine' },
  { num: '79', nom: 'Deux-Sèvres',           region: 'Nouvelle-Aquitaine' },
  { num: '86', nom: 'Vienne',                region: 'Nouvelle-Aquitaine' },
  { num: '87', nom: 'Haute-Vienne',          region: 'Nouvelle-Aquitaine' },

  // Occitanie
  { num: '09', nom: 'Ariège',               region: 'Occitanie' },
  { num: '11', nom: 'Aude',                 region: 'Occitanie' },
  { num: '12', nom: 'Aveyron',              region: 'Occitanie' },
  { num: '30', nom: 'Gard',                 region: 'Occitanie' },
  { num: '31', nom: 'Haute-Garonne',        region: 'Occitanie' },
  { num: '32', nom: 'Gers',                 region: 'Occitanie' },
  { num: '34', nom: 'Hérault',              region: 'Occitanie' },
  { num: '46', nom: 'Lot',                  region: 'Occitanie' },
  { num: '48', nom: 'Lozère',               region: 'Occitanie' },
  { num: '65', nom: 'Hautes-Pyrénées',      region: 'Occitanie' },
  { num: '66', nom: 'Pyrénées-Orientales',  region: 'Occitanie' },
  { num: '81', nom: 'Tarn',                 region: 'Occitanie' },
  { num: '82', nom: 'Tarn-et-Garonne',      region: 'Occitanie' },

  // Pays de la Loire
  { num: '44', nom: 'Loire-Atlantique', region: 'Pays de la Loire' },
  { num: '49', nom: 'Maine-et-Loire',   region: 'Pays de la Loire' },
  { num: '53', nom: 'Mayenne',          region: 'Pays de la Loire' },
  { num: '72', nom: 'Sarthe',           region: 'Pays de la Loire' },
  { num: '85', nom: 'Vendée',           region: 'Pays de la Loire' },

  // Provence-Alpes-Côte d'Azur
  { num: '04', nom: 'Alpes-de-Haute-Provence', region: "Provence-Alpes-Côte d'Azur" },
  { num: '05', nom: 'Hautes-Alpes',             region: "Provence-Alpes-Côte d'Azur" },
  { num: '06', nom: 'Alpes-Maritimes',          region: "Provence-Alpes-Côte d'Azur" },
  { num: '13', nom: 'Bouches-du-Rhône',         region: "Provence-Alpes-Côte d'Azur" },
  { num: '83', nom: 'Var',                      region: "Provence-Alpes-Côte d'Azur" },
  { num: '84', nom: 'Vaucluse',                 region: "Provence-Alpes-Côte d'Azur" },

  // DROM
  { num: '971', nom: 'Guadeloupe',  region: 'Guadeloupe' },
  { num: '972', nom: 'Martinique',  region: 'Martinique' },
  { num: '973', nom: 'Guyane',      region: 'Guyane' },
  { num: '974', nom: 'La Réunion',  region: 'La Réunion' },
  { num: '976', nom: 'Mayotte',     region: 'Mayotte' },
]
