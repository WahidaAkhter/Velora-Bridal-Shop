export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 12, icon: 'LayoutGrid' },
  { id: 'apparel', name: 'Apparel', count: 3, icon: 'Shirt' },
  { id: 'accessories', name: 'Accessories', count: 3, icon: 'Briefcase' },
  { id: 'electronics', name: 'Electronics', count: 2, icon: 'Headphones' },
  { id: 'home', name: 'Home & Living', count: 2, icon: 'Home' },
  { id: 'footwear', name: 'Footwear', count: 2, icon: 'Footprints' }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Minimalist Artisan Leather Tote',
    slug: 'artisan-leather-tote',
    subtitle: 'Handcrafted full-grain Italian leather bag',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 285.00,
    originalPrice: 340.00,
    rating: 4.9,
    reviewCount: 38,
    badge: 'Bestseller',
    isNew: false,
    isBestseller: true,
    stock: 14,
    description: 'Crafted with premium full-grain Italian leather, the Artisan Tote balances timeless elegance with everyday versatility. Features a padded laptop sleeve, interior zip pocket, and magnetic closure.',
    images: [
      '/images/tote-bag.png',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v1-1', name: 'Tan Leather / Medium', color: 'Tan', colorHex: '#C68B59', size: 'Medium', material: 'Full Grain Leather', price: 285.00, stock: 8, sku: 'TOT-TN-MD' },
      { id: 'v1-2', name: 'Tan Leather / Large', color: 'Tan', colorHex: '#C68B59', size: 'Large', material: 'Full Grain Leather', price: 315.00, stock: 4, sku: 'TOT-TN-LG' },
      { id: 'v1-3', name: 'Onyx Black / Medium', color: 'Black', colorHex: '#1C1917', size: 'Medium', material: 'Full Grain Leather', price: 285.00, stock: 6, sku: 'TOT-BK-MD' }
    ],
    attributes: {
      'SKU': 'TOT-ART-2026',
      'Material': '100% Full Grain Tuscan Calfskin',
      'Dimensions': '38cm x 32cm x 14cm',
      'Laptop Compartment': 'Fits up to 15" MacBook Pro',
      'Origin': 'Florence, Italy',
      'Care': 'Condition with natural leather wax twice a year'
    },
    reviews: [
      { id: 'r1', name: 'Sophia R.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: '2 weeks ago', comment: 'The quality of the leather is unmatched. Smells amazing and holds everything I need for work.', verified: true },
      { id: 'r2', name: 'Marcus T.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', rating: 5, date: '1 month ago', comment: 'Extremely clean minimal design. I receive compliments everywhere I go.', verified: true }
    ]
  },
  {
    id: 'prod-2',
    name: 'AURA Noise-Canceling ANC Headphones',
    slug: 'aura-anc-headphones',
    subtitle: 'High-fidelity wireless audio with active noise cancellation',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 349.00,
    originalPrice: 399.00,
    rating: 4.8,
    reviewCount: 64,
    badge: 'Trending',
    isNew: true,
    isBestseller: false,
    stock: 9,
    description: 'Immerse yourself in acoustic perfection. Featuring custom 40mm beryllium drivers, hybrid active noise cancellation, ambient transparency mode, and up to 45 hours of continuous battery life.',
    images: [
      '/images/headphones.png',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v2-1', name: 'Matte Charcoal', color: 'Matte Charcoal', colorHex: '#262626', size: 'Standard', material: 'Anodized Aluminum', price: 349.00, stock: 5, sku: 'HPH-BLK' },
      { id: 'v2-2', name: 'Lunar Silver', color: 'Lunar Silver', colorHex: '#E5E7EB', size: 'Standard', material: 'Anodized Aluminum', price: 349.00, stock: 4, sku: 'HPH-SLV' }
    ],
    attributes: {
      'SKU': 'HPH-AURA-01',
      'Battery Life': '45 Hours (ANC On) / Fast Charge 15min = 5hrs',
      'Bluetooth': 'Version 5.3 with LDAC, AAC & aptX HD',
      'Driver Size': '40mm Beryllium Composite',
      'Weight': '265g',
      'Warranty': '2 Years International Warranty'
    },
    reviews: [
      { id: 'r3', name: 'Elena V.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', rating: 5, date: '3 days ago', comment: 'Clear highs, tight bass response, and comfortable for 8+ hour work sessions.', verified: true }
    ]
  },
  {
    id: 'prod-3',
    name: 'Heavyweight Organic Hoodie',
    slug: 'heavyweight-organic-hoodie',
    subtitle: '480 GSM GOTS certified organic french terry cotton',
    category: 'apparel',
    categoryName: 'Apparel',
    price: 145.00,
    originalPrice: 170.00,
    rating: 4.7,
    reviewCount: 42,
    badge: 'Sustainable',
    isNew: false,
    isBestseller: true,
    stock: 22,
    description: 'Constructed from ultra-dense 480 GSM organic french terry, this hoodie features a double-layered hood, seamless kangaroo pocket, relaxed oversized fit, and rib-knit cuffs.',
    images: [
      '/images/hoodie.png',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v3-1', name: 'Sand Beige / Small', color: 'Sand Beige', colorHex: '#D6C7B2', size: 'S', material: '100% Organic Cotton', price: 145.00, stock: 6, sku: 'HOD-BG-S' },
      { id: 'v3-2', name: 'Sand Beige / Medium', color: 'Sand Beige', colorHex: '#D6C7B2', size: 'M', material: '100% Organic Cotton', price: 145.00, stock: 8, sku: 'HOD-BG-M' },
      { id: 'v3-3', name: 'Sand Beige / Large', color: 'Sand Beige', colorHex: '#D6C7B2', size: 'L', material: '100% Organic Cotton', price: 145.00, stock: 5, sku: 'HOD-BG-L' },
      { id: 'v3-4', name: 'Washer Black / Medium', color: 'Washer Black', colorHex: '#27272A', size: 'M', material: '100% Organic Cotton', price: 145.00, stock: 3, sku: 'HOD-BK-M' }
    ],
    attributes: {
      'SKU': 'HOD-ORG-480',
      'Fabric Weight': '480 GSM Heavyweight Terry',
      'Certification': 'GOTS Organic Cotton',
      'Fit': 'Boxy / Slightly Oversized',
      'Origin': 'Made in Portugal',
      'Care': 'Machine wash cold inside out, hang dry'
    },
    reviews: [
      { id: 'r4', name: 'David K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', rating: 5, date: '1 week ago', comment: 'Heavy, cozy, perfect drop shoulders. Best hoodie I own.', verified: true }
    ]
  },
  {
    id: 'prod-4',
    name: 'Architectural Sculptural Ceramic Vase',
    slug: 'architectural-ceramic-vase',
    subtitle: 'Hand-thrown matte terracotta vase with textured glaze',
    category: 'home',
    categoryName: 'Home & Living',
    price: 110.00,
    originalPrice: 130.00,
    rating: 4.9,
    reviewCount: 19,
    badge: 'Artisan',
    isNew: true,
    isBestseller: false,
    stock: 7,
    description: 'Elevate your space with this striking architectural vessel. Handcrafted by master ceramicists using natural stoneware and finished with a tactile chalky matte glaze.',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v4-1', name: 'Chalk White / Tall', color: 'Chalk White', colorHex: '#F5F5F4', size: '32cm Tall', material: 'Stoneware', price: 110.00, stock: 4, sku: 'VAS-WT-TL' },
      { id: 'v4-2', name: 'Terracotta Sand / Short', color: 'Terracotta', colorHex: '#C86D51', size: '22cm Wide', material: 'Stoneware', price: 95.00, stock: 3, sku: 'VAS-TC-SH' }
    ],
    attributes: {
      'SKU': 'VAS-ARC-09',
      'Material': 'High-Fired Stoneware Clay',
      'Dimensions': '32cm Height x 18cm Diameter',
      'Finish': 'Water-resistant interior glaze',
      'Origin': 'Kyoto, Japan'
    },
    reviews: [
      { id: 'r5', name: 'Chloe M.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', rating: 5, date: '3 weeks ago', comment: 'A true work of art. Looks stunning on my minimalist dining table.', verified: true }
    ]
  },
  {
    id: 'prod-5',
    name: 'Minimalist Chronograph Automatic Watch',
    slug: 'chronograph-automatic-watch',
    subtitle: 'Sapphire crystal glass with Japanese automatic movement',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 495.00,
    originalPrice: 560.00,
    rating: 5.0,
    reviewCount: 29,
    badge: 'Limited Edition',
    isNew: true,
    isBestseller: true,
    stock: 5,
    description: 'Designed for purists. Features a 316L surgical grade stainless steel case, anti-reflective sapphire crystal lens, exhibition case back, and Horween leather strap.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v5-1', name: 'Silver / Horween Black Strap', color: 'Silver/Black', colorHex: '#9CA3AF', size: '40mm Case', material: '316L Stainless Steel', price: 495.00, stock: 3, sku: 'WTC-SLV-BK' },
      { id: 'v5-2', name: 'Rose Gold / Tan Strap', color: 'Rose Gold', colorHex: '#E0A96D', size: '40mm Case', material: 'Rose Gold PVD', price: 525.00, stock: 2, sku: 'WTC-RG-TN' }
    ],
    attributes: {
      'SKU': 'WTC-CHRO-40',
      'Movement': 'Miyota 9015 Automatic (42hr reserve)',
      'Water Resistance': '50 Meters / 5 ATM',
      'Glass': 'Scratch-resistant Sapphire Crystal',
      'Strap Width': '20mm Quick Release'
    },
    reviews: [
      { id: 'r6', name: 'Alexander B.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80', rating: 5, date: '1 month ago', comment: 'Exceptional craftsmanship at this price point. Power reserve holds accurately.', verified: true }
    ]
  },
  {
    id: 'prod-6',
    name: 'Merino Wool Unstructured Blazer',
    slug: 'merino-wool-unstructured-blazer',
    subtitle: '100% Super 120s Italian Merino Wool tailored jacket',
    category: 'apparel',
    categoryName: 'Apparel',
    price: 320.00,
    originalPrice: 380.00,
    rating: 4.8,
    reviewCount: 18,
    badge: 'Tailored',
    isNew: false,
    isBestseller: false,
    stock: 11,
    description: 'The ultimate versatile blazer. Unlined shoulder construction offers effortless drape, while breathable 100% Italian merino wool ensures comfortable wear across all seasons.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v6-1', name: 'Midnight Navy / 38R', color: 'Midnight Navy', colorHex: '#1E3A8A', size: '38R', material: 'Super 120s Wool', price: 320.00, stock: 4, sku: 'BLZ-NV-38' },
      { id: 'v6-2', name: 'Midnight Navy / 40R', color: 'Midnight Navy', colorHex: '#1E3A8A', size: '40R', material: 'Super 120s Wool', price: 320.00, stock: 5, sku: 'BLZ-NV-40' },
      { id: 'v6-3', name: 'Charcoal Grey / 40R', color: 'Charcoal Grey', colorHex: '#374151', size: '40R', material: 'Super 120s Wool', price: 320.00, stock: 2, sku: 'BLZ-GY-40' }
    ],
    attributes: {
      'SKU': 'BLZ-MRN-120',
      'Material': '100% Italian Super 120s Merino Wool',
      'Construction': 'Unstructured & Unlined',
      'Lapel': 'Notch Lapel 7.5cm',
      'Care': 'Dry clean only'
    },
    reviews: [
      { id: 'r7', name: 'Nathan P.', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80', rating: 5, date: '2 weeks ago', comment: 'Fits like a bespoke suit. Light, breathable, and doesn’t wrinkle easily.', verified: true }
    ]
  },
  {
    id: 'prod-7',
    name: 'Knit Studio Low-Top Sneakers',
    slug: 'knit-studio-low-top-sneakers',
    subtitle: 'Recycled ocean-knit fabric with responsive sugarcane foam midsole',
    category: 'footwear',
    categoryName: 'Footwear',
    price: 165.00,
    originalPrice: 190.00,
    rating: 4.9,
    reviewCount: 51,
    badge: 'Eco Friendly',
    isNew: true,
    isBestseller: true,
    stock: 18,
    description: 'Designed for lightweight daily motion. Engineered 3D fly-knit upper woven from recycled ocean plastic, paired with an ultra-responsive cushioning midsole and natural rubber tread.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v7-1', name: 'Off-White / EU 41', color: 'Off-White', colorHex: '#F3F4F6', size: 'EU 41 (US 8)', material: 'Recycled Ocean Woven', price: 165.00, stock: 6, sku: 'SNK-WT-41' },
      { id: 'v7-2', name: 'Off-White / EU 42', color: 'Off-White', colorHex: '#F3F4F6', size: 'EU 42 (US 9)', material: 'Recycled Ocean Woven', price: 165.00, stock: 7, sku: 'SNK-WT-42' },
      { id: 'v7-3', name: 'Off-White / EU 43', color: 'Off-White', colorHex: '#F3F4F6', size: 'EU 43 (US 10)', material: 'Recycled Ocean Woven', price: 165.00, stock: 5, sku: 'SNK-WT-43' }
    ],
    attributes: {
      'SKU': 'SNK-KNT-01',
      'Upper': '100% Recycled PET Bottle Yarn',
      'Midsole': 'Bio-based Sugarcane EVA Foam',
      'Insole': 'Ortholite Antimicrobial',
      'Weight': '210g per shoe'
    },
    reviews: [
      { id: 'r8', name: 'Hannah W.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: '5 days ago', comment: 'Super lightweight! Feels like walking on clouds.', verified: true }
    ]
  },
  {
    id: 'prod-8',
    name: 'Botanical Hydrating Facial Elixir Serum',
    slug: 'botanical-hydrating-elixir-serum',
    subtitle: 'Plant-derived squalane, hyaluronic acid & rosehip extract',
    category: 'home',
    categoryName: 'Home & Living',
    price: 88.00,
    originalPrice: 105.00,
    rating: 4.8,
    reviewCount: 33,
    badge: 'Clean Beauty',
    isNew: false,
    isBestseller: false,
    stock: 25,
    description: 'A concentrated nutrient-rich elixir formulated to restore radiant hydration, strengthen skin moisture barrier, and soothe environmental stress with organic cold-pressed botanicals.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608248597261-83325805435f?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v8-1', name: 'Glass Dropper Bottle / 50ml', color: 'Clear', colorHex: '#E2E8F0', size: '50ml (1.7 fl.oz)', material: 'Organic Oil Elixir', price: 88.00, stock: 25, sku: 'SER-BOT-50' }
    ],
    attributes: {
      'SKU': 'SER-BOT-50',
      'Key Ingredients': 'Organic Squalane, Triple Molecular Hyaluronic Acid, Rosehip Seed Oil',
      'Formula': '100% Vegan & Cruelty Free',
      'Skin Type': 'Suitable for dry, sensitive & combination skin',
      'Volume': '50ml / Glass Bottle with UV protection'
    },
    reviews: [
      { id: 'r9', name: 'Clara S.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', rating: 5, date: '1 month ago', comment: 'Leaves my skin glowing without feeling greasy. Re-ordering for sure.', verified: true }
    ]
  },
  {
    id: 'prod-9',
    name: 'Precision Aluminum Mechanical Keyboard',
    slug: 'precision-aluminum-keyboard',
    subtitle: 'Hot-swappable gasket mount wireless keyboard',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 220.00,
    originalPrice: 260.00,
    rating: 4.9,
    reviewCount: 57,
    badge: 'Staff Pick',
    isNew: true,
    isBestseller: true,
    stock: 8,
    description: 'Built for tactile elegance. CNC-machined aluminum body, custom lubricated linear switches, PBT double-shot keycaps, and multi-device Bluetooth & 2.4GHz wireless connectivity.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v9-1', name: 'Space Grey / Linear Switches', color: 'Space Grey', colorHex: '#4B5563', size: '75% Layout', material: 'CNC Aluminum', price: 220.00, stock: 5, sku: 'KBD-GRY-LIN' },
      { id: 'v9-2', name: 'E-White / Tactile Switches', color: 'White', colorHex: '#F9FAFB', size: '75% Layout', material: 'CNC Aluminum', price: 235.00, stock: 3, sku: 'KBD-WHT-TAC' }
    ],
    attributes: {
      'SKU': 'KBD-MECH-75',
      'Mounting': 'Gasket Mounted with Poron Foam Layer',
      'Connectivity': 'Tri-mode: USB-C, Bluetooth 5.1, 2.4GHz Dongle',
      'Keycaps': 'Cherry Profile PBT Doubleshot',
      'Battery': '4000mAh (Up to 200 hours without RGB)'
    },
    reviews: [
      { id: 'r10', name: 'Julian M.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', rating: 5, date: '1 week ago', comment: 'The typing sound is deep and marbly out of the box. Absolutely worth it.', verified: true }
    ]
  },
  {
    id: 'prod-10',
    name: 'Artisan Pour-Over Ceramic Dripper Set',
    slug: 'artisan-pour-over-dripper-set',
    subtitle: 'Heat-retaining matte porcelain dripper & glass carafe',
    category: 'home',
    categoryName: 'Home & Living',
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.7,
    reviewCount: 22,
    badge: 'Popular',
    isNew: false,
    isBestseller: false,
    stock: 16,
    description: 'Elevate your morning coffee ritual. Engineered spiral interior ribs promote optimal extraction, paired with a heat-resistant borosilicate glass carafe.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v10-1', name: 'Matte Slate Grey / 600ml', color: 'Slate Grey', colorHex: '#475569', size: '600ml Carafe', material: 'Porcelain & Glass', price: 75.00, stock: 10, sku: 'DRP-SLT-600' },
      { id: 'v10-2', name: 'Pure White / 600ml', color: 'White', colorHex: '#FFFFFF', size: '600ml Carafe', material: 'Porcelain & Glass', price: 75.00, stock: 6, sku: 'DRP-WHT-600' }
    ],
    attributes: {
      'SKU': 'DRP-COF-600',
      'Carafe Capacity': '600ml (2-4 Cups)',
      'Filter Compatibility': 'Standard V60 02 Paper Filters',
      'Dishwasher Safe': 'Yes',
      'Origin': 'Designed in Copenhagen'
    },
    reviews: [
      { id: 'r11', name: 'Oliver B.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', rating: 5, date: '3 weeks ago', comment: 'Makes a remarkably clean cup of coffee. Looks gorgeous on the counter.', verified: true }
    ]
  },
  {
    id: 'prod-11',
    name: 'Italian Calfskin Suede Chelsea Boots',
    slug: 'italian-suede-chelsea-boots',
    subtitle: 'Goodyear welted weatherproof suede boots',
    category: 'footwear',
    categoryName: 'Footwear',
    price: 290.00,
    originalPrice: 340.00,
    rating: 4.9,
    reviewCount: 31,
    badge: 'Crafted',
    isNew: false,
    isBestseller: true,
    stock: 10,
    description: 'Handcrafted in Marche, Italy using water-repellent suede leather. Features durable Goodyear welt construction, comfortable cork midsole, and flexible elastic side gores.',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v11-1', name: 'Espresso Brown / EU 42', color: 'Espresso Brown', colorHex: '#4A2E1B', size: 'EU 42 (US 9)', material: 'Weatherproof Suede', price: 290.00, stock: 4, sku: 'BOT-BRN-42' },
      { id: 'v11-2', name: 'Espresso Brown / EU 43', color: 'Espresso Brown', colorHex: '#4A2E1B', size: 'EU 43 (US 10)', material: 'Weatherproof Suede', price: 290.00, stock: 3, sku: 'BOT-BRN-43' },
      { id: 'v11-3', name: 'Charcoal Suede / EU 42', color: 'Charcoal', colorHex: '#334155', size: 'EU 42 (US 9)', material: 'Weatherproof Suede', price: 290.00, stock: 3, sku: 'BOT-GY-42' }
    ],
    attributes: {
      'SKU': 'BOT-SUD-GOOD',
      'Sole': 'Dainite Studded Rubber Sole',
      'Construction': '360° Goodyear Welted',
      'Lining': 'Breathable Soft Glove Leather',
      'Origin': 'Made in Marche, Italy'
    },
    reviews: [
      { id: 'r12', name: 'Gabriel S.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80', rating: 5, date: '1 month ago', comment: 'Broke in quickly. The water resistance is genuinely impressive.', verified: true }
    ]
  },
  {
    id: 'prod-12',
    name: 'Pure Mulberry Silk Pillowcase & Eye Mask Set',
    slug: 'mulberry-silk-pillowcase-mask-set',
    subtitle: '22 Momme 100% Grade 6A pure mulberry silk',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 95.00,
    originalPrice: 120.00,
    rating: 4.9,
    reviewCount: 46,
    badge: 'Luxury Gift',
    isNew: true,
    isBestseller: false,
    stock: 19,
    description: 'Experience pure nocturnal indulgence. Ultra-smooth 22 momme Mulberry Silk reduces hair friction, prevents sleep creases, and retains natural skin hydration.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v12-1', name: 'Champagne Gold / Queen', color: 'Champagne Gold', colorHex: '#F7E7CE', size: 'Standard Queen', material: '22 Momme Silk', price: 95.00, stock: 10, sku: 'SLK-GLD-QN' },
      { id: 'v12-2', name: 'Pearl White / Queen', color: 'Pearl White', colorHex: '#FAFAF9', size: 'Standard Queen', material: '22 Momme Silk', price: 95.00, stock: 9, sku: 'SLK-WHT-QN' }
    ],
    attributes: {
      'SKU': 'SLK-MUL-22M',
      'Grade': '100% Grade 6A Long Strand Mulberry Silk',
      'Momme Weight': '22 Momme Heavy Weight',
      'Included': '1 x Pillowcase + 1 x Contoured Eye Mask + Gift Box',
      'Care': 'Hand wash or delicate cold wash in laundry bag'
    },
    reviews: [
      { id: 'r13', name: 'Isabella M.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: '2 weeks ago', comment: 'My hair is noticeably frizz-free in the morning. Packaging makes it a perfect gift!', verified: true }
    ]
  }
];

// Keep sidebar counts in sync with the catalog instead of hard-coding them
CATEGORIES.forEach(cat => {
  cat.count = cat.id === 'all'
    ? PRODUCTS.length
    : PRODUCTS.filter(p => p.category === cat.id).length;
});
