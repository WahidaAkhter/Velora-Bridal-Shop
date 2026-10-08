import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Tag } from 'lucide-react';

export const PromoBannerSection = () => {
  const { setCurrentView, setSelectedCategory, applyVoucherCode } = useApp();

  const handleApplyPromo = () => {
    applyVoucherCode('SALEOR20');
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="promo-banner-section" aria-label="Promotional Campaign">
      <div className="container">
        <div className="promo-banner-card glass-panel">
          <div className="promo-bg-layer">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
              alt="VELORA Collection Campaign"
              loading="lazy"
            />
            <div className="promo-overlay"></div>
          </div>

          <div className="promo-content">
            <div className="promo-tag-row">
              <span className="promo-code-badge">PROMO: SALEOR20</span>
            </div>

            <h2 className="promo-headline">
              Elevate Your Everyday Essentials
            </h2>

            <p className="promo-subtext">
              Experience handcrafted full-grain leather, GOTS organic french terry cotton, and precision acoustic technology. Enjoy <strong>20% OFF</strong> your entire order with complimentary express worldwide delivery.
            </p>

            <div className="promo-actions">
              <button onClick={handleApplyPromo} className="btn btn-accent btn-lg">
                Shop The Sale <ArrowRight size={18} />
              </button>
              <span className="promo-guarantee-note">
                *Free returns within 30 days. Code automatically applied.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
