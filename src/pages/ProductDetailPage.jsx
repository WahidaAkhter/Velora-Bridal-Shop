import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Sparkles,
  Scale,
  Check,
  ZoomIn
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCatalog } from '../services/catalogStore';
import { useCompare } from '../hooks/useCompare';
import { productFor, routeFor } from '../routes/routeMap';
import { PageBackBar } from '../components/common/PageBackBar';
import { OrderByBadge } from '../components/extras/OrderByBadge';
import { CompleteTheLook } from '../components/extras/CompleteTheLook';
import { NotFoundPage } from './NotFoundPage';
import '../styles/luxe-bridal.css';

const EASE_LUXE = [0.22, 1, 0.36, 1];

export const ProductDetailPage = () => {
  const location = useLocation();
  const {
    selectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    customReviews,
    addProductReview,
    user,
    isLoggedIn,
    setIsAppointmentModalOpen,
    showToast
  } = useApp();

  const catalog = useCatalog();
  const { isInCompare, toggle: toggleCompare } = useCompare();

  const product = selectedProduct || productFor(location.pathname);

  const productImages = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.filter(Boolean);
    }
    return [product.image || '/images/bridal/hero-bride-clean.jpg'];
  }, [product]);

  const variants = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      return product.variants;
    }
    return [
      {
        id: `${product.id}-default`,
        name: 'Standard Atelier Sizing',
        size: 'US 4',
        price: product.price || 0,
        stock: product.stock ?? 10
      }
    ];
  }, [product]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(() => variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'sizing' | 'reviews'
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  // Review Form state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewName, setNewReviewName] = useState(isLoggedIn ? (user?.name || '') : '');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const related = useMemo(() => {
    if (!product || !Array.isArray(catalog)) return [];
    const sameCat = catalog.filter((p) => p.category === product.category && p.id !== product.id);
    const others = catalog.filter((p) => p.category !== product.category && p.id !== product.id && p.isBestseller);
    return [...sameCat, ...others].slice(0, 4);
  }, [catalog, product]);

  if (!product) {
    return <NotFoundPage />;
  }

  const safeImgIndex = activeImgIndex < productImages.length ? activeImgIndex : 0;
  const activeImageSrc = productImages[safeImgIndex] || productImages[0];
  const activeVariant = selectedVariant || variants[0];

  const combinedReviews = [
    ...(customReviews[product.id] || []),
    ...(product.reviews || [])
  ];

  const isWishlisted = Boolean(product.id && Array.isArray(wishlist) && wishlist.includes(product.id));
  const isCompared = Boolean(product.id && isInCompare(product.id));
  const currentPrice = activeVariant?.price ?? product.price ?? 0;
  const currentStock = activeVariant?.stock ?? product.stock ?? 10;
  const hasSavings = product.originalPrice && product.originalPrice > currentPrice;
  const savingsAmount = hasSavings ? product.originalPrice - currentPrice : 0;
  const isQuickShip = product.category === 'quick-ship' || product.tags?.includes('Quick Ship');

  const categoryBackLink = product.category === 'accessories'
    ? '/accessories'
    : product.category === 'quick-ship'
    ? '/quick-ship'
    : product.category === 'signature-styles'
    ? '/signature-styles'
    : product.category === 'legacy-collection'
    ? '/legacy-collection'
    : '/dresses';

  const categoryBackLabel = product.categoryName || (product.category === 'accessories' ? 'Accessories' : 'Wedding Dresses');

  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % productImages.length);
  };

  const handleAddToBag = () => {
    addToCart(product, activeVariant, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !newReviewName.trim()) return;
    const created = {
      id: `rev-custom-${Date.now()}`,
      author: newReviewName.trim(),
      name: newReviewName.trim(),
      avatar: isLoggedIn
        ? (user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80')
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      rating: Number(newReviewRating),
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true
    };
    addProductReview(product.id, created);
    setIsAddingReview(false);
    setNewReviewComment('');
    if (showToast) showToast('Thank you! Your atelier review has been published.');
  };

  const specEntries = [
    ...(product.silhouette ? [['Silhouette', product.silhouette]] : []),
    ...(product.fabric ? [['Fabrication', product.fabric]] : []),
    ...(product.neckline ? [['Neckline', product.neckline]] : []),
    ...Object.entries(product.attributes || {})
  ].filter(([key], idx, arr) =>
    arr.findIndex(([k]) => k.toLowerCase() === key.toLowerCase()) === idx
  );

  const jumpToReviews = () => {
    setActiveTab('reviews');
    const el = document.getElementById('pdp-details-tabs');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      className="velora-pdp-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE_LUXE }}
    >
      <div className="velora-pdp-shell">
        <PageBackBar
          fallbackPath={categoryBackLink}
          trail={[
            { label: 'Home', to: '/' },
            { label: categoryBackLabel, to: categoryBackLink },
            { label: product.name }
          ]}
        />

        {/* 1. SPLIT EDITORIAL HERO: STICKY GALLERY + COUTURE DETAIL PANEL */}
        <section className="pdp-hero-grid" aria-label={product.name}>
          {/* Left Column: Gallery Stage */}
          <motion.div
            className="pdp-gallery-column"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_LUXE }}
          >
            {productImages.length > 1 && (
              <div className="pdp-thumb-rail" role="tablist" aria-label="Gown photography thumbnails">
                {productImages.map((img, idx) => {
                  const isActive = idx === safeImgIndex;
                  return (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View photo ${idx + 1} of ${productImages.length}`}
                      className={`pdp-thumb-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} loading="lazy" />
                      {isActive && (
                        <motion.span
                          layoutId="pdp-thumb-ring"
                          className="pdp-thumb-ring"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="pdp-stage-wrap">
              <div
                className={`pdp-stage-frame ${zoom.active ? 'is-zooming' : ''}`}
                onMouseMove={handleZoomMove}
                onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageSrc}
                    src={activeImageSrc}
                    alt={product.name}
                    className="pdp-stage-img"
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: zoom.active ? 1.85 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_LUXE }}
                    style={{
                      transformOrigin: `${zoom.x}% ${zoom.y}%`
                    }}
                  />
                </AnimatePresence>

                {product.badge && (
                  <span className="pdp-stage-badge">{product.badge}</span>
                )}

                {!zoom.active && (
                  <span className="pdp-zoom-hint">
                    <ZoomIn size={13} /> Hover to inspect lace &amp; tailoring
                  </span>
                )}

                {productImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="pdp-stage-arrow is-prev"
                      onClick={handlePrevImage}
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="pdp-stage-arrow is-next"
                      onClick={handleNextImage}
                      aria-label="Next photo"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <span className="pdp-photo-counter">
                      {String(safeImgIndex + 1).padStart(2, '0')} / {String(productImages.length).padStart(2, '0')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Couture Details & Actions */}
          <motion.div
            className="pdp-atelier-column"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_LUXE }}
          >
            <div className="pdp-meta-topline">
              <Link to={categoryBackLink} className="pdp-collection-link">
                {categoryBackLabel}
              </Link>
              <button
                type="button"
                className="pdp-rating-link"
                onClick={jumpToReviews}
                aria-label="Jump to customer reviews"
              >
                <Star size={14} fill="#BCA07E" stroke="#BCA07E" />
                <strong>{product.rating || '5.0'}</strong>
                <span>({combinedReviews.length} {combinedReviews.length === 1 ? 'review' : 'reviews'})</span>
              </button>
            </div>

            <h1 className="pdp-title">{product.name}</h1>

            {product.subtitle && (
              <p className="pdp-subtitle">{product.subtitle}</p>
            )}

            <div className="pdp-price-strip">
              <span className="pdp-price-main">{formatPrice(currentPrice)}</span>
              {hasSavings && (
                <>
                  <span className="pdp-price-orig">{formatPrice(product.originalPrice)}</span>
                  <span className="pdp-savings-note">Save {formatPrice(savingsAmount)}</span>
                </>
              )}
              <span className={`pdp-stock-pill ${currentStock === 0 ? 'is-out' : currentStock <= 5 ? 'is-low' : ''}`}>
                {currentStock === 0
                  ? 'Sold Out'
                  : currentStock <= 5
                  ? `Only ${currentStock} left in atelier`
                  : 'Available in Atelier'}
              </span>
            </div>

            {product.description && (
              <p className="pdp-description">{product.description}</p>
            )}

            <OrderByBadge product={product} />

            {/* Size / Color Variant Selector */}
            <div className="pdp-variants-block">
              <div className="pdp-variants-header">
                <span className="pdp-variant-label">
                  Option: <strong>{activeVariant?.name}</strong>
                </span>
                <Link to="/size-chart" className="pdp-size-guide-link">
                  <Ruler size={14} /> Atelier Size Chart
                </Link>
              </div>

              <div className="pdp-variant-chips">
                {variants.map((variant) => {
                  const isSelected = activeVariant?.id === variant.id;
                  return (
                    <motion.button
                      key={variant.id}
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className={`pdp-variant-chip ${isSelected ? 'is-active' : ''}`}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                      }}
                    >
                      {variant.colorHex && (
                        <span
                          className="pdp-color-dot"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                      )}
                      <span>{variant.size || variant.color || variant.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="pdp-purchase-bar">
              <div className="pdp-qty-stepper" aria-label="Quantity selector">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(Math.max(1, currentStock), q + 1))}
                  disabled={quantity >= currentStock}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <motion.button
                type="button"
                whileHover={currentStock > 0 ? { y: -1 } : undefined}
                whileTap={currentStock > 0 ? { scale: 0.985 } : undefined}
                className={`pdp-add-bag-btn ${addedFeedback ? 'is-added' : ''}`}
                disabled={currentStock === 0}
                onClick={handleAddToBag}
              >
                {addedFeedback ? (
                  <>
                    <Check size={17} /> Added to Your Bridal Bag
                  </>
                ) : currentStock === 0 ? (
                  'Currently Sold Out'
                ) : (
                  <>
                    <ShoppingBag size={17} /> Add to Bridal Bag — {formatPrice(currentPrice * quantity)}
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className={`pdp-icon-action-btn ${isWishlisted ? 'is-wishlisted' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart size={19} fill={isWishlisted ? '#B76E65' : 'none'} stroke={isWishlisted ? '#B76E65' : 'currentColor'} />
              </motion.button>

              {product.category !== 'accessories' && (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  className={`pdp-icon-action-btn ${isCompared ? 'is-compared' : ''}`}
                  onClick={() => toggleCompare(product.id)}
                  title={isCompared ? 'Remove from Compare' : 'Compare this gown'}
                  aria-label={isCompared ? 'Remove from comparison' : 'Compare this gown'}
                >
                  <Scale size={18} stroke={isCompared ? '#BCA07E' : 'currentColor'} />
                </motion.button>
              )}
            </div>

            {/* Atelier Service Promises */}
            <div className="pdp-atelier-promises">
              <button
                type="button"
                className="pdp-promise-item is-interactive"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                <Calendar size={17} className="text-accent" />
                <div>
                  <strong>Private Atelier Styling</strong>
                  <span>Reserve a 1-on-1 fitting consultation with Master Stylist Chloe Laurent</span>
                </div>
              </button>
              <div className="pdp-promise-item">
                <ShieldCheck size={17} className="text-accent" />
                <div>
                  <strong>Haute Couture Craftsmanship</strong>
                  <span>14-piece internal boning &amp; hand-finished French textiles</span>
                </div>
              </div>
              <div className="pdp-promise-item">
                <RotateCcw size={17} className="text-accent" />
                <div>
                  <strong>Exclusively Inclusive Fit</strong>
                  <span>Tailored across US sizes 2–28 with bespoke alteration guidance</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. EDITORIAL SPECIFICATIONS, SIZING & CLIENT REVIEWS TABS */}
        <motion.section
          id="pdp-details-tabs"
          className="pdp-tabs-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
        >
          <div className="pdp-tabs-nav" role="tablist" aria-label="Gown details sections">
            {[
              { id: 'specs', label: 'Specifications & Craft' },
              { id: 'sizing', label: 'Sizing & Timeline' },
              { id: 'reviews', label: `Client Reviews (${combinedReviews.length})` }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`pdp-tab-trigger ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="pdp-tab-underline"
                      className="pdp-tab-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'specs' && (
              <motion.div
                key="tab-specs"
                className="pdp-tab-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_LUXE }}
              >
                <div className="pdp-specs-grid">
                  {specEntries.map(([key, val]) => (
                    <div key={key} className="pdp-spec-cell">
                      <span className="pdp-spec-key">{key}</span>
                      <span className="pdp-spec-val">{String(val)}</span>
                    </div>
                  ))}
                  {product.code && (
                    <div className="pdp-spec-cell">
                      <span className="pdp-spec-key">Style Code</span>
                      <span className="pdp-spec-val">{product.code}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'sizing' && (
              <motion.div
                key="tab-sizing"
                className="pdp-tab-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_LUXE }}
              >
                <div className="pdp-sizing-summary-grid">
                  <div className="pdp-sizing-card">
                    <h3>Inclusive Sizing (US 2 – 28)</h3>
                    <p>
                      Every VELORA gown is patterned to celebrate natural proportions across US sizes 2 to 28, with custom bust cup options and hollow-to-hem tailoring.
                    </p>
                    <Link to="/size-chart" className="pdp-inline-action-link">
                      <Ruler size={14} /> Open Full Atelier Size Chart
                    </Link>
                  </div>
                  <div className="pdp-sizing-card">
                    <h3>{isQuickShip ? 'Express Dispatch (2–3 Weeks)' : 'Made-to-Order (8–12 Weeks)'}</h3>
                    <p>
                      {isQuickShip
                        ? 'Hand-tailored on an expedited studio schedule for dispatch within 2–3 weeks with insured white-glove delivery.'
                        : 'Each gown is cut to order in our atelier and paired with insured white-glove shipping directly to your door or boutique.'}
                    </p>
                    <button
                      type="button"
                      className="pdp-inline-action-btn"
                      onClick={() => setIsAppointmentModalOpen(true)}
                    >
                      <Calendar size={14} /> Confirm Timeline With a Stylist
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="tab-reviews"
                className="pdp-tab-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_LUXE }}
              >
                <div className="reviews-header-bar">
                  <div>
                    <strong>{product.rating || '5.0'} out of 5 stars</strong>
                    <p className="text-muted">Based on {combinedReviews.length} verified bride reviews</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsAddingReview((v) => !v)}
                  >
                    <MessageSquare size={14} /> {isAddingReview ? 'Close Form' : 'Write a Review'}
                  </button>
                </div>

                <AnimatePresence>
                  {isAddingReview && (
                    <motion.form
                      onSubmit={handleAddReview}
                      className="review-form glass-panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: EASE_LUXE }}
                    >
                      <h4>Share Your Atelier Experience</h4>
                      <div className="form-group">
                        <label htmlFor="pdp-review-name">Your Name</label>
                        <input
                          id="pdp-review-name"
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pdp-review-rating">Rating</label>
                        <select
                          id="pdp-review-rating"
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(e.target.value)}
                        >
                          <option value="5">5 Stars — Excellent</option>
                          <option value="4">4 Stars — Very Good</option>
                          <option value="3">3 Stars — Average</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="pdp-review-comment">Review Comment</label>
                        <textarea
                          id="pdp-review-comment"
                          required
                          rows="3"
                          placeholder="Share your thoughts on silhouette fit, fabric, and tailoring..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsAddingReview(false)}>Cancel</button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {combinedReviews.length > 0 ? (
                  <div className="pdp-reviews-grid">
                    {combinedReviews.map((rev, idx) => (
                      <div key={rev.id || `${rev.name}-${idx}`} className="review-item-card">
                        <div className="review-user-row">
                          <img src={rev.avatar || '/images/bridal/avatars.png'} alt={rev.name} className="review-avatar" />
                          <div>
                            <strong>{rev.name}</strong>
                            <div className="star-row">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < rev.rating ? 'text-amber' : 'text-muted'}
                                  fill={i < rev.rating ? 'currentColor' : 'none'}
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
                ) : (
                  <p className="text-muted">Be the first bride to leave a note on {product.name}.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* 3. COMPLETE THE LOOK ENSEMBLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
        >
          <CompleteTheLook product={product} selectedVariant={activeVariant} />
        </motion.div>

        {/* 4. YOU MAY ALSO LIKE */}
        {related.length > 0 && (
          <motion.section
            className="pdp-related-section"
            aria-label="You may also like"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.5, ease: EASE_LUXE }}
          >
            <div className="curated-gowns-header">
              <div>
                <h2 className="curated-section-title">You May Also Like</h2>
                <p className="curated-section-subtitle">Complementary couture silhouettes from our atelier</p>
              </div>
              <Link to="/dresses" className="pdp-view-all-link">
                Browse All Gowns
              </Link>
            </div>

            <div className="velora-grid-4">
              {related.map((p) => {
                const img = p.images?.[0] || p.image || '/images/bridal/hero-bride-clean.jpg';
                const hoverImg = p.images?.[1] || p.hoverImage || img;
                return (
                  <Link
                    key={p.id}
                    to={routeFor('product', { product: p })}
                    state={{ fromInternal: true, product: p }}
                    className="velora-gown-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="velora-gown-media">
                      <img src={img} alt={p.name} className="velora-card-img-primary" loading="lazy" />
                      {hoverImg && (
                        <img
                          src={hoverImg}
                          alt={`${p.name} alternate view`}
                          className="velora-card-img-hover"
                          aria-hidden="true"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="velora-gown-caption">
                      <h3 className="velora-gown-name">{p.name}</h3>
                      <span className="pdp-related-price">{formatPrice(p.price)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* 5. ATELIER CONSULTATION FOOTER CALLOUT */}
        <motion.section
          className="velora-collections-booking-banner"
          style={{ marginTop: '56px' }}
          aria-label="Private Bridal Consultation"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
        >
          <div className="velora-booking-banner-inner">
            <div className="velora-booking-icon-holder">
              <Sparkles size={26} />
            </div>
            <div className="velora-booking-text-area">
              <h3 className="velora-booking-title">Try On {product.name} in Our Salon</h3>
              <p className="velora-booking-desc">
                Book a private champagne fitting or virtual measurement review with our master bridal stylists.
              </p>
            </div>
            <button
              type="button"
              className="velora-booking-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
