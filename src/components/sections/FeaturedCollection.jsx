import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const FeaturedCollection = () => {
  const { setSelectedProduct } = useApp();

  // Your original 4 Featured Collection Gowns
  const featuredGowns = PRODUCTS.slice(0, 4);
  const total = featuredGowns.length; // 4

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setAnimating(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setAnimating(true);
  };

  const handleSelectGown = (idx) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      setAnimating(true);
    }
  };

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 450);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const activeGown = featuredGowns[activeIndex];
  const prevGown = featuredGowns[(activeIndex - 1 + total) % total];

  // Up to 5 upcoming gowns in cyclic order for the queue
  const queueGowns = [1, 2, 3, 4, 5].map((offset) => {
    const targetIdx = (activeIndex + offset) % total;
    return {
      ...featuredGowns[targetIdx],
      originalIndex: targetIdx,
      queueKey: `${targetIdx}-${offset}`
    };
  });

  return (
    <section
      className="luxe-featured-section editorial-romance-showcase"
      id="featured-collection"
      aria-label="Featured Collection"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="editorial-stage">
        {/* Left Peek Card (sliver of previous gown, bottom-aligned) */}
        <div
          className="editorial-peek-left"
          onClick={handlePrev}
          role="button"
          tabIndex={0}
          aria-label={`Previous gown: ${prevGown.name}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handlePrev();
          }}
        >
          <div className="editorial-peek-inner">
            <img
              src={prevGown.images[0]}
              alt={prevGown.name}
              className="editorial-peek-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Tall Active Spotlight Card (100% height, full opacity, SHOP ROMANCE button) */}
        <div
          className={`editorial-spotlight-card ${animating ? 'is-animating' : ''}`}
          onClick={() => setSelectedProduct(activeGown)}
          role="button"
          tabIndex={0}
          aria-label={`${activeGown.name}. Click to view details.`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setSelectedProduct(activeGown);
          }}
        >
          <div className="editorial-spotlight-img-wrap">
            <img
              key={activeGown.id}
              src={activeGown.images[0]}
              alt={activeGown.name}
              className="editorial-spotlight-img"
              loading="eager"
            />

            {/* SHOP ROMANCE Overlay Button (Exact VELORA Romance Match) */}
            <button
              type="button"
              className="editorial-shop-romance-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(activeGown);
              }}
              aria-label={`Shop ${activeGown.name}`}
            >
              SHOP ROMANCE
            </button>
          </div>
        </div>

        {/* Right Area: Top Header + Bottom Queue Track */}
        <div className="editorial-right-area">
          {/* Editorial Top Split Header (Exact VELORA Romance Layout) */}
          <div className="editorial-collection-header">
            <div className="editorial-header-left">
              <span className="editorial-kicker">VELORA ROMANCE</span>
              <h2 className="editorial-script-title">Dreamy and Feminine</h2>
            </div>

            <div className="editorial-header-right">
              <p className="editorial-narrative">
                VELORA Romance focuses on softness and movement for the bride drawn to delicate detail.
                This season features floral appliqués, airy chiffon, glittering tulle, and romantic touches
                — designed to feel dreamy, light, and effortlessly beautiful.
              </p>

              <div className="editorial-nav-controls">
                <button
                  type="button"
                  className="editorial-nav-btn prev-btn"
                  onClick={handlePrev}
                  aria-label="Previous gown"
                >
                  &lt; PREVIOUS
                </button>
                <button
                  type="button"
                  className="editorial-nav-btn next-btn"
                  onClick={handleNext}
                  aria-label="Next gown"
                >
                  NEXT &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Queue Track (Cards 2, 3, 4, etc. aligned below header, height matching left peek) */}
          <div className="editorial-queue-container">
            <div className="editorial-queue-track">
              {queueGowns.map((gown) => (
                <div
                  key={`${gown.id}-${gown.queueKey}`}
                  className="editorial-queue-card"
                  onClick={() => handleSelectGown(gown.originalIndex)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Highlight ${gown.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSelectGown(gown.originalIndex);
                  }}
                >
                  <div className="editorial-queue-card-inner">
                    <img
                      src={gown.images[0]}
                      alt={gown.name}
                      className="editorial-queue-card-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
