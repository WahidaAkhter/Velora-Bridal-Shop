import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Eye, ShoppingBag, Star, AlertCircle } from 'lucide-react';
import { useReveal } from '../../hooks/useMotion';

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

  const lowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div
      ref={revealRef}
      className={`product-card glass-panel reveal ${revealed ? 'revealed' : ''}`}
      style={{ '--i': index % 8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Frame */}
      <div
        className="card-media-wrapper"
        onClick={() => setSelectedProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedProduct(product);
          }
        }}
      >
        <div className="card-badge-container">
          {product.badge && (
            <span className={`card-badge badge-${product.isBestseller ? 'gold' : product.isNew ? 'accent' : 'primary'}`}>
              {product.badge}
            </span>
          )}
          {savingsPct > 0 && (
            <span className="card-badge badge-discount">
              -{savingsPct}%
            </span>
          )}
        </div>

        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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

        {/* Quick View & Quick Add Floating Action Overlay (Desktop) */}
        <div className="card-actions-overlay" onClick={e => e.stopPropagation()}>
          <button
            className="btn btn-secondary btn-sm card-quick-btn"
            onClick={() => setQuickViewProduct(product)}
            aria-label="Quick View product"
          >
            <Eye size={15} /> Quick View
          </button>
          <button
            className="btn btn-primary btn-sm card-add-btn"
            onClick={() => addToCart(product)}
            aria-label="Add product to bag"
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

        {/* Low Stock Indicator */}
        {lowStock && (
          <div className="card-stock-warning">
            <AlertCircle size={12} />
            <span>Only {product.stock} left in stock</span>
          </div>
        )}

        {/* Price Row */}
        <div className="card-price-row">
          <div className="price-box">
            <span className="current-price">{formatPrice(product.price)}</span>
            {savingsPct > 0 && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <button
            className="btn-quick-cart"
            onClick={() => addToCart(product)}
            title="Quick add to bag"
            aria-label={`Quick add ${product.name} to bag`}
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
