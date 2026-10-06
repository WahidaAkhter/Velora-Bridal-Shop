import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

import { useReveal } from '../hooks/useMotion';

export const ProductCard = ({ product, index = 0 }) => {
  const [revealRef, revealed] = useReveal();
  const {
    setSelectedProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice
  } = useApp();

  const savingsPct = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      ref={revealRef}
      className={`product-card glass-panel reveal ${revealed ? 'revealed' : ''}`}
      style={{ '--i': index % 8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Frame */}
      <div className="card-media-wrapper" onClick={() => setSelectedProduct(product)}>
        {product.badge && (
          <span className={`card-badge badge-${product.isBestseller ? 'gold' : product.isNew ? 'accent' : 'primary'}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="card-image transition-transform"
          loading="lazy"
        />

        {/* Quick View Floating Action Overlay */}
        <div className="card-actions-overlay" onClick={e => e.stopPropagation()}>
          <button
            className="btn btn-secondary btn-sm card-quick-btn"
            onClick={() => setQuickViewProduct(product)}
          >
            <Eye size={15} /> Quick View
          </button>
          <button
            className="btn btn-primary btn-sm card-add-btn"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag size={15} /> Add
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-header-row">
          <span className="card-category">{product.categoryName}</span>
          <div className="card-rating">
            <Star size={13} className="star-icon" fill="currentColor" />
            <span>{product.rating}</span>
            <span className="review-count">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          className="card-name"
          onClick={() => setSelectedProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="card-subtitle">{product.subtitle}</p>

        {/* Color Swatches */}
        {product.variants && product.variants.length > 0 && (
          <div className="card-swatches">
            {product.variants.slice(0, 4).map((variant) => (
              <span
                key={variant.id}
                className="color-dot"
                style={{ backgroundColor: variant.colorHex }}
                title={`${variant.color} - ${variant.size}`}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="more-variants">+{product.variants.length - 4}</span>
            )}
          </div>
        )}

        {/* Price Row */}
        <div className="card-price-row">
          <div className="price-box">
            <span className="current-price">{formatPrice(product.price)}</span>
            {savingsPct > 0 && (
              <>
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                <span className="savings-pill">-{savingsPct}%</span>
              </>
            )}
          </div>

          <button
            className="btn-quick-cart"
            onClick={() => addToCart(product)}
            title="Quick add to bag"
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
