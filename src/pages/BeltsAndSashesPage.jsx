import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  SASHES_HERO_INFO,
  SASHES_PRODUCTS,
  SASHES_FILTER_OPTIONS,
  SASHES_COLOR_OPTIONS
} from '../data/sashesData';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import { Heart, X } from 'lucide-react';
import '../styles/luxe-bridal.css';

export const BeltsAndSashesPage = () => {
  const {
    setCurrentView,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    formatPrice,
    showToast
  } = useApp();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeStyleFilter, setActiveStyleFilter] = useState('All Belts & Sashes');
  const [selectedColor, setSelectedColor] = useState('All Colors');
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter sashes
  const filteredSashes = useMemo(() => {
    return SASHES_PRODUCTS.filter((item) => {
      // 1. Style category filter
      if (activeStyleFilter !== 'All Belts & Sashes') {
        if (item.styleCategory !== activeStyleFilter && !item.tags.includes(activeStyleFilter)) {
          return false;
        }
      }

      // 2. Color filter
      if (selectedColor !== 'All Colors') {
        const matchesColor = item.colors.some((c) =>
          c.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      return true;
    });
  }, [activeStyleFilter, selectedColor]);

  // Sort sashes
  const sortedSashes = useMemo(() => {
    const list = [...filteredSashes];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    if (sortBy === 'alpha-asc') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'alpha-desc') {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list; // 'featured' retains curated order
  }, [filteredSashes, sortBy]);

  const activeFilterCount =
    (activeStyleFilter !== 'All Belts & Sashes' ? 1 : 0) +
    (selectedColor !== 'All Colors' ? 1 : 0);

  const handleResetFilters = () => {
    setActiveStyleFilter('All Belts & Sashes');
    setSelectedColor('All Colors');
  };

  const handleCardClick = (sash) => {
    const fullProduct = {
      ...sash,
      rating: sash.rating || 5.0,
      reviewCount: sash.reviewCount || 34,
      badge: sash.badge || 'VELORA Signature Collection',
      isNew: true,
      stock: sash.stock || 5,
      images: sash.images && sash.images.length > 0 ? sash.images : [sash.image],
      variants: sash.variants || [
        {
          id: `${sash.id}-v0`,
          name: `${sash.colors[0] || 'Ivory'} / Standard Length`,
          color: sash.colors[0] || 'Ivory',
          colorHex: '#FAF7F2',
          size: 'Standard Length',
          price: sash.price,
          stock: 4,
          sku: `${sash.code}-01`
        }
      ],
      attributes: {
        'Category': 'Bridal Belts & Sashes',
        'Silhouette': sash.silhouette || 'Bridal Sash',
        'Fabrication': sash.material || 'Luxe Satin Ribbon & Crystals',
        'Collection': 'VELORA Sashes & Belts',
        'Shipping': 'In Stock — Dispatched within 2–4 Business Days'
      },
      reviews: sash.reviews || [
        {
          id: `rev-${sash.id}-1`,
          name: 'Verified Bride',
          avatar: '/images/bridal/avatars.png',
          rating: 5,
          date: 'Recently',
          comment: `The detailing on ${sash.name} is breathtaking in person. Added the exact right amount of sparkle!`,
          verified: true
        }
      ]
    };
    setSelectedProduct(fullProduct);
  };

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-sashes-top">
      {/* 1. Breadcrumb Navigation */}
      <nav className="velora-breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          className="velora-breadcrumb-link"
          onClick={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Home
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <button
          type="button"
          className="velora-breadcrumb-link"
          onClick={() => {
            setCurrentView('accessories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Accessories
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">Bridal Belts & Sashes</span>
      </nav>

      {/* 2. Collection Main Heading & Editorial Lead */}
      <h1 className="velora-collection-heading">{SASHES_HERO_INFO.headline}</h1>
      <p style={{ textAlign: 'center', color: '#7D736C', fontSize: '14px', maxWidth: '720px', margin: '-12px auto 14px auto', lineHeight: 1.6 }}>
        {SASHES_HERO_INFO.lead}
      </p>
      <p style={{ textAlign: 'center', color: '#9C8E84', fontSize: '13px', maxWidth: '680px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
        {SASHES_HERO_INFO.description}
      </p>

      {/* 3. Shop Collection Navigation Tabs (Allows turning to any page in Shop Collection anytime) */}
      <ShopCollectionNav activeTab="accessories" />

      {/* 4. Sub-Category Style Quick Pills */}
      <div className="legacy-shape-quick-pills">
        {SASHES_FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`legacy-shape-pill ${activeStyleFilter === opt ? 'is-active' : ''}`}
            onClick={() => setActiveStyleFilter(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* 5. Toolbar: Filter Toggle | Products Count | Sort By */}
      <div className="velora-toolbar">
        {/* Left: Filter Toggle with Filter Slider Icon */}
        <button
          type="button"
          className={`velora-filter-btn ${isFilterOpen ? 'is-active' : ''}`}
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-expanded={isFilterOpen}
          aria-label="Toggle sashes filter drawer"
        >
          <span>Filter</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <circle cx="9" cy="7" r="2.5" fill="#FAF8F5" stroke="currentColor" />
            <line x1="4" y1="17" x2="20" y2="17" />
            <circle cx="15" cy="17" r="2.5" fill="#FAF8F5" stroke="currentColor" />
          </svg>
          {activeFilterCount > 0 && (
            <span className="legacy-filter-active-count">({activeFilterCount})</span>
          )}
        </button>

        {/* Center: Exact Products Count badge */}
        <div className="velora-product-count">
          Showing <strong>{sortedSashes.length}</strong> couture belts & sashes
        </div>

        {/* Right: Sort By Dropdown */}
        <div className="velora-sort-wrapper">
          <span className="velora-sort-label">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="velora-sort-select"
            aria-label="Sort collection by"
          >
            <option value="featured">Best selling</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="alpha-asc">Alphabetically: A–Z</option>
            <option value="alpha-desc">Alphabetically: Z–A</option>
          </select>
        </div>
      </div>

      {/* 6. Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="velora-active-filters-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', margin: '-16px 0 24px 0' }}>
          {activeStyleFilter !== 'All Belts & Sashes' && (
            <span
              className="velora-filter-pill"
              onClick={() => setActiveStyleFilter('All Belts & Sashes')}
              style={{ cursor: 'pointer', background: '#FFFFFF', border: '1px solid #D5C7BC', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Category: {activeStyleFilter} <X size={12} />
            </span>
          )}
          {selectedColor !== 'All Colors' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedColor('All Colors')}
              style={{ cursor: 'pointer', background: '#FFFFFF', border: '1px solid #D5C7BC', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Color: {selectedColor} <X size={12} />
            </span>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            style={{ background: 'none', border: 'none', textDecoration: 'underline', color: '#9E6B55', fontSize: '12px', cursor: 'pointer', padding: '4px 8px' }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* 7. Expandable Filter Drawer Panel */}
      {isFilterOpen && (
        <div className="legacy-expandable-filter-panel animate-fade-in" style={{ marginBottom: '32px' }}>
          <div className="legacy-filter-panel-inner">
            <div className="legacy-filter-section">
              <span className="legacy-filter-label">COLOR PALETTE</span>
              <div className="legacy-filter-pills">
                {SASHES_COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`legacy-filter-pill ${selectedColor === color ? 'is-active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="legacy-filter-section">
              <span className="legacy-filter-label">STYLE & EMBELLISHMENT</span>
              <div className="legacy-filter-pills">
                {SASHES_FILTER_OPTIONS.map((style) => (
                  <button
                    key={style}
                    type="button"
                    className={`legacy-filter-pill ${activeStyleFilter === style ? 'is-active' : ''}`}
                    onClick={() => setActiveStyleFilter(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="legacy-filter-footer">
              <span className="legacy-filter-results-text">
                Showing <strong>{filteredSashes.length}</strong> of {SASHES_PRODUCTS.length} bridal accessories
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  className="legacy-filter-reset-link"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              )}
              <button
                type="button"
                className="legacy-filter-close-btn"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={16} /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Sashes Grid */}
      <div className="legacy-grid-container" style={{ padding: 0 }}>
        {sortedSashes.length === 0 ? (
          <div className="legacy-empty-state">
            <p>No bridal belts or sashes match your selected filters.</p>
            <button
              type="button"
              className="legacy-btn-reset-all"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="legacy-gown-grid-4col">
            {sortedSashes.map((sash) => {
              const isWishlisted = wishlist.includes(sash.id);
              const isHovered = hoveredCardId === sash.id;

              return (
                <div
                  key={sash.id}
                  className="legacy-gown-card"
                  onMouseEnter={() => setHoveredCardId(sash.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  {/* Media Holder with 3:4 Aspect Ratio */}
                  <div
                    className="legacy-gown-media"
                    onClick={() => handleCardClick(sash)}
                  >
                    <img
                      src={sash.image}
                      alt={sash.name}
                      className={`legacy-card-img ${isHovered && sash.hoverImage ? 'is-hidden-hover' : ''}`}
                      loading="lazy"
                    />

                    {sash.hoverImage && (
                      <img
                        src={sash.hoverImage}
                        alt={`${sash.name} styled on gown`}
                        className={`legacy-card-img legacy-card-img-hover ${isHovered ? 'is-visible-hover' : ''}`}
                        loading="lazy"
                      />
                    )}

                    {/* Circular Floating Wishlist Heart */}
                    <button
                      type="button"
                      className={`legacy-card-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(sash.id);
                        if (showToast) {
                          showToast(isWishlisted ? `Removed ${sash.name} from Wishlist` : `Saved ${sash.name} to Wishlist!`);
                        }
                      }}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.5}
                        fill={isWishlisted ? '#bca07e' : 'none'}
                        stroke={isWishlisted ? '#bca07e' : 'rgba(0,0,0,0.65)'}
                      />
                    </button>
                  </div>

                  {/* Centered Caption Under Card */}
                  <div
                    className="legacy-gown-info"
                    onClick={() => handleCardClick(sash)}
                  >
                    <h2 className="legacy-gown-title">{sash.name}</h2>
                    {sash.subtitle && (
                      <p className="legacy-gown-subtitle">{sash.subtitle}</p>
                    )}

                    {/* Color Swatch Circles */}
                    {sash.colorSwatches && sash.colorSwatches.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', margin: '6px 0 4px 0' }}>
                        {sash.colorSwatches.map((sw) => (
                          <span
                            key={sw.name}
                            title={sw.name}
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: sw.hex,
                              border: '1px solid rgba(0,0,0,0.2)',
                              display: 'inline-block'
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {sash.price && (
                      <div className="legacy-gown-price-row">
                        <span className="legacy-gown-price">
                          {formatPrice ? formatPrice(sash.price) : `$${sash.price}`}
                        </span>
                        {sash.originalPrice && sash.originalPrice > sash.price && (
                          <span className="legacy-gown-orig-price">
                            {formatPrice ? formatPrice(sash.originalPrice) : `$${sash.originalPrice}`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BeltsAndSashesPage;
