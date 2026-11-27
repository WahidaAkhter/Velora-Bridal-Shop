import React, { useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCatalog } from '../services/catalogStore';
import { collectionRouteFor } from '../routes/routeMap';
import { SEASONAL_COLLECTIONS_DATA } from '../data/allCollectionsData';
import { matchGownSearchStrict } from '../utils/searchMatcher';
import { PageBackBar } from '../components/common/PageBackBar';
import '../styles/luxe-bridal.css';

export const CollectionDetailPage = () => {
  const location = useLocation();
  const { setSelectedProduct, wishlist, toggleWishlist, setIsAppointmentModalOpen } = useApp();
  const catalog = useCatalog();
  const slug = collectionRouteFor(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const collection = useMemo(
    () => SEASONAL_COLLECTIONS_DATA.find((c) => c.id === slug) || null,
    [slug]
  );

  const gowns = useMemo(() => {
    if (!collection || !Array.isArray(catalog)) return [];
    const tag = collection.filterTag || '';
    if (tag === 'accessories') {
      return catalog.filter(
        (p) => p.category === 'accessories' || p.tags?.includes('Accessories') || Boolean(p.accessoryType)
      );
    }
    return catalog.filter((p) => matchGownSearchStrict(p, tag));
  }, [collection, catalog]);

  if (!collection) return null;

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-collection-detail-page">
      <PageBackBar
        fallbackPath="/collections"
        trail={[
          { label: 'Home', to: '/' },
          { label: 'All Collections', to: '/collections' },
          { label: collection.name }
        ]}
      />

      <section className="velora-collections-hero-banner" aria-label={collection.name}>
        <div
          className="velora-col-hero-bg"
          style={{ backgroundImage: `url(${collection.image})` }}
        >
          <div className="velora-col-hero-overlay" />
        </div>
        <div className="velora-col-hero-content">
          <span className="velora-col-hero-badge">
            <span>{collection.season}</span>
          </span>
          <h1 className="velora-col-hero-title">{collection.name}</h1>
          <p className="velora-col-hero-subtitle">{collection.tagline}</p>
          <p className="velora-col-hero-desc">{collection.description}</p>
          <button
            type="button"
            className="velora-col-hero-btn"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            <Calendar size={15} />
            <span>BOOK FITTING FOR {collection.name}</span>
          </button>
        </div>
      </section>

      <div className="curated-gowns-header" style={{ marginTop: '36px', marginBottom: '26px' }}>
        <div>
          <h2 className="curated-section-title">{collection.name} Designs</h2>
          <p className="curated-section-subtitle">
            Showing {gowns.length} curated pieces from this capsule
          </p>
        </div>
        <span className="gowns-count-badge">{gowns.length} Styles</span>
      </div>

      {gowns.length > 0 ? (
        <div className="velora-grid-4">
          {gowns.map((gown) => {
            const isWishlisted = wishlist.includes(gown.id);
            const primaryImg = gown.images?.[0] || gown.image || '';
            const secondaryImg = gown.images?.[1] || gown.hoverImage || primaryImg;
            return (
              <article
                key={gown.id}
                className="velora-gown-card"
                onClick={() => setSelectedProduct(gown)}
                tabIndex={0}
                role="button"
                aria-label={`View ${gown.name} details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedProduct(gown);
                }}
              >
                <div className="velora-gown-media">
                  <button
                    type="button"
                    className={`velora-wishlist-circle-btn ${isWishlisted ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(gown.id);
                    }}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? '#bca07e' : 'none'}
                      stroke={isWishlisted ? '#bca07e' : 'rgba(0,0,0,0.65)'}
                      strokeWidth={1.5}
                    />
                  </button>
                  <img src={primaryImg} alt={gown.name} className="velora-card-img-primary" loading="lazy" />
                  {secondaryImg && (
                    <img
                      src={secondaryImg}
                      alt={`${gown.name} alternate view`}
                      className="velora-card-img-hover"
                      aria-hidden="true"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="velora-gown-caption">
                  <h3 className="velora-gown-name">{gown.name}</h3>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 glass-panel">
          <p className="text-muted">Explore our full bridal gown collection.</p>
          <Link to="/dresses" className="btn btn-primary mt-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Browse All Gowns <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CollectionDetailPage;
