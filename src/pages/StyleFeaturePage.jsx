import React, { useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Compass, Heart, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCatalog } from '../services/catalogStore';
import { styleRouteFor } from '../routes/routeMap';
import { WEDDING_DRESS_OPTIONS_DATA } from '../data/weddingDressesFeatures';
import { matchGownSearchStrict } from '../utils/searchMatcher';
import { PageBackBar } from '../components/common/PageBackBar';
import '../styles/luxe-bridal.css';

export const StyleFeaturePage = () => {
  const location = useLocation();
  const {
    formatPrice,
    addToCart,
    setSelectedProduct,
    setIsAppointmentModalOpen,
    wishlist,
    toggleWishlist,
    showToast
  } = useApp();

  const catalog = useCatalog();
  const styleRoute = styleRouteFor(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const featureData = useMemo(() => {
    if (!styleRoute) return null;
    if (WEDDING_DRESS_OPTIONS_DATA[styleRoute.optionKey]) {
      return WEDDING_DRESS_OPTIONS_DATA[styleRoute.optionKey];
    }
    return {
      category: 'EXCLUSIVELY INCLUSIVE',
      title: `${styleRoute.label} Gowns`,
      badge: 'Sizes US 2–28',
      tagline: 'Sculpted bridal architecture tailored for every bride and silhouette',
      heroImage: '/images/bridal/featured-lace-dream.jpg',
      thought: 'Every VELORA gown is constructed across inclusive US sizes 2 to 28 with signature internal 14-piece corsetry and breathable luxury linings.',
      stylistNote: 'Explore supportive A-line, basque-waist, and sculpted crepe silhouettes crafted for all-day comfort and poise.',
      curatedGowns: []
    };
  }, [styleRoute]);

  const matchingCatalogGowns = useMemo(() => {
    if (!styleRoute || !Array.isArray(catalog)) return [];
    if (styleRoute.filterType === 'back') {
      return catalog.filter((p) => {
        const backText = (p.back || p.attributes?.['Back Detail'] || '').toLowerCase();
        const combined = `${p.subtitle || ''} ${p.description || ''} ${(p.tags || []).join(' ')}`.toLowerCase();
        return backText.length > 0 || /open back|low back|keyhole|illusion back|covered buttons/i.test(combined);
      });
    }
    return catalog.filter((p) => matchGownSearchStrict(p, styleRoute.query));
  }, [catalog, styleRoute]);

  if (!styleRoute || !featureData) {
    return null;
  }

  const handleViewCurated = (gown) => {
    const fullProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.id,
      subtitle: gown.subtitle,
      category: 'wedding-dresses',
      categoryName: 'Wedding Dresses',
      price: gown.price,
      originalPrice: gown.originalPrice,
      rating: 5.0,
      reviewCount: 32,
      badge: featureData.badge,
      isNew: true,
      stock: 4,
      description: gown.description,
      images: [gown.image, ...(gown.hoverImage ? [gown.hoverImage] : []), featureData.heroImage],
      variants: [
        { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
        { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
        { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
        { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
        { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 1, sku: `${gown.id}-10` }
      ],
      attributes: {
        'Silhouette': gown.silhouette || featureData.title,
        'Fabrication': gown.fabric || featureData.title,
        'Craftsmanship': 'Handcrafted in Paris Atelier',
        'Train Length': 'Cathedral / Chapel Available',
        'Fitting Service': 'Complimentary boutique alteration consultation'
      },
      reviews: [
        { id: 'rev-1', name: 'Genevieve M.', avatar: '/images/bridal/avatars.png', rating: 5, date: '2 weeks ago', comment: 'Exceeded every single dream. The corset fit and tailoring is extraordinary.', verified: true }
      ]
    };
    setSelectedProduct(fullProduct);
  };

  const handleQuickAddCurated = (gown) => {
    const cartProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.id,
      subtitle: gown.subtitle,
      category: 'wedding-dresses',
      categoryName: 'Wedding Dresses',
      price: gown.price,
      images: [gown.image],
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
    showToast(`Added ${gown.name} to your Bridal Bag!`);
  };

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-style-feature-page">
      <PageBackBar
        fallbackPath="/dresses"
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Wedding Dresses', to: '/dresses' },
          { label: styleRoute.label }
        ]}
      />

      <div className="standard-feature-content">
        <div className="feature-hero-card">
          <div className="feature-hero-media">
            <img
              src={featureData.heroImage}
              alt={featureData.title}
              className="feature-hero-img"
            />
            <div className="feature-hero-badge-tag">
              {featureData.badge}
            </div>
          </div>

          <div className="feature-hero-info">
            <div className="feature-badge-row">
              <span className="hero-category-label">{featureData.category}</span>
              <span className="hero-pill-badge">{featureData.badge}</span>
            </div>

            <h1 className="feature-hero-name">{featureData.title}</h1>
            <p className="feature-hero-tagline">{featureData.tagline}</p>

            <div className="feature-thought-box">
              <h5 className="thought-box-title">
                <Compass size={14} /> Atelier Design Philosophy
              </h5>
              <p className="thought-box-body">{featureData.thought}</p>
            </div>

            <div className="stylist-note-box">
              <strong>Stylist&apos;s Recommendation:</strong> {featureData.stylistNote}
            </div>

            <div className="feature-cta-row">
              <button
                type="button"
                className="btn-atelier-primary"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                <Calendar size={15} /> Book Fitting for {featureData.title}
              </button>
              <Link to="/size-chart" className="btn-atelier-secondary" style={{ textDecoration: 'none' }}>
                <span>View Atelier Size Chart</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {featureData.curatedGowns && featureData.curatedGowns.length > 0 && (
          <div className="curated-gowns-section" style={{ marginBottom: '48px' }}>
            <div className="curated-gowns-header">
              <div>
                <h2 className="curated-section-title">
                  Curated Spotlight: {featureData.title}
                </h2>
                <p className="curated-section-subtitle">
                  Hand-selected creations embodying this signature aesthetic
                </p>
              </div>
              <span className="gowns-count-badge">
                {featureData.curatedGowns.length} Highlight{featureData.curatedGowns.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="curated-gowns-grid">
              {featureData.curatedGowns.map((gown) => {
                const isWishlisted = wishlist.includes(gown.id);
                return (
                  <div key={gown.id} className="curated-gown-card">
                    <div className="gown-card-media" onClick={() => handleViewCurated(gown)}>
                      <img
                        src={gown.image}
                        alt={gown.name}
                        className="gown-card-img"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        className={`gown-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(gown.id);
                        }}
                        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist toggle"
                      >
                        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                      </button>
                      <div className="gown-media-overlay">
                        <span className="gown-view-quick">
                          <Eye size={14} /> Quick View
                        </span>
                      </div>
                    </div>

                    <div className="gown-card-details">
                      <div className="gown-attributes-chips">
                        {gown.silhouette && <span className="gown-chip">{gown.silhouette}</span>}
                        {gown.fabric && <span className="gown-chip">{gown.fabric}</span>}
                      </div>

                      <h3 className="gown-name" onClick={() => handleViewCurated(gown)}>
                        {gown.name}
                      </h3>
                      <p className="gown-subtitle">{gown.subtitle}</p>
                      <p className="gown-desc-text">{gown.description}</p>

                      <div className="gown-card-footer">
                        <div className="gown-pricing">
                          <span className="gown-price-current">{formatPrice(gown.price)}</span>
                          {gown.originalPrice && (
                            <span className="gown-price-original">{formatPrice(gown.originalPrice)}</span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="btn-gown-add-bag"
                          onClick={() => handleQuickAddCurated(gown)}
                        >
                          <ShoppingBag size={14} /> Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {matchingCatalogGowns.length > 0 && (
          <div className="curated-gowns-section">
            <div className="curated-gowns-header">
              <div>
                <h2 className="curated-section-title">
                  {styleRoute.label} Collection ({matchingCatalogGowns.length})
                </h2>
                <p className="curated-section-subtitle">
                  Available to view, wishlist, and order in your size
                </p>
              </div>
              <span className="gowns-count-badge">
                {matchingCatalogGowns.length} Gown{matchingCatalogGowns.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="velora-grid-4">
              {matchingCatalogGowns.map((gown) => {
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
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleFeaturePage;
