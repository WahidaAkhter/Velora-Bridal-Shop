import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const EditorialSplitBanner = () => {
  const { setSelectedCategory, setSearchQuery } = useApp();

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <section className="editorial-split-section" aria-label="Lulus Editorial Bridal Showcase">
      <div className="editorial-split-grid">
        {/* Left Column: Fall in Love */}
        <Link
          to="/collections"
          className="split-banner-card split-card-left"
          onClick={handleResetFilters}
          aria-label="Fall in Love Collection"
          style={{ textDecoration: 'none', color: 'inherit' }}
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
            <span className="split-card-cta">
              Shop the Fall Bridal Collection
            </span>
          </div>
        </Link>

        {/* Right Column: Forever After */}
        <Link
          to="/dresses"
          className="split-banner-card split-card-right"
          onClick={handleResetFilters}
          aria-label="Forever After Wedding Dresses"
          style={{ textDecoration: 'none', color: 'inherit' }}
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
            <span className="split-card-cta">
              Shop Wedding Dresses
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default EditorialSplitBanner;
