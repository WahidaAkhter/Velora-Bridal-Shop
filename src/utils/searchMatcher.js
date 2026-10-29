/**
 * VELORA Luxury Bridal - Strict Gown & Search Matcher Utility
 * 
 * Ensures that when a user searches for a specific type of gown (e.g., Mermaid, Ballgown, A-Line, Basque Waist, etc.)
 * ONLY gowns belonging to that exact silhouette or type are returned, eliminating false positives caused by
 * casual mentions inside long description paragraphs.
 */

export function cleanText(txt) {
  return (txt || '').replace(/&amp;/g, '&').toLowerCase().trim();
}

/**
 * Extracts normalized silhouette string from product data
 */
export function getSilhouetteKey(p) {
  if (!p) return '';
  let s = cleanText(p.silhouette).split(/sizes?:/i)[0].trim();
  
  if (!s && p.name) {
    const n = cleanText(p.name);
    if (n.includes('ballgown') || n.includes('ball gown')) s = 'ballgown';
    else if (n.includes('mermaid')) s = 'mermaid';
    else if (n.includes('a-line') || n.includes('a line')) s = 'a-line';
    else if (n.includes('mini') || n.includes('short')) s = 'short mini';
    else if (n.includes('princess')) s = 'princess';
  }
  
  if (!s && p.subtitle) {
    const sub = cleanText(p.subtitle);
    if (sub.includes('ballgown') || sub.includes('ball gown')) s = 'ballgown';
    else if (sub.includes('mermaid')) s = 'mermaid';
    else if (sub.includes('a-line') || sub.includes('a line')) s = 'a-line';
    else if (sub.includes('fit & flare') || sub.includes('fit and flare')) s = 'fit and flare';
    else if (sub.includes('drop waist') || sub.includes('drop-waist')) s = 'drop waist';
    else if (sub.includes('basque')) s = 'basque';
    else if (sub.includes('column') || sub.includes('sheath')) s = 'sheath column';
    else if (sub.includes('mini') || sub.includes('bubble mini')) s = 'short mini';
  }
  
  return s;
}

export const SILHOUETTE_DEFINITIONS = [
  {
    id: 'ballgown',
    name: 'Ballgown',
    patterns: ['ballgown', 'ball gown', 'ball-gown'],
    check: (s, p) => s.includes('ballgown') || s.includes('ball gown') || cleanText(p.name).includes('ballgown')
  },
  {
    id: 'mermaid',
    name: 'Mermaid',
    patterns: ['mermaid', 'trumpet', 'fishtail'],
    check: (s, p) => s.includes('mermaid') || s.includes('trumpet') || cleanText(p.name).includes('mermaid')
  },
  {
    id: 'a-line',
    name: 'A-Line',
    patterns: ['a-line', 'a line', 'aline', 'soft a-line'],
    check: (s) => s.includes('a-line') || s.includes('a line') || s.includes('aline')
  },
  {
    id: 'fit-and-flare',
    name: 'Fit & Flare',
    patterns: ['fit and flare', 'fit & flare', 'fit-and-flare'],
    check: (s) => s.includes('fit and flare') || s.includes('fit & flare')
  },
  {
    id: 'drop-waist',
    name: 'Drop Waist',
    patterns: ['drop waist', 'drop-waist', 'dropped waist'],
    check: (s) => s.includes('drop waist') || s.includes('dropped waist')
  },
  {
    id: 'basque-waist',
    name: 'Basque Waist',
    patterns: ['basque', 'basque waist', 'basque corset'],
    check: (s) => s.includes('basque')
  },
  {
    id: 'sheath',
    name: 'Sheath',
    patterns: ['sheath', 'column'],
    check: (s) => s.includes('sheath') || s.includes('column')
  },
  {
    id: 'princess',
    name: 'Princess',
    patterns: ['princess'],
    check: (s, p) => s.includes('princess') || cleanText(p.name).includes('princess') || cleanText(p.subtitle).includes('princess')
  },
  {
    id: 'short',
    name: 'Short / Mini',
    patterns: ['short', 'mini', 'bubble mini'],
    check: (s, p) => s.includes('short') || s.includes('mini') || cleanText(p.name).includes('mini')
  }
];

export const ACCESSORY_DEFINITIONS = [
  {
    id: 'veil',
    patterns: ['veil', 'veils', 'cathedral veil', 'chapel veil'],
    check: (p, s) => p.category === 'accessories' && (s.includes('veil') || cleanText(p.name).includes('veil') || cleanText(p.accessoryType).includes('veil'))
  },
  {
    id: 'gloves',
    patterns: ['glove', 'gloves', 'opera gloves'],
    check: (p, s) => p.category === 'accessories' && (s.includes('glove') || cleanText(p.name).includes('glove') || cleanText(p.accessoryType).includes('glove'))
  },
  {
    id: 'belt',
    patterns: ['belt', 'sash', 'belts', 'sashes', 'ribbon sash', 'bow belt'],
    check: (p, s) => p.category === 'accessories' && (s.includes('belt') || s.includes('sash') || cleanText(p.name).includes('belt') || cleanText(p.name).includes('sash'))
  },
  {
    id: 'cape',
    patterns: ['cape', 'capes'],
    check: (p, s) => p.category === 'accessories' && (s.includes('cape') || cleanText(p.name).includes('cape'))
  },
  {
    id: 'jacket',
    patterns: ['jacket', 'jackets', 'shrug'],
    check: (p, s) => p.category === 'accessories' && (s.includes('jacket') || cleanText(p.name).includes('jacket'))
  },
  {
    id: 'train',
    patterns: ['train', 'trains', 'detachable train', 'overskirt'],
    check: (p, s) => p.category === 'accessories' && (s.includes('train') || s.includes('overskirt') || cleanText(p.name).includes('train') || cleanText(p.name).includes('overskirt'))
  },
  {
    id: 'scarf',
    patterns: ['scarf', 'scarves', 'neck scarf'],
    check: (p, s) => p.category === 'accessories' && (s.includes('scarf') || cleanText(p.name).includes('scarf'))
  },
  {
    id: 'collar',
    patterns: ['collar', 'neck collar'],
    check: (p, s) => p.category === 'accessories' && (s.includes('collar') || cleanText(p.name).includes('collar'))
  }
];

/**
 * Strict Gown Search Matching Function
 * 
 * @param {Object} product - Product record
 * @param {string} query - Raw search query string
 * @returns {boolean} Whether product matches the search strictly
 */
export function matchGownSearchStrict(product, query) {
  if (!product) return false;
  if (!query || !query.trim()) return true;

  const rawQ = cleanText(query);
  const silStr = getSilhouetteKey(product);
  const name = cleanText(product.name);
  const code = cleanText(product.code);
  const slug = cleanText(product.slug);

  // 1. Check if user is searching for a silhouette / gown cut (e.g. 'ballgown', 'mermaid', 'a-line')
  const matchedSil = SILHOUETTE_DEFINITIONS.find(def => def.patterns.some(pat => rawQ.includes(pat)));
  if (matchedSil) {
    // Product MUST match this silhouette
    if (!matchedSil.check(silStr, product)) return false;

    // Check if there are other terms in query (e.g. 'satin ballgown', 'lace mermaid', 'ballgown wedding dress')
    let remaining = rawQ;
    for (const pat of matchedSil.patterns) {
      remaining = remaining.replace(pat, ' ');
    }
    // Remove boilerplate filler terms
    remaining = remaining.replace(/\bgown\b|\bdress\b|\bwedding\b/g, ' ').trim();
    if (!remaining) return true; // Pure silhouette matched!

    // Verify remaining terms against specific attributes (not generic description)
    const tokens = remaining.split(/\s+/).filter(Boolean);
    const tags = (product.tags || []).map(t => cleanText(t));
    const fab = cleanText((product.fabric || '') + ' ' + (product.attributes?.['Fabrication'] || '') + ' ' + (product.attributes?.['Fabric'] || ''));
    const neck = cleanText((product.neckline || '') + ' ' + (product.attributes?.['Neckline'] || '') + ' ' + (product.attributes?.['Sleeves'] || ''));
    const sub = cleanText(product.subtitle);

    return tokens.every(tok => {
      return name.includes(tok) ||
             code.includes(tok) ||
             tags.some(t => t.includes(tok)) ||
             fab.includes(tok) ||
             neck.includes(tok) ||
             sub.includes(tok);
    });
  }

  // 2. Check if user is searching for an accessory type (e.g. 'veil', 'gloves', 'belt', 'train')
  const matchedAcc = ACCESSORY_DEFINITIONS.find(def => def.patterns.some(pat => rawQ.includes(pat)));
  if (matchedAcc) {
    return matchedAcc.check(product, silStr);
  }

  // 3. Name, Code, or Slug exact / substring match (e.g., 'odelle', 'thane', 'lissy', 'a1476')
  if (name.includes(rawQ) || code.includes(rawQ) || slug.includes(rawQ)) {
    return true;
  }

  // 4. Token-based attribute matching (for queries like 'satin', 'lace', 'mikado', 'strapless', 'quick ship')
  // We strictly search title, code, slug, tags, fabric, neckline, category, and subtitle.
  // We deliberately EXCLUDE paragraph descriptions to prevent random word hits from polluting results!
  const tags = (product.tags || []).map(t => cleanText(t));
  const fab = cleanText((product.fabric || '') + ' ' + (product.attributes?.['Fabrication'] || '') + ' ' + (product.attributes?.['Fabric'] || ''));
  const neck = cleanText((product.neckline || '') + ' ' + (product.attributes?.['Neckline'] || '') + ' ' + (product.attributes?.['Sleeves'] || ''));
  const sub = cleanText(product.subtitle);
  const cat = cleanText(product.category);
  const catName = cleanText(product.categoryName);

  const tokens = rawQ.split(/\s+/).filter(Boolean);
  return tokens.every(tok => {
    return name.includes(tok) ||
           code.includes(tok) ||
           slug.includes(tok) ||
           tags.some(t => t.includes(tok)) ||
           fab.includes(tok) ||
           neck.includes(tok) ||
           sub.includes(tok) ||
           silStr.includes(tok) ||
           cat.includes(tok) ||
           catName.includes(tok);
  });
}
