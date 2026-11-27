import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { routeFor } from '../routes/routeMap';
import { PageBackBar } from '../components/common/PageBackBar';
import {
  ROMANCE_HERO_INFO,
  ROMANCE_FILTER_TYPES,
  ROMANCE_COLLECTION_GOWNS
} from '../data/romanceCollectionData';
import '../styles/luxe-bridal.css';

const EASE_LUXE = [0.22, 1, 0.36, 1];

export const ShopRomancePage = () => {
  const { wishlist, toggleWishlist, formatPrice, setIsAppointmentModalOpen, showToast } = useApp();

  const [activeType, setActiveType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const typeCounts = useMemo(() => {
    const counts = { all: ROMANCE_COLLECTION_GOWNS.length };
    for (const tab of ROMANCE_FILTER_TYPES) {
      if (tab.id !== 'all') {
        counts[tab.id] = ROMANCE_COLLECTION_GOWNS.filter((g) => g.romanceTypes.includes(tab.id)).length;
      }
    }
    return counts;
  }, []);

  const displayedGowns = useMemo(() => {
    const base =
      activeType === 'all'
        ? ROMANCE_COLLECTION_GOWNS
        : ROMANCE_COLLECTION_GOWNS.filter((g) => g.romanceTypes.includes(activeType));

    const list = [...base];
    if (sortBy === 'price-low') return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === 'price-high') return list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === 'alpha-asc') return list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeType, sortBy]);

  return (
    <motion.div
      className="velora-romance-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE_LUXE }}
    >
      <div className="velora-romance-shell">
        <PageBackBar
          fallbackPath="/"
          trail={[
            { label: 'Home', to: '/' },
            { label: 'VELORA Romance' }
          ]}
        />

        {/* Editorial Hero + Visual Mood Strip */}
        <header className="romance-hero-header">
          <div className="romance-hero-copy">
            <span className="velora-dedicated-eyebrow">{ROMANCE_HERO_INFO.eyebrow}</span>
            <h1 className="romance-hero-title">{ROMANCE_HERO_INFO.title}</h1>
            <p className="romance-hero-subtitle">{ROMANCE_HERO_INFO.subtitle}</p>
          </div>

          <div className="romance-hero-strip" aria-label="VELORA Romance editorial silhouettes preview">
            {ROMANCE_HERO_INFO.editorialStrip.map((tile, idx) => (
              <motion.div
                key={tile.label}
                className="romance-strip-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: EASE_LUXE }}
              >
                <img src={tile.image} alt={tile.alt} loading="eager" />
                <span className="romance-strip-label">{tile.label}</span>
              </motion.div>
            ))}
          </div>
        </header>

        {/* Silhouette & Design Variation Filters */}
        <section className="romance-controls-bar" aria-label="Filter romance gowns by type">
          <div className="romance-filter-pills" role="tablist" aria-label="Gown silhouette filter">
            {ROMANCE_FILTER_TYPES.map((tab) => {
              const isActive = activeType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`romance-filter-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveType(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className="romance-filter-count">{typeCounts[tab.id] || 0}</span>
                  {isActive && (
                    <motion.span
                      layoutId="romance-filter-underline"
                      className="romance-filter-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="romance-sort-wrap">
            <SlidersHorizontal size={14} className="romance-sort-icon" aria-hidden="true" />
            <label htmlFor="romance-sort-select" className="sr-only">Sort gowns</label>
            <select
              id="romance-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="romance-sort-select"
            >
              <option value="featured">Curated Romance Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="alpha-asc">Alphabetical: A – Z</option>
            </select>
          </div>
        </section>

        {/* Active Silhouette Counter */}
        <div className="romance-results-meta">
          <span>
            Showing <strong>{displayedGowns.length}</strong> curated couture{' '}
            {displayedGowns.length === 1 ? 'design' : 'designs'}
          </span>
        </div>

        {/* Full Responsive Gown Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${sortBy}`}
            className="velora-grid-4 velora-romance-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_LUXE }}
          >
            {displayedGowns.map((gown) => {
              const isWishlisted = wishlist.includes(gown.id);
              const primaryImg = gown.image;
              const hoverImg = gown.hoverImage || primaryImg;
              const displayShape = gown.shape || gown.silhouette?.split('SIZES:')[0]?.trim() || 'A-Line';

              return (
                <article key={gown.id} className="velora-gown-card romance-gown-card">
                  <div className="velora-gown-media romance-card-media">
                    <Link
                      to={routeFor('product', { product: gown })}
                      state={{ fromInternal: true, product: gown }}
                      className="romance-card-link-overlay"
                      aria-label={`View ${gown.name}`}
                    >
                      <img
                        src={primaryImg}
                        alt={gown.name}
                        className="velora-card-img-primary"
                        loading="lazy"
                      />
                      {hoverImg && hoverImg !== primaryImg && (
                        <img
                          src={hoverImg}
                          alt={`${gown.name} alternate view`}
                          className="velora-card-img-hover"
                          aria-hidden="true"
                          loading="lazy"
                        />
                      )}
                    </Link>

                    {gown.badge && (
                      <span className="romance-card-badge">{gown.badge}</span>
                    )}

                    <button
                      type="button"
                      className={`signature-wishlist-circle-btn romance-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(gown.id);
                        if (showToast) {
                          showToast(
                            isWishlisted
                              ? `Removed ${gown.name} from Wishlist`
                              : `Saved ${gown.name} to your Wishlist!`
                          );
                        }
                      }}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                      aria-label={`Toggle wishlist for ${gown.name}`}
                    >
                      <Heart
                        size={15}
                        strokeWidth={2}
                        fill={isWishlisted ? '#B76E65' : 'none'}
                        color={isWishlisted ? '#B76E65' : '#635652'}
                      />
                    </button>
                  </div>

                  <Link
                    to={routeFor('product', { product: gown })}
                    state={{ fromInternal: true, product: gown }}
                    className="romance-card-caption"
                  >
                    <div className="romance-card-toprow">
                      <span className="romance-card-shape">{displayShape}</span>
                      <span className="romance-card-price">{formatPrice(gown.price)}</span>
                    </div>
                    <h2 className="velora-gown-name romance-card-title">{gown.name}</h2>
                    {gown.subtitle && (
                      <p className="romance-card-subtitle">{gown.subtitle}</p>
                    )}
                    <span className="romance-card-cta">
                      Explore Gown <ArrowUpRight size={13} />
                    </span>
                  </Link>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Cross-Navigation to Dedicated Silhouette Guides */}
        <section className="romance-explore-strip" aria-label="Browse dedicated silhouette guides">
          <div className="romance-explore-copy">
            <h2>Explore More Silhouettes &amp; Fabrics</h2>
            <p>Jump straight into any dedicated style guide across the VELORA atelier.</p>
          </div>
          <div className="romance-explore-links">
            <Link to="/styles/a-line">A-Line</Link>
            <Link to="/styles/ballgown">Ballgown</Link>
            <Link to="/styles/fit-and-flare">Fit &amp; Flare</Link>
            <Link to="/styles/mermaid">Mermaid</Link>
            <Link to="/styles/basque-waist">Basque Waist</Link>
            <Link to="/styles/off-the-shoulder">Off The Shoulder</Link>
            <Link to="/styles/lace">French Lace</Link>
            <Link to="/styles/satin">Silk Satin</Link>
          </div>
        </section>

        {/* Atelier Consultation Callout */}
        <section className="velora-collections-booking-banner" style={{ marginTop: '48px' }}>
          <div className="velora-booking-banner-inner">
            <div className="velora-booking-icon-holder">
              <Sparkles size={26} />
            </div>
            <div className="velora-booking-text-area">
              <h3 className="velora-booking-title">Try On the VELORA Romance Capsule</h3>
              <p className="velora-booking-desc">
                Book a complimentary private fitting in our salon to experience custom lace sleeves, scarves, and corset tailoring.
              </p>
            </div>
            <button
              type="button"
              className="velora-booking-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ShopRomancePage;
