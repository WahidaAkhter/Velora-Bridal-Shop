/**
 * Central Route Catalog for Dedicated Feature, Style, Accessory, Collection, and Real Brides Pages.
 * Maps every header, footer, and collection button/card to a clean URL slug and page configuration.
 */

export const STYLE_ROUTES = [
  // BY SILHOUETTE
  { slug: 'a-line', label: 'A-Line', optionKey: 'A-LINE', filterType: 'silhouette', query: 'A-Line' },
  { slug: 'princess', label: 'Princess', optionKey: 'PRINCESS', filterType: 'silhouette', query: 'Princess' },
  { slug: 'ballgown', label: 'Ballgown', optionKey: 'BALLGOWN', filterType: 'silhouette', query: 'Ballgown' },
  { slug: 'fit-and-flare', label: 'Fit & Flare', optionKey: 'FIT & FLARE', filterType: 'silhouette', query: 'Fit & Flare' },
  { slug: 'mermaid', label: 'Mermaid', optionKey: 'MERMAID', filterType: 'silhouette', query: 'Mermaid' },
  { slug: 'short', label: 'Short', optionKey: 'SHORT', filterType: 'silhouette', query: 'Short' },
  { slug: 'corset', label: 'Corset', optionKey: 'CORSET', filterType: 'silhouette', query: 'Corset' },
  { slug: 'basque-waist', label: 'Basque Waist', optionKey: 'BASQUE WAIST', filterType: 'silhouette', query: 'Basque Waist' },
  { slug: 'drop-waist', label: 'Drop Waist', optionKey: 'DROP WAIST', filterType: 'silhouette', query: 'Drop Waist' },
  { slug: 'statement-back', label: 'Statement Back', optionKey: 'STATEMENT BACK', filterType: 'back', query: 'Statement Back' },
  { slug: 'plus-size', label: 'Plus Size', optionKey: 'PLUS SIZE', filterType: 'plus-size', query: 'Plus Size' },

  // BY NECKLINE / SLEEVE
  { slug: 'strapless', label: 'Strapless', optionKey: 'STRAPLESS', filterType: 'neckline', query: 'Strapless' },
  { slug: 'off-the-shoulder', label: 'Off The Shoulder', optionKey: 'OFF THE SHOULDER', filterType: 'neckline', query: 'Off The Shoulder' },
  { slug: 'high-neck', label: 'High Neck', optionKey: 'HIGH NECK', filterType: 'neckline', query: 'High Neck' },
  { slug: 'straps', label: 'Straps', optionKey: 'STRAPS', filterType: 'neckline', query: 'Straps' },
  { slug: 'long-sleeves', label: 'Long Sleeves', optionKey: 'LONG SLEEVES', filterType: 'neckline', query: 'Long Sleeve' },

  // BY STYLE
  { slug: 'modern', label: 'Modern', optionKey: 'MODERN', filterType: 'style', query: 'Modern' },
  { slug: 'romantic', label: 'Romantic', optionKey: 'ROMANTIC', filterType: 'style', query: 'Romantic' },
  { slug: 'simple', label: 'Simple', optionKey: 'SIMPLE', filterType: 'style', query: 'Simple' },
  { slug: 'elegant', label: 'Elegant', optionKey: 'ELEGANT', filterType: 'style', query: 'Elegant' },
  { slug: 'boho', label: 'Boho', optionKey: 'BOHO', filterType: 'style', query: 'Boho' },
  { slug: 'floral', label: 'Floral', optionKey: 'FLORAL', filterType: 'style', query: 'Floral' },
  { slug: 'sexy', label: 'Sexy', optionKey: 'SEXY', filterType: 'style', query: 'Sexy' },
  { slug: 'glamorous', label: 'Glamorous', optionKey: 'GLAMOROUS', filterType: 'style', query: 'Glamorous' },
  { slug: 'sparkle', label: 'Sparkle', optionKey: 'SPARKLE', filterType: 'style', query: 'Sparkle' },
  { slug: 'beach', label: 'Beach', optionKey: 'BEACH', filterType: 'style', query: 'Beach' },

  // BY FABRICATION
  { slug: 'lace', label: 'Lace', optionKey: 'LACE', filterType: 'fabric', query: 'Lace' },
  { slug: 'satin', label: 'Satin', optionKey: 'SATIN', filterType: 'fabric', query: 'Satin' },
  { slug: 'tulle', label: 'Tulle', optionKey: 'TULLE', filterType: 'fabric', query: 'Tulle' },
  { slug: 'crepe', label: 'Crepe', optionKey: 'CREPE', filterType: 'fabric', query: 'Crepe' },
  { slug: 'beaded', label: 'Beaded', optionKey: 'BEADED', filterType: 'fabric', query: 'Beaded' },
  { slug: 'organza', label: 'Organza', optionKey: 'ORGANZA', filterType: 'fabric', query: 'Organza' }
];

const STYLE_ALIASES = {
  'a-line': 'a-line',
  'aline': 'a-line',
  'princess': 'princess',
  'ballgown': 'ballgown',
  'fit & flare': 'fit-and-flare',
  'fit and flare': 'fit-and-flare',
  'mermaid': 'mermaid',
  'short': 'short',
  'corset': 'corset',
  'basque waist': 'basque-waist',
  'drop waist': 'drop-waist',
  'statement back': 'statement-back',
  'plus size': 'plus-size',
  'strapless': 'strapless',
  'off the shoulder': 'off-the-shoulder',
  'off-the-shoulder': 'off-the-shoulder',
  'high neck': 'high-neck',
  'straps': 'straps',
  'long sleeve': 'long-sleeves',
  'long sleeves': 'long-sleeves',
  'modern': 'modern',
  'romantic': 'romantic',
  'simple': 'simple',
  'elegant': 'elegant',
  'boho': 'boho',
  'floral': 'floral',
  'sexy': 'sexy',
  'glamorous': 'glamorous',
  'sparkle': 'sparkle',
  'beach': 'beach',
  'lace': 'lace',
  'satin': 'satin',
  'tulle': 'tulle',
  'crepe': 'crepe',
  'beaded': 'beaded',
  'organza': 'organza'
};

export const findStyleRouteBySlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.toLowerCase().trim();
  return STYLE_ROUTES.find(r => r.slug === clean) || null;
};

export const stylePathFor = (name) => {
  if (!name || typeof name !== 'string') return '/dresses';
  const normalized = name.toLowerCase().replace(/&amp;/g, '&').trim();
  const slug = STYLE_ALIASES[normalized] || normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const found = findStyleRouteBySlug(slug);
  return found ? `/styles/${found.slug}` : '/dresses';
};

export const ACCESSORY_ROUTES = [
  {
    slug: 'all',
    title: 'All Bridal Accessories',
    eyebrow: 'ATELIER ACCESSORY GALLERY',
    description: 'Explore every handcrafted veil, detachable train, lace jacket, sheer cape, silk scarf, opera glove, and waist accent from the VELORA atelier.',
    filterQuery: ''
  },
  {
    slug: 'veils',
    title: 'Bridal Veils',
    eyebrow: 'CEREMONY VEILS',
    description: 'Cathedral and chapel-length French illusion tulle veils edged with hand-cut botanical lace and luminous freshwater pearls.',
    filterQuery: 'Veil'
  },
  {
    slug: 'cathedral-lace-veils',
    title: 'Cathedral Lace Veils',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Sweeping 108-inch cathedral veils crafted from featherlight illusion tulle and scalloped Chantilly or guipure lace.',
    filterQuery: 'Veil'
  },
  {
    slug: 'trains',
    title: 'Detachable Trains',
    eyebrow: 'CONVERTIBLE SILHOUETTES',
    description: 'Dramatic aisle grandeur and effortless reception movement with detachable Mikado, organza, and frosted tulle overskirt trains.',
    filterQuery: 'Train'
  },
  {
    slug: 'detachable-mikado-trains',
    title: 'Detachable Mikado Trains',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Architectural Mikado silk extensions with concealed interior hook attachments for effortless ceremony-to-reception transformation.',
    filterQuery: 'Train'
  },
  {
    slug: 'jackets',
    title: 'Jackets & Shrugs',
    eyebrow: 'ATELIER LAYERING',
    description: 'Mock-neck Chantilly lace toppers, sheer embroidered boleros, and structured bridal shrugs tailored for refined ceremony coverage.',
    filterQuery: 'Jacket'
  },
  {
    slug: 'mock-neck-lace-jackets',
    title: 'Mock-Neck Lace Jackets',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Regal high-neck Chantilly and corded lace overlays designed to pair seamlessly with strapless or sweetheart bodices.',
    filterQuery: 'Jacket'
  },
  {
    slug: 'bows',
    title: 'Wedding Dress Bows',
    eyebrow: 'COUTURE ACCENTS',
    description: 'Sculptural Mikado satin bows and cascading ribbon streamers designed to elevate the back neckline or waist.',
    filterQuery: 'Bow'
  },
  {
    slug: 'sleeves',
    title: 'Detachable Wedding Dress Sleeves',
    eyebrow: 'CONVERTIBLE SLEEVES',
    description: 'Removable blouson, bishop, bell, and fitted French lace sleeves offering two distinct silhouettes in one gown.',
    filterQuery: 'Sleeve'
  },
  {
    slug: 'gloves',
    title: 'Bridal Gloves',
    eyebrow: 'OPERA & SHEER GLOVES',
    description: 'Vintage-inspired Chantilly lace opera gloves and sheer tulle wristlets crafted for strapless and corseted gowns.',
    filterQuery: 'Gloves'
  },
  {
    slug: 'chantilly-opera-gloves',
    title: 'Chantilly Opera Gloves',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Delicate French Chantilly lace opera gloves bringing heirloom grace to modern bridal silhouettes.',
    filterQuery: 'Gloves'
  },
  {
    slug: 'corsets',
    title: 'Bridal Corsets & Bodices',
    eyebrow: 'SCULPTED CORSETRY',
    description: 'Architectural 14-piece boned corset separates and structured bodices engineered for poised waist definition.',
    filterQuery: 'Corset'
  },
  {
    slug: 'skirts',
    title: 'Detachable Wedding Skirts',
    eyebrow: 'OVERSKIRTS & LAYERS',
    description: 'Voluminous detachable tulle and organza overskirts that instantly convert a sleek column gown into a grand ballgown.',
    filterQuery: 'Skirt'
  },
  {
    slug: 'scarves',
    title: 'Bridal Scarves',
    eyebrow: 'NECK & SHOULDER DRAPES',
    description: 'Fluid silk chiffon and sheer illusion tulle neck scarves that trail effortlessly behind the shoulders.',
    filterQuery: 'Scarf'
  },
  {
    slug: 'fluid-silk-scarves',
    title: 'Fluid Silk Scarves',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Weightless liquid silk and organza neck drapes crafted for contemporary minimalist bridal gowns.',
    filterQuery: 'Scarf'
  },
  {
    slug: 'capes',
    title: 'Bridal Capes',
    eyebrow: 'WATTEAU & WING CAPES',
    description: 'Watteau shoulder wings, dramatic cathedral capes, and pearl-scattered illusion overlays for a modern alternative to the traditional veil.',
    filterQuery: 'Cape'
  },
  {
    slug: 'watteau-tulle-capes',
    title: 'Watteau Tulle Capes',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Ethereal Watteau tulle capes clipping gently at the shoulders to frame your gown’s back silhouette.',
    filterQuery: 'Cape'
  },
  {
    slug: 'neck-collars',
    title: 'Neck Collars',
    eyebrow: 'COUTURE NECKLINES',
    description: 'Hand-beaded crystal and baroque pearl bridal neck collars crafted for statement-making editorial poise.',
    filterQuery: 'Neck Collar'
  },
  {
    slug: 'baroque-pearl-collars',
    title: 'Baroque Pearl Collars',
    eyebrow: 'FEATURED ACCENTS',
    description: 'Artisan-strung baroque pearl collars designed to frame modern strapless and square necklines.',
    filterQuery: 'Neck Collar'
  },
  {
    slug: 'veil-length-guide',
    title: 'Veil Length Guide & Styling',
    eyebrow: 'ATELIER STYLING',
    description: 'Compare chapel (90") and cathedral (108") veil proportions alongside our curated bridal veil collection.',
    filterQuery: 'Veil'
  },
  {
    slug: 'mix-and-match-separates',
    title: 'Mix & Match Separates',
    eyebrow: 'ATELIER STYLING',
    description: 'Combine removable sleeves, detachable trains, overskirts, and bridal jackets to create your bespoke two-in-one ceremony look.',
    filterQuery: ''
  },
  {
    slug: 'overskirts-and-bows',
    title: 'Overskirts & Bows',
    eyebrow: 'ATELIER STYLING',
    description: 'Transformative detachable trains, skirts, and architectural satin bows tailored for dramatic ceremony entrances.',
    filterQuery: 'Train'
  },
  {
    slug: 'ceremony-layering',
    title: 'Ceremony Layering',
    eyebrow: 'ATELIER STYLING',
    description: 'Thoughtful lace jackets, sheer capes, and soft bridal scarves crafted for effortless transition from aisle to evening reception.',
    filterQuery: 'Cape'
  },
  {
    slug: 'bespoke-customizations',
    title: 'Bespoke Accessory Customizations',
    eyebrow: 'ATELIER STYLING',
    description: 'Discover heirloom accessories available in custom lengths, ivory tones, and hand-finished pearl or crystal trims.',
    filterQuery: ''
  }
];

const ACCESSORY_ITEM_TO_PATH = {
  'VEILS': '/accessories/veils',
  'BRIDAL VEILS': '/accessories/veils',
  'CATHEDRAL LACE VEILS': '/accessories/cathedral-lace-veils',
  'TRAINS': '/accessories/trains',
  'DETACHABLE TRAINS': '/accessories/trains',
  'DETACHABLE MIKADO TRAINS': '/accessories/detachable-mikado-trains',
  'JACKETS/SHRUGS': '/accessories/jackets',
  'JACKETS': '/accessories/jackets',
  'MOCK-NECK LACE JACKETS': '/accessories/mock-neck-lace-jackets',
  'BOWS': '/accessories/bows',
  'WEDDING DRESS BOWS': '/accessories/bows',
  'SLEEVES': '/accessories/sleeves',
  'DETACHABLE WEDDING DRESS SLEEVES': '/accessories/sleeves',
  'GLOVES': '/accessories/gloves',
  'BRIDAL GLOVES': '/accessories/gloves',
  'CHANTILLY OPERA GLOVES': '/accessories/chantilly-opera-gloves',
  'CORSETS': '/accessories/corsets',
  'SKIRTS': '/accessories/skirts',
  'DETACHABLE WEDDING SKIRTS': '/accessories/skirts',
  'SCARVES': '/accessories/scarves',
  'BRIDAL SCARVES': '/accessories/scarves',
  'FLUID SILK SCARVES': '/accessories/fluid-silk-scarves',
  'CAPES': '/accessories/capes',
  'BRIDAL CAPES': '/accessories/capes',
  'WATTEAU TULLE CAPES': '/accessories/watteau-tulle-capes',
  'BELTS': '/belts-and-sashes',
  'BELTS & SASHES': '/belts-and-sashes',
  'BRIDAL BELTS AND SASHES': '/belts-and-sashes',
  'CRYSTAL EMBROIDERED BELTS': '/belts-and-sashes',
  'NECK COLLARS': '/accessories/neck-collars',
  'BAROQUE PEARL COLLARS': '/accessories/baroque-pearl-collars',
  'ALL ACCESSORIES SHOWCASE': '/accessories',
  'ALL ACCESSORIES': '/accessories/all',
  'VEIL LENGTH GUIDE': '/accessories/veil-length-guide',
  'MIX & MATCH SEPARATES': '/accessories/mix-and-match-separates',
  'OVERSKIRTS & BOWS': '/accessories/overskirts-and-bows',
  'CEREMONY LAYERING': '/accessories/ceremony-layering',
  'BESPOKE CUSTOMIZATIONS': '/accessories/bespoke-customizations'
};

export const findAccessoryRouteBySlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.toLowerCase().trim();
  return ACCESSORY_ROUTES.find(r => r.slug === clean) || null;
};

export const accessoryPathFor = (name) => {
  if (!name || typeof name !== 'string') return '/accessories';
  const key = name.toUpperCase().trim();
  return ACCESSORY_ITEM_TO_PATH[key] || '/accessories/all';
};

export const COLLECTION_SLUGS = [
  'terra',
  'poeme',
  'solara',
  'ceres',
  'memoirs',
  'epilogue',
  'baciami',
  'nostalgia'
];

export const findCollectionSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.toLowerCase().trim();
  return COLLECTION_SLUGS.includes(clean) ? clean : null;
};

export const collectionPathFor = (id) => {
  const clean = findCollectionSlug(id);
  return clean ? `/collections/${clean}` : '/collections';
};

export const REAL_BRIDE_FEATURES = [
  {
    slug: 'chateau-de-chantilly',
    category: 'FEATURED WEDDING',
    title: 'Château de Chantilly',
    location: 'Chantilly, France',
    brideName: 'Camille & Henri',
    gownName: 'The Sovereign Basque Gown',
    image: '/images/bridal/style-basque-waist.jpg',
    quote: 'Beneath 16th-century French stonework, scalloped Chantilly lace and an internal 14-piece basque bodice moved effortlessly from sunlit courtyard vows to candlelight.',
    highlights: ['French Corded Chantilly Lace', 'Cathedral Lace Veil Pairing', 'Bespoke Paris Fitting']
  },
  {
    slug: 'lake-como-villa',
    category: 'FEATURED WEDDING',
    title: 'Lake Como Villa',
    location: 'Villa Balbiano, Italy',
    brideName: 'Elena & Matteo',
    gownName: 'Thane Sculpted Mermaid',
    image: '/images/bridal/style-mermaid.jpg',
    quote: 'Reflected against azure waters, delicate all-over botanical beading and detachable off-shoulder sleeves transformed effortlessly for a lakeside evening reception.',
    highlights: ['All-Over Sequin Lace', 'Detachable Sleeves', 'Custom Train Bustle']
  },
  {
    slug: 'parisian-rooftop',
    category: 'FEATURED WEDDING',
    title: 'Parisian Rooftop',
    location: 'Place Vendôme, Paris',
    brideName: 'Genevieve & Lucas',
    gownName: 'Odelle Draped Satin',
    image: '/images/bridal/signature-odelle.jpg',
    quote: 'Liquid cream crepe satin draped over the collarbone with sheer illusion lace sleeves framed a skyline ceremony overlooking historic Parisian rooftops.',
    highlights: ['Heavy Stretch Crepe Satin', 'Draped Off-Shoulder Neckline', 'Editorial Silhouette']
  },
  {
    slug: 'tuscan-countryside',
    category: 'FEATURED WEDDING',
    title: 'Tuscan Countryside',
    location: 'Val d’Orcia, Tuscany',
    brideName: 'Hannah & Oliver',
    gownName: 'Jaya Coastal Lace',
    image: 'https://madilane.com/wp-content/uploads/2026/04/Hannah-in-Jaya.png',
    quote: 'Breathable silk linings and weightless botanical tulle made an outdoor Tuscan vineyard celebration comfortable from golden afternoon photos to midnight.',
    highlights: ['Breathable Silk Lining', 'Weightless Botanical Tulle', 'Destination Comfort']
  },
  {
    slug: 'verified-reviews',
    category: 'BRIDE STORIES',
    title: '2,400+ Verified Bride Reviews',
    location: 'Worldwide VELORA Brides',
    brideName: 'Verified Atelier Brides',
    gownName: 'Sizes 2–28 Couture Fit',
    image: 'https://madilane.com/wp-content/uploads/2024/11/LUCIA_ML25130_2-800x1000.jpg',
    quote: 'Rated 5.0/5 across 2,400+ real brides celebrating our signature lightweight construction, inclusive curve sizing, and supportive internal corsetry.',
    highlights: ['Inclusive US Sizes 2–28', '14-Piece Structural Boning', 'Master Stylist Consultations']
  },
  {
    slug: 'photo-gallery',
    category: 'BRIDE STORIES',
    title: 'Real Bride Photo Gallery',
    location: 'Global Celebrations',
    brideName: 'Kari, Jen, Lily & Tayla',
    gownName: 'Curated Wedding Moments',
    image: 'https://cdn-ikpogib.nitrocdn.com/MGUpaNLVABvmzbiIBhHBkHQesJxEWgVg/assets/images/optimized/rev-3e43be0/madilane.com/wp-content/uploads/elementor/thumbs/20250521_Madilane_Wedding4533-rkz0sb9039er4dh128ieecwnnf5oul6iamb3g5c3dc-565x.jpg',
    quote: 'Candid aisle entrances, coastal sunset portraits, and ballroom first dances captured in real VELORA gowns across 30+ countries.',
    highlights: ['Candid Ceremony Photography', 'Real Fit References', 'Veil & Cape Styling Ideas']
  },
  {
    slug: 'testimonial-archive',
    category: 'BRIDE STORIES',
    title: 'Testimonial Archive',
    location: 'New York • Paris • Sydney',
    brideName: 'Atelier Testimonials',
    gownName: 'Client Stories & Notes',
    image: 'https://cdn-ikpogib.nitrocdn.com/MGUpaNLVABvmzbiIBhHBkHQesJxEWgVg/assets/images/optimized/rev-3e43be0/madilane.com/wp-content/uploads/elementor/thumbs/WARD-ML28888_3-1-rdhpm8ygqz1h1pay4st0wvbh5477l5wgbzwb15rci8-560x.jpg',
    quote: 'Read firsthand notes from VELORA brides on fitting precision, Quick Ship expedited timelines, and personal concierge styling.',
    highlights: ['Quick Ship Success Stories', 'Alteration Guidance', 'Personal Stylist Care']
  },
  {
    slug: 'bridal-transformations',
    category: 'BRIDE STORIES',
    title: 'Bridal Transformations',
    location: 'Ceremony to Reception',
    brideName: 'Convertible Gown Styling',
    gownName: 'Detachable Trains, Capes & Sleeves',
    image: 'https://cdn-ikpogib.nitrocdn.com/MGUpaNLVABvmzbiIBhHBkHQesJxEWgVg/assets/images/optimized/rev-3e43be0/madilane.com/wp-content/uploads/elementor/thumbs/ML_LISSY_SOLARA_2-rdhpq6w3eyfrqtks405ovdi2uarmvgjx7iemhxwweo-560x.jpg',
    quote: 'See how brides pair detachable cathedral trains, Watteau capes, and removable sleeves to create two unforgettable looks in one celebration.',
    highlights: ['Two-in-One Ceremony Looks', 'Detachable Overskirts', 'Convertible Sleeves']
  },
  {
    slug: 'submit-wedding',
    category: 'COMMUNITY & PRESS',
    title: 'Submit Your Wedding Story',
    location: 'VELORA Real Brides Feature',
    brideName: 'Share Your Celebration',
    gownName: 'Be Featured in Our Journal',
    image: 'https://cdn-ikpogib.nitrocdn.com/MGUpaNLVABvmzbiIBhHBkHQesJxEWgVg/assets/images/optimized/rev-3e43be0/madilane.com/wp-content/uploads/elementor/thumbs/PALMER-@ashleelordmcmaster-Foy-and-Co-Photographer20-rdhplevmo9waq6in0fsyp2wq4sbgqul1jv0roazy1c-560x.jpeg',
    quote: 'Walked down the aisle in VELORA? Share your ceremony photographs and love story with our editorial concierge for upcoming lookbook spotlights.',
    highlights: ['Editorial Feature Submission', 'Photographer Credits', 'Global Bridal Community']
  },
  {
    slug: 'vogue-feature',
    category: 'COMMUNITY & PRESS',
    title: 'Vogue Weddings Feature',
    location: 'Editorial Press Spotlight',
    brideName: 'Architectural Bridal Tailoring',
    gownName: 'Legacy & Solara Capsules',
    image: '/images/bridal/signature-wendall.jpg',
    quote: 'Highlighted for architectural basque waist corsetry, lustrous silk Mikado pleats, and modern neck-scarf styling.',
    highlights: ['Architectural Drop Waists', 'Silk Mikado Craftsmanship', 'Runway Editorial']
  },
  {
    slug: 'brides-magazine',
    category: 'COMMUNITY & PRESS',
    title: 'Brides Magazine Editorial',
    location: 'Seasonal Couture Edit',
    brideName: 'Lightweight Luxury',
    gownName: 'French Lace & Soft Organza',
    image: '/images/bridal/signature-lissy.jpg',
    quote: 'Recognized for blending sculptural couture support with weightless comfort across inclusive US sizes 2 through 28.',
    highlights: ['Modern Minimalist Mikado', 'Effortless Movement', 'Inclusive Sizing']
  }
];

const REAL_BRIDE_ITEM_TO_PATH = {
  'CHÂTEAU DE CHANTILLY': '/real-brides/chateau-de-chantilly',
  'LAKE COMO VILLA': '/real-brides/lake-como-villa',
  'PARISIAN ROOFTOP': '/real-brides/parisian-rooftop',
  'TUSCAN COUNTRYSIDE': '/real-brides/tuscan-countryside',
  '2,400+ VERIFIED REVIEWS': '/real-brides/verified-reviews',
  'PHOTO GALLERY & VIDEOS': '/real-brides/photo-gallery',
  'TESTIMONIAL ARCHIVE': '/real-brides/testimonial-archive',
  'BRIDAL TRANSFORMATIONS': '/real-brides/bridal-transformations',
  'SUBMIT YOUR WEDDING': '/real-brides/submit-wedding',
  'VOGUE WEDDINGS FEATURE': '/real-brides/vogue-feature',
  'BRIDES MAGAZINE EDITORIAL': '/real-brides/brides-magazine',
  'ANNUAL LOOKBOOK': '/lookbook'
};

export const findRealBrideFeature = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.toLowerCase().trim();
  return REAL_BRIDE_FEATURES.find(f => f.slug === clean) || null;
};

/**
 * Resolves any Header mega-menu item to a dedicated URL path (or modal action for appointments).
 */
export const headerLinkFor = (featureKey, colTitle, item) => {
  if (featureKey === 'wedding-dresses') {
    if (item === 'NEW DRESSES') return { to: '/new-dresses' };
    if (item === 'SIGNATURE STYLES') return { to: '/signature-styles' };
    if (item === 'QUICK SHIP STYLES') return { to: '/quick-ship' };
    if (item === 'ALL DRESSES') return { to: '/dresses' };
    if (item === 'ALL COLLECTIONS') return { to: '/collections' };
    if (item === 'SIZE CHART') return { to: '/size-chart' };
    if (item === 'LOOKBOOKS' || item === 'LOOKBOOK') return { to: '/lookbook' };
    return { to: stylePathFor(item) };
  }

  if (featureKey === 'accessories') {
    return { to: accessoryPathFor(item) };
  }

  if (featureKey === 'about' || featureKey === 'our-story') {
    if (item === 'BOOK ATELIER FITTING') return { action: 'appointment' };
    if (item === 'CONTACT US' || item === 'FLAGSHIP BOUTIQUES' || item === 'CALL +1 (800) 892-LUXE') {
      return { to: '/our-story#story-contact-section' };
    }
    if (item === 'Q&A KNOWLEDGE BASE') return { to: '/our-story#story-qa' };
    if (item === 'FOR-BRIDES-FIRST') return { to: '/our-story#story-row-1' };
    if (item === 'CATALYST FOR CONFIDENCE') return { to: '/our-story#story-row-2' };
    if (item === 'EXPERTLY CRAFTED' || item === 'MEET THE DESIGNERS') return { to: '/our-story#story-row-3' };
    if (item === 'LIGHTWEIGHT WEARABILITY') return { to: '/our-story#story-row-4' };
    if (item === 'HAPPILY-EVER-AFTER') return { to: '/our-story#story-row-5' };
    if (item === 'AUSTRALIAN ATELIER') return { to: '/our-story#story-qa' };
    if (item === '10 YEARS VELORA') return { to: '/our-story#story-row-0' };
    return { to: '/our-story' };
  }

  if (featureKey === 'brides') {
    return { to: REAL_BRIDE_ITEM_TO_PATH[item] || '/real-brides' };
  }

  if (featureKey === 'contact') {
    if (colTitle && colTitle.includes('APPOINTMENT')) return { action: 'appointment' };
    return { to: '/our-story#story-contact-section' };
  }

  return { to: '/' };
};
