import React from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../hooks/useCompare';
import { resolveProductById } from '../../utils/catalogResolver';
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  Eye,
  Scale
} from 'lucide-react';

export const CompareView = () => {
  const { setCurrentView, formatPrice, addToCart, setSelectedProduct } = useApp();
  const { compareIds, remove, clear } = useCompare();

  const products = compareIds.map((id) => resolveProductById(id)).filter(Boolean);

  // If fewer than 2 products remain
  if (products.length < 2) {
    return (
      <div className="velora-compare-page-empty animate-fade-in" role="region" aria-label="Gown comparison empty state">
        <div className="velora-compare-empty-card">
          <div className="velora-compare-empty-icon">
            <Scale size={36} className="text-accent" />
          </div>
          <span className="velora-compare-kicker">ATELIER COMPARISON STUDIO</span>
          <h2 className="velora-compare-empty-title">Select Gowns to Compare</h2>
          <p className="velora-compare-empty-desc">
            You need at least 2 bridal gowns selected to inspect side-by-side silhouette cuts, fabrication, necklines, and delivery timelines.
          </p>
          <div className="velora-compare-empty-actions">
            <button
              type="button"
              className="velora-compare-btn-primary"
              onClick={() => {
                setCurrentView('all-dresses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Browse All Wedding Dresses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Row definition helper
  const isDiff = (vals) => {
    if (!vals || vals.length <= 1) return false;
    const clean = vals.map((v) => String(v || '').trim().toLowerCase());
    return clean.some((val) => val !== clean[0]);
  };

  // 1. Data Extractors for each row
  const rowExtractors = [
    {
      key: 'price',
      label: 'Price',
      getValue: (p) => formatPrice(p.price ?? p.variants?.[0]?.price ?? 0),
      isText: true
    },
    {
      key: 'silhouette',
      label: 'Silhouette',
      getValue: (p) => p.silhouette || p.shape || p.categoryName || '—',
      isText: true
    },
    {
      key: 'neckline',
      label: 'Neckline & Sleeves',
      getValue: (p) => p.neckline || p.attributes?.['Neckline'] || p.sleeves || p.attributes?.['Sleeves'] || '—',
      isText: true
    },
    {
      key: 'fabric',
      label: 'Fabrication',
      getValue: (p) => p.fabric || p.attributes?.['Fabric'] || p.attributes?.['Fabrication'] || '—',
      isText: true
    },
    {
      key: 'leadTime',
      label: 'Production & Delivery',
      getValue: (p) =>
        p.timeline ||
        p.attributes?.['Lead Time'] ||
        (p.category === 'quick-ship' ? '2–3 Weeks (Express Dispatch)' : '8–12 Weeks (Bespoke Handcrafted)'),
      isText: true
    },
    {
      key: 'stock',
      label: 'Atelier Availability',
      getValue: (p) => {
        if (p.stock !== undefined && p.stock !== null) {
          return p.stock > 0 ? `${p.stock} units in atelier` : 'Made to order';
        }
        return 'Available to order';
      },
      isText: true
    },
    {
      key: 'sizes',
      label: 'Available Sizing',
      getValue: (p) => {
        if (Array.isArray(p.variants) && p.variants.length > 0) {
          const sizes = p.variants.map((v) => v.size || v.name).filter(Boolean);
          if (sizes.length > 0) return sizes.join(', ');
        }
        return 'US 2 to 28 (Custom Made)';
      },
      isText: true
    },
    {
      key: 'rating',
      label: 'Customer Rating',
      getValue: (p) =>
        p.rating ? `${p.rating} / 5 (${p.reviewCount || 12} reviews)` : '5.0 / 5 (Atelier verified)',
      isText: true
    }
  ];

  return (
    <div className="velora-compare-page animate-fade-in" role="region" aria-label="Gown comparison table">
      {/* Top Navigation & Title Bar */}
      <div className="velora-compare-top-bar">
        <button
          type="button"
          className="velora-compare-back-btn"
          onClick={() => {
            setCurrentView('all-dresses');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Collection</span>
        </button>

        <div className="velora-compare-page-heading">
          <span className="velora-compare-kicker">HAUTE COUTURE SPECIFICATIONS</span>
          <h1 className="velora-compare-main-title">Gown Comparison Studio</h1>
          <p className="velora-compare-subtitle">
            Inspecting {products.length} gowns side-by-side. Rows with differences are highlighted in champagne gold.
          </p>
        </div>

        <button
          type="button"
          className="velora-compare-clear-top-btn"
          onClick={clear}
        >
          <Trash2 size={14} />
          <span>Clear All</span>
        </button>
      </div>

      {/* Side-by-Side Comparison Table (Sticky first column on mobile) */}
      <div className="velora-compare-table-wrapper">
        <table className="velora-compare-table">
          <thead>
            {/* Header: Product Visual Card */}
            <tr>
              <th className="velora-compare-th-label sticky-col">
                <span className="velora-compare-attr-title">Gown Overview</span>
              </th>
              {products.map((product) => {
                const img = product.images?.[0] || product.image || '/images/bridal/hero-bride-clean.jpg';
                return (
                  <th key={product.id} className="velora-compare-th-item">
                    <div className="velora-compare-item-card">
                      <div
                        className="velora-compare-img-box"
                        onClick={() => setSelectedProduct(product)}
                        title="Click to view full gown details"
                      >
                        <img src={img} alt={product.name} className="velora-compare-img" />
                        <span className="velora-compare-quick-hint">
                          <Eye size={13} /> Quick View
                        </span>
                      </div>
                      <h3 className="velora-compare-gown-name" onClick={() => setSelectedProduct(product)}>
                        {product.name}
                      </h3>
                      <button
                        type="button"
                        className="velora-compare-remove-item-btn"
                        onClick={() => remove(product.id)}
                        title={`Remove ${product.name} from comparison`}
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {/* Specification Rows */}
            {rowExtractors.map((row) => {
              const values = products.map((p) => row.getValue(p));
              const hasDiff = isDiff(values);

              return (
                <tr key={row.key} className={`velora-compare-tr ${hasDiff ? 'is-different-row' : ''}`}>
                  <td className="velora-compare-td-label sticky-col">
                    <div className="velora-compare-label-cell">
                      <span>{row.label}</span>
                      {hasDiff && <span className="velora-diff-badge">Differs</span>}
                    </div>
                  </td>
                  {values.map((val, idx) => (
                    <td key={`${row.key}-${products[idx].id}`} className="velora-compare-td-val">
                      <span className="velora-compare-cell-text">{val || '—'}</span>
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Final Action Row: Add to Bag */}
            <tr className="velora-compare-action-row">
              <td className="velora-compare-td-label sticky-col">
                <span className="velora-compare-attr-title">Order Consultation</span>
              </td>
              {products.map((product) => {
                const defaultVar = Array.isArray(product.variants) && product.variants.length > 0
                  ? product.variants[0]
                  : null;
                return (
                  <td key={`add-${product.id}`} className="velora-compare-td-val">
                    <button
                      type="button"
                      className="velora-compare-add-cart-btn"
                      onClick={() => addToCart(product, defaultVar, 1)}
                    >
                      <ShoppingBag size={15} />
                      <span>Add to Bag</span>
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
