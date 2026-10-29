import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  COLLECTIONS_HERO_DATA,
  SEASONAL_COLLECTIONS_DATA,
  SHAPE_AND_STYLE_CARDS
} from '../data/allCollectionsData';
import { getAllCollectionsData } from '../services/api';
import {
  ArrowRight,
  Calendar
} from 'lucide-react';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import '../styles/luxe-bridal.css';

export const AllCollectionsPage = () => {
  const {
    setCurrentView,
    setSelectedCategory,
    setSearchQuery,
    setIsAppointmentModalOpen
  } = useApp();

  const [heroData, setHeroData] = useState(COLLECTIONS_HERO_DATA);
  const [seasonalData, setSeasonalData] = useState(SEASONAL_COLLECTIONS_DATA);
  const [shapeStyleData, setShapeStyleData] = useState(SHAPE_AND_STYLE_CARDS);

  useEffect(() => {
    let mounted = true;
    getAllCollectionsData().then((res) => {
      if (mounted && res && res.success && res.data) {
        if (res.data.hero) setHeroData(res.data.hero);
        if (res.data.seasonal) setSeasonalData(res.data.seasonal);
        if (res.data.shapeAndStyle) setShapeStyleData(res.data.shapeAndStyle);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCtaClick = (card) => {
    setSelectedCategory('all');
    if (card.filterType === 'silhouette') {
      setSearchQuery(card.filterValue);
    } else if (card.filterType === 'style' || card.filterType === 'fabric' || card.filterType === 'neckline') {
      setSearchQuery(card.filterValue);
    } else {
      setSearchQuery('');
    }
    setCurrentView('all-dresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCollectionCardClick = (col) => {
    if (col.id === 'terra' || col.id === 'poeme' || col.id === 'solara' || col.id === 'ceres' || col.id === 'memoirs' || col.id === 'baciami') {
      setSearchQuery(col.filterTag || '');
    } else {
      setSearchQuery('');
    }
    setCurrentView(col.targetView || 'all-dresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="velora-all-collections-page animate-fade-in" id="velora-collections-top">
      {/* 1. Breadcrumb Navigation */}
      <nav className="velora-breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          className="velora-breadcrumb-link"
          onClick={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Home
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <button
          type="button"
          className="velora-breadcrumb-link"
          onClick={() => {
            setCurrentView('all-dresses');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Wedding Dresses
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">All Collections</span>
      </nav>

      {/* Shop Collection Navigation Tabs */}
      <ShopCollectionNav activeTab="all-collections" style={{ margin: '0 auto 28px auto' }} />

      {/* 2. Full-Width Hero Banner (Exact match to CTA 0 - New Collection Legacy) */}
      <section className="velora-collections-hero-banner" aria-label="New Collection Legacy Showcase">
        <div
          className="velora-col-hero-bg"
          style={{ backgroundImage: `url(${heroData?.bgImage || COLLECTIONS_HERO_DATA.bgImage})` }}
        >
          <div className="velora-col-hero-overlay" />
        </div>

        <div className="velora-col-hero-content">
          <span className="velora-col-hero-badge">
            <span>{heroData?.title || COLLECTIONS_HERO_DATA.title}</span>
          </span>
          <h1 className="velora-col-hero-title">{heroData?.collectionName || COLLECTIONS_HERO_DATA.collectionName}</h1>
          <p className="velora-col-hero-subtitle">{heroData?.subtitle || COLLECTIONS_HERO_DATA.subtitle}</p>
          <p className="velora-col-hero-desc">{heroData?.description || COLLECTIONS_HERO_DATA.description}</p>
          <button
            type="button"
            className="velora-col-hero-btn"
            onClick={() => {
              setCurrentView(heroData?.targetView || COLLECTIONS_HERO_DATA.targetView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>{heroData?.ctaText || COLLECTIONS_HERO_DATA.ctaText}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 3. "All Collections" Editorial Narrative (Exact match to madilane.com/collections/) */}
      <div className="velora-collections-editorial-header">
        <h2 className="velora-collections-heading">All Collections</h2>
        <div className="velora-collections-desc-wrap">
          <p className="velora-collections-lead">
            Our stunning collections of bridal wedding gowns are released seasonally and reflect contemporary couture and global aesthetics.
          </p>
          <p className="velora-collections-body">
            Balancing inclusivity and exclusivity, wedding dresses by <strong>VELORA Bridal</strong> are offered in sizes 2 to 28, with customisable options in fabrication, style, and detachable features.
          </p>
        </div>
      </div>

      {/* 4. Seasonal Collections 4-Column Grid (Exact 8 Capsules) */}
      <section className="velora-seasonal-grid-section" aria-label="Seasonal Bridal Collections">
        <div className="velora-seasonal-grid-4col">
          {(seasonalData || []).map((col) => (
            <article
              key={col.id}
              className="velora-seasonal-card"
              onClick={() => handleCollectionCardClick(col)}
              tabIndex={0}
              role="button"
              aria-label={`Explore ${col.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCollectionCardClick(col);
              }}
            >
              <div className="velora-seasonal-media">
                <img
                  src={col.image}
                  alt={col.name}
                  className="velora-seasonal-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://madilane.com/wp-content/uploads/2026/05/ML26667_Odelle1.jpg';
                  }}
                />
                <div className="velora-seasonal-overlay">
                  <span className="velora-seasonal-hover-tag">VIEW COLLECTION</span>
                </div>
              </div>

              <div className="velora-seasonal-caption">
                <span className="velora-seasonal-season">{col.season}</span>
                <h3 className="velora-seasonal-title">{col.name}</h3>
                <p className="velora-seasonal-desc">{col.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. "Shape & Style" Section with 10 Call-To-Action Tiles (Exact match to Madi Lane) */}
      <section className="velora-shape-style-section" aria-label="Shape and Style Wedding Dresses">
        <div className="velora-shape-style-header">
          <h2 className="velora-shape-style-title">Shape & Style</h2>
          <p className="velora-shape-style-mantra">
            Designed for brides around the globe, our mantra is <em>exclusively inclusive</em> bridal wedding dresses. 
            Sought-after signature fusion construction, a fully inclusive size range, extensive customised options, 
            and our Quick Ship delivery service, means every bride has exactly the wedding dress experience she dreams of.
          </p>
        </div>

        {/* 10 Facet CTA Cards (5 Columns x 2 Rows) */}
        <div className="velora-shape-cards-grid">
          {(shapeStyleData || []).map((card) => (
            <div
              key={card.id}
              className="velora-shape-cta-card"
              onClick={() => handleCtaClick(card)}
              tabIndex={0}
              role="button"
              aria-label={`Browse ${card.title} wedding dresses`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCtaClick(card);
              }}
            >
              {/* Background Image with Dark Vignette Overlay */}
              <div
                className="velora-shape-bg-img"
                style={{ backgroundImage: `url(${card.bgImage})` }}
              />
              <div className="velora-shape-overlay" />

              {/* Centered Content */}
              <div className="velora-shape-content">
                <h3 className="velora-shape-name">{card.title}</h3>
                <span className="velora-shape-btn">
                  <span>VIEW</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VIP Boutique Experience & Appointment Banner */}
      <section className="velora-collections-booking-banner" aria-label="Book an Atelier Fitting">
        <div className="velora-booking-banner-inner">
          <div className="velora-booking-icon-holder">
            <Calendar size={28} />
          </div>
          <div className="velora-booking-text-area">
            <h3 className="velora-booking-title">Experience Our Collections in Person</h3>
            <p className="velora-booking-desc">
              Book a private boutique consultation with an expert bridal stylist to try on your favorite gowns from our newest seasonal collections.
            </p>
          </div>
          <button
            type="button"
            className="velora-booking-btn"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            BOOK AN APPOINTMENT
          </button>
        </div>
      </section>
    </div>
  );
};

export default AllCollectionsPage;
