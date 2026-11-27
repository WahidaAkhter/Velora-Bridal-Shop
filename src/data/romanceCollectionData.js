/**
 * VELORA Romance Collection Data ("Dreamy and Feminine")
 * Aggregates every gown silhouette, neckline, and fabrication matching the
 * signature sunlit stone-estate & warm cream-plaster editorial aesthetic.
 */
import { ALL_SHOP_DRESSES } from './allDressesData.js';
import { QUICK_SHIP_GOWNS } from './quickShipData.js';
import { LEGACY_COLLECTION_GOWNS } from './legacyCollectionData.js';

export const ROMANCE_HERO_INFO = {
  eyebrow: 'VELORA ROMANCE',
  title: 'Dreamy and Feminine',
  subtitle: 'Softly draped silhouettes, Chantilly floral lace sleeves, luminous Mikado pleats, and sheer tulle scarves photographed in sunlit estates & minimalist cream studios.',
  editorialStrip: [
    {
      label: 'A-Line Organza',
      image: '/images/quick-ship/lissy-1.jpg',
      alt: 'LISSY off-the-shoulder pleated A-line gown on manor stone steps'
    },
    {
      label: 'Mikado & Neck Scarf',
      image: '/images/quick-ship/wendall-1.jpg',
      alt: 'WENDALL strapless drop-waist silk Mikado gown with sheer scarf'
    },
    {
      label: 'Lace & Draped Satin',
      image: 'https://madilane.com/wp-content/uploads/2026/05/ML26667_Odelle1.jpg',
      alt: 'ODELLE draped satin and Chantilly lace off-the-shoulder gown'
    },
    {
      label: 'Botanical Lace Corset',
      image: '/images/quick-ship/walker-1.jpg',
      alt: 'WALKER 3D botanical lace appliqué gown with sheer sleeves'
    }
  ]
};

export const ROMANCE_FILTER_TYPES = [
  { id: 'all', label: 'All Romance Gowns' },
  { id: 'a-line', label: 'A-Line' },
  { id: 'ballgown', label: 'Ballgown' },
  { id: 'fit-and-flare', label: 'Fit & Flare & Mermaid' },
  { id: 'sheath', label: 'Sheath & Minimalist' },
  { id: 'off-the-shoulder', label: 'Off-The-Shoulder' },
  { id: 'lace-sleeves', label: 'Lace Sleeves & Scarf' },
  { id: 'basque-drop', label: 'Basque & Drop Waist' }
];

const classifyRomanceTypes = (gown) => {
  const hay = [
    gown.name,
    gown.subtitle,
    gown.shape,
    gown.silhouette,
    gown.fabric,
    gown.neckline,
    gown.sleeves,
    gown.description,
    ...(gown.tags || [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const types = new Set();
  if (/a-line|a line/.test(hay)) types.add('a-line');
  if (/ballgown|ball gown|princess/.test(hay)) types.add('ballgown');
  if (/fit\s*&?\s*flare|mermaid|trumpet/.test(hay)) types.add('fit-and-flare');
  if (/sheath|column|crepe|minimal|liquid/.test(hay)) types.add('sheath');
  if (/off-the-shoulder|off the shoulder|draped.*cuff|draped.*band/.test(hay)) types.add('off-the-shoulder');
  if (/sleeve|scarf|choker|bolero|collar/.test(hay)) types.add('lace-sleeves');
  if (/basque|drop waist|drop-waist|corset/.test(hay)) types.add('basque-drop');

  if (types.size === 0) types.add('a-line');
  return Array.from(types);
};

// Local Quick Ship photography lookup by gown code/name for instant cream-studio hero rendering
const QUICK_SHIP_BY_KEY = QUICK_SHIP_GOWNS.reduce((acc, q) => {
  acc[q.name.toUpperCase().trim()] = q;
  return acc;
}, {});

const buildRomanceGowns = () => {
  const seenNames = new Set();
  const list = [];

  // Prioritize Quick Ship (guaranteed local cream-studio & stone estate photos),
  // then All Shop Dresses, then Legacy Collection extras.
  const orderedSources = [
    ...QUICK_SHIP_GOWNS,
    ...ALL_SHOP_DRESSES,
    ...LEGACY_COLLECTION_GOWNS
  ];

  for (const item of orderedSources) {
    const key = (item.name || '').toUpperCase().trim();
    if (!key || seenNames.has(key)) continue;
    seenNames.add(key);

    const qsOverride = QUICK_SHIP_BY_KEY[key];
    const primaryImg = qsOverride?.image || item.images?.[0] || item.image;
    const secondaryImg = qsOverride?.images?.[1] || item.hoverImage || item.images?.[1] || primaryImg;
    const allImages = Array.from(
      new Set([
        ...(qsOverride?.images || []),
        ...(item.images || []),
        item.image,
        item.hoverImage
      ].filter(Boolean))
    );

    const normalized = {
      ...item,
      image: primaryImg,
      hoverImage: secondaryImg,
      images: allImages.length > 0 ? allImages : [primaryImg],
      romanceTypes: classifyRomanceTypes(item)
    };

    list.push(normalized);
  }

  return list;
};

export const ROMANCE_COLLECTION_GOWNS = buildRomanceGowns();
