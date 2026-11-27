import React, { useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCatalog } from '../services/catalogStore';
import { accessoryRouteFor } from '../routes/routeMap';
import { matchGownSearchStrict } from '../utils/searchMatcher';
import { PageBackBar } from '../components/common/PageBackBar';
import '../styles/luxe-bridal.css';

const isAccessoryItem = (p) => (
  p && (
    p.category === 'accessories' ||
    p.tags?.includes('Accessories') ||
    Boolean(p.accessoryType) ||
    /veil|train|jacket|shrug|cape|scarf|glove|belt|collar/i.test(p.name || '')
  )
);

export const AccessoryCategoryPage = () => {
  const location = useLocation();
  const {
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    showToast,
    setIsAppointmentModalOpen
  } = useApp();

  const catalog = useCatalog();
  const accRoute = accessoryRouteFor(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const items = useMemo(() => {
    if (!accRoute || !Array.isArray(catalog)) return [];
    const accessoryPool = catalog.filter(isAccessoryItem);
    if (!accRoute.filterQuery) {
      return accessoryPool;
    }
    const accMatched = accessoryPool.filter((p) => matchGownSearchStrict(p, accRoute.filterQuery));
    if (accMatched.length > 0) {
      return accMatched;
    }
    return catalog.filter((p) => matchGownSearchStrict(p, accRoute.filterQuery));
  }, [catalog, accRoute]);

  if (!accRoute) return null;

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-accessory-category-page">
      <PageBackBar
        fallbackPath="/accessories"
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Accessories', to: '/accessories' },
          { label: accRoute.title }
        ]}
      />

      <header className="velora-accessories-header" style={{ paddingTop: '8px' }}>
        <span className="velora-dedicated-eyebrow">{accRoute.eyebrow}</span>
        <h1 className="velora-accessories-main-title">{accRoute.title}</h1>
        <div className="velora-accessories-rte">
          <p className="velora-accessories-lead">{accRoute.description}</p>
        </div>
      </header>

      {accRoute.slug === 'veil-length-guide' && (
        <div className="measurement-steps-grid" style={{ marginBottom: '36px' }}>
          <div className="step-card">
            <div className="step-number">90&quot;</div>
            <h4>Chapel Length Veil</h4>
            <p>Flows gracefully to the hem of your gown, ideal for outdoor garden ceremonies and sleek A-line or column silhouettes.</p>
          </div>
          <div className="step-card">
            <div className="step-number">108&quot;</div>
            <h4>Cathedral Length Veil</h4>
            <p>Extends dramatically past the gown train for iconic cathedral aisles, framed with scalloped French Chantilly or guipure lace.</p>
          </div>
          <div className="step-card">
            <div className="step-number">COMB</div>
            <h4>Hand-Sewn Rhodium Comb</h4>
            <p>Every VELORA veil arrives pre-mounted on a comfort-grip metal comb for effortless veil placement and reception removal.</p>
          </div>
        </div>
      )}

      <div className="curated-gowns-header" style={{ marginBottom: '26px' }}>
        <div>
          <h2 className="curated-section-title">{accRoute.title}</h2>
          <p className="curated-section-subtitle">
            Showing {items.length} curated atelier {items.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
        <span className="gowns-count-badge">{items.length} Styles</span>
      </div>

      {items.length > 0 ? (
        <div className="curated-gowns-grid">
          {items.map((item) => {
            const isWishlisted = wishlist.includes(item.id);
            const img = item.images?.[0] || item.image || '/images/bridal/featured-lace-dream.jpg';
            const defaultVar = Array.isArray(item.variants) && item.variants.length > 0 ? item.variants[0] : null;
            const displayPrice = item.price ?? defaultVar?.price ?? 0;

            return (
              <div key={item.id} className="curated-gown-card">
                <div className="gown-card-media" onClick={() => setSelectedProduct(item)}>
                  <img src={img} alt={item.name} className="gown-card-img" loading="lazy" />
                  <button
                    type="button"
                    className={`gown-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                    }}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <div className="gown-media-overlay">
                    <span className="gown-view-quick">
                      <Eye size={14} /> View Details
                    </span>
                  </div>
                </div>

                <div className="gown-card-details">
                  <div className="gown-attributes-chips">
                    {item.accessoryType && <span className="gown-chip">{item.accessoryType}</span>}
                    {item.silhouette && <span className="gown-chip">{item.silhouette}</span>}
                  </div>
                  <h3 className="gown-name" onClick={() => setSelectedProduct(item)}>
                    {item.name}
                  </h3>
                  {item.subtitle && <p className="gown-subtitle">{item.subtitle}</p>}
                  {item.description && <p className="gown-desc-text">{item.description}</p>}

                  <div className="gown-card-footer">
                    <div className="gown-pricing">
                      <span className="gown-price-current">{formatPrice(displayPrice)}</span>
                      {item.originalPrice && item.originalPrice > displayPrice && (
                        <span className="gown-price-original">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn-gown-add-bag"
                      onClick={() => {
                        addToCart(item, defaultVar, 1);
                        showToast(`Added ${item.name} to your Bridal Bag!`);
                      }}
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 glass-panel">
          <p className="text-muted">No pieces found in this category.</p>
          <Link to="/accessories" className="btn btn-primary mt-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Explore All Accessories <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <section className="velora-collections-booking-banner" style={{ marginTop: '56px' }} aria-label="Book Accessory Styling">
        <div className="velora-booking-banner-inner">
          <div className="velora-booking-icon-holder">
            <Calendar size={28} />
          </div>
          <div className="velora-booking-text-area">
            <h3 className="velora-booking-title">Pair {accRoute.title} With Your Gown</h3>
            <p className="velora-booking-desc">
              Reserve a private bridal styling session to match veil lengths, ivory hues, and detachable accents with your wedding dress.
            </p>
          </div>
          <button
            type="button"
            className="velora-booking-btn"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            BOOK STYLING CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
};

export default AccessoryCategoryPage;
