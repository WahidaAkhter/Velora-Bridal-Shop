import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronDown,
  X,
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  LogOut,
  Calendar
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';

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

export const ACCESSORIES_CATEGORIES = [
  {
    title: 'BY ACCESSORY PIECE',
    items: [
      'VEILS',
      'TRAINS',
      'JACKETS/SHRUGS',
      'CAPES',
      'SCARVES',
      'GLOVES',
      'BELTS',
      'NECK COLLARS'
    ]
  },
  {
    title: 'FEATURED ACCENTS',
    items: [
      'CATHEDRAL LACE VEILS',
      'DETACHABLE MIKADO TRAINS',
      'MOCK-NECK LACE JACKETS',
      'WATTEAU TULLE CAPES',
      'FLUID SILK SCARVES',
      'CHANTILLY OPERA GLOVES',
      'CRYSTAL EMBROIDERED BELTS',
      'BAROQUE PEARL COLLARS'
    ]
  },
  {
    title: 'ATELIER STYLING',
    items: [
      'ALL ACCESSORIES SHOWCASE',
      'ALL ACCESSORIES',
      'VEIL LENGTH GUIDE',
      'MIX & MATCH SEPARATES',
      'OVERSKIRTS & BOWS',
      'CEREMONY LAYERING',
      'BESPOKE CUSTOMIZATIONS'
    ]
  }
];

export const ABOUT_US_CATEGORIES = [
  {
    title: 'OUR HERITAGE',
    items: [
      'OUR STORY',
      '10 YEARS VELORA',
      'MEET THE DESIGNERS',
      'AUSTRALIAN ATELIER'
    ]
  },
  {
    title: '5 BRAND PILLARS',
    items: [
      'FOR-BRIDES-FIRST',
      'CATALYST FOR CONFIDENCE',
      'EXPERTLY CRAFTED',
      'LIGHTWEIGHT WEARABILITY',
      'HAPPILY-EVER-AFTER'
    ]
  },
  {
    title: 'CONTACT & CONCIERGE',
    items: [
      'CONTACT US',
      'FLAGSHIP BOUTIQUES',
      'BOOK ATELIER FITTING',
      'CALL +1 (800) 892-LUXE',
      'Q&A KNOWLEDGE BASE'
    ]
  }
];

export const REAL_BRIDES_CATEGORIES = [
  {
    title: 'FEATURED WEDDINGS',
    items: [
      'CHÂTEAU DE CHANTILLY',
      'LAKE COMO VILLA',
      'PARISIAN ROOFTOP',
      'TUSCAN COUNTRYSIDE'
    ]
  },
  {
    title: 'BRIDE STORIES',
    items: [
      '2,400+ VERIFIED REVIEWS',
      'PHOTO GALLERY & VIDEOS',
      'TESTIMONIAL ARCHIVE',
      'BRIDAL TRANSFORMATIONS'
    ]
  },
  {
    title: 'COMMUNITY & PRESS',
    items: [
      'SUBMIT YOUR WEDDING',
      'VOGUE WEDDINGS FEATURE',
      'BRIDES MAGAZINE EDITORIAL',
      'ANNUAL LOOKBOOK'
    ]
  }
];

export const CONTACT_US_CATEGORIES = [
  {
    title: 'APPOINTMENTS',
    items: [
      'BOOK IN-STORE FITTING',
      'VIRTUAL 45-MIN STYLING',
      'VIP BRIDAL SUITE',
      'RESCHEDULE OR CANCEL'
    ]
  },
  {
    title: 'FLAGSHIP BOUTIQUES',
    items: [
      'PARIS • RUE SAINT-HONORÉ',
      'NEW YORK • FIFTH AVENUE',
      'LONDON • MAYFAIR',
      'MILAN • VIA MONTENAPOLEONE'
    ]
  },
  {
    title: 'CONCIERGE & CARE',
    items: [
      'CALL +1 (800) 892-LUXE',
      'LIVE BRIDAL CHAT',
      'ORDER STATUS & TRACKING',
      'CARE & CLEANING GUIDE'
    ]
  }
];

export const NAVBAR_FEATURES_DATA = {
  'wedding-dresses': {
    title: 'Wedding Dresses',
    columns: WEDDING_DRESS_CATEGORIES
  },
  'accessories': {
    title: 'Bridal Accessories',
    columns: ACCESSORIES_CATEGORIES
  },
  'about': {
    title: 'Our Story',
    columns: ABOUT_US_CATEGORIES
  },
  'brides': {
    title: 'Real Brides',
    columns: REAL_BRIDES_CATEGORIES
  },
  'contact': {
    title: 'Contact & Boutiques',
    columns: CONTACT_US_CATEGORIES
  }
};

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
    setAccountTab,
    setActiveWeddingDressOption,
    isLoggedIn,
    user,
    logoutUser,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Toggle 'megamenu-open' class on body so protruding model head hides instantly
  useEffect(() => {
    if (activeDropdown) {
      document.body.classList.add('megamenu-open');
    } else {
      document.body.classList.remove('megamenu-open');
    }
    return () => document.body.classList.remove('megamenu-open');
  }, [activeDropdown]);

  // Click outside to close dropdowns and user menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
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
        setActiveDropdown(null);
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
    setActiveDropdown(null);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavHover = (key) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveDropdown(key);
  };

  const handleNavLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClickToggle = (key) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveDropdown(prev => prev === key ? null : key);
  };

  const handleDropdownMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  };

  const handleDropdownMouseLeave = () => {
    handleNavLeave();
  };

  const handleFeatureItemClick = (featureKey, colTitle, item) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);

    if (featureKey === 'wedding-dresses') {
      if (item === 'NEW DRESSES') {
        setCurrentView('new-dresses');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (item === 'SIGNATURE STYLES') {
        setCurrentView('signature-styles');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (item === 'QUICK SHIP STYLES') {
        setCurrentView('quick-ship');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (item === 'ALL DRESSES') {
        setSelectedCategory('all');
        setSearchQuery('');
        setCurrentView('all-dresses');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (item === 'ALL COLLECTIONS') {
        setCurrentView('all-collections');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (item === 'LOOKBOOKS' || item === 'LOOKBOOK') {
        setCurrentView('lookbook');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setActiveWeddingDressOption(item);
      return;
    }

    if (featureKey === 'accessories') {
      if (item === 'ALL ACCESSORIES' || item === 'ALL ACCESSORIES SHOWCASE' || item === 'WEDDING ACCESSORIES SHOWCASE') {
        setCurrentView('accessories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setSelectedCategory('accessories');
      if (item === 'VEILS' || item === 'CATHEDRAL LACE VEILS' || item === 'PEARL VEILS') {
        setSearchQuery('Veil');
      } else if (item === 'TRAINS' || item === 'DETACHABLE MIKADO TRAINS' || item === 'OVERSKIRTS & BOWS') {
        setSearchQuery('Train');
      } else if (item === 'JACKETS/SHRUGS' || item === 'MOCK-NECK LACE JACKETS' || item === 'SHEER BOLEROS') {
        setSearchQuery('Jacket');
      } else if (item === 'CAPES' || item === 'WATTEAU TULLE CAPES' || item === 'WING CAPES') {
        setSearchQuery('Cape');
      } else if (item === 'SCARVES' || item === 'FLUID SILK SCARVES') {
        setSearchQuery('Scarf');
      } else if (item === 'GLOVES' || item === 'CHANTILLY OPERA GLOVES' || item === 'SATIN GLOVES') {
        setSearchQuery('Gloves');
      } else if (item === 'BELTS' || item === 'CRYSTAL EMBROIDERED BELTS' || item === 'EMBROIDERED SASHES') {
        setCurrentView('belts-and-sashes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (item === 'NECK COLLARS' || item === 'BAROQUE PEARL COLLARS') {
        setSearchQuery('Neck Collar');
      } else {
        setSearchQuery('');
      }
      setCurrentView('all-dresses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView('catalog');

    if (item === 'CONTACT US' || item === 'FLAGSHIP BOUTIQUES' || item === 'CALL +1 (800) 892-LUXE') {
      setCurrentView('our-story');
      setTimeout(() => {
        const el = document.getElementById('story-contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else setIsAppointmentModalOpen(true);
      }, 80);
      return;
    }

    if (item === 'BOOK ATELIER FITTING' || (featureKey === 'contact' && colTitle.includes('APPOINTMENT'))) {
      setIsAppointmentModalOpen(true);
      return;
    }

    if (featureKey === 'about' || featureKey === 'our-story') {
      setCurrentView('our-story');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (featureKey === 'brides') {
      const el = document.getElementById('footer-testimonials') || document.getElementById('boutique-footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className={`header-master ${isScrolled ? 'is-scrolled' : ''} ${activeDropdown ? 'megamenu-open' : ''}`}
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
              className={`nav-link-item ${currentView === 'catalog' && selectedCategory === 'all' && !activeDropdown ? 'active' : ''}`}
              onClick={() => {
                setActiveDropdown(null);
                handleNavClick('home');
              }}
            >
              HOME
            </button>

            {/* WEDDING DRESSES ⌵ (Click or Hover) */}
            <div
              className="nav-dropdown-holder"
              onMouseEnter={() => handleNavHover('wedding-dresses')}
              onMouseLeave={handleNavLeave}
            >
              <button
                type="button"
                className={`nav-link-item has-dropdown ${activeDropdown === 'wedding-dresses' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavClickToggle('wedding-dresses');
                }}
                aria-expanded={activeDropdown === 'wedding-dresses'}
              >
                WEDDING DRESSES <ChevronDown size={12} className={`chevron-mini ${activeDropdown === 'wedding-dresses' ? 'is-rotated' : ''}`} />
              </button>
            </div>

            {/* ACCESSORIES ⌵ (Click or Hover) */}
            <div
              className="nav-dropdown-holder"
              onMouseEnter={() => handleNavHover('accessories')}
              onMouseLeave={handleNavLeave}
            >
              <button
                type="button"
                className={`nav-link-item has-dropdown ${activeDropdown === 'accessories' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavClickToggle('accessories');
                }}
                aria-expanded={activeDropdown === 'accessories'}
              >
                ACCESSORIES <ChevronDown size={12} className={`chevron-mini ${activeDropdown === 'accessories' ? 'is-rotated' : ''}`} />
              </button>
            </div>

            {/* OUR STORY ⌵ (Click or Hover) */}
            <div
              className="nav-dropdown-holder"
              onMouseEnter={() => handleNavHover('about')}
              onMouseLeave={handleNavLeave}
            >
              <button
                type="button"
                className={`nav-link-item has-dropdown ${currentView === 'our-story' || activeDropdown === 'about' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentView('our-story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveDropdown(null);
                }}
                aria-expanded={activeDropdown === 'about'}
              >
                OUR STORY <ChevronDown size={12} className={`chevron-mini ${activeDropdown === 'about' ? 'is-rotated' : ''}`} />
              </button>
            </div>

            {/* REAL BRIDES ⌵ (Click or Hover) */}
            <div
              className="nav-dropdown-holder"
              onMouseEnter={() => handleNavHover('brides')}
              onMouseLeave={handleNavLeave}
            >
              <button
                type="button"
                className={`nav-link-item has-dropdown ${activeDropdown === 'brides' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavClickToggle('brides');
                }}
                aria-expanded={activeDropdown === 'brides'}
              >
                REAL BRIDES <ChevronDown size={12} className={`chevron-mini ${activeDropdown === 'brides' ? 'is-rotated' : ''}`} />
              </button>
            </div>
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

            {/* Account / Sign In */}
            {isLoggedIn ? (
              <div className="navbar-user-wrapper" ref={userMenuRef}>
                <button
                  type="button"
                  className="navbar-user-btn"
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  title={`Atelier Account: ${user.name}`}
                  aria-label="Bride account menu"
                >
                  <div className="navbar-user-avatar">
                    <User size={14} strokeWidth={1.8} />
                  </div>
                  <span className="navbar-user-name">{user.name.split(' ')[0]}</span>
                  <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    style={{
                      transform: isUserMenuOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="navbar-user-dropdown-menu">
                    <div className="user-menu-header">
                      <span className="user-menu-name">{user.name}</span>
                      <span className="user-menu-tier">
                        {user.membershipTier}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="user-menu-item"
                      onClick={() => {
                        setCurrentView('account');
                        setAccountTab('overview');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <User size={14} /> My Profile & Orders
                    </button>
                    <button
                      type="button"
                      className="user-menu-item"
                      onClick={() => {
                        setCurrentView('account');
                        setAccountTab('appointments');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Calendar size={14} /> Fitting Appointments
                    </button>
                    <button
                      type="button"
                      className="user-menu-item"
                      onClick={() => {
                        setCurrentView('account');
                        setAccountTab('wishlist');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Heart size={14} /> Saved Gowns ({wishlist.length})
                    </button>
                    <button
                      type="button"
                      className="user-menu-item logout-item"
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="navbar-auth-pill"
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                title="Sign In to VELORA Atelier"
                aria-label="Sign in"
              >
                <User size={14} strokeWidth={1.8} />
                <span>SIGN IN</span>
              </button>
            )}

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
            <button
              className="mobile-nav-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView('all-dresses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              WEDDING DRESSES
            </button>
            <button className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); setCurrentView('quick-ship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              QUICK SHIP STYLES
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('shop-by-color-heading')}>
              SHOP BY COLOR
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView('accessories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ACCESSORIES
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView('our-story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              OUR STORY
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('footer-testimonials')}>
              REAL BRIDES
            </button>
            <button className="mobile-nav-link highlight" onClick={() => { setIsMobileMenuOpen(false); setIsAppointmentModalOpen(true); }}>
              BOOK APPOINTMENT
            </button>

            {/* Mobile Auth Action */}
            <div style={{ padding: '14px 16px', borderTop: '1px solid #EBE4DA', marginTop: '12px' }}>
              {isLoggedIn ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="mobile-nav-link"
                    style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setCurrentView('account');
                      setAccountTab('overview');
                    }}
                  >
                    <User size={15} />
                    <span>{user.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logoutUser();
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9E2B2B',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="navbar-auth-pill"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                >
                  <User size={15} />
                  <span>SIGN IN / JOIN VIP CLUB</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Luxury Inside Details Mega Menu / Dropdown for all Navbar Features */}
      {activeDropdown && NAVBAR_FEATURES_DATA[activeDropdown] && (
        <div
          className="wedding-dresses-megamenu"
          role="region"
          aria-label={`${NAVBAR_FEATURES_DATA[activeDropdown].title} Details`}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div
            className="megamenu-inner-grid"
            style={{
              maxWidth:
                activeDropdown === 'wedding-dresses'
                  ? '1200px'
                  : activeDropdown === 'accessories'
                  ? '1040px'
                  : '880px',
              gridTemplateColumns: `repeat(${NAVBAR_FEATURES_DATA[activeDropdown].columns.length}, 1fr)`
            }}
          >
            {NAVBAR_FEATURES_DATA[activeDropdown].columns.map((col, idx) => (
              <div key={idx} className="megamenu-column">
                <h3 className="megamenu-col-header">{col.title}</h3>
                <ul className="megamenu-col-list">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button
                        type="button"
                        className="megamenu-item-btn"
                        onClick={() => handleFeatureItemClick(activeDropdown, col.title, item)}
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

      {/* Dimmed backdrop while dropdown is open */}
      {activeDropdown && (
        <div
          className="megamenu-backdrop"
          onClick={() => setActiveDropdown(null)}
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
