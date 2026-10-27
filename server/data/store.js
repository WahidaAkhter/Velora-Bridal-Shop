import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import full datasets directly from src/data
import { PRODUCTS } from '../../src/data/products.js';
import {
  LEGACY_COLLECTION_GOWNS,
  LEGACY_FILTER_SHAPES,
  LEGACY_FILTER_STYLES
} from '../../src/data/legacyCollectionData.js';
import { QUICK_SHIP_HERO_INFO, QUICK_SHIP_GOWNS } from '../../src/data/quickShipData.js';
import { SASHES_PRODUCTS, SASHES_HERO_INFO } from '../../src/data/sashesData.js';
import { ACCESSORY_PIECES, ACCESSORIES_NAV_DATA } from '../../src/data/accessoriesData.js';
import {
  ACCESSORIES_PAGE_HEADER,
  ACCESSORIES_COLLECTION_CARDS,
  VELORA_BRANDS_CAROUSEL
} from '../../src/data/accessoriesPageData.js';
import {
  COLLECTIONS_HERO_DATA,
  SEASONAL_COLLECTIONS_DATA,
  SHAPE_AND_STYLE_CARDS
} from '../../src/data/allCollectionsData.js';
import { LOOKBOOKS_DATA } from '../../src/data/lookbookData.js';
import {
  OUR_STORY_SECTIONS,
  OUR_STORY_QA_LIST,
  OUR_STORY_VIP_BANNER
} from '../../src/data/ourStoryData.js';
import { CURRENCIES, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../../src/data/channels.js';
import { VOUCHERS, INITIAL_USER } from '../../src/data/vouchers.js';

import { transformDataImageUrls } from '../utils/mediaUrl.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Transform image URLs so 100% of images originate from backend server (http://localhost:5000)
const transformedProducts = transformDataImageUrls(PRODUCTS);
const transformedLegacyCollection = transformDataImageUrls({
  gowns: LEGACY_COLLECTION_GOWNS,
  shapes: LEGACY_FILTER_SHAPES,
  styles: LEGACY_FILTER_STYLES
});
const transformedQuickShip = transformDataImageUrls({
  header: QUICK_SHIP_HERO_INFO,
  products: QUICK_SHIP_GOWNS
});
const transformedSashes = transformDataImageUrls({
  hero: SASHES_HERO_INFO,
  products: SASHES_PRODUCTS
});
const transformedAccessories = transformDataImageUrls({
  header: ACCESSORIES_PAGE_HEADER,
  cards: ACCESSORIES_COLLECTION_CARDS,
  items: ACCESSORY_PIECES,
  nav: ACCESSORIES_NAV_DATA,
  carousel: VELORA_BRANDS_CAROUSEL
});
const transformedAllCollections = transformDataImageUrls({
  hero: COLLECTIONS_HERO_DATA,
  seasonal: SEASONAL_COLLECTIONS_DATA,
  shapeAndStyle: SHAPE_AND_STYLE_CARDS
});
const transformedLookbooks = transformDataImageUrls(LOOKBOOKS_DATA);
const transformedOurStory = transformDataImageUrls({
  sections: OUR_STORY_SECTIONS,
  faqs: OUR_STORY_QA_LIST,
  vipBanner: OUR_STORY_VIP_BANNER
});

// Database in-memory instance
let db = null;

export const getDB = () => {
  if (db) return db;

  let savedData = {};
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      savedData = JSON.parse(content);
    }
  } catch (e) {
    console.warn('[VELORA DB] Note: reading db.json failed, initializing fresh storage:', e.message);
  }

  db = {
    products: transformedProducts,
    legacyCollection: transformedLegacyCollection,
    quickShip: transformedQuickShip,
    sashes: transformedSashes,
    accessories: transformedAccessories,
    allCollections: transformedAllCollections,
    lookbooks: transformedLookbooks,
    ourStory: transformedOurStory,
    channels: {
      currencies: CURRENCIES,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      taxRate: TAX_RATE
    },
    vouchers: VOUCHERS,
    orders: savedData.orders || [
      {
        id: 'VLR-89241',
        date: '2026-09-28',
        status: 'Delivered',
        trackingNumber: 'TRK-908234-US',
        carrier: 'FedEx Express',
        estimatedDelivery: 'Sep 30, 2026',
        items: [
          {
            id: 'prod-1',
            name: 'Lace Dream Gown',
            variantName: 'Ivory / US 4',
            price: 2199,
            quantity: 1,
            image: 'http://localhost:5000/images/bridal/featured-lace-dream.jpg'
          }
        ],
        subtotal: 2199,
        discount: 219.9,
        shipping: 0,
        tax: 158.32,
        total: 2137.42,
        shippingAddress: {
          firstName: 'Eleanor',
          lastName: 'Vance',
          street: '742 Evergreen Terrace, Suite 4B',
          city: 'Seattle',
          state: 'WA',
          zip: '98101'
        },
        paymentMethod: 'Visa ending in 4242'
      }
    ],
    appointments: savedData.appointments || [
      {
        id: 'apt-101',
        name: 'Eleanor Vance',
        email: 'eleanor.vance@example.com',
        phone: '+1 (555) 234-8901',
        service: 'Signature Bridal Gown Consultation',
        appointmentDate: '2026-11-15',
        timeSlot: '02:00 PM',
        weddingDate: '2027-04-18',
        stylist: 'Chloe Laurent (Master Bridal Stylist)',
        status: 'Confirmed',
        location: 'VELORA Atelier, 123 Bridal Lane, New York, NY',
        notes: 'Interested in Basque waist silhouettes and cathedral veils',
        createdAt: '2026-10-25T10:00:00.000Z'
      }
    ],
    users: savedData.users || [INITIAL_USER]
  };

  saveDB();
  return db;
};

export const saveDB = () => {
  if (!db) return;
  try {
    // Only persist user modifications: orders, appointments, users
    const toSave = {
      orders: db.orders,
      appointments: db.appointments,
      users: db.users
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(toSave, null, 2), 'utf-8');
  } catch (e) {
    console.warn('[VELORA DB] Failed to save to disk:', e.message);
  }
};
