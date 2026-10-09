import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronDown,
  X,
  Menu,
  Search,
  Sparkles
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, COLOR_DRESSES } from '../data/products';
import { AnnouncementBar } from './AnnouncementBar';

export const Header = () => {
  const {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    setIsAppointmentModalOpen,
    formatPrice
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const collectionsRef = useRef(null);
  const shopRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (collectionsRef.current && !collectionsRef.current.contains(e.target)) {
        setIsCollectionsDropdownOpen(false);
      }
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cmd/Ctrl + K opens search, Escape closes modals
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsMobileMenuOpen(false);
        setIsCollectionsDropdownOpen(false);
        setIsShopDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleNavClick = (targetId) => {
    setCurrentView('catalog');
    setIsMobileMenuOpen(false);
    setIsCollectionsDropdownOpen(false);
    setIsShopDropdownOpen(false);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  return (
    <header className={`header-master ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* 1. Top Utility / Announcement Bar */}
      <AnnouncementBar onOpenSearch={() => setIsSearchModalOpen(true)} />

      {/* 2. Main Luxury Navbar */}
      <nav className={`navbar-luxe ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Boutique Brand Logo */}
          <div
            className="luxe-brand-logo"
            onClick={() => handleNavClick('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNavClick('home');
            }}
          >
            <img
              src="/images/bridal/logo.png"
              alt="LUXE BRIDES BRIDAL BOUTIQUE"
              className="luxe-logo-img"
              width="165"
              height="40"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="luxe-nav-menu" role="navigation" aria-label="Main Bridal Navigation">
            {/* HOME */}
            <button
              className={`nav-link-item ${currentView === 'catalog' && selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              HOME
            </button>

            {/* COLLECTIONS ⌵ */}
            <div className="nav-dropdown-holder" ref={collectionsRef}>
              <button
                className="nav-link-item has-dropdown"
                onClick={() => setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen)}
                onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
              >
                COLLECTIONS <ChevronDown size={12} className="chevron-mini" />
              </button>

              {isCollectionsDropdownOpen && (
                <div
                  className="dropdown-popover"
                  onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
                >
                  <button
                    className="dropdown-subitem"
                    onClick={() => handleNavClick('featured-collection-heading')}
                  >
                    <span>Featured Bridal Gowns</span>
                    <span className="subitem-note">4 Signature Pieces</span>
                  </button>
                  <button
                    className="dropdown-subitem"
                    onClick={() => handleNavClick('shop-by-color-heading')}
                  >
                    <span>Shop By Color</span>
                    <span className="subitem-note">7 Color Tones</span>
                  </button>
                  <button
                    className="dropdown-subitem"
                    onClick={() => {
                      setSelectedCategory('classic');
                      handleNavClick('featured-collection-heading');
                    }}
                  >
                    <span>Royal Lace & Trains</span>
                    <span className="subitem-note">Haute Couture</span>
                  </button>
                </div>
              )}
            </div>

            {/* SHOP ⌵ */}
            <div className="nav-dropdown-holder" ref={shopRef}>
              <button
                className="nav-link-item has-dropdown"
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                onMouseEnter={() => setIsShopDropdownOpen(true)}
              >
                SHOP <ChevronDown size={12} className="chevron-mini" />
              </button>

              {isShopDropdownOpen && (
                <div
                  className="dropdown-popover"
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                >
                  <button
                    className="dropdown-subitem"
                    onClick={() => handleNavClick('featured-collection-heading')}
                  >
                    <span>All Designer Gowns</span>
                  </button>
                  <button
                    className="dropdown-subitem"
                    onClick={() => handleNavClick('shop-by-color-heading')}
                  >
                    <span>Color Dress Catalog</span>
                  </button>
                  <button
                    className="dropdown-subitem"
                    onClick={() => handleNavClick('dream-dress-banner')}
                  >
                    <span>Private Fittings & Custom</span>
                  </button>
                </div>
              )}
            </div>

            {/* ACCESSORIES */}
            <button
              className="nav-link-item"
              onClick={() => handleNavClick('featured-collection-heading')}
            >
              ACCESSORIES
            </button>

            {/* ABOUT US */}
            <button
              className="nav-link-item"
              onClick={() => handleNavClick('dream-dress-banner')}
            >
              ABOUT US
            </button>

            {/* REAL BRIDES */}
            <button
              className="nav-link-item"
              onClick={() => handleNavClick('footer-testimonials')}
            >
              REAL BRIDES
            </button>

            {/* CONTACT US */}
            <button
              className="nav-link-item"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              CONTACT US
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <button className="mobile-nav-link" onClick={() => handleNavClick('home')}>
              HOME
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('featured-collection-heading')}>
              COLLECTIONS
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('shop-by-color-heading')}>
              SHOP BY COLOR
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('featured-collection-heading')}>
              ACCESSORIES
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('dream-dress-banner')}>
              ABOUT US
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('footer-testimonials')}>
              REAL BRIDES
            </button>
            <button className="mobile-nav-link highlight" onClick={() => { setIsMobileMenuOpen(false); setIsAppointmentModalOpen(true); }}>
              BOOK APPOINTMENT
            </button>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      {isSearchModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsSearchModalOpen(false)}>
          <div className="search-modal-box" onClick={e => e.stopPropagation()}>
            <div className="search-input-header">
              <Search size={20} className="search-icon-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search gowns by name, silhouette, lace, or color..."
                autoFocus
                className="search-main-input"
              />
              <button
                className="search-close-btn"
                onClick={() => setIsSearchModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="search-results-list">
                {searchResults.length > 0 ? (
                  searchResults.map(prod => (
                    <div
                      key={prod.id}
                      className="search-result-item"
                      onClick={() => handleProductSelect(prod)}
                    >
                      <img src={prod.images[0]} alt={prod.name} className="search-result-thumb" />
                      <div className="search-result-info">
                        <h4>{prod.name}</h4>
                        <p>{prod.subtitle}</p>
                        <span className="search-result-price">{formatPrice(prod.price)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="search-empty">
                    <p>No designer gowns found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
