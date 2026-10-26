import React from 'react';
import { useApp } from '../../context/AppContext';

export const EditorialSplitBanner = () => {
  const { setSelectedCategory, setCurrentView } = useApp();

  const handleShopFallCollection = (e) => {
    e.stopPropagation();
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('featured-collection-heading');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopWeddingDresses = (e) => {
    e.stopPropagation();
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('featured-collection-heading');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="editorial-split-section" aria-label="Lulus Editorial Bridal Showcase">
      <div className="editorial-split-grid">
        {/* Left Column: Fall in Love */}
        <div
          className="split-banner-card split-card-left"
          onClick={handleShopFallCollection}
          role="region"
          aria-label="Fall in Love Collection"
        >
          <div className="split-banner-media-wrap">
            <img
              src="/images/bridal/lulus-fall-in-love.jpg"
              alt="Bride and groom raising champagne glasses outdoors under sunlit canopy"
              className="split-banner-bg"
              loading="lazy"
            />
            <div className="split-banner-overlay left-overlay" />
          </div>

          <div className="split-card-content content-center-low">
            <h2 className="split-card-title">Fall in Love</h2>
            <p className="split-card-desc">
              Everything you need for the ceremony, the celebration, and the champagne toast.
            </p>
            <button
              type="button"
              className="split-card-cta"
              onClick={handleShopFallCollection}
              aria-label="Shop the Fall Bridal Collection"
            >
              Shop the Fall Bridal Collection
            </button>
          </div>
        </div>

        {/* Right Column: Forever After */}
        <div
          className="split-banner-card split-card-right"
          onClick={handleShopWeddingDresses}
          role="region"
          aria-label="Forever After Wedding Dresses"
        >
          <div className="split-banner-media-wrap">
            <img
              src="/images/bridal/lulus-forever-after.jpg"
              alt="Bride and groom joyfully walking out from grand European manor archway with bridal bouquet raised"
              className="split-banner-bg"
              loading="lazy"
            />
            <div className="split-banner-overlay right-overlay" />
          </div>

          <div className="split-card-content content-bottom">
            <h2 className="split-card-title">Forever After</h2>
            <button
              type="button"
              className="split-card-cta"
              onClick={handleShopWeddingDresses}
              aria-label="Shop Wedding Dresses"
            >
              Shop Wedding Dresses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSplitBanner;
