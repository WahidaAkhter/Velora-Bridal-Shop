import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronDown,
  X,
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, COLOR_DRESSES } from '../data/products';

export const WEDDING_DRESS_CATEGORIES = [
  {
    title: 'BY TYPE',
    items: [
      'SIGNATURE STYLES',
      'QUICK SHIP STYLES',
      'NEW DRESSES',
      'ALL DRESSES',
      'ALL COLLECTIONS',
      'SIZE CHART',
      'LOOKBOOKS'
    ]
  },
  {
    title: 'BY SILHOUETTE',
    items: [
      'A-LINE',
      'PRINCESS',
      'BALLGOWN',
      'FIT & FLARE',
      'MERMAID',
      'SHORT',
      'CORSET',
      'BASQUE WAIST',
      'DROP WAIST',
      'STATEMENT BACK'
    ]
  },
  {
    title: 'BY NECKLINE/SLEEVE',
    items: [
      'STRAPLESS',
      'OFF THE SHOULDER',
      'HIGH NECK',
      'STRAPS',
      'LONG SLEEVES'
    ]
  },
  {
    title: 'BY STYLE',
    items: [
      'MODERN',
      'ROMANTIC',
      'SIMPLE',
      'ELEGANT',
      'BOHO',
      'FLORAL',
      'SEXY',
      'GLAMOROUS',
      'SPARKLE',
      'BEACH'
    ]
  },
  {
    title: 'BY FABRICATION',
    items: [
      'LACE',
      'SATIN',
      'TULLE',
      'CREPE',
      'BEADED',
      'ORGANZA'
    ]
  }
];

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
    cartItems,
    setIsCartOpen,
    wishlist,
    setAccountTab
  } = useApp();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isWeddingDressesOpen, setIsWeddingDressesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Toggle 'megamenu-open' class on body so protruding model head hides instantly
  useEffect(() => {
    if (isWeddingDressesOpen) {
      document.body.classList.add('megamenu-open');
    } else {
      document.body.classList.remove('megamenu-open');
    }
    return () => document.body.classList.remove('megamenu-open');
  }, [isWeddingDressesOpen]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsWeddingDressesOpen(false);
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
        setIsWeddingDressesOpen(false);
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
    setIsWeddingDressesOpen(false);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDressCategoryClick = (itemName) => {
    setIsWeddingDressesOpen(false);
    setIsMobileMenuOpen(false);
    setCurrentView('catalog');
    const target = document.getElementById('featured-collection-heading') || document.getElementById('featured-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className={`header-master ${isScrolled ? 'is-scrolled' : ''} ${isWeddingDressesOpen ? 'megamenu-open' : ''}`}
      ref={headerRef}
    >
      {/* Main Luxury Navbar */}
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

          {/* Desktop Navigation Links */}
          <div className="luxe-nav-menu" role="navigation" aria-label="Main Bridal Navigation">
            {/* HOME */}
            <button
              className={`nav-link-item ${currentView === 'catalog' && selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              HOME
            </button>

            {/* WEDDING DRESSES ⌵ (Click-only Mega Menu Toggle) */}
            <div className="nav-dropdown-holder">
              <button
                type="button"
                className={`nav-link-item has-dropdown ${isWeddingDressesOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWeddingDressesOpen(!isWeddingDressesOpen);
                }}
                aria-expanded={isWeddingDressesOpen}
              >
                WEDDING DRESSES <ChevronDown size={12} className={`chevron-mini ${isWeddingDressesOpen ? 'is-rotated' : ''}`} />
              </button>
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

          {/* Right Action Features (Right side of the bride model) */}
          <div className="navbar-actions-right">
            {/* Search */}
            <button
              className="navbar-action-btn"
              onClick={() => setIsSearchModalOpen(true)}
              title="Search Bridal Gowns"
              aria-label="Search gowns"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Account */}
            <button
              className="navbar-action-btn"
              onClick={() => {
                setCurrentView('account');
                setAccountTab('overview');
              }}
              title="Bride Account"
              aria-label="Bride account"
            >
              <User size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <button
              className="navbar-action-btn btn-wishlist"
              onClick={() => {
                setCurrentView('account');
                setAccountTab('wishlist');
              }}
              title="Saved Gowns"
              aria-label={`Wishlist with ${wishlist.length} saved gowns`}
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="navbar-wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              className="navbar-action-btn btn-cart"
              onClick={() => setIsCartOpen(true)}
              title="View Bridal Bag"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="navbar-cart-count">{cartCount}</span>
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
              WEDDING DRESSES
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

      {/* Luxury 5-Column Wedding Dresses Mega Menu (Reference Design) */}
      {isWeddingDressesOpen && (
        <div className="wedding-dresses-megamenu" role="region" aria-label="Wedding Dresses Mega Menu">
          <div className="megamenu-inner-grid">
            {WEDDING_DRESS_CATEGORIES.map((col, idx) => (
              <div key={idx} className="megamenu-column">
                <h3 className="megamenu-col-header">{col.title}</h3>
                <ul className="megamenu-col-list">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button
                        type="button"
                        className="megamenu-item-btn"
                        onClick={() => handleDressCategoryClick(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dimmed backdrop while mega menu is open */}
      {isWeddingDressesOpen && (
        <div
          className="megamenu-backdrop"
          onClick={() => setIsWeddingDressesOpen(false)}
          aria-hidden="true"
        />
      )}

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
