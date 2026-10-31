import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { RecentlyViewedStrip } from '../extras/RecentlyViewedStrip';
import { CompleteTheLook } from '../extras/CompleteTheLook';
import { OrderByBadge } from '../extras/OrderByBadge';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Calendar,
  MessageSquare
} from 'lucide-react';

export const ProductDetailModal = ({ product, onClose }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    setSelectedProduct,
    setQuickViewProduct,
    customReviews,
    addProductReview,
    user,
    isLoggedIn
  } = useApp();

  const { track } = useRecentlyViewed();

  useEffect(() => {
    if (product?.id) {
      track(product.id);
    }
  }, [product?.id, track]);

  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });
  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const related = [
    ...PRODUCTS.filter(p => p.category === product.category && p.id !== product.id),
    ...PRODUCTS.filter(p => p.category !== product.category && p.isBestseller)
  ].slice(0, 4);

  const openRelated = (p) => {
    setQuickViewProduct(null);
    setSelectedProduct(p);
  };

  const productImages = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : [product.image || '/images/bridal/hero-bride-clean.jpg'];

  const defaultVariant = {
    id: `${product.id}-default`,
    name: 'Standard Atelier Sizing',
    price: product.price || 0,
    stock: product.stock ?? 10
  };

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : defaultVariant
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  // Review Form state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewName, setNewReviewName] = useState(isLoggedIn ? user.name : '');

  // Persistent combined reviews (saved in localStorage + defaults)
  const combinedReviews = [
    ...(customReviews[product.id] || []),
    ...(product.reviews || [])
  ];

  const isWishlisted = wishlist.includes(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : (product.price || 0);
  const currentStock = selectedVariant ? (selectedVariant.stock ?? 10) : (product.stock ?? 10);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !newReviewName.trim()) return;

    const created = {
      author: newReviewName.trim(),
      name: newReviewName.trim(),
      avatar: isLoggedIn ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      rating: Number(newReviewRating),
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true
    };

    addProductReview(product.id, created);
    setIsAddingReview(false);
    setNewReviewComment('');
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-detail-modal glass-panel animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close product view">
          <X size={22} />
        </button>

        <div className="modal-grid-container">
          {/* Gallery Column */}
          <div className="modal-gallery-col">
            <div
              className={`main-image-frame zoomable ${zoom.active ? 'zooming' : ''}`}
              onMouseMove={handleZoomMove}
              onMouseLeave={() => setZoom(z => ({ ...z, active: false }))}
            >
              <img
                src={productImages[activeImgIndex] || productImages[0]}
                alt={product.name}
                className="main-detail-img"
                style={{
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  transform: zoom.active ? 'scale(2)' : 'scale(1)'
                }}
              />
              {product.badge && (
                <span className="detail-badge">{product.badge}</span>
              )}
              {!zoom.active && <span className="zoom-hint">Hover to zoom</span>}
            </div>

            {/* Thumbnail Switcher */}
            {productImages.length > 1 && (
              <div className="thumbnails-row">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImgIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Options Column */}
          <div className="modal-details-col">
            <div className="details-header">
              <span className="category-tag">{product.categoryName}</span>
              <div className="rating-pill">
                <Star size={14} className="text-amber" fill="currentColor" />
                <strong>{product.rating || '5.0'}</strong>
                <span>({combinedReviews.length} reviews)</span>
              </div>
            </div>

            <h2 className="detail-title">{product.name}</h2>
            <p className="detail-subtitle">{product.subtitle}</p>

            <div className="detail-price-box">
              <span className="detail-price">{formatPrice(currentPrice)}</span>
              {product.originalPrice > currentPrice && (
                <span className="detail-original-price">{formatPrice(product.originalPrice)}</span>
              )}
              {currentStock === 0 ? (
                <span className="stock-warning">Out of stock</span>
              ) : currentStock <= 5 && (
                <span className="stock-warning">
                  Low Stock: Only {currentStock} left!
                </span>
              )}
            </div>

            <p className="detail-desc">{product.description}</p>

            <OrderByBadge product={product} onClose={onClose} />

            {/* Variant Selectors */}
            {product.variants && product.variants.length > 0 && (
              <div className="variants-section">
                <label className="variant-label">
                  Select Option: <strong>{selectedVariant?.name}</strong>
                </label>

                <div className="variant-chips-grid">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`variant-chip ${selectedVariant?.id === variant.id ? 'active' : ''}`}
                      onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                    >
                      {variant.colorHex && (
                        <span
                          className="chip-color-dot"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                      )}
                      <span>{variant.size || variant.color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag Actions */}
            <div className="add-to-cart-bar">
              <div className="qty-stepper">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                className="btn btn-accent btn-lg flex-1"
                disabled={currentStock === 0}
                onClick={() => {
                  addToCart(product, selectedVariant, quantity);
                  onClose();
                }}
              >
                <ShoppingBag size={18} /> {currentStock === 0 ? 'Sold Out' : `Add to Bag — ${formatPrice(currentPrice * quantity)}`}
              </button>

              <button
                className={`btn btn-outline icon-only btn-lg ${isWishlisted ? 'text-error' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Bridal Boutique Guarantee & Service Value Props */}
            <div className="value-props-list">
              <div className="prop-item">
                <Calendar size={16} className="text-accent" />
                <span>Complimentary Private Styling Consultation</span>
              </div>
              <div className="prop-item">
                <ShieldCheck size={16} className="text-accent" />
                <span>Authentic Haute Couture Handcrafted Quality</span>
              </div>
              <div className="prop-item">
                <RotateCcw size={16} className="text-accent" />
                <span>Complimentary Boutique Fitting & Custom Sizing</span>
              </div>
            </div>

            {/* Specifications & Reviews Tabs */}
            <div className="tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Product Specifications
                </button>
                <button
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Customer Reviews ({combinedReviews.length})
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'specs' ? (
                  <div className="specs-table">
                    {Object.entries(product.attributes || {}).map(([key, val]) => (
                      <div key={key} className="specs-row">
                        <span className="specs-key">{key}</span>
                        <span className="specs-val">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="reviews-section">
                    <div className="reviews-header-bar">
                      <div>
                        <strong>{product.rating} out of 5 stars</strong>
                        <p className="text-muted">Based on {combinedReviews.length} verified customer reviews</p>
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setIsAddingReview(!isAddingReview)}
                      >
                        <MessageSquare size={14} /> Write a Review
                      </button>
                    </div>

                    {isAddingReview && (
                      <form onSubmit={handleAddReview} className="review-form glass-panel">
                        <h4>Write Your Review</h4>
                        <div className="form-group">
                          <label>Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sarah Jenkins"
                            value={newReviewName}
                            onChange={e => setNewReviewName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Rating</label>
                          <select
                            value={newReviewRating}
                            onChange={e => setNewReviewRating(e.target.value)}
                          >
                            <option value="5">5 Stars — Excellent</option>
                            <option value="4">4 Stars — Very Good</option>
                            <option value="3">3 Stars — Average</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Review Comment</label>
                          <textarea
                            required
                            rows="3"
                            placeholder="Share your thoughts on fit, quality, material..."
                            value={newReviewComment}
                            onChange={e => setNewReviewComment(e.target.value)}
                          />
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsAddingReview(false)}>Cancel</button>
                        </div>
                      </form>
                    )}

                    <div className="reviews-list">
                      {combinedReviews.map((rev) => (
                        <div key={rev.id} className="review-item-card">
                          <div className="review-user-row">
                            <img src={rev.avatar} alt={rev.name} className="review-avatar" />
                            <div>
                              <strong>{rev.name}</strong>
                              <div className="star-row">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={i < rev.rating ? "text-amber" : "text-muted"}
                                    fill={i < rev.rating ? "currentColor" : "none"}
                                  />
                                ))}
                                <span className="review-date">• {rev.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="review-text">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete The Look Curated Ensemble */}
        <CompleteTheLook product={product} selectedVariant={selectedVariant} />

        {related.length > 0 && (
          <div className="related-section">
            <h3 className="related-title">You may also like</h3>
            <div className="related-grid">
              {related.map(p => (
                <button key={p.id} className="related-card" onClick={() => openRelated(p)}>
                  <img src={p.images?.[0] || p.image || ''} alt={p.name} loading="lazy" />
                  <span className="related-name">{p.name}</span>
                  <span className="related-price">{formatPrice(p.price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Strip (Excluding Current Gown) */}
        <RecentlyViewedStrip excludeId={product.id} />
      </div>
    </div>
  );
};
