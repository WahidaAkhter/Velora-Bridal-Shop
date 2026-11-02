/**
 * Central View-to-Path Routing Configuration
 * Constants and pure helpers for clean SPA navigation.
 */

import { findProductBySlug, toProductSlug } from '../utils/productSlug.js';

export { findProductBySlug, toProductSlug };

export const VIEW_TO_PATH = {
  catalog: '/',
  'all-dresses': '/dresses',
  'new-dresses': '/new-dresses',
  'legacy-collection': '/new-dresses',
  'signature-styles': '/signature-styles',
  'quick-ship': '/quick-ship',
  lookbook: '/lookbook',
  lookbooks: '/lookbook',
  'all-collections': '/collections',
  collections: '/collections',
  accessories: '/accessories',
  'wedding-accessories': '/accessories',
  'belts-and-sashes': '/belts-and-sashes',
  sashes: '/belts-and-sashes',
  'bridal-belts-sashes': '/belts-and-sashes',
  'our-story': '/our-story',
  about: '/our-story',
  'about-us': '/our-story',
  checkout: '/checkout',
  account: '/account/overview',
  compare: '/compare',
  'wishlist-shared': '/wishlist/shared'
};

export const PATH_TO_VIEW = {
  '/': 'catalog',
  '/dresses': 'all-dresses',
  '/all-dresses': 'all-dresses',
  '/new-dresses': 'new-dresses',
  '/legacy-collection': 'new-dresses',
  '/signature-styles': 'signature-styles',
  '/quick-ship': 'quick-ship',
  '/lookbook': 'lookbook',
  '/lookbooks': 'lookbook',
  '/collections': 'all-collections',
  '/all-collections': 'all-collections',
  '/accessories': 'accessories',
  '/wedding-accessories': 'accessories',
  '/belts-and-sashes': 'belts-and-sashes',
  '/sashes': 'belts-and-sashes',
  '/bridal-belts-sashes': 'belts-and-sashes',
  '/our-story': 'our-story',
  '/about': 'our-story',
  '/about-us': 'our-story',
  '/checkout': 'checkout',
  '/account': 'account',
  '/account/overview': 'account',
  '/compare': 'compare',
  '/wishlist/shared': 'wishlist-shared'
};

export const VALID_ACCOUNT_TABS = [
  'overview',
  'orders',
  'addresses',
  'wishlist',
  'appointments',
  'vouchers'
];

/**
 * Returns the URL path corresponding to a view name.
 * @param {string} view
 * @param {Object} [options]
 * @param {string} [options.accountTab]
 * @param {Object} [options.product]
 * @returns {string}
 */
export const routeFor = (view, options = {}) => {
  if (!view) return '/';
  if (view.startsWith('/')) return view;

  if ((view === 'product' || view === 'dresses') && options.product) {
    return `/dresses/${toProductSlug(options.product)}`;
  }

  if (view === 'account') {
    const tab = options.accountTab && VALID_ACCOUNT_TABS.includes(options.accountTab)
      ? options.accountTab
      : 'overview';
    return `/account/${tab}`;
  }

  return VIEW_TO_PATH[view] || '/';
};

/**
 * Normalizes a pathname by trimming trailing slashes.
 * @param {string} pathname
 * @returns {string}
 */
const normalizePath = (pathname) => {
  if (!pathname || typeof pathname !== 'string' || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '').toLowerCase();
};

/**
 * Derives the active view name from a pathname.
 * Returns 'not-found' if the path is unknown.
 * @param {string} pathname
 * @param {string} [search]
 * @returns {string}
 */
export const viewFor = (pathname, search = '') => {
  const cleanPath = normalizePath(pathname);

  // Fallback support for legacy ?view= param at root
  if (cleanPath === '/' && search) {
    try {
      const p = new URLSearchParams(search);
      const qView = p.get('view');
      if (qView && VIEW_TO_PATH[qView]) {
        const mappedPath = VIEW_TO_PATH[qView];
        return PATH_TO_VIEW[mappedPath] || qView;
      }
    } catch {
      // ignore
    }
  }

  // Exact match
  if (PATH_TO_VIEW[cleanPath]) {
    return PATH_TO_VIEW[cleanPath];
  }

  // Account sub-routes: /account/:tab
  if (cleanPath.startsWith('/account/')) {
    const sub = cleanPath.slice('/account/'.length);
    if (VALID_ACCOUNT_TABS.includes(sub)) {
      return 'account';
    }
  }

  // Product details sub-routes: /dresses/:slug
  if (cleanPath.startsWith('/dresses/')) {
    const slug = cleanPath.slice('/dresses/'.length);
    if (slug) {
      const matched = findProductBySlug(slug);
      return matched ? 'all-dresses' : 'not-found';
    }
  }

  return 'not-found';
};

/**
 * Extracts the active product from the pathname if on a product route (/dresses/:slug).
 * @param {string} pathname
 * @returns {Object|null}
 */
export const productFor = (pathname) => {
  const cleanPath = normalizePath(pathname);
  if (cleanPath.startsWith('/dresses/')) {
    const slug = cleanPath.slice('/dresses/'.length);
    if (slug) {
      return findProductBySlug(slug);
    }
  }
  return null;
};

/**
 * Extracts the active account tab from the pathname if on an account route.
 * @param {string} pathname
 * @returns {string|null}
 */
export const accountTabFor = (pathname) => {
  const cleanPath = normalizePath(pathname);
  if (cleanPath === '/account' || cleanPath === '/account/overview') return 'overview';
  if (cleanPath.startsWith('/account/')) {
    const sub = cleanPath.slice('/account/'.length);
    if (VALID_ACCOUNT_TABS.includes(sub)) {
      return sub;
    }
  }
  return null;
};
