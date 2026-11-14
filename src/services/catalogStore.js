/**
 * VELORA Luxury Bridal Boutique
 * Central Module-Level Catalog Store
 * 
 * Provides:
 * - getCatalog(): Synchronous getter returning the active catalog array.
 *   Starts with local PRODUCTS fallback, seamlessly transitions to live Supabase catalog when loaded.
 * - setCatalog(newCatalog): Called once by productsService / AppContext to update the in-memory catalog
 *   and notify all active subscriber hooks.
 * - useCatalog(): React hook that subscribes to live catalog updates, re-rendering components when data arrives.
 */

import { useSyncExternalStore } from 'react';
import { PRODUCTS } from '../data/products.js';

let currentCatalog = PRODUCTS;
const subscribers = new Set();

function subscribe(callback) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function getSnapshot() {
  return currentCatalog;
}

/**
 * Returns the current catalog synchronously (never undefined or null).
 */
export function getCatalog() {
  return currentCatalog;
}

/**
 * Updates the module-level catalog and notifies all mounted React components.
 */
export function setCatalog(newCatalog) {
  if (Array.isArray(newCatalog) && newCatalog.length > 0) {
    currentCatalog = newCatalog;
    subscribers.forEach((callback) => {
      try {
        callback();
      } catch (err) {
        console.warn('[CatalogStore Subscriber Error]:', err);
      }
    });
  }
}

/**
 * React hook to access catalog state.
 * Re-renders automatically if Supabase data loads after initial mount.
 */
export function useCatalog() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export default {
  getCatalog,
  setCatalog,
  useCatalog
};
