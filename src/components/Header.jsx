import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AnnouncementBar } from './AnnouncementBar';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Sun,
  Moon,
  X,
  Menu,
  ChevronRight,
  Globe,
  Tag
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { CURRENCIES } from '../data/channels';

export const Header = () => {
  const {
    isDark,
    toggleTheme,
    currentView,
    setCurrentView,
    setAccountTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartItems,
    setIsCartOpen,
    wishlist,
    setSelectedProduct,
    currencyCode,
    setCurrencyCode,
    formatPrice
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    const openSearch = () => setIsSearchModalOpen(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('aura:open-search', openSearch);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('aura:open-search', openSearch);
    };
  }, []);

  // Cmd/Ctrl + K opens search, Escape closes it
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('catalog');
    setIsMobileMenuOpen(false);
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductSearchClick = (product) => {
    setSelectedProduct(product);
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="header-wrapper">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <nav className={`navbar glass-panel ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Mobile Hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div
            className="brand-logo"
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedCategory('all');
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="logo-icon">▲</span>
            <div className="logo-text">
              <span className="brand-name">AURA</span>
              <span className="brand-sub">STOREFRONT</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-links" role="navigation" aria-label="Main Navigation">
            <button
              className={`nav-item ${currentView === 'catalog' && selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              Catalog
            </button>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <button
                key={cat.id}
                className={`nav-item ${currentView === 'catalog' && selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="nav-actions">
            {/* Search Button */}
            <button
              className="action-btn search-trigger"
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Search catalog (Press Ctrl K)"
            >
              <Search size={19} />
              <span className="search-placeholder">Search products...</span>
              <kbd className="search-kbd">Ctrl K</kbd>
            </button>

            {/* Currency Switcher */}
            <label className="currency-switcher" title="Select currency channel">
              <Globe size={16} />
              <select
                value={currencyCode}
                onChange={e => setCurrencyCode(e.target.value)}
                aria-label="Select currency"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                ))}
              </select>
            </label>

            {/* Dark Mode Toggle */}
            <button
              className="action-btn icon-only"
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={20} className="text-amber" /> : <Moon size={20} />}
            </button>

            {/* Wishlist */}
            <button
              className="action-btn icon-only relative hide-mobile"
              onClick={() => {
                setCurrentView('account');
                setAccountTab('wishlist');
              }}
              title="Wishlist"
              aria-label={`Wishlist with ${wishlist.length} saved items`}
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="badge-dot">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              className="action-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="View Shopping Cart"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={20} />
              <span className="cart-label">Bag</span>
              {cartCount > 0 && (
                <span key={cartCount} className="cart-badge badge-bump">{cartCount}</span>
              )}
            </button>

            {/* User Account */}
            <button
              className={`action-btn icon-only hide-mobile ${currentView === 'account' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('account');
                setAccountTab('overview');
              }}
              title="Customer Account"
              aria-label="Customer Account"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="brand-name">AURA NAVIGATION</span>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
            </div>
            <div className="mobile-menu-links">
              <button
                className={selectedCategory === 'all' ? 'active' : ''}
                onClick={() => handleCategoryClick('all')}
              >
                All Products
              </button>
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button
                  key={cat.id}
                  className={selectedCategory === cat.id ? 'active' : ''}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
              <hr className="divider" />
              <button onClick={() => { setCurrentView('account'); setAccountTab('orders'); setIsMobileMenuOpen(false); }}>
                My Orders
              </button>
              <button onClick={() => { setCurrentView('account'); setAccountTab('vouchers'); setIsMobileMenuOpen(false); }}>
                Vouchers & Gift Cards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Overlay Modal */}
      {isSearchModalOpen && (
        <div className="search-modal-overlay" onClick={() => setIsSearchModalOpen(false)}>
          <div className="search-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="search-modal-header">
              <Search size={20} className="text-muted" />
              <input
                type="text"
                placeholder="Type product name, category or material (e.g. Leather, Hoodie, Headphones)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
                aria-label="Search catalog input"
              />
              <button onClick={() => setIsSearchModalOpen(false)} className="close-search" aria-label="Close search">
                <X size={20} />
              </button>
            </div>

            <div className="search-results-container">
              {searchQuery.trim() === '' ? (
                <div className="search-quick-tags">
                  <span className="quick-label">POPULAR SEARCHES:</span>
                  <div className="tags-row">
                    {['Leather Tote', 'Headphones', 'Hoodie', 'Sneakers', 'Blazer'].map(tag => (
                      <button key={tag} onClick={() => setSearchQuery(tag)} className="search-tag">
                        <Tag size={12} /> {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="search-results-list">
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      className="search-item-row"
                      onClick={() => handleProductSearchClick(prod)}
                    >
                      <img src={prod.images[0]} alt={prod.name} className="search-thumb" />
                      <div className="search-item-info">
                        <span className="search-item-title">{prod.name}</span>
                        <span className="search-item-sub">{prod.categoryName} • {formatPrice(prod.price)}</span>
                      </div>
                      <ChevronRight size={16} className="text-muted" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-empty">
                  <p>No products found matching "{searchQuery}"</p>
                  <span className="text-muted">Try checking for spelling or broader terms.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
