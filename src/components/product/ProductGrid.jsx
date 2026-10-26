import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, VELORA_COLLECTION_INFO } from '../../data/products';
import { Heart, Eye, X } from 'lucide-react';

const SILHOUETTE_OPTIONS = [
  'All Silhouettes',
  'Drop Waist',
  'Basque Waist',
  'Ball Gown',
  'A-Line',
  'Sheath',
  'Mermaid',
  'Corset'
];

const FABRIC_OPTIONS = [
  'All Fabrics',
  'Lace',
  'Satin',
  'Tulle',
  'Crepe'
];

export const ProductGrid = () => {
  const {
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    setSelectedProduct,
    setQuickViewProduct,
    wishlist,
    toggleWishlist,
    formatPrice,
    setIsAppointmentModalOpen
  } = useApp();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedSilhouette, setSelectedSilhouette] = useState('All Silhouettes');
  const [selectedFabric, setSelectedFabric] = useState('All Fabrics');
  const [showRetailerCard, setShowRetailerCard] = useState(true);
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter & Sort Logic
  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && selectedCategory !== 'velora-bridals') {
        if (p.category !== selectedCategory && !p.tags?.includes(selectedCategory)) return false;
      }

      // Silhouette filter
      if (selectedSilhouette !== 'All Silhouettes') {
        const silMatch = p.silhouette === selectedSilhouette || p.tags?.includes(selectedSilhouette);
        if (!silMatch) return false;
      }

      // Fabric filter
      if (selectedFabric !== 'All Fabrics') {
        const tagMatch = p.tags?.some(t => t.toLowerCase() === selectedFabric.toLowerCase());
        const descMatch = (p.description || '').toLowerCase().includes(selectedFabric.toLowerCase());
        if (!tagMatch && !descMatch) return false;
      }

      // Price filter
      if (priceRange && p.price > priceRange[1]) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchCode = (p.code || '').toLowerCase().includes(q);
        const matchSil = (p.silhouette || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchSil && !matchDesc) return false;
      }

      return true;
    });

    // Sorting
    const sorted = [...result];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'alpha-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Default 'featured' maintains VELORA Bridal order (A1470, A1471, A1472...)
    return sorted;
  }, [selectedCategory, selectedSilhouette, selectedFabric, priceRange, searchQuery, sortBy]);

  const displayedDresses = filtered.slice(0, visibleCount);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSilhouette('All Silhouettes');
    setSelectedFabric('All Fabrics');
    setSearchQuery('');
    setSortBy('featured');
    if (setPriceRange) setPriceRange([0, 5000]);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSilhouette !== 'All Silhouettes' ||
    selectedFabric !== 'All Fabrics' ||
    searchQuery.trim().length > 0;

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-collection-top">
      {/* 1. Breadcrumb */}
      <nav className="velora-breadcrumb" aria-label="Breadcrumb">
        <button
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
          className="velora-breadcrumb-link"
          onClick={() => {
            handleResetFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Collections
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">VELORA Bridal Collection</span>
      </nav>

      {/* 2. Collection Main Heading */}
      <h1 className="velora-collection-heading">VELORA Bridal Collection</h1>

      {/* 3. Toolbar: Filter | Products Count | Sort By */}
      <div className="velora-toolbar">
        {/* Left: Filter Toggle with Filter Slider Icon */}
        <button
          className="velora-filter-btn"
          onClick={() => setIsFilterDrawerOpen(true)}
          aria-label="Open filters drawer"
        >
          <span>Filter</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <circle cx="9" cy="7" r="2.5" fill="#FAF8F5" stroke="currentColor" />
            <line x1="4" y1="17" x2="20" y2="17" />
            <circle cx="15" cy="17" r="2.5" fill="#FAF8F5" stroke="currentColor" />
          </svg>
        </button>

        {/* Center: Exact Products Count badge */}
        <div className="velora-product-count">
          <strong>{filtered.length}</strong> products
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
            <option value="newest">Date, new to old</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="alpha-asc">Alphabetically: A-Z</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="velora-active-filters-bar">
          {selectedSilhouette !== 'All Silhouettes' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedSilhouette('All Silhouettes')}
            >
              Silhouette: {selectedSilhouette} <X size={12} />
            </span>
          )}
          {selectedFabric !== 'All Fabrics' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedFabric('All Fabrics')}
            >
              Fabric: {selectedFabric} <X size={12} />
            </span>
          )}
          {searchQuery && (
            <span
              className="velora-filter-pill"
              onClick={() => setSearchQuery('')}
            >
              Search: "{searchQuery}" <X size={12} />
            </span>
          )}
          <button className="velora-clear-all-btn" onClick={handleResetFilters}>
            Clear all
          </button>
        </div>
      )}

      {/* 4. Three-Column Editorial Grid (Exact Reference Image Match) */}
      {filtered.length > 0 ? (
        <div className="velora-grid-3">
          {displayedDresses.map((gown) => {
            const isWishlisted = wishlist.includes(gown.id);
            const primaryImg = gown.images[0];
            const secondaryImg = gown.images[1] || gown.images[0];

            return (
              <article
                key={gown.id}
                className="velora-card"
                onMouseEnter={() => setHoveredCardId(gown.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => setSelectedProduct(gown)}
                tabIndex={0}
                role="button"
                aria-label={`View ${gown.name} wedding gown details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedProduct(gown);
                }}
              >
                {/* Image Media Box (Aspect Ratio 2/3) */}
                <div className="velora-card-media">
                  {/* Badge */}
                  {gown.isNew && (
                    <span className="velora-card-badge">New Collection</span>
                  )}

                  {/* Wishlist Heart Icon */}
                  <button
                    className={`velora-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(gown.id);
                    }}
                    aria-label={isWishlisted ? "Remove from favorites" : "Save to favorites"}
                    title={isWishlisted ? "Remove from favorites" : "Save to favorites"}
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? "#E11D48" : "none"}
                      stroke={isWishlisted ? "#E11D48" : "currentColor"}
                    />
                  </button>

                  {/* Primary & Hover Crossfade Images */}
                  <img
                    src={primaryImg}
                    alt={`${gown.name} - ${gown.subtitle}`}
                    className="velora-card-img-base"
                    loading="lazy"
                  />
                  <img
                    src={secondaryImg}
                    alt=""
                    className="velora-card-img-hover"
                    aria-hidden="true"
                    loading="lazy"
                  />

                  {/* Quick View Button */}
                  <button
                    className="velora-quick-overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(gown);
                    }}
                    aria-label={`Quick view ${gown.name}`}
                  >
                    <Eye size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                    Quick View
                  </button>
                </div>

                {/* Card Caption (Exact Minimalist Typography) */}
                <div className="velora-card-caption">
                  <h3 className="velora-card-title">{gown.name}</h3>
                  <div className="velora-card-silhouette">
                    {gown.silhouette || 'Bridal Gown'} · VELORA Atelier
                  </div>
                  <div className="velora-card-price">
                    {formatPrice(gown.price)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FFFFFF', borderRadius: '4px', margin: '40px 0' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '10px' }}>No wedding dresses match your selection</h3>
          <p style={{ color: '#7D736C', fontSize: '14px', marginBottom: '24px' }}>Try clearing some of your filters to discover more VELORA gowns.</p>
          <button className="velora-load-more-btn" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      {/* 5. Progressive Load More (For seamless viewing of all 224 gowns) */}
      {visibleCount < filtered.length && (
        <div className="velora-load-more-wrap">
          <button
            className="velora-load-more-btn"
            onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filtered.length))}
          >
            Load More Gowns ({visibleCount} of {filtered.length})
          </button>
        </div>
      )}

      {/* 6. Floating "Want to try on in person?" Retailer Card (Exact Match to Image 2) */}
      {showRetailerCard && (
        <aside className="velora-floating-retailer-card" aria-label="Bridal Retailer Consultation">
          <button
            className="velora-retailer-close"
            onClick={() => setShowRetailerCard(false)}
            aria-label="Dismiss card"
            title="Dismiss"
          >
            ×
          </button>
          <div className="velora-retailer-text">
            Want to try on in person?
          </div>
          <button
            className="velora-retailer-btn"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            FIND A RETAILER
          </button>
        </aside>
      )}

      {/* 7. Slide-In Filter Drawer (Left) */}
      {isFilterDrawerOpen && (
        <div
          className="velora-drawer-overlay"
          onClick={() => setIsFilterDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="velora-filter-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="velora-drawer-header">
              <h2 className="velora-drawer-title">Filter and Sort</h2>
              <button
                className="velora-drawer-close"
                onClick={() => setIsFilterDrawerOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="velora-drawer-body">
              {/* Silhouette Filter */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">Silhouette</div>
                <div className="velora-filter-chips">
                  {SILHOUETTE_OPTIONS.map((sil) => (
                    <button
                      key={sil}
                      className={`velora-chip ${selectedSilhouette === sil ? 'is-active' : ''}`}
                      onClick={() => setSelectedSilhouette(sil)}
                    >
                      {sil}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">Fabric</div>
                <div className="velora-filter-chips">
                  {FABRIC_OPTIONS.map((fab) => (
                    <button
                      key={fab}
                      className={`velora-chip ${selectedFabric === fab ? 'is-active' : ''}`}
                      onClick={() => setSelectedFabric(fab)}
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">Maximum Price</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#4A403A', marginBottom: '8px' }}>
                  <span>$1,000</span>
                  <strong>{formatPrice(priceRange ? priceRange[1] : 5000)}</strong>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="50"
                  value={priceRange ? priceRange[1] : 5000}
                  onChange={(e) => setPriceRange && setPriceRange([priceRange[0], +e.target.value])}
                  style={{ width: '100%', accentColor: '#1F1917', cursor: 'pointer' }}
                />
              </div>

              {/* Search Within Collection */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">Search Gowns</div>
                <input
                  type="text"
                  placeholder="e.g. A1470, Basque, Satin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    background: '#FFFFFF'
                  }}
                />
              </div>
            </div>

            <div className="velora-drawer-footer">
              <button
                className="velora-drawer-reset-btn"
                onClick={handleResetFilters}
              >
                Reset
              </button>
              <button
                className="velora-drawer-apply-btn"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                Apply ({filtered.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

