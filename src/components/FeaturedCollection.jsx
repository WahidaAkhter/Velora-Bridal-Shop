import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const FeaturedCollection = () => {
  const { setSelectedProduct } = useApp();

  // Your original 4 Featured Collection Gowns
  const featuredGowns = PRODUCTS.slice(0, 4);
  const totalItems = featuredGowns.length; // 4

  // Triplicate the items array for infinite looping
  const extendedCards = [...featuredGowns, ...featuredGowns, ...featuredGowns];

  // Start at index 4 (which is featuredGowns[0] in the center cycle)
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [withTransition, setWithTransition] = useState(true);

  // Responsive card measurements
  const [cardMetrics, setCardMetrics] = useState({
    cardWidth: 316,
    cardGap: 22
  });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Measure screen size to adapt card width & gap
  useEffect(() => {
    const updateMetrics = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardMetrics({ cardWidth: 230, cardGap: 14 });
      } else if (w < 768) {
        setCardMetrics({ cardWidth: 260, cardGap: 18 });
      } else if (w < 1100) {
        setCardMetrics({ cardWidth: 285, cardGap: 20 });
      } else {
        setCardMetrics({ cardWidth: 316, cardGap: 22 });
      }
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

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

  const handlePrev = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Seamless boundary wrap when transition ends
  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems * 2) {
      setWithTransition(false);
      setCurrentIndex((prev) => prev - totalItems);
    } else if (currentIndex < totalItems) {
      setWithTransition(false);
      setCurrentIndex((prev) => prev + totalItems);
    }
  };

  // Turn transitions back on after non-animated snap
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        setWithTransition(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  // Handle card click: if not active, navigate to it; if active, open details
  const handleCardClick = (idx, gown) => {
    if (idx !== currentIndex) {
      setWithTransition(true);
      setCurrentIndex(idx);
    } else {
      setSelectedProduct(gown);
    }
  };

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

  // Step size for track translation
  const step = cardMetrics.cardWidth + cardMetrics.cardGap;

  return (
    <section
      className="luxe-featured-section editorial-romance-showcase"
      id="featured-collection"
      aria-label="Featured Collection"
    >
      {/* Editorial Top Split Header (Matching Reference Image) */}
      <div className="editorial-collection-header">
        <div className="editorial-header-left">
          <span className="editorial-kicker">ALLURE ROMANCE</span>
          <h2 className="editorial-script-title">Dreamy and Feminine</h2>
        </div>

        <div className="editorial-header-right">
          <p className="editorial-narrative">
            Allure Romance focuses on softness and movement for the bride drawn to delicate detail.
            This season features floral appliques, airy chiffon, glittering tulle, and romantic touches
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

      {/* Horizontal Editorial Panoramic Carousel Track using your before images */}
      <div
        className="editorial-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="editorial-carousel-track"
          style={{
            transform: `translateX(calc(max(24px, (100vw - 1360px) / 2 + 32px) - ${currentIndex * step}px))`,
            transition: withTransition
              ? 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedCards.map((gown, idx) => {
            const isActive = idx === currentIndex;

            return (
              <div
                key={`${gown.id}-${idx}`}
                className={`editorial-card ${isActive ? 'is-active' : 'is-inactive'}`}
                style={{
                  width: `${cardMetrics.cardWidth}px`,
                  marginRight: `${cardMetrics.cardGap}px`
                }}
                onClick={() => handleCardClick(idx, gown)}
                role="button"
                tabIndex={0}
                aria-label={`${gown.name}. ${isActive ? 'Currently active. Click to view details.' : 'Click to highlight.'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCardClick(idx, gown);
                }}
              >
                <div className="editorial-card-inner">
                  <img
                    src={gown.images[0]}
                    alt={gown.name}
                    className="editorial-card-img"
                    loading="lazy"
                  />

                  {/* Active Highlight Button Overlay */}
                  {isActive && (
                    <button
                      type="button"
                      className="editorial-shop-romance-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(gown);
                      }}
                      aria-label={`Shop ${gown.name}`}
                    >
                      SHOP NOW
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
