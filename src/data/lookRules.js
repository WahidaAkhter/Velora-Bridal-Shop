/**
 * Complete the Look Style Rules
 * Maps gown silhouettes, fabrication, and aesthetics to curated veil and belt/train accessories.
 * Derived from real fields in allDressesData.js, products.js, accessoriesData.js, and sashesData.js.
 */

export const LOOK_RULES = [
  // 1. Ballgown / Princess / Grand Voluminous Silhouettes
  {
    name: 'Ballgown & Princess',
    match: (product) => {
      const text = `${product.silhouette || ''} ${product.shape || ''} ${product.name || ''} ${product.subtitle || ''} ${product.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes('ballgown') || text.includes('ball gown') || text.includes('princess');
    },
    veilId: 'acc-veil-cathedral-01', // V098C Cathedral Floral Lace Veil
    beltId: 'acc-belt-crystal'      // Valeria Hand-Embroidered Crystal & Pearl Sash
  },

  // 2. A-Line Silhouettes
  {
    name: 'A-Line',
    match: (product) => {
      const text = `${product.silhouette || ''} ${product.shape || ''} ${product.name || ''} ${product.subtitle || ''} ${product.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes('a-line') || text.includes('aline');
    },
    veilId: 'acc-veil-pearl-02',    // V40 Luminous Pearl Droplet Veil
    beltId: 'sash-s156'             // S156 Atelier Belt
  },

  // 3. Mermaid, Fit & Flare, Sheath
  {
    name: 'Mermaid & Fit Flare',
    match: (product) => {
      const text = `${product.silhouette || ''} ${product.shape || ''} ${product.name || ''} ${product.subtitle || ''} ${product.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes('mermaid') || text.includes('fit & flare') || text.includes('sheath') || text.includes('trumpet');
    },
    veilId: 'acc-veil-pearl-02',    // V40 Luminous Pearl Droplet Veil
    beltId: 'acc-train-a1478t'      // A1478T Sculpted Royal Detachable Train
  },

  // 4. Basque Waist & Drop Waist Silhouettes
  {
    name: 'Basque & Drop Waist',
    match: (product) => {
      const text = `${product.silhouette || ''} ${product.shape || ''} ${product.name || ''} ${product.subtitle || ''} ${product.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes('basque') || text.includes('drop waist') || text.includes('drop-waist');
    },
    veilId: 'acc-veil-cathedral-01', // V098C Cathedral Floral Lace Veil
    beltId: 'acc-belt-crystal'      // Valeria Hand-Embroidered Crystal & Pearl Sash
  },

  // 5. Boho, Beach, Minimal & Romantic
  {
    name: 'Bohemian & Modern Romantic',
    match: (product) => {
      const text = `${product.silhouette || ''} ${product.shape || ''} ${product.name || ''} ${product.subtitle || ''} ${product.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes('boho') || text.includes('beach') || text.includes('simple') || text.includes('modern');
    },
    veilId: 'acc-veil-pearl-02',    // V40 Luminous Pearl Droplet Veil
    beltId: 'sash-s154'             // S154 Atelier Belt
  }
];

// Fallback rule for any gown with unclassified or custom silhouette
export const FALLBACK_LOOK_RULE = {
  name: 'Signature Atelier Classic',
  veilId: 'acc-veil-cathedral-01', // V098C Cathedral Floral Lace Veil
  beltId: 'acc-belt-crystal'      // Valeria Hand-Embroidered Crystal & Pearl Sash
};
