import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { PRODUCTS } from '../../data/products';
import { ALL_SHOP_DRESSES } from '../../data/allDressesData';
import { ACCESSORY_PIECES } from '../../data/accessoriesData';
import { QUICK_SHIP_GOWNS } from '../../data/quickShipData';
import { LEGACY_COLLECTION_GOWNS } from '../../data/legacyCollectionData';

export const RecentlyViewedStrip = ({ excludeId = null, title = 'Recently Viewed' }) => {
  const { setSelectedProduct, formatPrice } = useApp();
  const { recentIds } = useRecentlyViewed();

  // Combine product datasets for comprehensive lookup
  const productLookup = useMemo(() => {
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
  }, []);

  // Filter IDs (deduped, excluding excludeId, and existing in catalog)
  const items = useMemo(() => {
    if (!Array.isArray(recentIds) || recentIds.length === 0) return [];
    return recentIds
      .filter((id) => !excludeId || id !== excludeId)
      .map((id) => productLookup.get(id))
      .filter(Boolean);
  }, [recentIds, excludeId, productLookup]);

  // Render nothing when empty
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="velora-recent-section" aria-label="Recently viewed products">
      <div className="velora-recent-container">
        <div className="velora-recent-header">
          <div className="velora-recent-title-group">
            <span className="velora-recent-kicker">PERSONALIZED SANCTUARY</span>
            <h3 className="velora-recent-title">{title}</h3>
          </div>
          <span className="velora-recent-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="velora-recent-strip" role="list">
          {items.map((product) => {
            const img =
              product.images?.[0] ||
              product.image ||
              '/images/bridal/hero-bride-clean.jpg';
            const price =
              product.price ??
              product.variants?.[0]?.price ??
              0;

            return (
              <button
                key={product.id}
                type="button"
                className="velora-recent-card"
                role="listitem"
                onClick={() => {
                  setSelectedProduct(product);
                }}
                aria-label={`View ${product.name}`}
              >
                <div className="velora-recent-img-wrap">
                  <img
                    src={img}
                    alt={product.name}
                    className="velora-recent-img"
                    loading="lazy"
                  />
                  <span className="velora-recent-hover-hint">Quick View</span>
                </div>
                <div className="velora-recent-card-body">
                  <h4 className="velora-recent-name">{product.name}</h4>
                  {product.subtitle && (
                    <p className="velora-recent-subtitle">{product.subtitle}</p>
                  )}
                  <span className="velora-recent-price">{formatPrice(price)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
