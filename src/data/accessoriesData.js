/**
 * Authentic Bridal Accessories Data
 * Veils, Trains, Jackets/Shrugs, Capes, Scarves, Gloves, Belts, Neck Collars.
 */

import { SASHES_PRODUCTS } from './sashesData.js';

export const ACCESSORY_PIECES = [
  // 1. VEILS
  {
    id: 'acc-veil-cathedral-01',
    name: 'V098C Cathedral Floral Lace Veil',
    code: 'V098C',
    slug: 'v098c-cathedral-floral-lace-veil',
    subtitle: '108-inch French illusion tulle with botanical scalloped lace edge',
    category: 'accessories',
    accessoryType: 'Veils',
    price: 520,
    originalPrice: 650,
    rating: 5.0,
    reviewCount: 34,
    badge: 'Atelier Icon',
    isNew: true,
    isBestseller: true,
    stock: 6,
    silhouette: 'Cathedral Veil',
    tags: ['Accessories', 'Veils', 'Lace', 'New Collection'],
    images: [
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/V098C-A1472-01.jpg?v=1778617507',
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/V098C-A1472-02.jpg?v=1778617507',
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/V098C-A1472-03.jpg?v=1778617507'
    ],
    description: 'Cathedral-length veil with hand-cut French lace detailing designed to trail majestically down the aisle. Crafted from sheer weightless illusion tulle that catches the light and billows with every step.',
    colors: ['Ivory', 'Pearl White'],
    variants: [
      { id: 'v-veil-1-iv', name: 'Cathedral 108" / Ivory', color: 'Ivory', size: '108"', price: 520, stock: 3 },
      { id: 'v-veil-1-pw', name: 'Cathedral 108" / Pearl White', color: 'Pearl White', size: '108"', price: 520, stock: 3 }
    ],
    attributes: {
      'Accessory Type': 'Veil',
      'Length': '108" Cathedral Length',
      'Attachment': 'Hand-sewn Rhodium Metal Comb',
      'Fabrication': 'French Illusion Tulle & Guipure Lace'
    }
  },
  {
    id: 'acc-veil-pearl-02',
    name: 'V40 Luminous Pearl Droplet Veil',
    code: 'V40',
    slug: 'v40-luminous-pearl-droplet-veil',
    subtitle: 'Chapel length with graduated scatterings of baroque freshwater pearls',
    category: 'accessories',
    accessoryType: 'Veils',
    price: 440,
    originalPrice: 490,
    rating: 4.9,
    reviewCount: 22,
    badge: 'Popular',
    isNew: true,
    isBestseller: true,
    stock: 5,
    silhouette: 'Chapel Veil',
    tags: ['Accessories', 'Veils', 'Pearl', 'Modern'],
    images: [
      '/images/bridal/accessory-pearl-veil.jpg',
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/V098C-A1472-02.jpg?v=1778617507'
    ],
    description: 'A whisper-light chapel veil showered in hand-pinned luminous pearls that diminish gently towards the crown. Creates a floating constellation effect around the bride.',
    colors: ['Ivory'],
    variants: [
      { id: 'v-veil-2-iv', name: 'Chapel 90" / Ivory', color: 'Ivory', size: '90"', price: 440, stock: 5 }
    ],
    attributes: {
      'Accessory Type': 'Veil',
      'Length': '90" Chapel Length',
      'Attachment': 'Comfort Grip Bridal Comb',
      'Fabrication': 'Silk Illusion Tulle & Freshwater Pearls'
    }
  },

  // 2. TRAINS
  {
    id: 'acc-train-a1478t',
    name: 'A1478T Sculpted Royal Detachable Train',
    code: 'A1478T',
    slug: 'a1478t-sculpted-royal-detachable-train',
    subtitle: 'Cathedral mikado extension with architectural waist attachment',
    category: 'accessories',
    accessoryType: 'Trains',
    price: 680,
    originalPrice: 780,
    rating: 5.0,
    reviewCount: 18,
    badge: 'Convertible Drama',
    isNew: true,
    isBestseller: true,
    stock: 4,
    silhouette: 'Detachable Train',
    tags: ['Accessories', 'Trains', 'Mikado', 'New Collection'],
    images: [
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1478T-Studio-01.jpg?v=1778617541',
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1478-Studio-01.jpg?v=1778617541'
    ],
    description: 'Transform your ceremony into a royal spectacle. This structured Mikado train snaps seamlessly into hidden interior hooks, fanning out into an expansive 85-inch regal train that easily unhooks for dancing.',
    colors: ['Ivory', 'Off-White'],
    variants: [
      { id: 'v-tr-1-iv', name: 'Standard / Ivory', color: 'Ivory', size: 'One Size', price: 680, stock: 2 },
      { id: 'v-tr-1-ow', name: 'Standard / Off-White', color: 'Off-White', size: 'One Size', price: 680, stock: 2 }
    ],
    attributes: {
      'Accessory Type': 'Train',
      'Length': '85" From Waist',
      'Fastening': 'Reinforced Hidden Hook & Eye Snaps',
      'Fabrication': 'Luminous Stretch Silk Mikado'
    }
  },
  {
    id: 'acc-train-sk111',
    name: 'SK111 Frosted Tulle Overskirt Train',
    code: 'SK111',
    slug: 'sk111-frosted-tulle-overskirt-train',
    subtitle: 'Dramatic 360-degree layered ballgown overskirt with waistband',
    category: 'accessories',
    accessoryType: 'Trains',
    price: 720,
    originalPrice: 850,
    rating: 4.8,
    reviewCount: 15,
    badge: 'Statement Piece',
    isNew: false,
    isBestseller: true,
    stock: 3,
    silhouette: 'Overskirt',
    tags: ['Accessories', 'Trains', 'Tulle', 'Glitter'],
    images: [
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/SK111-B48-A1410-01.jpg?v=1761851696',
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1499T-Studio-01.jpg?v=1778617542'
    ],
    description: 'Slip from sleek column silhouette to a grand fairy-tale ballgown in seconds. Made of multi-layered sparkle tulle that cascades over your dress with a satin waistband.',
    colors: ['Ivory'],
    variants: [
      { id: 'v-sk111-s', name: 'US 4-6 / Ivory', color: 'Ivory', size: 'US 4-6', price: 720, stock: 2 },
      { id: 'v-sk111-m', name: 'US 8-10 / Ivory', color: 'Ivory', size: 'US 8-10', price: 720, stock: 1 }
    ],
    attributes: {
      'Accessory Type': 'Train / Overskirt',
      'Length': '78" Trailing Hem',
      'Fabrication': 'Glimmer Sparkle Tulle & Organza'
    }
  },

  // 3. JACKETS/SHRUGS
  {
    id: 'acc-jacket-a1408j',
    name: 'A1408J Mock-Neck Botanical Lace Jacket',
    code: 'A1408J',
    slug: 'a1408j-mock-neck-botanical-lace-jacket',
    subtitle: 'Illusion mock-neck long-sleeve jacket with covered satin buttons',
    category: 'accessories',
    accessoryType: 'Jackets/Shrugs',
    price: 490,
    originalPrice: 560,
    rating: 5.0,
    reviewCount: 26,
    badge: 'Modest Ceremony',
    isNew: true,
    isBestseller: true,
    stock: 5,
    silhouette: 'Bridal Jacket',
    tags: ['Accessories', 'Jackets/Shrugs', 'Lace', 'Long Sleeve'],
    images: [
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1408J-Studio-01.jpg?v=1761851890',
      'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1408-Studio-01.jpg?v=1761851889'
    ],
    description: 'Designed to layer seamlessly over strapless or sweetheart gowns for sacred ceremonies. Features delicate floral lace trailing along illusion sleeves, high neckline, and down the spine with silk-covered buttons.',
    colors: ['Ivory'],
    variants: [
      { id: 'v-jk-s', name: 'Small (US 2-4) / Ivory', color: 'Ivory', size: 'S', price: 490, stock: 2 },
      { id: 'v-jk-m', name: 'Medium (US 6-8) / Ivory', color: 'Ivory', size: 'M', price: 490, stock: 2 },
      { id: 'v-jk-l', name: 'Large (US 10-12) / Ivory', color: 'Ivory', size: 'L', price: 490, stock: 1 }
    ],
    attributes: {
      'Accessory Type': 'Jacket / Shrug',
      'Sleeve Length': 'Full Long Sleeve',
      'Neckline': 'Illusion Mock Neck',
      'Closure': 'Self-Covered Buttons'
    }
  },

  // 4. CAPES
  {
    id: 'acc-cape-celestial',
    name: 'Celestial Wings Watteau Tulle Cape',
    code: 'CP-01',
    slug: 'celestial-wings-watteau-tulle-cape',
    subtitle: 'Dual shoulder-attached sheer capelets that flutter like angel wings',
    category: 'accessories',
    accessoryType: 'Capes',
    price: 410,
    originalPrice: 480,
    rating: 4.9,
    reviewCount: 19,
    badge: 'Modern Veil Alternative',
    isNew: true,
    isBestseller: false,
    stock: 4,
    silhouette: 'Bridal Cape',
    tags: ['Accessories', 'Capes', 'Tulle', 'Boho'],
    images: [
      '/images/bridal/accessory-watteau-cape.jpg'
    ],
    description: 'The modern bride’s breathtaking veil alternative. Fastens discreetly onto dress shoulder straps and cascades down 90 inches into soft, wind-blown ripples behind your steps.',
    colors: ['Ivory', 'Champagne'],
    variants: [
      { id: 'v-cp-iv', name: 'One Size / Ivory', color: 'Ivory', size: 'One Size', price: 410, stock: 3 },
      { id: 'v-cp-ch', name: 'One Size / Champagne', color: 'Champagne', size: 'One Size', price: 410, stock: 1 }
    ],
    attributes: {
      'Accessory Type': 'Cape',
      'Length': '90" Trailing Edge',
      'Fastening': 'Discreet Magnetic Shoulder Snaps'
    }
  },

  // 5. SCARVES
  {
    id: 'acc-scarf-crepe',
    name: 'Aurelia Minimalist Silk Crepe Neck Scarf',
    code: 'SC-02',
    slug: 'aurelia-minimalist-silk-crepe-neck-scarf',
    subtitle: 'Chic 70s Parisian neck wrap with floor-length floating tails',
    category: 'accessories',
    accessoryType: 'Scarves',
    price: 240,
    originalPrice: 290,
    rating: 5.0,
    reviewCount: 14,
    badge: 'Editorial Trend',
    isNew: true,
    isBestseller: true,
    stock: 7,
    silhouette: 'Bridal Scarf',
    tags: ['Accessories', 'Scarves', 'Crepe', 'Modern', 'Minimalist'],
    images: [
      '/images/bridal/accessory-silk-scarf.jpg'
    ],
    description: 'Minimal and ultra-refined, this fluid silk crepe scarf wraps softly around the collar and flows behind the shoulders for high-fashion runway sophistication.',
    colors: ['Ivory', 'Soft White'],
    variants: [
      { id: 'v-sc-iv', name: 'One Size / Ivory', color: 'Ivory', size: 'One Size', price: 240, stock: 4 },
      { id: 'v-sc-sw', name: 'One Size / Soft White', color: 'Soft White', size: 'One Size', price: 240, stock: 3 }
    ],
    attributes: {
      'Accessory Type': 'Scarf',
      'Length': '96" Length x 4" Width',
      'Fabrication': '100% Heavy Matte Silk Crepe'
    }
  },

  // 6. GLOVES
  {
    id: 'acc-gloves-opera',
    name: 'Seraphina French Chantilly Opera Gloves',
    code: 'GL-03',
    slug: 'seraphina-french-chantilly-opera-gloves',
    subtitle: 'Elbow-length sheer Chantilly lace gloves with scalloped hem',
    category: 'accessories',
    accessoryType: 'Gloves',
    price: 260,
    originalPrice: 320,
    rating: 4.9,
    reviewCount: 31,
    badge: 'Bridal Couture',
    isNew: true,
    isBestseller: true,
    stock: 8,
    silhouette: 'Opera Gloves',
    tags: ['Accessories', 'Gloves', 'Lace', 'Vintage'],
    images: [
      '/images/bridal/accessory-opera-gloves.jpg'
    ],
    description: 'Evoke old-world glamour. Crafted from sheer stretch lace that clings effortlessly to the forearms, reaching past the elbow with intricate floral scalloping.',
    colors: ['Ivory'],
    variants: [
      { id: 'v-gl-s', name: 'Size S/M / Ivory', color: 'Ivory', size: 'S/M', price: 260, stock: 4 },
      { id: 'v-gl-l', name: 'Size M/L / Ivory', color: 'Ivory', size: 'M/L', price: 260, stock: 4 }
    ],
    attributes: {
      'Accessory Type': 'Gloves',
      'Length': '22" Opera Over-the-Elbow',
      'Material': 'French Stretch Floral Lace'
    }
  },

  // 7. BELTS & SASHES (VELORA Signature Collection)
  ...SASHES_PRODUCTS,
  {
    id: 'acc-belt-crystal',
    name: 'Valeria Hand-Embroidered Crystal & Pearl Sash',
    code: 'BT-04',
    slug: 'valeria-hand-embroidered-crystal-pearl-sash',
    subtitle: 'Marquise Swarovski crystals and seed pearls on double-faced satin',
    category: 'accessories',
    accessoryType: 'Belts',
    price: 290,
    originalPrice: 350,
    rating: 4.8,
    reviewCount: 20,
    badge: 'Waist Cinch',
    isNew: false,
    isBestseller: true,
    stock: 6,
    silhouette: 'Bridal Belt',
    tags: ['Accessories', 'Belts', 'Crystal', 'Pearl'],
    images: [
      '/images/bridal/accessory-crystal-pearl-belt.jpg'
    ],
    description: 'Accentuate your waistline with dazzling radiance. Hand-wired with luminous crystals and tiny seed pearls, mounted onto silk satin ribbons that tie in an effortless bow at the spine.',
    colors: ['Ivory Satin', 'Champagne Satin'],
    variants: [
      { id: 'v-bt-iv', name: 'One Size / Ivory', color: 'Ivory Satin', size: 'One Size', price: 290, stock: 3 },
      { id: 'v-bt-ch', name: 'One Size / Champagne', color: 'Champagne Satin', size: 'One Size', price: 290, stock: 3 }
    ],
    attributes: {
      'Accessory Type': 'Belt / Sash',
      'Embellishment Width': '1.5" Center Crest',
      'Ribbon Length': '108" Tie Ribbon'
    }
  },

  // 8. NECK COLLARS
  {
    id: 'acc-collar-pearl',
    name: 'Helena Baroque Pearl & Guipure High Collar',
    code: 'NC-05',
    slug: 'helena-baroque-pearl-guipure-high-collar',
    subtitle: 'Victorian-inspired architectural choker collar with floating pearl droplets',
    category: 'accessories',
    accessoryType: 'Neck Collars',
    price: 320,
    originalPrice: 380,
    rating: 5.0,
    reviewCount: 17,
    badge: 'Regal Statement',
    isNew: true,
    isBestseller: false,
    stock: 5,
    silhouette: 'Neck Collar',
    tags: ['Accessories', 'Neck Collars', 'Pearl', 'Lace', 'High Neck'],
    images: [
      '/images/bridal/accessory-pearl-collar.jpg'
    ],
    description: 'A regal couture focal point. This high choker collar frames the jawline in hand-beaded guipure lace, with shimmering baroque pearl droplets that sway with your every smile.',
    colors: ['Ivory & Pearl'],
    variants: [
      { id: 'v-nc-1', name: 'Adjustable 12"-14" / Ivory', color: 'Ivory', size: '12"-14"', price: 320, stock: 5 }
    ],
    attributes: {
      'Accessory Type': 'Neck Collar',
      'Closure': 'Adjustable Sterling Silver Extender',
      'Embellishment': 'Natural Freshwater Pearls & Glass Beads'
    }
  },

  // 9. CORSETS & DETACHABLE SLEEVES
  {
    id: 'acc-corset-boned',
    name: 'Sovereign 14-Bone Sheer Bridal Corset Bodice',
    code: 'CR-06',
    slug: 'sovereign-14-bone-sheer-bridal-corset-bodice',
    subtitle: 'Exposed spiraled-steel couture boning in French Chantilly lace',
    category: 'accessories',
    accessoryType: 'Corsets',
    price: 580,
    originalPrice: 680,
    rating: 5.0,
    reviewCount: 24,
    badge: 'Sculpted Separate',
    isNew: true,
    isBestseller: true,
    stock: 5,
    silhouette: 'Bridal Corset',
    tags: ['Accessories', 'Corsets', 'Bodice', 'Lace', 'Boning'],
    images: [
      '/images/bridal/accessory-bridal-corset.jpg'
    ],
    description: 'A tailored bridal corset separate engineered with 14 flexible couture bones and scalloped Chantilly lace panels. Pair with silk crepe column skirts or voluminous tulle overskirts for a two-piece atelier silhouette.',
    colors: ['Ivory'],
    variants: [
      { id: 'v-cr-s', name: 'US 4-6 / Ivory', color: 'Ivory', size: 'US 4-6', price: 580, stock: 2 },
      { id: 'v-cr-m', name: 'US 8-10 / Ivory', color: 'Ivory', size: 'US 8-10', price: 580, stock: 3 }
    ],
    attributes: {
      'Accessory Type': 'Corset Separate',
      'Structure': '14-Piece Internal Couture Boning',
      'Fabrication': 'French Chantilly Lace & Illusion Mesh'
    }
  },
  {
    id: 'acc-sleeves-pearl',
    name: 'Celeste Detachable Pearl-Beaded Tulle Sleeves',
    code: 'SL-07',
    slug: 'celeste-detachable-pearl-beaded-tulle-sleeves',
    subtitle: 'Sheer fitted arm sleeves hand-encrusted with luminous micro-pearls',
    category: 'accessories',
    accessoryType: 'Sleeves',
    price: 340,
    originalPrice: 410,
    rating: 4.9,
    reviewCount: 21,
    badge: 'Convertible Sleeves',
    isNew: true,
    isBestseller: true,
    stock: 6,
    silhouette: 'Detachable Sleeves',
    tags: ['Accessories', 'Sleeves', 'Pearl', 'Detachable', 'Tulle'],
    images: [
      '/images/bridal/accessory-detachable-sleeves.jpg'
    ],
    description: 'Slip effortlessly from strapless minimalist poise into opulent ceremony radiance. These featherlight sheer illusion sleeves are hand-scattered with iridescent glass pearls and attach invisibly at the inner armhole.',
    colors: ['Ivory'],
    variants: [
      { id: 'v-sl-s', name: 'Size S/M / Ivory', color: 'Ivory', size: 'S/M', price: 340, stock: 3 },
      { id: 'v-sl-m', name: 'Size M/L / Ivory', color: 'Ivory', size: 'M/L', price: 340, stock: 3 }
    ],
    attributes: {
      'Accessory Type': 'Detachable Sleeves',
      'Embellishment': 'Hand-Sewn Luminous Micro-Pearls',
      'Fabrication': 'Stretch French Illusion Tulle'
    }
  }
];

export const ACCESSORIES_NAV_DATA = {
  'VEILS': {
    title: 'Bridal Veils',
    badge: 'Atelier Signature',
    tagline: 'From dramatic cathedral lace to celestial pearl droplets',
    heroImage: 'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/V098C-A1472-01.jpg?v=1778617507',
    thought: 'The veil remains the ultimate romantic bridal statement. Our collection pairs weightless French illusion tulle with intricate hand-appliquéd edges to float effortlessly around the bride.',
    stylistNote: 'Match your veil embroidery to your gown lace, or choose clean raw-edge tulle to let an ornate dress shine.',
    type: 'Veils'
  },
  'TRAINS': {
    title: 'Detachable Royal Trains',
    badge: 'Convertible Glamour',
    tagline: 'Two bridal looks in one seamless, effortless silhouette transition',
    heroImage: 'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1478T-Studio-01.jpg?v=1778617541',
    thought: 'A detachable train gives you grandeur for the grand church or cathedral aisle, while granting total freedom to dance, mingle, and celebrate the night away without bustle weight.',
    stylistNote: 'Attach for bridal portraits and ceremony walk; remove right before your first dance.',
    type: 'Trains'
  },
  'JACKETS/SHRUGS': {
    title: 'Bridal Jackets & Shrugs',
    badge: 'Ceremony Coverage',
    tagline: 'Intricate mock-necks and long lace sleeves for modesty and drama',
    heroImage: 'https://cdn.shopify.com/s/files/1/0592/3396/0030/files/A1408J-Studio-01.jpg?v=1761851890',
    thought: 'Layering pieces that redefine your bridal aesthetic. Whether for traditional venue etiquette or cool twilight receptions, our shrugs look tailored as part of your gown.',
    stylistNote: 'Pairs impeccably over sweetheart or strapless corsetry.',
    type: 'Jackets/Shrugs'
  },
  'CAPES': {
    title: 'Bridal Capes & Watteau Wings',
    badge: 'Modern Runway',
    tagline: 'Airy shoulder-attached tulle trails for the contemporary bohemian bride',
    heroImage: '/images/bridal/accessory-watteau-cape.jpg',
    thought: 'A dramatic alternative to hairpins and combs. Bridal capes drape from the shoulders, framing the spine and accentuating low-back dresses without obscuring bridal up-dos.',
    stylistNote: 'Ideal for windy outdoor terraces, garden ceremonies, and beach vows.',
    type: 'Capes'
  },
  'SCARVES': {
    title: 'Bridal Scarves & Neck Wraps',
    badge: 'Parisian Chic',
    tagline: 'Minimalist fluid silk crepe scarves that float behind the collar',
    heroImage: '/images/bridal/accessory-silk-scarf.jpg',
    thought: 'The darling of modern editorial couture. Soft matte crepe and sheer silk organza neck wraps lend effortless fashion-forward allure to clean, structured column gowns.',
    stylistNote: 'Wear loosely draped around the collarbones with floating tails down the spine.',
    type: 'Scarves'
  },
  'GLOVES': {
    title: 'Bridal Opera Gloves',
    badge: 'Timeless Romance',
    tagline: 'Elbow-length Chantilly lace and sheer stretch tulle for vintage opulence',
    heroImage: '/images/bridal/accessory-opera-gloves.jpg',
    thought: 'Opera gloves impart instant regal sophistication. Cut from delicate stretch lace that molds naturally to the hand and arm, adding texture and romance to strapless silhouettes.',
    stylistNote: 'Keep jewelry focused on earrings and a hairpiece when wearing statement opera gloves.',
    type: 'Gloves'
  },
  'BELTS': {
    title: 'Bridal Belts, Sashes & Bows',
    badge: 'Silhouette Cinch',
    tagline: 'Crystal-embellished waistbands and dramatic silk bows',
    heroImage: '/images/bridal/accessory-crystal-pearl-belt.jpg',
    thought: 'The crowning touch to define your waist. Delicate crystals, seed pearls, and duchess satin ribbons introduce shimmer and tailored contouring to minimalist and ballgown dresses.',
    stylistNote: 'Ties into a clean, elongated bow at the back waist with streamers flowing down the train.',
    type: 'Belts'
  },
  'NECK COLLARS': {
    title: 'High Neck & Choker Collars',
    badge: 'Architectural Regal',
    tagline: 'Victorian-inspired lace chokers and baroque pearl necklaces',
    heroImage: '/images/bridal/accessory-pearl-collar.jpg',
    thought: 'Architectural neckline extensions for dramatic portraits. These handcrafted collars elevate sweetheart necklines into majestic queen-like collars with pearlescent finishes.',
    stylistNote: 'Style with swept-up chignons and sleek drop earrings.',
    type: 'Neck Collars'
  },
  'BOWS': {
    title: 'Sculptural Bridal Bows',
    badge: 'Couture Statement',
    tagline: 'Architectural Mikado satin bows with cascading waist streamers',
    heroImage: '/images/bridal/accessory-mikado-bow.jpg',
    thought: 'Nothing defines timeless back drama like an architectural silk Mikado bow tailored crisply at the lower waist.',
    stylistNote: 'Snap effortlessly over clean matte crepe or duchess satin gowns for an iconic aisle exit.',
    type: 'Bows'
  },
  'SLEEVES': {
    title: 'Detachable Bridal Sleeves',
    badge: 'Two Looks In One',
    tagline: 'Pearl-encrusted illusion sleeves for effortless ceremony-to-reception conversion',
    heroImage: '/images/bridal/accessory-detachable-sleeves.jpg',
    thought: 'Enjoy luminous arm coverage for ceremony vows and unclip in seconds to dance freely at your reception.',
    stylistNote: 'Pair with strapless corseted silhouettes so the delicate pearlescent tulle shines.',
    type: 'Sleeves'
  },
  'CORSETS': {
    title: 'Bridal Corset Separates',
    badge: 'Atelier Structure',
    tagline: '14-piece exposed boning bodices for architectural waist contouring',
    heroImage: '/images/bridal/accessory-bridal-corset.jpg',
    thought: 'Mix and match sculpted Chantilly lace corset tops with clean silk column skirts or sweeping tulle overskirts.',
    stylistNote: 'Tuck seamlessly into high-waisted bridal trousers or sleek satin skirts.',
    type: 'Corsets'
  }
};
