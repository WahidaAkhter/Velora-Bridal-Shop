import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  LEGACY_COLLECTION_GOWNS,
  LEGACY_FILTER_SHAPES,
  LEGACY_FILTER_STYLES
} from '../data/legacyCollectionData';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import { Heart, X } from 'lucide-react';
import '../styles/luxe-bridal.css';

export const LegacyCollectionPage = () => {
  const {
    setCurrentView,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    formatPrice,
    showToast
  } = useApp();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState('All Shapes');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter gowns based on selected shape and style
  const filteredGowns = useMemo(() => {
    return LEGACY_COLLECTION_GOWNS.filter((gown) => {
      // Shape filter
      if (selectedShape !== 'All Shapes') {
        const target = selectedShape.toLowerCase();
        const shapeMatch =
          (gown.shape || '').toLowerCase().includes(target) ||
          (gown.silhouette || '').toLowerCase().includes(target) ||
          gown.tags?.some((t) => t.toLowerCase().includes(target));
        if (!shapeMatch) return false;
      }

      // Style filter
      if (selectedStyle !== 'All Styles') {
        const target = selectedStyle.toLowerCase();
        const styleMatch =
          gown.styles?.some((s) => s.toLowerCase().includes(target)) ||
          gown.tags?.some((t) => t.toLowerCase().includes(target)) ||
          (gown.fabric || '').toLowerCase().includes(target) ||
          (gown.neckline || '').toLowerCase().includes(target);
        if (!styleMatch) return false;
      }

      return true;
    });
  }, [selectedShape, selectedStyle]);

  // Sort filtered gowns
  const sortedGowns = useMemo(() => {
    const list = [...filteredGowns];
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
    if (sortBy === 'newest') {
      return list.reverse();
    }
    return list; // 'featured' retains curated order
  }, [filteredGowns, sortBy]);

  const totalPages = Math.ceil(sortedGowns.length / pageSize);
  const paginatedGowns = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedGowns.slice(start, start + pageSize);
  }, [sortedGowns, currentPage, pageSize]);

  const activeFilterCount =
    (selectedShape !== 'All Shapes' ? 1 : 0) +
    (selectedStyle !== 'All Styles' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedShape('All Shapes');
    setSelectedStyle('All Styles');
    setCurrentPage(1);
  };

  const handleCardClick = (gown) => {
    const fullProduct = {
      ...gown,
      rating: gown.rating || 5.0,
      reviewCount: gown.reviewCount || 42,
      badge: gown.badge || 'Legacy Collection 2025/2026',
      isNew: true,
      stock: gown.stock || 4,
      images:
        gown.images && gown.images.length > 0
          ? gown.images
          : [gown.image, gown.hoverImage].filter(Boolean),
      variants: gown.variants || [
        { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
        { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
        { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
        { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
        { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 2, sku: `${gown.id}-10` },
        { id: `${gown.id}-v5`, name: 'US Size 12 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 12', price: gown.price, stock: 1, sku: `${gown.id}-12` }
      ],
      attributes: {
        'Silhouette': gown.silhouette || gown.shape,
        'Fabrication': gown.fabric,
        'Neckline': gown.neckline,
        'Collection': 'Legacy Collection',
        'Production Timeline': 'Made to Order (8–12 Weeks Handcrafted Atelier)'
      },
      reviews: gown.reviews || [
        {
          id: `rev-${gown.id}-1`,
          name: 'Isabelle V.',
          avatar: '/images/bridal/avatars.png',
          rating: 5,
          date: '1 week ago',
          comment: `The craftsmanship of ${gown.name} is beyond words. The basque waist and French lace are absolutely stunning in person.`,
          verified: true
        }
      ]
    };
    setSelectedProduct(fullProduct);
  };

  return (
    <div className="velora-collection-page animate-fade-in" id="legacy-collection-top">
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
            setCurrentView('all-collections');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Collections
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">Legacy Collection</span>
      </nav>

      {/* 2. Collection Main Heading & Editorial Quote */}
      <h1 className="velora-collection-heading">LEGACY COLLECTION</h1>
      <p style={{ textAlign: 'center', color: '#7D736C', fontSize: '14px', maxWidth: '680px', margin: '-12px auto 24px auto', lineHeight: 1.6 }}>
        The 2025 / 2026 Haute Couture Era — Sculptural basque waists, dramatic drop corsetry, sheer chantilly sleeves, and hand-embroidered royal trains designed to make your wedding day unforgettable.
      </p>

      {/* 3. Shop Collection Navigation Tabs (Allows turning to any page in Shop Collection anytime) */}
      <ShopCollectionNav activeTab="legacy-collection" />

      {/* 4. Secondary Quick Shape Filter Pills */}
      <div className="legacy-shape-quick-pills">
        {LEGACY_FILTER_SHAPES.map((shape) => (
          <button
            key={shape}
            type="button"
            className={`legacy-shape-pill ${selectedShape === shape ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedShape(shape);
              setCurrentPage(1);
            }}
          >
            {shape}
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
          aria-label="Toggle collection filter drawer"
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
          <strong>{sortedGowns.length}</strong> products
        </div>

        {/* Right: Sort By Dropdown */}
        <div className="velora-sort-wrapper">
          <span className="velora-sort-label">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="velora-sort-select"
            aria-label="Sort collection by"
          >
            <option value="featured">Best selling</option>
            <option value="newest">Date, new to old</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="alpha-asc">Alphabetically: A-Z</option>
            <option value="alpha-desc">Alphabetically: Z-A</option>
          </select>
        </div>
      </div>

      {/* 6. Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="velora-active-filters-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', margin: '-16px 0 24px 0' }}>
          {selectedShape !== 'All Shapes' && (
            <span
              className="velora-filter-pill"
              onClick={() => {
                setSelectedShape('All Shapes');
                setCurrentPage(1);
              }}
              style={{ cursor: 'pointer', background: '#FFFFFF', border: '1px solid #D5C7BC', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Shape: {selectedShape} <X size={12} />
            </span>
          )}
          {selectedStyle !== 'All Styles' && (
            <span
              className="velora-filter-pill"
              onClick={() => {
                setSelectedStyle('All Styles');
                setCurrentPage(1);
              }}
              style={{ cursor: 'pointer', background: '#FFFFFF', border: '1px solid #D5C7BC', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Style: {selectedStyle} <X size={12} />
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
              <span className="legacy-filter-label">SHAPE</span>
              <div className="legacy-filter-pills">
                {LEGACY_FILTER_SHAPES.map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    className={`legacy-filter-pill ${selectedShape === shape ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedShape(shape);
                      setCurrentPage(1);
                    }}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div className="legacy-filter-section">
              <span className="legacy-filter-label">STYLE & DETAILS</span>
              <div className="legacy-filter-pills">
                {LEGACY_FILTER_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    className={`legacy-filter-pill ${selectedStyle === style ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedStyle(style);
                      setCurrentPage(1);
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="legacy-filter-footer">
              <span className="legacy-filter-results-text">
                Showing <strong>{filteredGowns.length}</strong> of {LEGACY_COLLECTION_GOWNS.length} couture gowns
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

      {/* 8. 4-Column Legacy Gown Grid */}
      <div className="legacy-grid-container" style={{ padding: 0 }}>
        {paginatedGowns.length === 0 ? (
          <div className="legacy-empty-state">
            <p>No gowns found matching the selected filter criteria.</p>
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
            {paginatedGowns.map((gown) => {
              const isWishlisted = wishlist.includes(gown.id);
              const isHovered = hoveredCardId === gown.id;

              return (
                <div
                  key={gown.id}
                  className="legacy-gown-card"
                  onMouseEnter={() => setHoveredCardId(gown.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  {/* Image Holder with 3:4 Aspect Ratio */}
                  <div
                    className="legacy-gown-media"
                    onClick={() => handleCardClick(gown)}
                  >
                    <img
                      src={gown.image}
                      alt={gown.name}
                      className={`legacy-card-img ${isHovered && gown.hoverImage ? 'is-hidden-hover' : ''}`}
                      loading="lazy"
                    />

                    {gown.hoverImage && (
                      <img
                        src={gown.hoverImage}
                        alt={`${gown.name} alternate view`}
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
                        toggleWishlist(gown.id);
                        if (showToast) {
                          showToast(isWishlisted ? `Removed ${gown.name} from Wishlist` : `Saved ${gown.name} to Wishlist!`);
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

                  {/* Centered Caption under card */}
                  <div
                    className="legacy-gown-info"
                    onClick={() => handleCardClick(gown)}
                  >
                    <h2 className="legacy-gown-title">{gown.name}</h2>
                    {gown.subtitle && (
                      <p className="legacy-gown-subtitle">{gown.subtitle}</p>
                    )}
                    {gown.price && (
                      <div className="legacy-gown-price-row">
                        <span className="legacy-gown-price">
                          {formatPrice ? formatPrice(gown.price) : `$${gown.price}`}
                        </span>
                        {gown.originalPrice && gown.originalPrice > gown.price && (
                          <span className="legacy-gown-orig-price">
                            {formatPrice ? formatPrice(gown.originalPrice) : `$${gown.originalPrice}`}
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

      {/* 9. Numbered Pagination Bar */}
      {totalPages > 1 && (
        <div className="velora-pagination-container">
          {currentPage > 1 && (
            <button
              type="button"
              className="velora-page-arrow"
              onClick={() => {
                setCurrentPage((prev) => Math.max(1, prev - 1));
                const topEl = document.getElementById('legacy-collection-top');
                if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Previous page"
            >
              ←
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`velora-page-num ${currentPage === pageNum ? 'is-active' : ''}`}
              onClick={() => {
                setCurrentPage(pageNum);
                const topEl = document.getElementById('legacy-collection-top');
                if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              type="button"
              className="velora-page-arrow"
              onClick={() => {
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                const topEl = document.getElementById('legacy-collection-top');
                if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Next page"
            >
              →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LegacyCollectionPage;
