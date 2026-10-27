import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QUICK_SHIP_GOWNS, QUICK_SHIP_HERO_INFO } from '../data/quickShipData';
import { getQuickShipData } from '../services/api';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import {
  Heart,
  ArrowLeft,
  Sparkles,
  Truck,
  ShieldCheck,
  Clock,
  Calendar,
  Check,
  ShoppingBag,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

export const QuickShipPage = () => {
  const {
    setCurrentView,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    addToCart,
    showToast,
    formatPrice,
    setIsAppointmentModalOpen
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredGownId, setHoveredGownId] = useState(null);

  const [quickShipState, setQuickShipState] = useState({
    header: QUICK_SHIP_HERO_INFO,
    products: QUICK_SHIP_GOWNS
  });

  useEffect(() => {
    let mounted = true;
    getQuickShipData().then((res) => {
      if (mounted && res && res.success && res.data && res.data.products) {
        setQuickShipState(res.data);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const gownsList = quickShipState.products || [];

  const filterOptions = [
    { label: 'ALL GOWNS', count: gownsList.length },
    { label: 'A-LINE', match: (g) => g.tags?.includes('A-Line') },
    { label: 'MERMAID', match: (g) => g.tags?.includes('Mermaid') || g.tags?.includes('Fit and Flare') },
    { label: 'BALLGOWN', match: (g) => g.tags?.includes('Ballgown') },
    { label: 'BASQUE WAIST', match: (g) => g.tags?.includes('Basque Waist') },
    { label: 'STRAPLESS', match: (g) => g.tags?.includes('Strapless') },
    { label: 'OFF-THE-SHOULDER', match: (g) => g.tags?.includes('Off-The-Shoulder') },
    { label: 'ORGANZA', match: (g) => g.tags?.includes('Organza') },
    { label: 'CREPE & LACE', match: (g) => g.tags?.includes('Crepe') || g.tags?.includes('Lace') }
  ];

  const filteredGowns = activeFilter === 'ALL'
    ? gownsList
    : gownsList.filter((g) => {
        const option = filterOptions.find((o) => o.label === activeFilter);
        return option && option.match ? option.match(g) : true;
      });

  const handleCardClick = (gown) => {
    const fullProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.slug,
      subtitle: gown.subtitle,
      category: 'quick-ship',
      categoryName: 'Quick Ship Faster Delivery',
      price: gown.price,
      originalPrice: gown.originalPrice,
      rating: 5.0,
      reviewCount: 38,
      badge: 'Quick Ship • 2–3 Wks Dispatch',
      isNew: true,
      stock: 4,
      description: gown.description,
      images: gown.images,
      videoUrl: gown.videoUrl,
      variants: [
        { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
        { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
        { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
        { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
        { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 2, sku: `${gown.id}-10` },
        { id: `${gown.id}-v5`, name: 'US Size 12 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 12', price: gown.price, stock: 1, sku: `${gown.id}-12` }
      ],
      attributes: {
        'Silhouette': gown.silhouette,
        'Fabrication': gown.fabric,
        'Neckline': gown.neckline,
        'Sleeves': gown.sleeves,
        'Train Length': gown.train,
        'Back Detail': gown.back,
        'Internal Structure': gown.boning,
        'Production Timeline': 'Quick Ship (2–3 Weeks Express Delivery)',
        'Collection': gown.collection
      },
      reviews: [
        {
          id: `rev-${gown.id}-1`,
          name: 'Sophie L.',
          avatar: '/images/bridal/avatars.png',
          rating: 5,
          date: '2 weeks ago',
          comment: `Ordered with Quick Ship for our destination wedding in Positano and it arrived in exactly 18 days! The quality, inner corset support, and craftsmanship are breathtaking.`,
          verified: true
        },
        {
          id: `rev-${gown.id}-2`,
          name: 'Victoria M.',
          avatar: '/images/bridal/avatars.png',
          rating: 5,
          date: '1 month ago',
          comment: `I was terrified having only 6 weeks before my wedding day, but this gown arrived so fast and fit like a couture dream. Truly no compromise to quality!`,
          verified: true
        }
      ]
    };

    setSelectedProduct(fullProduct);
  };

  const handleQuickAdd = (e, gown) => {
    e.stopPropagation();
    const cartProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.slug,
      subtitle: gown.subtitle,
      category: 'quick-ship',
      categoryName: 'Quick Ship Faster Delivery',
      price: gown.price,
      images: gown.images,
      description: gown.description,
      variants: [
        {
          id: `${gown.id}-v1`,
          name: 'US Size 4 / Ivory',
          color: 'Ivory',
          colorHex: '#FAF7F2',
          size: 'US 4',
          price: gown.price,
          stock: 3,
          sku: `${gown.id}-04`
        }
      ]
    };
    addToCart(cartProduct, cartProduct.variants[0], 1);
    showToast(`Added ${gown.name} to your Bridal Bag (Quick Ship Priority)!`);
  };

  return (
    <div className="quick-ship-page-wrapper">
      {/* 1. Top Breadcrumb Navigation */}
      <div className="quick-ship-breadcrumb-container">
        <div className="quick-ship-breadcrumb-content">
          <button
            type="button"
            className="quick-ship-breadcrumb-back"
            onClick={() => setCurrentView('catalog')}
          >
            <ArrowLeft size={14} /> Back to Store
          </button>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-muted">WEDDING DRESSES</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-muted">BY TYPE</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-active">QUICK SHIP FASTER DELIVERY</span>
        </div>
      </div>

      {/* 2. Editorial Header (Faithfully matching Reference Screenshot) */}
      <header className="quick-ship-editorial-header">
        <div className="quick-ship-header-inner">
          <div className="quick-ship-badge-pill">
            <Clock size={13} className="quick-ship-badge-icon" />
            <span>EXPRESS ATELIER DISPATCH &bull; 2–3 WEEKS</span>
          </div>

          <h1 className="quick-ship-headline">
            {quickShipState.header?.headline || QUICK_SHIP_HERO_INFO.headline}
          </h1>

          <p className="quick-ship-quote">
            {quickShipState.header?.subheading || QUICK_SHIP_HERO_INFO.subheading}
          </p>
        </div>
      </header>

      {/* Shop Collection Navigation Tabs */}
      <ShopCollectionNav activeTab="quick-ship" style={{ marginTop: '24px' }} />

      {/* 3. Filter Navigation Strip */}
      <section className="quick-ship-filter-strip" aria-label="Quick Ship Gown Filters">
        <div className="quick-ship-filter-scroll">
          {filterOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              className={`quick-ship-filter-pill ${activeFilter === opt.label ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(opt.label)}
            >
              {opt.label}
              {opt.count !== undefined && (
                <span className="pill-count">{opt.count}</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Luxury 4-Column Gowns Grid (Matching Reference Screenshot) */}
      <main className="quick-ship-grid-section">
        <div className="quick-ship-gowns-grid">
          {filteredGowns.map((gown) => {
            const isWishlisted = wishlist.includes(gown.id);
            const isHovered = hoveredGownId === gown.id;
            const currentImg = isHovered && gown.hoverImage ? gown.hoverImage : gown.image;

            return (
              <article
                key={gown.id}
                className="quick-ship-gown-card"
                onClick={() => handleCardClick(gown)}
                onMouseEnter={() => setHoveredGownId(gown.id)}
                onMouseLeave={() => setHoveredGownId(null)}
                tabIndex={0}
                role="button"
                aria-label={`View dress: ${gown.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCardClick(gown);
                }}
              >
                {/* Media Container with Floating Wishlist Heart */}
                <div className="quick-ship-media-container">
                  <img
                    src={currentImg}
                    alt={`${gown.name} wedding dress - ${gown.silhouette}`}
                    className="quick-ship-gown-image"
                    loading="lazy"
                  />

                  {/* Top-Right Circular Floating Heart Button (Exact Reference Match) */}
                  <button
                    type="button"
                    className={`quick-ship-wishlist-circle ${isWishlisted ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(gown.id);
                      showToast(
                        isWishlisted
                          ? `Removed ${gown.name} from Wishlist`
                          : `Saved ${gown.name} to your Wishlist!`
                      );
                    }}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    aria-label={`Wishlist toggle for ${gown.name}`}
                  >
                    <Heart
                      size={17}
                      strokeWidth={1.8}
                      fill={isWishlisted ? '#D44A4A' : 'none'}
                      color={isWishlisted ? '#D44A4A' : '#4A3B32'}
                    />
                  </button>

                  {/* Express Dispatch Pill on Card */}
                  <div className="quick-ship-card-timing">
                    <Clock size={11} /> 2–3 Wks
                  </div>

                  {/* Hover Overlay Action Bar */}
                  <div className="quick-ship-hover-overlay">
                    <button
                      type="button"
                      className="quick-ship-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(gown);
                      }}
                    >
                      <Eye size={13} /> GOWN DETAILS
                    </button>
                    <button
                      type="button"
                      className="quick-ship-overlay-btn primary"
                      onClick={(e) => handleQuickAdd(e, gown)}
                    >
                      <ShoppingBag size={13} /> QUICK ADD
                    </button>
                  </div>
                </div>

                {/* Minimalist Centered Name (Matching Reference Layout) */}
                <div className="quick-ship-card-info">
                  <h2 className="quick-ship-gown-name">{gown.name}</h2>
                  <p className="quick-ship-gown-silhouette">{gown.silhouette}</p>
                  <p className="quick-ship-gown-price">{formatPrice(gown.price)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* 5. Trust & Quality Guarantee Strip */}
      <section className="quick-ship-trust-strip">
        <div className="trust-strip-inner">
          <div className="trust-item">
            <Clock size={24} className="trust-icon" />
            <div className="trust-text">
              <h4>Expedited Production</h4>
              <p>Tailored & dispatched in 2–3 weeks for time-sensitive celebration dates.</p>
            </div>
          </div>

          <div className="trust-item">
            <ShieldCheck size={24} className="trust-icon" />
            <div className="trust-text">
              <h4>Uncompromised Quality</h4>
              <p>Hand-cut French lace, signature internal 14-piece boning, and couture finishing.</p>
            </div>
          </div>

          <div className="trust-item">
            <Truck size={24} className="trust-icon" />
            <div className="trust-text">
              <h4>Insured White-Glove Shipping</h4>
              <p>Tracked express courier delivery directly to your door or flagship boutique.</p>
            </div>
          </div>

          <div className="trust-item">
            <Calendar size={24} className="trust-icon" />
            <div className="trust-text">
              <h4>Bridal Concierge Fitting</h4>
              <p>Complimentary virtual measurements check and personalized styling guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Spontaneous Wedding Concierge Card */}
      <section className="quick-ship-concierge-banner">
        <div className="concierge-content">
          <span className="concierge-kicker">ATELIER RUSH ASSISTANCE</span>
          <h3 className="concierge-title">Have an Approaching Wedding Date?</h3>
          <p className="concierge-desc">
            Our bridal stylists and master patternmakers can confirm stock availability, verify measurements, and prioritize your dispatch immediately.
          </p>
          <button
            type="button"
            className="concierge-cta-btn"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            BOOK URGENT BRIDAL CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
};
