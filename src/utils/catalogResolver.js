import { getCatalog } from '../services/catalogStore.js';
import { ALL_SHOP_DRESSES } from '../data/allDressesData.js';
import { ACCESSORY_PIECES } from '../data/accessoriesData.js';
import { QUICK_SHIP_GOWNS } from '../data/quickShipData.js';
import { LEGACY_COLLECTION_GOWNS } from '../data/legacyCollectionData.js';

let lastCatalogRef = null;
let cachedMap = null;

const buildCatalogMap = () => {
  const currentCatalog = getCatalog();
  if (cachedMap && lastCatalogRef === currentCatalog) return cachedMap;
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
  cachedMap = map;
  return map;
};

export const resolveProductById = (id) => {
  if (!id) return null;
  const map = buildCatalogMap();
  return map.get(id) || null;
};

