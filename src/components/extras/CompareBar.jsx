import React from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../hooks/useCompare';
import { resolveProductById } from '../../utils/catalogResolver';
import { X, ArrowRight, Scale } from 'lucide-react';

export const CompareBar = () => {
  const { currentView, setCurrentView } = useApp();
  const { compareIds, remove, clear } = useCompare();

  // Hide the bar if empty or already in the compare view
  if (!compareIds || compareIds.length === 0 || currentView === 'compare') {
    return null;
  }

  const products = compareIds.map((id) => resolveProductById(id)).filter(Boolean);
  const canCompare = products.length >= 2;

  const handleOpenCompare = () => {
    if (!canCompare) return;
    setCurrentView('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="velora-compare-bar animate-slide-up" aria-label="Gown Comparison Bar">
      <div className="velora-compare-bar-inner">
        {/* Left: Info & Slot Counter */}
        <div className="velora-compare-header">
          <div className="velora-compare-icon-wrap">
            <Scale size={18} className="text-accent" />
          </div>
          <div className="velora-compare-text">
            <span className="velora-compare-label">Compare Gowns</span>
            <span className="velora-compare-counter">
              {products.length} of 3 selected
            </span>
          </div>
        </div>

        {/* Middle: Selected Gown Slots (1 to 3) */}
        <div className="velora-compare-slots">
          {[0, 1, 2].map((slotIdx) => {
            const product = products[slotIdx];
            if (product) {
              const img = product.images?.[0] || product.image || '/images/bridal/hero-bride-clean.jpg';
              return (
                <div key={product.id} className="velora-compare-slot is-filled">
                  <img src={img} alt={product.name} className="velora-compare-thumb" />
                  <span className="velora-compare-name">{product.name}</span>
                  <button
                    type="button"
                    className="velora-compare-slot-remove"
                    onClick={() => remove(product.id)}
                    aria-label={`Remove ${product.name} from comparison`}
                    title="Remove"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            }
            return (
              <div key={`empty-${slotIdx}`} className="velora-compare-slot is-empty">
                <span className="velora-compare-empty-label">Slot {slotIdx + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="velora-compare-actions">
          <button
            type="button"
            className="velora-compare-clear-btn"
            onClick={clear}
            title="Clear comparison"
          >
            Clear All
          </button>
          <button
            type="button"
            className={`velora-compare-submit-btn ${canCompare ? 'is-ready' : 'is-disabled'}`}
            disabled={!canCompare}
            onClick={handleOpenCompare}
            title={canCompare ? 'Compare selected gowns side-by-side' : 'Select at least 2 gowns to compare'}
          >
            <span>Compare</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
