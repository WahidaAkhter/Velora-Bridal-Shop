import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { realBrideSlugFor } from '../routes/routeMap';
import { REAL_BRIDE_FEATURES, findRealBrideFeature } from '../data/routeCatalog';
import { OUR_STORY_SECTIONS } from '../data/ourStoryData';
import { PageBackBar } from '../components/common/PageBackBar';
import '../styles/luxe-bridal.css';

export const RealBridesPage = () => {
  const location = useLocation();
  const { setIsAppointmentModalOpen } = useApp();

  const slug = realBrideSlugFor(location.pathname);
  const activeFeature = slug ? findRealBrideFeature(slug) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const brideQuotes = OUR_STORY_SECTIONS.filter((s) => s.brideTag);

  if (activeFeature) {
    return (
      <div className="velora-collection-page animate-fade-in" id="velora-real-bride-detail">
        <PageBackBar
          fallbackPath="/real-brides"
          trail={[
            { label: 'Home', to: '/' },
            { label: 'Real Brides', to: '/real-brides' },
            { label: activeFeature.title }
          ]}
        />

        <div className="feature-hero-card">
          <div className="feature-hero-media">
            <img
              src={activeFeature.image}
              alt={activeFeature.title}
              className="feature-hero-img"
            />
            <div className="feature-hero-badge-tag">{activeFeature.category}</div>
          </div>

          <div className="feature-hero-info">
            <div className="feature-badge-row">
              <span className="hero-category-label">{activeFeature.category}</span>
              <span className="hero-pill-badge">
                <MapPin size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {activeFeature.location}
              </span>
            </div>

            <h1 className="feature-hero-name">{activeFeature.title}</h1>
            <p className="feature-hero-tagline">
              <strong>{activeFeature.brideName}</strong> • Wearing <em>{activeFeature.gownName}</em>
            </p>

            <div className="feature-thought-box">
              <h5 className="thought-box-title">
                <Sparkles size={14} /> Celebration Story
              </h5>
              <p className="thought-box-body">&ldquo;{activeFeature.quote}&rdquo;</p>
            </div>

            <div className="stylist-note-box">
              <strong>Featured Craftsmanship:</strong>{' '}
              {activeFeature.highlights.join(' • ')}
            </div>

            <div className="feature-cta-row">
              <button
                type="button"
                className="btn-atelier-primary"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                <Calendar size={15} /> Book Private Bridal Fitting
              </button>
              <Link to="/dresses" className="btn-atelier-secondary" style={{ textDecoration: 'none' }}>
                <span>Browse Featured Gowns</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-real-brides-page">
      <PageBackBar
        fallbackPath="/"
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Real Brides' }
        ]}
      />

      <header className="velora-accessories-header" style={{ paddingTop: '8px' }}>
        <span className="velora-dedicated-eyebrow">VELORA COMMUNITY & TESTIMONIALS</span>
        <h1 className="velora-accessories-main-title">Real VELORA Brides</h1>
        <div className="velora-accessories-rte">
          <p className="velora-accessories-lead">
            From candlelit French châteaux to sunlit Tuscan villas, discover real brides celebrating their unforgettable wedding moments in VELORA gowns.
          </p>
        </div>
      </header>

      <section className="velora-seasonal-grid-section" aria-label="Featured Real Weddings">
        <div className="velora-seasonal-grid-4col">
          {REAL_BRIDE_FEATURES.map((feat) => (
            <Link
              key={feat.slug}
              to={`/real-brides/${feat.slug}`}
              className="velora-seasonal-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="velora-seasonal-media">
                <img
                  src={feat.image}
                  alt={feat.title}
                  className="velora-seasonal-img"
                  loading="lazy"
                />
                <div className="velora-seasonal-overlay">
                  <span className="velora-seasonal-hover-tag">READ STORY</span>
                </div>
              </div>
              <div className="velora-seasonal-caption">
                <span className="velora-seasonal-season">{feat.category}</span>
                <h2 className="velora-seasonal-title">{feat.title}</h2>
                <p className="velora-seasonal-desc">
                  {feat.brideName} — {feat.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '48px' }} aria-label="Bride Testimonials">
        <div className="curated-gowns-header">
          <div>
            <h2 className="curated-section-title">Words From Our Brides</h2>
            <p className="curated-section-subtitle">Authentic notes from celebrations around the world</p>
          </div>
          <span className="gowns-count-badge">2,400+ Reviews</span>
        </div>

        <div className="measurement-steps-grid">
          {brideQuotes.map((section) => (
            <div key={section.id} className="step-card">
              <div className="step-number">{section.brideTag.dress}</div>
              <h4>{section.brideTag.name} — {section.brideTag.location}</h4>
              <p>{section.paragraphs[0]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="velora-collections-booking-banner" style={{ marginTop: '48px' }} aria-label="Book Real Bride Consultation">
        <div className="velora-booking-banner-inner">
          <div className="velora-booking-icon-holder">
            <Calendar size={28} />
          </div>
          <div className="velora-booking-text-area">
            <h3 className="velora-booking-title">Begin Your VELORA Bride Journey</h3>
            <p className="velora-booking-desc">
              Reserve an intimate consultation with our master stylists or explore our newest Spring 2025 runway lookbook.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="velora-booking-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              BOOK APPOINTMENT
            </button>
            <Link to="/lookbook" className="btn-atelier-secondary" style={{ textDecoration: 'none' }}>
              <span>View Lookbook</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealBridesPage;
