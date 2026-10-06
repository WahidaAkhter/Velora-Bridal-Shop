import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { Grid3X3, LayoutGrid, List, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

export const ProductGrid = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    sortBy,
    setSortBy,
    inStockOnly,
    minRating
  } = useApp();

  const [viewMode, setViewMode] = useState('grid-3'); // 'grid-3' | 'grid-4' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  let filtered = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (p.price > priceRange[1]) return false;
    if (inStockOnly && p.stock <= 0) return false;
    if (minRating > 0 && p.rating < minRating) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDesc) return false;
    }
    return true;
  });

  // Sort
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="catalog-grid" className="container catalog-section">
      {/* Controls Bar Header */}
      <div className="catalog-toolbar glass-panel">
        <div className="toolbar-left">
          <button
            className="btn btn-outline mobile-filter-btn"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <span className="results-count">
            Showing <strong>{filtered.length}</strong> products
          </span>

          {/* Active Filter Badges */}
          <div className="active-filters">
            {selectedCategory !== 'all' && (
              <span className="filter-badge">
                Category: {selectedCategory}
                <X size={12} onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {searchQuery && (
              <span className="filter-badge">
                Search: "{searchQuery}"
                <X size={12} onClick={() => setSearchQuery('')} />
              </span>
            )}
          </div>
        </div>

        <div className="toolbar-right">
          {/* Sort Dropdown */}
          <div className="sort-dropdown-box">
            <ArrowUpDown size={15} className="text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* View Toggles */}
          <div className="view-mode-group">
            <button
              className={`view-btn ${viewMode === 'grid-3' ? 'active' : ''}`}
              onClick={() => setViewMode('grid-3')}
              title="3 Column Grid"
            >
              <Grid3X3 size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === 'grid-4' ? 'active' : ''}`}
              onClick={() => setViewMode('grid-4')}
              title="4 Column Grid"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="catalog-layout">
        {/* Desktop Sidebar */}
        <div className="desktop-sidebar-container">
          <FilterSidebar />
        </div>

        {/* Product Cards Container */}
        <div className="grid-container-column">
          {filtered.length > 0 ? (
            <div
              key={`${selectedCategory}|${sortBy}|${searchQuery}|${inStockOnly}|${minRating}`}
              className={`products-grid ${viewMode}`}
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="no-results-box glass-panel">
              <h3>No products found</h3>
              <p className="text-muted">Try relaxing your filter criteria or searching for something else.</p>
              <button
                className="btn btn-secondary mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="mobile-filter-drawer glass-panel" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
