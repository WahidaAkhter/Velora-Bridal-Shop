import { getCatalog } from '../services/catalogStore.js';
import { ALL_SHOP_DRESSES } from '../data/allDressesData.js';
import { ACCESSORY_PIECES } from '../data/accessoriesData.js';
import { QUICK_SHIP_GOWNS } from '../data/quickShipData.js';
import { LEGACY_COLLECTION_GOWNS } from '../data/legacyCollectionData.js';
import { SIGNATURE_GOWNS_PAGE_1, SIGNATURE_GOWNS_PAGE_2 } from '../data/signatureStylesData.js';
import { SASHES_PRODUCTS } from '../data/sashesData.js';
import { COLOR_DRESSES } from '../data/products.js';
import { WEDDING_DRESS_OPTIONS_DATA } from '../data/weddingDressesFeatures.js';

let lastCatalogRef = null;
let cachedCatalogList = null;
let cachedCatalogMap = null;
let cachedExtendedList = null;
let cachedExtendedMap = null;

/**
 * Normalizes supplemental / curated product entries (Signature, Sashes, Color, Style features)
 * into full product detail payloads so every dress card resolves cleanly at /dresses/:slug.
 */
const buildExtendedProducts = () => {
  if (cachedExtendedList) return cachedExtendedList;

  const map = new Map();
  const addItem = (item) => {
    if (item && item.id && !map.has(item.id)) {
      map.set(item.id, item);
    }
  };

  // 1. Signature Gowns
  [...SIGNATURE_GOWNS_PAGE_1, ...SIGNATURE_GOWNS_PAGE_2].forEach((gown) => {
    addItem({
      id: gown.id,
      name: gown.name,
      slug: gown.slug,
      subtitle: gown.subtitle,
      category: 'signature-styles',
      categoryName: 'Signature Styles',
      price: gown.price,
      originalPrice: gown.originalPrice,
      rating: 5.0,
      reviewCount: 42,
      badge: 'Signature Collection',
      isNew: true,
      stock: 5,
      silhouette: gown.silhouette,
      fabric: gown.fabric,
      neckline: gown.neckline,
      description: gown.description,
      images: [gown.image, '/images/bridal/hero-salon-bg.jpg'],
      variants: [
        { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
        { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
        { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
        { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
        { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 1, sku: `${gown.id}-10` }
      ],
      attributes: {
        'Silhouette': gown.silhouette,
        'Fabrication': gown.fabric,
        'Neckline': gown.neckline,
        'Origin': 'Handcrafted in Paris Atelier',
        'Fitting Service': 'Complimentary boutique alteration consultation'
      },
      reviews: [
        { id: `rev-${gown.id}-1`, name: 'Arabella K.', avatar: '/images/bridal/avatars.png', rating: 5, date: '1 week ago', comment: 'The signature cut is unmatched. Felt so confident and majestic.', verified: true }
      ]
    });
  });

  // 2. Sashes & Belts
  SASHES_PRODUCTS.forEach((sash) => {
    addItem({
      ...sash,
      rating: sash.rating || 5.0,
      reviewCount: sash.reviewCount || 34,
      badge: sash.badge || 'VELORA Signature Collection',
      isNew: true,
      stock: sash.stock || 5,
      images: sash.images && sash.images.length > 0 ? sash.images : [sash.image],
      variants: sash.variants || [
        {
          id: `${sash.id}-v0`,
          name: `${sash.colors?.[0] || 'Ivory'} / Standard Length`,
          color: sash.colors?.[0] || 'Ivory',
          colorHex: '#FAF7F2',
          size: 'Standard Length',
          price: sash.price,
          stock: 4,
          sku: `${sash.code || sash.id}-01`
        }
      ],
      attributes: sash.attributes || {
        'Category': 'Bridal Belts & Sashes',
        'Silhouette': sash.silhouette || 'Bridal Sash',
        'Fabrication': sash.material || 'Luxe Satin Ribbon & Crystals',
        'Collection': 'VELORA Sashes & Belts',
        'Shipping': 'In Stock — Dispatched within 2–4 Business Days'
      }
    });
  });

  // 3. Color Showcase Dresses
  COLOR_DRESSES.forEach((colorItem) => {
    addItem({
      id: colorItem.id,
      name: colorItem.name || `${colorItem.colorName} BRIDAL GOWN`,
      slug: colorItem.slug,
      subtitle: colorItem.subtitle,
      category: 'color-collection',
      categoryName: `Color Gowns (${colorItem.colorName})`,
      price: colorItem.price,
      originalPrice: colorItem.price + 250,
      rating: 5.0,
      reviewCount: 32,
      badge: colorItem.colorName,
      isNew: true,
      isBestseller: true,
      stock: 5,
      description: colorItem.description,
      images: [colorItem.image],
      variants: [
        { id: `vc-${colorItem.colorName}-2`, name: `US 2 / ${colorItem.colorName}`, color: colorItem.colorName, colorHex: colorItem.colorHex, size: 'US 2', price: colorItem.price, stock: 2, sku: `C-${colorItem.colorName}-02` },
        { id: `vc-${colorItem.colorName}-4`, name: `US 4 / ${colorItem.colorName}`, color: colorItem.colorName, colorHex: colorItem.colorHex, size: 'US 4', price: colorItem.price, stock: 3, sku: `C-${colorItem.colorName}-04` },
        { id: `vc-${colorItem.colorName}-6`, name: `US 6 / ${colorItem.colorName}`, color: colorItem.colorName, colorHex: colorItem.colorHex, size: 'US 6', price: colorItem.price, stock: 2, sku: `C-${colorItem.colorName}-06` }
      ],
      attributes: {
        'Silhouette': 'A-Line / Ballgown',
        'Fabric': 'Multi-Tiered Soft Tulle & Silk Satin Underlay',
        'Color Tone': colorItem.colorName,
        'Origin': 'Designer Boutique Collection'
      },
      reviews: []
    });
  });

  // 4. Style Feature Curated Gowns
  Object.values(WEDDING_DRESS_OPTIONS_DATA).forEach((feature) => {
    (feature.curatedGowns || []).forEach((gown) => {
      addItem({
        id: gown.id,
        name: gown.name,
        slug: gown.id,
        subtitle: gown.subtitle,
        category: 'wedding-dresses',
        categoryName: feature.title || 'Wedding Dresses',
        price: gown.price,
        originalPrice: gown.originalPrice,
        rating: 5.0,
        reviewCount: 32,
        badge: feature.badge,
        isNew: true,
        stock: 4,
        silhouette: gown.silhouette || feature.title,
        fabric: gown.fabric || feature.title,
        description: gown.description,
        images: [gown.image, ...(gown.hoverImage ? [gown.hoverImage] : []), feature.heroImage].filter(Boolean),
        variants: [
          { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
          { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
          { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
          { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
          { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 1, sku: `${gown.id}-10` }
        ],
        attributes: {
          'Silhouette': gown.silhouette || feature.title,
          'Fabrication': gown.fabric || feature.title,
          'Craftsmanship': 'Handcrafted in Paris Atelier',
          'Train Length': 'Cathedral / Chapel Available',
          'Fitting Service': 'Complimentary boutique alteration consultation'
        },
        reviews: [
          { id: `rev-${gown.id}-1`, name: 'Genevieve M.', avatar: '/images/bridal/avatars.png', rating: 5, date: '2 weeks ago', comment: 'Exceeded every single dream. The corset fit and tailoring is extraordinary.', verified: true }
        ]
      });
    });
  });

  cachedExtendedMap = map;
  cachedExtendedList = Array.from(map.values());
  return cachedExtendedList;
};

/**
 * Builds a unified, deduplicated catalog list of all products.
 * @returns {Array<Object>}
 */
export const getAllProducts = () => {
  const currentCatalog = getCatalog();
  if (cachedCatalogList && lastCatalogRef === currentCatalog) return cachedCatalogList;
  lastCatalogRef = currentCatalog;

  const map = new Map();
  const addAll = (list) => {
    if (Array.isArray(list)) {
      list.forEach((item) => {
        if (item && item.id && !map.has(item.id)) {
          map.set(item.id, item);
        }
      });
    }
  };

  addAll(currentCatalog);
  addAll(ALL_SHOP_DRESSES);
  addAll(ACCESSORY_PIECES);
  addAll(QUICK_SHIP_GOWNS);
  addAll(LEGACY_COLLECTION_GOWNS);

  cachedCatalogMap = map;
  cachedCatalogList = Array.from(map.values());
  return cachedCatalogList;
};

/**
 * Generates a clean URL slug from a product.
 * Format: kebab-case name plus id (e.g. ivory-lace-a-line-12)
 * @param {Object} product
 * @returns {string}
 */
export const toProductSlug = (product) => {
  if (!product) return '';
  const rawName = product.name || product.title || 'dress';
  const nameSlug = String(rawName)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const idSlug = String(product.id || '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '');

  return `${nameSlug}-${idSlug}`;
};

const matchInPool = (cleanSlug, list, poolMap) => {
  // 1. Direct exact match with generated slug
  for (const product of list) {
    if (toProductSlug(product) === cleanSlug) {
      return product;
    }
  }

  // 2. Exact match with pre-defined slug attribute
  for (const product of list) {
    if (product.slug && String(product.slug).toLowerCase() === cleanSlug) {
      return product;
    }
  }

  // 3. Match against exact product id (case-insensitive)
  if (poolMap && poolMap.has(cleanSlug)) {
    return poolMap.get(cleanSlug);
  }
  for (const product of list) {
    if (String(product.id).toLowerCase() === cleanSlug) {
      return product;
    }
  }

  // 4. Suffix match on -id (longest id match first to avoid prefix collisions)
  const candidates = [];
  for (const product of list) {
    const idLower = String(product.id).toLowerCase();
    if (cleanSlug.endsWith(`-${idLower}`)) {
      candidates.push({ product, len: idLower.length });
    }
  }
  if (candidates.length > 0) {
    candidates.sort((a, b) => b.len - a.len);
    return candidates[0].product;
  }

  return null;
};

/**
 * Finds a product in the primary or extended catalog by URL slug or slug suffix.
 * Returns null if no match is found.
 * @param {string} slug
 * @returns {Object|null}
 */
export const findProductBySlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const cleanSlug = slug.toLowerCase().trim();
  const all = getAllProducts();
  const primary = matchInPool(cleanSlug, all, cachedCatalogMap);
  if (primary) return primary;

  const extended = buildExtendedProducts();
  return matchInPool(cleanSlug, extended, cachedExtendedMap);
};

