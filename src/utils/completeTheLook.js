import { LOOK_RULES, FALLBACK_LOOK_RULE } from '../data/lookRules.js';
import { ACCESSORY_PIECES } from '../data/accessoriesData.js';
import { SASHES_PRODUCTS } from '../data/sashesData.js';

/**
 * Pure function to match a bridal gown with its complementary accessories.
 * @param {Object} product - The current bridal gown
 * @param {Array} allProducts - Optional catalog array
 * @returns {{ veil: Object|null, belt: Object|null }}
 */
export const getCompleteTheLook = (product, allProducts = []) => {
  if (!product || typeof product !== 'object') {
    return { veil: null, belt: null };
  }

  // Do not match accessories with other accessories
  if (
    product.category === 'accessories' ||
    product.accessoryType ||
    product.category === 'sashes' ||
    /veil|train|jacket|shrug|cape|scarf|glove|belt|collar|sash/i.test(product.name || '')
  ) {
    return { veil: null, belt: null };
  }

  // Comprehensive accessory lookup pool
  const pool = [
    ...(Array.isArray(allProducts) ? allProducts : []),
    ...ACCESSORY_PIECES,
    ...SASHES_PRODUCTS
  ];

  const findAccessory = (id) => {
    if (!id) return null;
    return pool.find((item) => item && item.id === id) || null;
  };

  // Match against rules in order; fallback if none matched
  const matchedRule =
    LOOK_RULES.find((rule) => {
      try {
        return typeof rule.match === 'function' && rule.match(product);
      } catch {
        return false;
      }
    }) || FALLBACK_LOOK_RULE;

  const veil = findAccessory(matchedRule?.veilId);
  const belt = findAccessory(matchedRule?.beltId);

  return { veil, belt };
};
