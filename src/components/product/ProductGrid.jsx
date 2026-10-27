import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { ShopCollectionNav } from '../common/ShopCollectionNav';
import { Heart, X } from 'lucide-react';

export const SILHOUETTE_OPTIONS = [
  'All Silhouettes',
  'A-Line',
  'Princess',
  'Ballgown',
  'Fit & Flare',
  'Mermaid',
  'Short',
  'Corset',
  'Basque Waist',
  'Drop Waist',
  'Statement Back'
];

export const NECKLINE_OPTIONS = [
  'All Necklines',
  'Strapless',
  'Off The Shoulder',
  'High Neck',
  'Straps',
  'Long Sleeves'
];

export const STYLE_OPTIONS = [
  'All Styles',
  'Modern',
  'Romantic',
  'Simple',
  'Elegant',
  'Boho',
  'Floral',
  'Sexy',
  'Glamorous',
  'Sparkle',
  'Beach'
];

export const FABRIC_OPTIONS = [
  'All Fabrics',
  'Lace',
  'Satin',
  'Tulle',
  'Crepe',
  'Beaded',
  'Organza'
];

export const ACCESSORY_OPTIONS = [
  'All Accessories',
  'Veils',
  'Trains',
  'Jackets/Shrugs',
  'Capes',
  'Scarves',
  'Gloves',
  'Belts',
  'Neck Collars'
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
    wishlist,
    toggleWishlist,
    formatPrice,
    setIsAppointmentModalOpen
  } = useApp();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedSilhouette, setSelectedSilhouette] = useState('All Silhouettes');
  const [selectedNeckline, setSelectedNeckline] = useState('All Necklines');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [selectedFabric, setSelectedFabric] = useState('All Fabrics');
  const [selectedAccessory, setSelectedAccessory] = useState('All Accessories');
  const [showRetailerCard, setShowRetailerCard] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Auto-normalize price range on mount if legacy low non-bridal range was set
  useEffect(() => {
    if (!priceRange || (Array.isArray(priceRange) && priceRange[1] < 1500)) {
      if (setPriceRange) setPriceRange([0, 10000]);
    }
  }, [priceRange, setPriceRange]);


  // Comprehensive Filter & Sort Logic matching Madi Lane reference
  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // 1. Category filter
      if (selectedCategory === 'accessories') {
        const isAcc = p.category === 'accessories' ||
                      p.tags?.includes('Accessories') ||
                      p.accessoryType ||
                      /veil|train|jacket|shrug|cape|scarf|glove|belt|collar/i.test(p.name);
        if (!isAcc) return false;
      } else if (selectedCategory === 'quick-ship') {
        if (p.category !== 'quick-ship' && !p.tags?.includes('Quick Ship')) return false;
      } else if (selectedCategory !== 'all' && selectedCategory !== 'velora-bridals') {
        if (p.category !== selectedCategory && !p.tags?.includes(selectedCategory)) return false;
      }

      // 2. Silhouette filter (Madi Lane options)
      if (selectedSilhouette !== 'All Silhouettes') {
        const target = selectedSilhouette.toLowerCase();
        const silMatch = (p.silhouette || '').toLowerCase().includes(target) ||
                         p.tags?.some(t => t.toLowerCase().includes(target)) ||
                         (p.name || '').toLowerCase().includes(target) ||
                         (p.description || '').toLowerCase().includes(target);
        if (!silMatch) return false;
      }

      // 3. Neckline & Sleeve filter (Madi Lane options)
      if (selectedNeckline !== 'All Necklines') {
        const target = selectedNeckline.toLowerCase();
        const neckAttr = (p.attributes?.['Neckline'] || '').toLowerCase();
        const sleeveAttr = (p.attributes?.['Sleeves'] || '').toLowerCase();
        const neckMatch = neckAttr.includes(target) ||
                          sleeveAttr.includes(target) ||
                          p.tags?.some(t => t.toLowerCase().includes(target)) ||
                          (p.description || '').toLowerCase().includes(target) ||
                          (p.subtitle || '').toLowerCase().includes(target);
        if (!neckMatch) return false;
      }

      // 4. Style filter (Madi Lane options)
      if (selectedStyle !== 'All Styles') {
        const target = selectedStyle.toLowerCase();
        const styleMatch = p.tags?.some(t => t.toLowerCase().includes(target)) ||
                           (p.subtitle || '').toLowerCase().includes(target) ||
                           (p.description || '').toLowerCase().includes(target);
        if (!styleMatch) return false;
      }

      // 5. Fabric filter (Madi Lane options)
      if (selectedFabric !== 'All Fabrics') {
        const target = selectedFabric.toLowerCase();
        const tagMatch = p.tags?.some(t => t.toLowerCase().includes(target));
        const descMatch = (p.description || '').toLowerCase().includes(target);
        const attrMatch = (p.attributes?.['Fabrication'] || p.attributes?.['Fabric & Details'] || p.attributes?.['Fabric'] || '').toLowerCase().includes(target);
        if (!tagMatch && !descMatch && !attrMatch) return false;
      }

      // 6. Accessories filter (Madi Lane options)
      if (selectedAccessory !== 'All Accessories') {
        const target = selectedAccessory.toLowerCase();
        const accTypeMatch = (p.accessoryType || '').toLowerCase().includes(target);
        const tagMatch = p.tags?.some(t => t.toLowerCase().includes(target));
        const nameMatch = (p.name || '').toLowerCase().includes(target) || (p.subtitle || '').toLowerCase().includes(target);
        const descMatch = (p.description || '').toLowerCase().includes(target);
        if (!accTypeMatch && !tagMatch && !nameMatch && !descMatch) return false;
      }

      // 7. Price filter — only apply if upper bound has been explicitly filtered
      if (Array.isArray(priceRange) && priceRange[1] < 10000 && priceRange[1] >= 1000) {
        if (p.price > priceRange[1]) return false;
      }

      // 8. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchCode = (p.code || '').toLowerCase().includes(q);
        const matchSil = (p.silhouette || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        const matchSub = (p.subtitle || '').toLowerCase().includes(q);
        const matchAcc = (p.accessoryType || '').toLowerCase().includes(q);
        const matchTag = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchCode && !matchSil && !matchDesc && !matchSub && !matchAcc && !matchTag) return false;
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
    return sorted;
  }, [selectedCategory, selectedSilhouette, selectedNeckline, selectedStyle, selectedFabric, selectedAccessory, priceRange, searchQuery, sortBy]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSilhouette, selectedNeckline, selectedStyle, selectedFabric, selectedAccessory, searchQuery, priceRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedDresses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  // Return to whole site (Storefront / Home) on reset as requested by user
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSilhouette('All Silhouettes');
    setSelectedNeckline('All Necklines');
    setSelectedStyle('All Styles');
    setSelectedFabric('All Fabrics');
    setSelectedAccessory('All Accessories');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    if (setPriceRange) setPriceRange([0, 10000]);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFiltersOnly = () => {
    setSelectedCategory('all');
    setSelectedSilhouette('All Silhouettes');
    setSelectedNeckline('All Necklines');
    setSelectedStyle('All Styles');
    setSelectedFabric('All Fabrics');
    setSelectedAccessory('All Accessories');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    if (setPriceRange) setPriceRange([0, 10000]);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSilhouette !== 'All Silhouettes' ||
    selectedNeckline !== 'All Necklines' ||
    selectedStyle !== 'All Styles' ||
    selectedFabric !== 'All Fabrics' ||
    selectedAccessory !== 'All Accessories' ||
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
        <span className="velora-breadcrumb-current">
          {selectedCategory === 'accessories'
            ? 'Bridal Accessories'
            : selectedAccessory !== 'All Accessories'
            ? `Accessories · ${selectedAccessory}`
            : 'VELORA Bridal Collection'}
        </span>
      </nav>

      {/* 2. Collection Main Heading */}
      <h1 className="velora-collection-heading">
        {selectedCategory === 'accessories'
          ? 'BRIDAL ACCESSORIES'
          : selectedAccessory !== 'All Accessories'
          ? `BRIDAL ${selectedAccessory.toUpperCase()}`
          : selectedSilhouette !== 'All Silhouettes'
          ? `${selectedSilhouette.toUpperCase()} GOWNS`
          : 'ALL DRESSES'}
      </h1>
      <p style={{ textAlign: 'center', color: '#7D736C', fontSize: '14px', maxWidth: '640px', margin: '-12px auto 24px auto', lineHeight: 1.6 }}>
        {selectedCategory === 'accessories' || selectedAccessory !== 'All Accessories'
          ? 'Handcrafted veils, detachable royal trains, mock-neck lace jackets, sheer capes, and bespoke bridal accents designed to complete your wedding day look.'
          : 'Discover our complete bridal collection featuring hand-appliquéd lace, basque corsetry, dramatic drop waists, and ethereal silhouettes inspired by European haute couture.'}
      </p>

      {/* 3. Shop Collection Quick Nav Tabs */}
      <ShopCollectionNav activeTab={selectedCategory === 'accessories' ? 'accessories' : 'all-dresses'} />

      {/* Secondary Sub-Category / Silhouette Filter Pills */}
      {selectedCategory === 'accessories' || selectedAccessory !== 'All Accessories' ? (
        <div className="legacy-shape-quick-pills">
          <button
            type="button"
            className={`legacy-shape-pill ${!searchQuery && selectedAccessory === 'All Accessories' ? 'is-active' : ''}`}
            onClick={() => {
              setSearchQuery('');
              setSelectedAccessory('All Accessories');
            }}
          >
            All Accessories
          </button>
          {[
            { label: 'Veils', query: 'Veil' },
            { label: 'Trains', query: 'Train' },
            { label: 'Jackets', query: 'Jacket' },
            { label: 'Bows', query: 'Bow' },
            { label: 'Sleeves', query: 'Sleeve' },
            { label: 'Gloves', query: 'Gloves' },
            { label: 'Corsets', query: 'Corset' },
            { label: 'Skirts', query: 'Skirt' },
            { label: 'Capes', query: 'Cape' },
            { label: 'Scarves', query: 'Scarf' },
            { label: 'Belts & Sashes', query: 'Belt' }
          ].map((item) => {
            const isActive = searchQuery.toLowerCase() === item.query.toLowerCase();
            return (
              <button
                key={item.query}
                type="button"
                className={`legacy-shape-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setSearchQuery(isActive ? '' : item.query);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="legacy-shape-quick-pills">
          {[
            'All Silhouettes',
            'A-Line',
            'Ballgown',
            'Basque Waist',
            'Drop Waist',
            'Mermaid',
            'Fit & Flare'
          ].map((sil) => {
            const isActive = selectedSilhouette === sil;
            return (
              <button
                key={sil}
                type="button"
                className={`legacy-shape-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedAccessory('All Accessories');
                  setSelectedSilhouette(sil);
                  setCurrentPage(1);
                }}
              >
                {sil}
              </button>
            );
          })}
        </div>
      )}


      {/* 3. Toolbar: Filter Toggle | Products Count | Sort By */}
      <div className="velora-toolbar">
        {/* Left: Filter Toggle with Filter Slider Icon */}
        <button
          type="button"
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
          {selectedNeckline !== 'All Necklines' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedNeckline('All Necklines')}
            >
              Neckline: {selectedNeckline} <X size={12} />
            </span>
          )}
          {selectedStyle !== 'All Styles' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedStyle('All Styles')}
            >
              Style: {selectedStyle} <X size={12} />
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
          {selectedAccessory !== 'All Accessories' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedAccessory('All Accessories')}
            >
              Accessory: {selectedAccessory} <X size={12} />
            </span>
          )}
          {selectedCategory === 'accessories' && (
            <span
              className="velora-filter-pill"
              onClick={() => setSelectedCategory('all')}
            >
              Category: Accessories <X size={12} />
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
          <button type="button" className="velora-clear-all-btn" onClick={handleClearFiltersOnly}>
            Clear all
          </button>
        </div>
      )}

      {/* 4. Four-Column Editorial Grid (Exact Madi Lane Reference Match) */}
      {filtered.length > 0 ? (
        <div className="velora-grid-4">
          {paginatedDresses.map((gown) => {
            const isWishlisted = wishlist.includes(gown.id);
            const primaryImg = gown.images?.[0] || gown.image || '';
            const secondaryImg = gown.images?.[1] || gown.hoverImage || primaryImg;

            return (
              <article
                key={gown.id}
                className="velora-gown-card"
                onClick={() => setSelectedProduct(gown)}
                tabIndex={0}
                role="button"
                aria-label={`View ${gown.name} wedding gown details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedProduct(gown);
                }}
              >
                {/* Image Media Box (Aspect Ratio 3/4) */}
                <div className="velora-gown-media">
                  {/* Floating Circular Wishlist Heart Icon (Top Right) */}
                  <button
                    type="button"
                    className={`velora-wishlist-circle-btn ${isWishlisted ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(gown.id);
                    }}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? "#bca07e" : "none"}
                      stroke={isWishlisted ? "#bca07e" : "rgba(0,0,0,0.65)"}
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Primary Image */}
                  <img
                    src={primaryImg}
                    alt={gown.name}
                    className="velora-card-img-primary"
                    loading="lazy"
                  />
                  {secondaryImg && (
                    <img
                      src={secondaryImg}
                      alt={`${gown.name} alternate view`}
                      className="velora-card-img-hover"
                      aria-hidden="true"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Minimalist Centered Title Under Card (Exact Reference Image) */}
                <div className="velora-gown-caption">
                  <h2 className="velora-gown-name">{gown.name}</h2>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FFFFFF', borderRadius: '4px', margin: '40px 0' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '10px' }}>No wedding dresses match your selection</h3>
          <p style={{ color: '#7D736C', fontSize: '14px', marginBottom: '24px' }}>Try clearing your filters or return to explore our complete storefront.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="velora-load-more-btn"
              onClick={handleResetFilters}
              style={{ background: '#1F1917', color: '#FFFFFF', border: '1px solid #1F1917', padding: '12px 28px' }}
            >
              RESET & RETURN TO STOREFRONT
            </button>
            <button
              type="button"
              className="velora-load-more-btn"
              onClick={handleClearFiltersOnly}
              style={{ padding: '12px 28px' }}
            >
              SHOW ALL GOWNS & ACCENTS
            </button>
          </div>
        </div>
      )}

      {/* 5. Numbered Pagination Bar (Matching madilane.com/shop/) */}
      {totalPages > 1 && (
        <div className="velora-pagination-container">
          {currentPage > 1 && (
            <button
              type="button"
              className="velora-page-arrow"
              onClick={() => {
                setCurrentPage(prev => Math.max(1, prev - 1));
                const topEl = document.getElementById('velora-collection-top');
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
                const topEl = document.getElementById('velora-collection-top');
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
                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                const topEl = document.getElementById('velora-collection-top');
                if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Next page"
            >
              →
            </button>
          )}
        </div>
      )}

      {/* 6. Floating "Want to try on in person?" Retailer Card (Exact Match to Image 2) */}
      {showRetailerCard && (
        <aside className="velora-floating-retailer-card" aria-label="Bridal Retailer Consultation">
          <button
            type="button"
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
            type="button"
            className="velora-retailer-btn"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            FIND A RETAILER
          </button>
        </aside>
      )}

      {/* 7. Slide-In Filter Drawer (Matching Madi Lane's 5 Category Filter Blocks) */}
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
                type="button"
                className="velora-drawer-close"
                onClick={() => setIsFilterDrawerOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="velora-drawer-body">
              {/* 1. Silhouette / Shape Filter (Madi Lane Reference) */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">By Silhouette & Shape</div>
                <div className="velora-filter-chips">
                  {SILHOUETTE_OPTIONS.map((sil) => (
                    <button
                      type="button"
                      key={sil}
                      className={`velora-chip ${selectedSilhouette === sil ? 'is-active' : ''}`}
                      onClick={() => setSelectedSilhouette(sil)}
                    >
                      {sil}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Neckline & Sleeve Filter (Madi Lane Reference) */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">By Neckline & Sleeve</div>
                <div className="velora-filter-chips">
                  {NECKLINE_OPTIONS.map((neck) => (
                    <button
                      type="button"
                      key={neck}
                      className={`velora-chip ${selectedNeckline === neck ? 'is-active' : ''}`}
                      onClick={() => setSelectedNeckline(neck)}
                    >
                      {neck}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Style & Aesthetic Filter (Madi Lane Reference) */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">By Style & Aesthetic</div>
                <div className="velora-filter-chips">
                  {STYLE_OPTIONS.map((st) => (
                    <button
                      type="button"
                      key={st}
                      className={`velora-chip ${selectedStyle === st ? 'is-active' : ''}`}
                      onClick={() => setSelectedStyle(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Fabrication Filter (Madi Lane Reference) */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">By Fabrication</div>
                <div className="velora-filter-chips">
                  {FABRIC_OPTIONS.map((fab) => (
                    <button
                      type="button"
                      key={fab}
                      className={`velora-chip ${selectedFabric === fab ? 'is-active' : ''}`}
                      onClick={() => setSelectedFabric(fab)}
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Accessories Filter (Madi Lane Reference) */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">Accessories</div>
                <div className="velora-filter-chips">
                  {ACCESSORY_OPTIONS.map((acc) => (
                    <button
                      type="button"
                      key={acc}
                      className={`velora-chip ${selectedAccessory === acc ? 'is-active' : ''}`}
                      onClick={() => setSelectedAccessory(acc)}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Maximum Price Slider */}
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

              {/* 7. Search Within Collection */}
              <div className="velora-filter-group">
                <div className="velora-filter-group-title">Search Gowns & Accents</div>
                <input
                  type="text"
                  placeholder="e.g. A1470, Veil, Basque, Mikado..."
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
                type="button"
                className="velora-drawer-reset-btn"
                onClick={handleClearFiltersOnly}
              >
                Clear
              </button>
              <button
                type="button"
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
