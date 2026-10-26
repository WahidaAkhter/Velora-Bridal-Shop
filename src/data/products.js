import { QUICK_SHIP_GOWNS } from './quickShipData.js';
import { VELORA_BRIDALS_DRESSES, VELORA_COLLECTION_INFO } from './veloraBridalsData.js';
import { ACCESSORY_PIECES, ACCESSORIES_NAV_DATA } from './accessoriesData.js';
import { LEGACY_COLLECTION_GOWNS } from './legacyCollectionData.js';
import { ALL_SHOP_DRESSES } from './allDressesData.js';

export { VELORA_BRIDALS_DRESSES, VELORA_COLLECTION_INFO, ACCESSORY_PIECES, ACCESSORIES_NAV_DATA, LEGACY_COLLECTION_GOWNS, ALL_SHOP_DRESSES };

export const CATEGORIES = [
  { id: 'all', name: 'All Collections', count: 224, icon: 'Sparkles' },
  { id: 'velora-bridals', name: 'VELORA Bridal Collection', count: 224, icon: 'Crown' },
  { id: 'Drop Waist', name: 'Drop Waist Silhouettes', count: 28, icon: 'Sparkles' },
  { id: 'Basque Waist', name: 'Basque Waist Silhouettes', count: 32, icon: 'Sparkles' },
  { id: 'Ball Gown', name: 'Ball Gown', count: 42, icon: 'Crown' },
  { id: 'A-Line', name: 'A-Line', count: 68, icon: 'Sparkles' },
  { id: 'Sheath', name: 'Sheath', count: 24, icon: 'Sparkles' },
  { id: 'Mermaid', name: 'Mermaid', count: 18, icon: 'Sparkles' },
  { id: 'quick-ship', name: 'Quick Ship Faster Delivery', count: 8, icon: 'Clock' },
  { id: 'featured', name: 'Featured Gowns', count: 4, icon: 'Crown' },
  { id: 'color-collection', name: 'Shop By Color', count: 5, icon: 'Palette' },
  { id: 'accessories', name: 'Bridal Accessories', count: 4, icon: 'Gem' }
];

export const COLOR_DRESSES = [
  {
    id: 'color-1',
    colorName: 'RUBY BURGUNDY',
    name: 'Ruby Sovereign Couture Gown',
    slug: 'ruby-sovereign-couture-gown',
    subtitle: 'Dramatic deep wine red with hand-beaded lace corset',
    price: 2550,
    image: '/images/bridal/color-burgundy.jpg',
    colorHex: '#6A1A24',
    category: 'color-collection',
    description: 'Sensational and deeply romantic. Deep ruby burgundy layers with hand-encrusted crystal beading across a structured corset bodice and an architectural ruffled train.'
  },
  {
    id: 'color-2',
    colorName: 'BLUSH PINK',
    name: 'Blush Pink Romance Gown',
    slug: 'blush-pink-romance-gown',
    subtitle: 'Romantic rose quartz tulle with structured corset',
    price: 2250,
    image: '/images/bridal/color-blush-pink.jpg',
    colorHex: '#E8C5C8',
    category: 'color-collection',
    description: 'Delicate blush tones embody modern romanticism with hand-ruched tulle, exposed boning, and petal-soft movement.'
  },
  {
    id: 'color-3',
    colorName: 'MIDNIGHT NAVY',
    name: 'Midnight Celestial Starlight Gown',
    slug: 'midnight-celestial-starlight-gown',
    subtitle: 'Starlight crystal beading on deep navy blue tulle',
    price: 2450,
    image: '/images/bridal/color-midnight-navy.jpg',
    colorHex: '#18233C',
    category: 'color-collection',
    description: 'Like a midnight sky dusted in constellations. Deep sapphire navy blue layers illuminated by hand-applied crystal shimmer and a regal off-shoulder neckline.'
  },
  {
    id: 'color-4',
    colorName: 'LAVENDER',
    name: 'Lavender Meadow Gown',
    slug: 'lavender-meadow-gown',
    subtitle: 'Whispering lilac layers with crystalline accents',
    price: 2280,
    image: '/images/bridal/color-lavender.jpg',
    colorHex: '#BFA8CE',
    category: 'color-collection',
    description: 'Infused with gentle lavender luminescence, this gown features an elongated train and sparkling beadwork.'
  },
  {
    id: 'color-5',
    colorName: 'IVORY',
    name: 'Ivory Royal Ballgown',
    slug: 'ivory-royal-ballgown',
    subtitle: 'Classic sweetheart neckline with cascading tulle',
    price: 2099,
    image: '/images/bridal/color-ivory.jpg',
    colorHex: '#FBF8F5',
    category: 'color-collection',
    description: 'A bridal archetype reimagined. Features a flattering sweetheart neckline, delicate spaghetti straps, and a sweeping ivory layered skirt tailored for quintessential elegance.'
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
  ...LEGACY_COLLECTION_GOWNS
];
