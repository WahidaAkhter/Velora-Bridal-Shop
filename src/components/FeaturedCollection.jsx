import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const FeaturedCollection = () => {
  const {
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    formatPrice
  } = useApp();

  const featuredGowns = PRODUCTS.slice(0, 4);

  return (
    <section className="luxe-featured-section" id="featured-collection-heading" aria-label="Featured Collection">
      {/* Decorative Section Header */}
      <div className="luxe-ornament-header">
        <span className="ornament-line"></span>
        <span className="ornament-diamond">◇</span>
        <h2 className="ornament-title">FEATURED COLLECTION</h2>
        <span className="ornament-diamond">◇</span>
        <span className="ornament-line"></span>
      </div>

      {/* 4 Cards Grid */}
      <div className="featured-cards-container">
        {featuredGowns.map((gown, index) => {
          const isWishlisted = wishlist.includes(gown.id);
          // Show wishlist heart on card 3 and 4 as in the reference image, or interactive on all
          const showHeartIcon = true;

          return (
            <div
              key={gown.id}
              className="featured-gown-card"
              onClick={() => setSelectedProduct(gown)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedProduct(gown);
              }}
            >
              <div className="featured-card-media">
                <img
                  src={gown.images[0]}
                  alt={gown.name}
                  className="featured-gown-img"
                  loading="lazy"
                />

                {/* Wishlist Heart Button (as on Card 3 & 4 in image) */}
                {showHeartIcon && (
                  <button
                    className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(gown.id);
                    }}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={14}
                      className={isWishlisted ? 'fill-rose text-rose' : 'text-muted'}
                    />
                  </button>
                )}
              </div>

              <div className="featured-card-body">
                <h3 className="featured-gown-title">{gown.name}</h3>
                <p className="featured-gown-subtitle">{gown.subtitle}</p>
                <span className="featured-gown-price">{formatPrice(gown.price)}</span>

                <button
                  className="featured-shop-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(gown);
                  }}
                >
                  <span>SHOP NOW</span>
                  <ArrowRight size={12} className="shop-arrow" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCollection;
