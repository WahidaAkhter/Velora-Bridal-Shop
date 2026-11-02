import { PRODUCTS } from '../data/products.js';
import { ALL_SHOP_DRESSES } from '../data/allDressesData.js';
import { ACCESSORY_PIECES } from '../data/accessoriesData.js';
import { QUICK_SHIP_GOWNS } from '../data/quickShipData.js';
import { LEGACY_COLLECTION_GOWNS } from '../data/legacyCollectionData.js';

let cachedCatalogList = null;
let cachedCatalogMap = null;

/**
 * Builds a unified, deduplicated catalog list of all products.
 * @returns {Array<Object>}
 */
export const getAllProducts = () => {
  if (cachedCatalogList) return cachedCatalogList;

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

  addAll(PRODUCTS);
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

/**
 * Finds a product in the catalog by URL slug or slug suffix.
 * Returns null if no match is found.
 * @param {string} slug
 * @returns {Object|null}
 */
export const findProductBySlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const cleanSlug = slug.toLowerCase().trim();
  const all = getAllProducts();

  // 1. Direct exact match with generated slug
  for (const product of all) {
    if (toProductSlug(product) === cleanSlug) {
      return product;
    }
  }

  // 2. Exact match with pre-defined slug attribute
  for (const product of all) {
    if (product.slug && String(product.slug).toLowerCase() === cleanSlug) {
      return product;
    }
  }

  // 3. Match against exact product id (case-insensitive)
  if (cachedCatalogMap && cachedCatalogMap.has(cleanSlug)) {
    return cachedCatalogMap.get(cleanSlug);
  }
  for (const product of all) {
    if (String(product.id).toLowerCase() === cleanSlug) {
      return product;
    }
  }

  // 4. Suffix match on -id (longest id match first to avoid prefix collisions)
  const candidates = [];
  for (const product of all) {
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
