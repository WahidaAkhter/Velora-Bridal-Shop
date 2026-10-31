import { PRODUCTS } from '../data/products.js';
import { ALL_SHOP_DRESSES } from '../data/allDressesData.js';
import { ACCESSORY_PIECES } from '../data/accessoriesData.js';
import { QUICK_SHIP_GOWNS } from '../data/quickShipData.js';
import { LEGACY_COLLECTION_GOWNS } from '../data/legacyCollectionData.js';

// Global catalog lookup map
const getCatalogMap = () => {
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
  return map;
};

/**
 * Builds a shareable wishlist URL.
 * @param {string[]} ids - Array of product IDs (max 50)
 * @param {string} name - Optional curator name (max 30 chars)
 * @returns {string} Fully-qualified share URL
 */
export const buildShareUrl = (ids = [], name = '') => {
  if (!Array.isArray(ids) || ids.length === 0) return '';

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const cleanIds = ids
    .filter((id) => typeof id === 'string' && id.trim().length > 0)
    .slice(0, 50);

  if (cleanIds.length === 0) return '';

  const cleanName = String(name || '')
    .replace(/[<>"/\\&;]/g, '')
    .trim()
    .slice(0, 30);

  const queryParts = [`w=${cleanIds.join(',')}`];
  if (cleanName) {
    queryParts.push(`by=${encodeURIComponent(cleanName)}`);
  }

  return `${origin}/?${queryParts.join('&')}`;
};

/**
 * Parses and strictly validates wishlist share query params from the URL.
 * @param {string} [searchStr] - Optional search string (defaults to window.location.search)
 * @returns {{ isShared: boolean, ids: string[], name: string, products: Object[] }}
 */
export const parseShareUrl = (searchStr) => {
  const emptyResult = { isShared: false, ids: [], name: '', products: [] };

  try {
    const query = typeof searchStr === 'string'
      ? searchStr
      : (typeof window !== 'undefined' ? window.location.search : '');

    if (!query) return emptyResult;

    const params = new URLSearchParams(query);
    const rawW = params.get('w');

    // If w is missing or empty, fall back
    if (!rawW || typeof rawW !== 'string' || !rawW.trim()) {
      return emptyResult;
    }

    const rawIds = rawW.split(',').map((id) => id.trim()).filter(Boolean);

    // Oversized check: max 50 ids
    if (rawIds.length === 0 || rawIds.length > 50) {
      return emptyResult;
    }

    const catalog = getCatalogMap();
    const validProducts = [];
    const validIds = [];
    const seen = new Set();

    for (const id of rawIds) {
      if (!seen.has(id) && catalog.has(id)) {
        seen.add(id);
        validIds.push(id);
        validProducts.push(catalog.get(id));
      }
    }

    // Must have at least one valid product from the catalog
    if (validProducts.length === 0) {
      return emptyResult;
    }

    // Sanitize creator name (max 30 chars, strip unsafe chars)
    const rawBy = params.get('by');
    const safeName = rawBy
      ? String(rawBy).replace(/[<>"/\\&;]/g, '').trim().slice(0, 30)
      : '';

    return {
      isShared: true,
      ids: validIds,
      name: safeName,
      products: validProducts
    };
  } catch {
    return emptyResult;
  }
};
