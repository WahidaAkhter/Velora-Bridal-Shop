import { QUICK_SHIP_GOWNS } from './quickShipData.js';
import { VELORA_BRIDALS_DRESSES, VELORA_COLLECTION_INFO } from './veloraBridalsData.js';
import { ACCESSORY_PIECES, ACCESSORIES_NAV_DATA } from './accessoriesData.js';
import { LEGACY_COLLECTION_GOWNS } from './legacyCollectionData.js';
import { ALL_SHOP_DRESSES } from './allDressesData.js';

export { VELORA_BRIDALS_DRESSES, VELORA_COLLECTION_INFO, ACCESSORY_PIECES, ACCESSORIES_NAV_DATA, LEGACY_COLLECTION_GOWNS, ALL_SHOP_DRESSES };

export const CATEGORIES = [
  { id: 'all', name: 'All Collections', count: 224, icon: 'Crown' },
  { id: 'velora-bridals', name: 'VELORA Bridal Collection', count: 224, icon: 'Crown' },
  { id: 'Drop Waist', name: 'Drop Waist Silhouettes', count: 28, icon: 'Crown' },
  { id: 'Basque Waist', name: 'Basque Waist Silhouettes', count: 32, icon: 'Crown' },
  { id: 'Ball Gown', name: 'Ball Gown', count: 42, icon: 'Crown' },
  { id: 'A-Line', name: 'A-Line', count: 68, icon: 'Heart' },
  { id: 'Sheath', name: 'Sheath', count: 24, icon: 'Gem' },
  { id: 'Mermaid', name: 'Mermaid', count: 18, icon: 'Heart' },
  { id: 'quick-ship', name: 'Quick Ship Faster Delivery', count: 8, icon: 'Clock' },
  { id: 'featured', name: 'Featured Gowns', count: 4, icon: 'Crown' },
  { id: 'color-collection', name: 'Shop By Color', count: 5, icon: 'Palette' },
  { id: 'accessories', name: 'Bridal Accessories', count: 4, icon: 'Gem' }
];

export const COLOR_DRESSES = [
  {
    id: 'rc-nylan',
    colorName: 'NYLAN',
    name: 'NYLAN Princess Wedding Dress',
    slug: 'nylan-princess-wedding-dress',
    subtitle: 'Square neckline with delicate lace embroidery and royal ballgown skirt',
    price: 2450,
    image: '/images/bridal/rosa-clara/nylan.jpg',
    colorHex: '#FAF8F5',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. A refined square neckline complemented by intricate floral lace applique on a sculptural princess ballgown skirt.'
  },
  {
    id: 'rc-nupcia',
    colorName: 'NUPCIA',
    name: 'NUPCIA Princess Wedding Dress',
    slug: 'nupcia-princess-wedding-dress',
    subtitle: 'Off-the-shoulder straps with dramatic cathedral train and lace applique',
    price: 2650,
    image: '/images/bridal/rosa-clara/nupcia.jpg',
    colorHex: '#F5EFE8',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Sophisticated off-the-shoulder styling with an open back and magnificent cascading cathedral lace train.'
  },
  {
    id: 'rc-nylo',
    colorName: 'NYLO',
    name: 'NYLO Princess Bubble Mini Gown',
    slug: 'nylo-princess-bubble-mini-gown',
    subtitle: 'Couture rosette off-the-shoulder neckline with chic bubble silhouette',
    price: 2180,
    image: '/images/bridal/rosa-clara/nylo.jpg',
    colorHex: '#FFFFFF',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Fashion-forward bridal silhouette crafted with sculpted organza rosettes and a modern bubble hem.'
  },
  {
    id: 'rc-alamo',
    colorName: 'ALAMO',
    name: 'ALAMO Princess Wedding Dress',
    slug: 'alamo-princess-wedding-dress',
    subtitle: 'Floral beaded bodice with square neckline and ethereal tulle skirt',
    price: 2550,
    image: '/images/bridal/rosa-clara/alamo.jpg',
    colorHex: '#F0EBE5',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Radiant hand-applied crystal beading and dimensional botanical petals over a voluminous tulle ballgown.'
  },
  {
    id: 'rc-aldana',
    colorName: 'ALDANA',
    name: 'ALDANA Princess Ballgown',
    slug: 'aldana-princess-ballgown',
    subtitle: 'Regal ballroom silhouette with crystal embellishments and grand train',
    price: 2750,
    image: '/images/bridal/rosa-clara/aldana.jpg',
    colorHex: '#F7F4EF',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Designed for grand ballroom celebrations with sparkling beadwork, architectural corsetry, and majestic volume.'
  },
  {
    id: 'rc-sonel',
    colorName: 'SONEL',
    name: 'SONEL Couture Princess Gown',
    slug: 'sonel-couture-princess-gown',
    subtitle: 'Monochrome couture drama with sculptural seaming',
    price: 2600,
    image: '/images/bridal/rosa-clara/sonel.jpg',
    colorHex: '#F8F6F2',
    category: 'color-collection',
    description: 'Rosa Clará Couture Collection. Minimalist opulence defined by clean sculptural architecture and commanding ballgown presence.'
  },
  {
    id: 'rc-amatista',
    colorName: 'AMATISTA',
    name: 'AMATISTA Princess Wedding Dress',
    slug: 'amatista-princess-wedding-dress',
    subtitle: 'Romantic lace bodice with cascading horsehair hem and royal chapel train',
    price: 2480,
    image: '/images/bridal/rosa-clara/amatista.jpg',
    colorHex: '#F4ECE4',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Fairytale romance rendered in delicate scalloped lace and ethereal floating tulle layers.'
  },
  {
    id: 'rc-nirvana',
    colorName: 'NIRVANA',
    name: 'NIRVANA Princess Wedding Dress',
    slug: 'nirvana-princess-wedding-dress',
    subtitle: 'Classic sweetheart neckline with contemporary basque drop waist',
    price: 2390,
    image: '/images/bridal/rosa-clara/nirvana.jpg',
    colorHex: '#FBF8F5',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Heritage Basque waist corsetry pairs with a romantic sweetheart decolletage and grand cascading skirt.'
  },
  {
    id: 'rc-susana',
    colorName: 'SUSANA',
    name: 'SUSANA Princess Gown',
    slug: 'susana-princess-wedding-dress',
    subtitle: 'Long illusion lace sleeves with scalloped ballgown train',
    price: 2680,
    image: '/images/bridal/rosa-clara/susana.jpg',
    colorHex: '#F9F7F4',
    category: 'color-collection',
    description: 'Rosa Clará Couture Collection. Regal long illusion lace sleeves with botanical embroidery and an elongated royal train.'
  },
  {
    id: 'rc-amapola',
    colorName: 'AMAPOLA',
    name: 'AMAPOLA Princess Ballgown',
    slug: 'amapola-princess-ballgown',
    subtitle: 'Drop waist ballgown with hand-beaded lace appliques',
    price: 2520,
    image: '/images/bridal/rosa-clara/amapola.jpg',
    colorHex: '#F6F2ED',
    category: 'color-collection',
    description: 'Rosa Clará Princess Collection. Dramatic drop waist silhouette with floral appliques floating down shimmering tulle layers.'
  }
];

export const PRODUCTS = [
  ...ALL_SHOP_DRESSES,
  ...VELORA_BRIDALS_DRESSES,
  ...ACCESSORY_PIECES,
  {
    id: 'prod-1',
    name: 'LACE DREAM GOWN',
    slug: 'lace-dream-gown',
    subtitle: 'Intricate lace with a royal train',
    category: 'featured',
    categoryName: 'Featured Collection',
    price: 2199.00,
    originalPrice: 2499.00,
    rating: 5.0,
    reviewCount: 48,
    badge: 'Royal Edition',
    isNew: true,
    isBestseller: true,
    stock: 6,
    description: 'Crafted with royal distinction, the Lace Dream Gown showcases intricate hand-embroidered French corded lace over sheer illusion tulle, an open V-back, and a showstopping cathedral royal train.',
    images: [
      '/images/bridal/featured-lace-dream.jpg',
      '/images/bridal/hero-bride-clean.jpg'
    ],
    variants: [
      { id: 'v1-1', name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: 2199.00, stock: 2, sku: 'LACE-02' },
      { id: 'v1-2', name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: 2199.00, stock: 3, sku: 'LACE-04' },
      { id: 'v1-3', name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: 2199.00, stock: 2, sku: 'LACE-06' },
      { id: 'v1-4', name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: 2199.00, stock: 4, sku: 'LACE-08' },
      { id: 'v1-5', name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: 2199.00, stock: 1, sku: 'LACE-10' }
    ],
    attributes: {
      'Silhouette': 'A-Line / Cathedral Royal Train',
      'Fabric': 'French Corded Chantilly Lace & Italian Tulle',
      'Neckline': 'Plunging V-Neck with Sheer Modesty Mesh',
      'Back Detail': 'Low V-Back with Silk Covered Buttons',
      'Train Length': 'Cathedral (75 inches)',
      'Origin': 'Handcrafted in Paris Atelier',
      'Alterations': 'Complimentary boutique alteration consultation'
    },
    reviews: [
      { id: 'r1', name: 'Sarah J.', avatar: '/images/bridal/avatars.png', rating: 5, date: '1 week ago', comment: 'The best bridal experience ever! They made my dream come true. The train was breathtaking.', verified: true },
      { id: 'r2', name: 'Emily C.', avatar: '/images/bridal/avatars.png', rating: 5, date: '3 weeks ago', comment: 'The lace quality in person is stunning. Fits like a glove.', verified: true }
    ]
  },
  {
    id: 'prod-2',
    name: 'SATIN ELEGANCE',
    slug: 'satin-elegance',
    subtitle: 'Minimalist satin for timeless beauty',
    category: 'featured',
    categoryName: 'Featured Collection',
    price: 1899.00,
    originalPrice: 2100.00,
    rating: 4.9,
    reviewCount: 62,
    badge: 'Timeless Classic',
    isNew: false,
    isBestseller: true,
    stock: 8,
    description: 'Sculpted from luminous Italian Mikado silk satin, featuring a romantic portrait off-the-shoulder neckline, structured interior corset, and an expansive pleated ballgown skirt with hidden pockets.',
    images: [
      '/images/bridal/featured-satin-elegance.jpg',
      '/images/bridal/color-ivory.jpg'
    ],
    variants: [
      { id: 'v2-1', name: 'US Size 2 / Pearl Ivory', color: 'Pearl Ivory', colorHex: '#FAF7F2', size: 'US 2', price: 1899.00, stock: 2, sku: 'SAT-02' },
      { id: 'v2-2', name: 'US Size 4 / Pearl Ivory', color: 'Pearl Ivory', colorHex: '#FAF7F2', size: 'US 4', price: 1899.00, stock: 4, sku: 'SAT-04' },
      { id: 'v2-3', name: 'US Size 6 / Pearl Ivory', color: 'Pearl Ivory', colorHex: '#FAF7F2', size: 'US 6', price: 1899.00, stock: 3, sku: 'SAT-06' },
      { id: 'v2-4', name: 'US Size 8 / Pearl Ivory', color: 'Pearl Ivory', colorHex: '#FAF7F2', size: 'US 8', price: 1899.00, stock: 2, sku: 'SAT-08' }
    ],
    attributes: {
      'Silhouette': 'Grand Ballgown with Box Pleats',
      'Fabric': 'Heavy Lustrous Italian Mikado Satin',
      'Neckline': 'Off-the-Shoulder Portrait Sweetheart',
      'Closure': 'Concealed Zipper with Silk Covered Buttons',
      'Pockets': 'Hidden Side-Seam Pockets',
      'Origin': 'Milan, Italy',
      'Alterations': 'Custom tailored waist and hem'
    },
    reviews: [
      { id: 'r3', name: 'Jessica M.', avatar: '/images/bridal/avatars.png', rating: 5, date: '2 weeks ago', comment: 'Pure royal elegance. The fabric has a luxurious weight and looks immaculate in photos.', verified: true }
    ]
  },
  {
    id: 'prod-3',
    name: 'FLORAL FANTASY',
    slug: 'floral-fantasy',
    subtitle: '3D floral details for a magical look',
    category: 'featured',
    categoryName: 'Featured Collection',
    price: 2299.00,
    originalPrice: 2599.00,
    rating: 5.0,
    reviewCount: 74,
    badge: 'Trending Dream',
    isNew: true,
    isBestseller: true,
    stock: 5,
    description: 'A magical haute-couture masterpiece adorned with thousands of individually sewn 3D organza petals, micro crystal beading, and a sensual front slit that creates mesmerizing movement.',
    images: [
      '/images/bridal/featured-floral-fantasy.jpg',
      '/images/bridal/hero-bride-clean.jpg'
    ],
    variants: [
      { id: 'v3-1', name: 'US Size 2 / Champagne Ivory', color: 'Champagne Ivory', colorHex: '#F6EFEB', size: 'US 2', price: 2299.00, stock: 1, sku: 'FLR-02' },
      { id: 'v3-2', name: 'US Size 4 / Champagne Ivory', color: 'Champagne Ivory', colorHex: '#F6EFEB', size: 'US 4', price: 2299.00, stock: 3, sku: 'FLR-04' },
      { id: 'v3-3', name: 'US Size 6 / Champagne Ivory', color: 'Champagne Ivory', colorHex: '#F6EFEB', size: 'US 6', price: 2299.00, stock: 2, sku: 'FLR-06' },
      { id: 'v3-4', name: 'US Size 8 / Champagne Ivory', color: 'Champagne Ivory', colorHex: '#F6EFEB', size: 'US 8', price: 2299.00, stock: 2, sku: 'FLR-08' }
    ],
    attributes: {
      'Silhouette': 'Romantic Ballgown with Front Slit',
      'Fabric': 'Multi-layer Whisper Tulle & Organza Appliqués',
      'Neckline': 'Sweetheart with Micro-Crystal Straps',
      'Embellishments': 'Over 3,000 Hand-Applied 3D Petals',
      'Train Length': 'Chapel Train (60 inches)',
      'Origin': 'Florence, Italy'
    },
    reviews: [
      { id: 'r4', name: 'Amanda L.', avatar: '/images/bridal/avatars.png', rating: 5, date: '4 days ago', comment: 'I felt like a real-life fairy tale princess. Everyone was in awe of the 3D flowers!', verified: true }
    ]
  },
  {
    id: 'prod-4',
    name: 'MODERN ROMANCE',
    slug: 'modern-romance',
    subtitle: 'Sleek silhouette with modern lace',
    category: 'featured',
    categoryName: 'Featured Collection',
    price: 1999.00,
    originalPrice: 2299.00,
    rating: 4.9,
    reviewCount: 39,
    badge: 'Editor Choice',
    isNew: false,
    isBestseller: true,
    stock: 7,
    description: 'Sleek, body-contouring sheath gown featuring an illusion low back, delicate illusion lace long sleeves, and a sculpted train that flows into modern botanical lace motifs.',
    images: [
      '/images/bridal/featured-modern-romance.jpg',
      '/images/bridal/hero-bride-clean.jpg'
    ],
    variants: [
      { id: 'v4-1', name: 'US Size 2 / Soft Ivory', color: 'Soft Ivory', colorHex: '#FAF7F2', size: 'US 2', price: 1999.00, stock: 2, sku: 'MOD-02' },
      { id: 'v4-2', name: 'US Size 4 / Soft Ivory', color: 'Soft Ivory', colorHex: '#FAF7F2', size: 'US 4', price: 1999.00, stock: 3, sku: 'MOD-04' },
      { id: 'v4-3', name: 'US Size 6 / Soft Ivory', color: 'Soft Ivory', colorHex: '#FAF7F2', size: 'US 6', price: 1999.00, stock: 2, sku: 'MOD-06' },
      { id: 'v4-4', name: 'US Size 8 / Soft Ivory', color: 'Soft Ivory', colorHex: '#FAF7F2', size: 'US 8', price: 1999.00, stock: 2, sku: 'MOD-08' }
    ],
    attributes: {
      'Silhouette': 'Modern Fitted Sheath / Mermaid',
      'Fabric': 'Luxe Heavy Crepe & Illusion Chantilly Lace',
      'Sleeves': 'Full-length Illusion Lace Sleeves',
      'Back Detail': 'Dramatic Low Scoop Back',
      'Train Length': 'Sweeping Puddle Train (45 inches)',
      'Origin': 'New York Bridal Atelier'
    },
    reviews: [
      { id: 'r5', name: 'Claire H.', avatar: '/images/bridal/avatars.png', rating: 5, date: '1 month ago', comment: 'The back and sleeves are absolute perfection. Modern, chic, and unforgettable.', verified: true }
    ]
  },
  ...COLOR_DRESSES.map((cd, index) => ({
    id: `prod-color-${index + 1}`,
    name: cd.name,
    slug: cd.slug,
    subtitle: cd.subtitle,
    category: 'color-collection',
    categoryName: `Color Gowns (${cd.colorName})`,
    price: cd.price,
    originalPrice: cd.price + 250,
    rating: 4.9,
    reviewCount: 28 + index * 4,
    badge: cd.colorName,
    isNew: index % 2 === 0,
    isBestseller: index < 3,
    stock: 5,
    description: cd.description,
    images: [cd.image, '/images/bridal/hero-bride-clean.jpg'],
    variants: [
      { id: `vc-${index}-2`, name: `US Size 2 / ${cd.colorName}`, color: cd.colorName, colorHex: cd.colorHex, size: 'US 2', price: cd.price, stock: 2, sku: `CLR-${index}-02` },
      { id: `vc-${index}-4`, name: `US Size 4 / ${cd.colorName}`, color: cd.colorName, colorHex: cd.colorHex, size: 'US 4', price: cd.price, stock: 3, sku: `CLR-${index}-04` },
      { id: `vc-${index}-6`, name: `US Size 6 / ${cd.colorName}`, color: cd.colorName, colorHex: cd.colorHex, size: 'US 6', price: cd.price, stock: 2, sku: `CLR-${index}-06` }
    ],
    attributes: {
      'Silhouette': 'A-Line / Ballgown',
      'Color Tone': cd.colorName,
      'Fabric': 'Multi-Tiered Soft Tulle & Satin Underlay',
      'Origin': 'Boutique Collection',
      'Care': 'Specialty Bridal Dry Clean Only'
    },
    reviews: [
      { id: `rc-${index}`, name: 'Verified Bride', avatar: '/images/bridal/avatars.png', rating: 5, date: 'Recently', comment: `The color is so magical in person! Everyone loved it.`, verified: true }
    ]
  })),
  ...QUICK_SHIP_GOWNS.map((gown) => ({
    id: gown.id,
    name: gown.name,
    slug: gown.slug,
    subtitle: gown.subtitle,
    category: 'quick-ship',
    categoryName: 'Quick Ship Faster Delivery',
    price: gown.price,
    originalPrice: gown.originalPrice,
    rating: 5.0,
    reviewCount: 38,
    badge: 'Quick Ship (2–3 Wks)',
    isNew: true,
    isBestseller: true,
    stock: 4,
    description: gown.description,
    images: gown.images,
    videoUrl: gown.videoUrl,
    variants: [
      { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
      { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
      { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
      { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
      { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 2, sku: `${gown.id}-10` },
      { id: `${gown.id}-v5`, name: 'US Size 12 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 12', price: gown.price, stock: 1, sku: `${gown.id}-12` }
    ],
    attributes: {
      'Silhouette': gown.silhouette,
      'Fabrication': gown.fabric,
      'Neckline': gown.neckline,
      'Sleeves': gown.sleeves,
      'Train Length': gown.train,
      'Back Detail': gown.back,
      'Internal Structure': gown.boning,
      'Production Timeline': 'Quick Ship (2–3 Weeks Express Delivery)',
      'Collection': gown.collection
    },
    reviews: [
      {
        id: `rev-${gown.id}-1`,
        name: 'Sophie L.',
        avatar: '/images/bridal/avatars.png',
        rating: 5,
        date: '2 weeks ago',
        comment: `Ordered with Quick Ship for our destination wedding in Positano and it arrived in exactly 18 days! The quality, inner corset support, and craftsmanship are breathtaking.`,
        verified: true
      }
    ]
  })),
  ...LEGACY_COLLECTION_GOWNS,
  ...ACCESSORY_PIECES
];
