import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { RotateCcw, Filter, Star, Check } from 'lucide-react';

export const FilterSidebar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    minRating,
    setMinRating,
    formatPrice
  } = useApp();

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 600]);
    setInStockOnly(false);
    setMinRating(0);
  };

  return (
    <aside className="filter-sidebar glass-panel">
      <div className="filter-header">
        <div className="filter-title">
          <Filter size={18} />
          <span>Filters</span>
        </div>
        <button onClick={resetFilters} className="btn-reset" title="Reset all filters">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4 className="section-title">Categories</h4>
        <div className="category-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.name}</span>
              <span className="cat-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="filter-section">
        <div className="section-header-row">
          <h4 className="section-title">Max Price</h4>
          <span className="price-display">{formatPrice(priceRange[1])}</span>
        </div>
        <input
          type="range"
          min="50"
          max="600"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="range-slider"
        />
        <div className="range-labels">
          <span>{formatPrice(50)}</span>
          <span>{formatPrice(300)}</span>
          <span>{formatPrice(600)}</span>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="filter-section">
        <h4 className="section-title">Availability</h4>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span className="custom-checkbox">
            {inStockOnly && <Check size={12} />}
          </span>
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="filter-section">
        <h4 className="section-title">Customer Rating</h4>
        <div className="rating-filter-buttons">
          {[0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              className={`rating-btn ${minRating === rating ? 'active' : ''}`}
              onClick={() => setMinRating(rating)}
            >
              {rating === 0 ? (
                'All Ratings'
              ) : (
                <>
                  <Star size={13} fill="currentColor" className="text-amber" /> {rating}+ Stars
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
