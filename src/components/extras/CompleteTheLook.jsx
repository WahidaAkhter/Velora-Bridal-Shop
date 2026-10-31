import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getCompleteTheLook } from '../../utils/completeTheLook';
import { ShoppingBag, Plus } from 'lucide-react';

export const CompleteTheLook = ({ product, selectedVariant = null }) => {
  const { addToCart, formatPrice, showToast } = useApp();

  const { veil, belt } = useMemo(() => {
    return getCompleteTheLook(product);
  }, [product]);

  // Hide the section if no accessory suggestions are found
  if (!veil && !belt) {
    return null;
  }

  const gownPrice = selectedVariant?.price ?? product?.price ?? 0;
  const veilPrice = veil?.price ?? veil?.variants?.[0]?.price ?? 0;
  const beltPrice = belt?.price ?? belt?.variants?.[0]?.price ?? 0;

  const bundleTotal = gownPrice + (veil ? veilPrice : 0) + (belt ? beltPrice : 0);

  const handleAddAllToBag = () => {
    if (!product) return;

    // 1. Add gown with current selected variant
    addToCart(product, selectedVariant, 1);

    // 2. Add matched veil
    if (veil) {
      const veilVariant = Array.isArray(veil.variants) && veil.variants.length > 0 ? veil.variants[0] : null;
      addToCart(veil, veilVariant, 1);
    }

    // 3. Add matched belt / sash / train
    if (belt) {
      const beltVariant = Array.isArray(belt.variants) && belt.variants.length > 0 ? belt.variants[0] : null;
      addToCart(belt, beltVariant, 1);
    }

    showToast(`Complete bridal look added to your bag!`);
  };

  const gownImg = product.images?.[0] || product.image || '/images/bridal/hero-bride-clean.jpg';
  const veilImg = veil?.images?.[0] || veil?.image || '/images/bridal/featured-lace-dream.jpg';
  const beltImg = belt?.images?.[0] || belt?.image || '/images/bridal/style-sparkle-beaded.jpg';

  return (
    <section className="velora-complete-look-box" aria-label="Complete the Look">
      <div className="velora-look-header">
        <span className="velora-look-kicker">ATELIER STYLING</span>
        <h4 className="velora-look-title">Complete The Look</h4>
        <p className="velora-look-desc">
          Pair this gown with our master stylist’s recommended veil & accessory for a harmonious ceremony aesthetic.
        </p>
      </div>

      <div className="velora-look-bundle-grid">
        {/* 1. The Gown */}
        <div className="velora-bundle-card">
          <div className="velora-bundle-thumb-wrap">
            <img src={gownImg} alt={product.name} className="velora-bundle-thumb" loading="lazy" />
            <span className="velora-bundle-badge">The Gown</span>
          </div>
          <div className="velora-bundle-info">
            <span className="velora-bundle-name">{product.name}</span>
            <span className="velora-bundle-price">{formatPrice(gownPrice)}</span>
          </div>
        </div>

        {/* Separator + */}
        {veil && (
          <>
            <div className="velora-bundle-plus" aria-hidden="true">
              <Plus size={16} />
            </div>

            {/* 2. The Veil */}
            <div className="velora-bundle-card">
              <div className="velora-bundle-thumb-wrap">
                <img src={veilImg} alt={veil.name} className="velora-bundle-thumb" loading="lazy" />
                <span className="velora-bundle-badge">{veil.accessoryType || 'Veil'}</span>
              </div>
              <div className="velora-bundle-info">
                <span className="velora-bundle-name">{veil.name}</span>
                <span className="velora-bundle-price">{formatPrice(veilPrice)}</span>
              </div>
            </div>
          </>
        )}

        {/* Separator + */}
        {belt && (
          <>
            <div className="velora-bundle-plus" aria-hidden="true">
              <Plus size={16} />
            </div>

            {/* 3. The Belt or Train */}
            <div className="velora-bundle-card">
              <div className="velora-bundle-thumb-wrap">
                <img src={beltImg} alt={belt.name} className="velora-bundle-thumb" loading="lazy" />
                <span className="velora-bundle-badge">{belt.accessoryType || 'Belt'}</span>
              </div>
              <div className="velora-bundle-info">
                <span className="velora-bundle-name">{belt.name || belt.title}</span>
                <span className="velora-bundle-price">{formatPrice(beltPrice)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer bar with total & CTA */}
      <div className="velora-look-footer">
        <div className="velora-look-total-wrap">
          <span className="velora-look-total-label">Ensemble Total ({1 + (veil ? 1 : 0) + (belt ? 1 : 0)} Pieces)</span>
          <span className="velora-look-total-price">{formatPrice(bundleTotal)}</span>
        </div>
        <button
          type="button"
          className="velora-look-cta-btn"
          onClick={handleAddAllToBag}
          aria-label="Add complete bridal ensemble to bag"
        >
          <ShoppingBag size={18} />
          <span>Add All to Bag</span>
        </button>
      </div>
    </section>
  );
};
