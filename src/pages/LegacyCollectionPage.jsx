import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  LEGACY_COLLECTION_GOWNS,
  LEGACY_FILTER_SHAPES,
  LEGACY_FILTER_STYLES
} from '../data/legacyCollectionData';
import { Heart, X } from 'lucide-react';
import '../styles/luxe-bridal.css';

export const LegacyCollectionPage = () => {
  const {
    setSelectedProduct,
    wishlist,
    toggleWishlist
  } = useApp();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState('All Shapes');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter gowns based on selected shape and style
  const filteredGowns = useMemo(() => {
    return LEGACY_COLLECTION_GOWNS.filter((gown) => {
      // Shape filter
      if (selectedShape !== 'All Shapes') {
        const target = selectedShape.toLowerCase();
        const shapeMatch = (gown.shape || '').toLowerCase().includes(target) ||
                           (gown.silhouette || '').toLowerCase().includes(target) ||
                           gown.tags?.some(t => t.toLowerCase().includes(target));
        if (!shapeMatch) return false;
      }

      // Style filter
      if (selectedStyle !== 'All Styles') {
        const target = selectedStyle.toLowerCase();
        const styleMatch = gown.styles?.some(s => s.toLowerCase().includes(target)) ||
                           gown.tags?.some(t => t.toLowerCase().includes(target)) ||
                           (gown.fabric || '').toLowerCase().includes(target) ||
                           (gown.neckline || '').toLowerCase().includes(target);
        if (!styleMatch) return false;
      }

      return true;
    });
  }, [selectedShape, selectedStyle]);

  const activeFilterCount =
    (selectedShape !== 'All Shapes' ? 1 : 0) +
    (selectedStyle !== 'All Styles' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedShape('All Shapes');
    setSelectedStyle('All Styles');
  };

  const handleCardClick = (gown) => {
    setSelectedProduct(gown);
  };

  return (
    <div className="legacy-collection-page-root">
      {/* Top Banner Row: LEGACY COLLECTION & FILTER (Exact Madi Lane reference) */}
      <div className="legacy-header-container">
        <div className="legacy-header-inner">
          <div className="legacy-title-area">
            <h1 className="legacy-page-main-title">LEGACY COLLECTION</h1>
          </div>

          <div className="legacy-header-actions">
            <button
              type="button"
              className={`legacy-filter-toggle-btn ${isFilterOpen ? 'is-open' : ''} ${activeFilterCount > 0 ? 'has-active' : ''}`}
              onClick={() => setIsFilterOpen(prev => !prev)}
              aria-expanded={isFilterOpen}
              aria-label="Toggle collection filter"
            >
              <span>FILTER</span>
              {activeFilterCount > 0 && (
                <span className="legacy-filter-active-count">({activeFilterCount})</span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Madi Lane Filter Bar / Drawer */}
        {isFilterOpen && (
          <div className="legacy-expandable-filter-panel animate-fade-in">
            <div className="legacy-filter-panel-inner">
              <div className="legacy-filter-section">
                <span className="legacy-filter-label">SHAPE</span>
                <div className="legacy-filter-pills">
                  {LEGACY_FILTER_SHAPES.map((shape) => (
                    <button
                      key={shape}
                      type="button"
                      className={`legacy-filter-pill ${selectedShape === shape ? 'is-active' : ''}`}
                      onClick={() => setSelectedShape(shape)}
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
                      onClick={() => setSelectedStyle(style)}
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
      </div>

      {/* 4-Column Legacy Gown Grid (Exact Madi Lane 4-col layout) */}
      <div className="legacy-grid-container">
        {filteredGowns.length === 0 ? (
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
            {filteredGowns.map((gown) => {
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

                    {/* Circular Floating Wishlist Heart (Exact Madi Lane top-right placement) */}
                    <button
                      type="button"
                      className={`legacy-card-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(gown.id);
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

                  {/* Centered Title under card (Exact Madi Lane styling) */}
                  <div
                    className="legacy-gown-info"
                    onClick={() => handleCardClick(gown)}
                  >
                    <h2 className="legacy-gown-title">{gown.name}</h2>
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

export default LegacyCollectionPage;
