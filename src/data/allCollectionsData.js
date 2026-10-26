/**
 * VELORA All Collections Data
 * Extracted directly from https://madilane.com/collections/
 * Exact photography, seasonal collection capsules, and Shape & Style facet tiles.
 */

export const COLLECTIONS_HERO_DATA = {
  title: 'NEW COLLECTION',
  collectionName: 'LEGACY',
  subtitle: 'The 2025 / 2026 Haute Couture Era',
  description: 'Sculptural basque waists, dramatic drop corsetry, sheer chantilly sleeves, and hand-embroidered royal trains designed to make your wedding day unforgettable.',
  bgImage: 'https://madilane.com/wp-content/uploads/2026/05/LISSY-LEE_ML266000037-2-2500x1128.jpg',
  ctaText: 'EXPLORE NOW',
  targetView: 'new-dresses'
};

export const SEASONAL_COLLECTIONS_DATA = [
  {
    id: 'terra',
    name: 'TERRA COLLECTION',
    season: '2025 / 2026 Drop',
    tagline: 'Earthy Textures & Fluid Bohemian Luxury',
    description: 'Grounding bridal romance with earthy botanicals, weightless silk organza, and effortless silhouettes designed for sunlit celebration.',
    image: 'https://madilane.com/wp-content/uploads/2025/04/Wendall_ML25955_1.jpg',
    gownsCount: 16,
    targetView: 'all-dresses',
    filterTag: 'boho'
  },
  {
    id: 'poeme',
    name: 'POÈME COLLECTION',
    season: 'Fall / Winter Couture',
    tagline: 'Poetic French Lace & Modern Corset Boning',
    description: 'Intricately structured architectural bodices paired with poetic floral motifs, exposed stays, and delicate scalloped lace trims.',
    image: 'https://madilane.com/wp-content/uploads/2025/05/POEME-WADE.jpg',
    gownsCount: 18,
    targetView: 'all-dresses',
    filterTag: 'lace'
  },
  {
    id: 'solara',
    name: 'SOLARA COLLECTION',
    season: 'Golden Hour Drop',
    tagline: 'Sun-Drenched Silks & Shimmer Tulle Movement',
    description: 'Inspired by golden European sunsets. Featuring sheer botanical motifs, fluid skirts, and daring plunge backs that catch the light.',
    image: 'https://madilane.com/wp-content/uploads/2024/11/LISSY_ML25250_5-1.jpg',
    gownsCount: 20,
    targetView: 'all-dresses',
    filterTag: 'romantic'
  },
  {
    id: 'ceres',
    name: 'CERES COLLECTION',
    season: 'Atelier Modern Line',
    tagline: 'Architectural Crepe & Square Necklines',
    description: 'Clean modern lines cut from heavyweight French crepe, featuring square necklines, thigh splits, and show-stopping cathedral trains.',
    image: 'https://madilane.com/wp-content/uploads/2024/05/THANE_ML24900_6.jpg',
    gownsCount: 14,
    targetView: 'all-dresses',
    filterTag: 'modern'
  },
  {
    id: 'memoirs',
    name: 'MEMOIRS COLLECTION',
    season: 'Heritage Archive',
    tagline: 'Nostalgic French Embroidery & Basque Waists',
    description: 'An ode to European vintage romance. Featuring basque waistlines, dramatic box-pleated skirts, and heirloom Chantilly lace detailing.',
    image: 'https://madilane.com/wp-content/uploads/2023/11/SAMARA_ML24121_94.jpg',
    gownsCount: 19,
    targetView: 'all-dresses',
    filterTag: 'basque'
  },
  {
    id: 'epilogue',
    name: 'THE EPILOGUE COLLECTION',
    season: 'Ceremony Accents & Gowns',
    tagline: 'Detachable Veils, Cape Overlays & Separates',
    description: 'Versatile ceremony layering featuring detachable Mikado trains, lace mock-neck jackets, fluid silk scarves, and sheer Watteau capes.',
    image: 'https://madilane.com/wp-content/uploads/2023/11/SHAW_VEIL_ML24001_6.jpg',
    gownsCount: 22,
    targetView: 'all-dresses',
    filterTag: 'accessories'
  },
  {
    id: 'baciami',
    name: 'BACIAMI COLLECTION',
    season: 'Italian Romance Series',
    tagline: 'Passionate Floral Appliques & Chapel Trains',
    description: 'Kiss me under the Tuscan sun. Wild botanical petals hand-sewn onto whisper-light tulle with cascading trains and illusion straps.',
    image: 'https://madilane.com/wp-content/uploads/2026/04/ML26832_Opera1-1875x2500.jpg',
    gownsCount: 17,
    targetView: 'all-dresses',
    filterTag: 'floral'
  },
  {
    id: 'nostalgia',
    name: 'NOSTALGIA COLLECTION',
    season: 'Runway Capsule',
    tagline: 'Vintage-Inspired Elegance & Beaded Straps',
    description: 'Subtle sparkle woven through light-as-air layers of ivory tulle, adorned with delicate seed pearls, crystal beading, and siren splits.',
    image: 'https://madilane.com/wp-content/uploads/2026/05/ML26857_Ozari1.jpg',
    gownsCount: 15,
    targetView: 'all-dresses',
    filterTag: 'sparkle'
  }
];

export const SHAPE_AND_STYLE_CARDS = [
  {
    id: 'a-line',
    title: 'A-LINE',
    subtitle: 'Classic & Universal',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/05/WilderScarf_SC599_2.jpg',
    filterValue: 'A-Line',
    filterType: 'silhouette'
  },
  {
    id: 'princess',
    title: 'PRINCESS',
    subtitle: 'Fairytale Volume',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Woods_ML25733_1.jpg',
    filterValue: 'Princess',
    filterType: 'silhouette'
  },
  {
    id: 'fit-and-flare',
    title: 'FIT & FLARE',
    subtitle: 'Hourglass Sculpting',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Winslow_ML25750_1.jpg',
    filterValue: 'Fit & Flare',
    filterType: 'silhouette'
  },
  {
    id: 'simple',
    title: 'SIMPLE',
    subtitle: 'Clean & Contemporary',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Wilcox_Lee_ML25737_1.jpg',
    filterValue: 'Simple',
    filterType: 'style'
  },
  {
    id: 'plus-size',
    title: 'PLUS SIZE',
    subtitle: 'Inclusive Sizes 2-28',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Woodrow_ML25656_6.jpg',
    filterValue: 'all',
    filterType: 'category'
  },
  {
    id: 'lace',
    title: 'LACE',
    subtitle: 'French & Chantilly',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Willa_ML25700_11.jpg',
    filterValue: 'Lace',
    filterType: 'fabric'
  },
  {
    id: 'basque-waist',
    title: 'BASQUE WAIST',
    subtitle: 'Dramatic V-Waistline',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/WHISKEY-ML25844_3.jpg',
    filterValue: 'Basque Waist',
    filterType: 'silhouette'
  },
  {
    id: 'long-sleeves',
    title: 'LONG SLEEVES',
    subtitle: 'Sheer & Embroidered',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Wynne_ML25601_6.jpg',
    filterValue: 'Long Sleeves',
    filterType: 'neckline'
  },
  {
    id: 'statement-back',
    title: 'STATEMENT BACK',
    subtitle: 'Low Plunge & Keyhole',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/04/Walsh_ML25645_7.jpg',
    filterValue: 'Statement Back',
    filterType: 'silhouette'
  },
  {
    id: 'boho',
    title: 'BOHO',
    subtitle: 'Free-Spirited Romance',
    bgImage: 'https://madilane.com/wp-content/uploads/2025/05/poeme-walker-detail2.jpg',
    filterValue: 'Boho',
    filterType: 'style'
  }
];
