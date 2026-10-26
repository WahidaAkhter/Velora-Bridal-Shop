import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ACCESSORIES_PAGE_HEADER,
  ACCESSORIES_COLLECTION_CARDS,
  VELORA_BRANDS_CAROUSEL
} from '../data/accessoriesPageData';
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Calendar,
  X,
  Gem,
  CheckCircle2,
  Heart
} from 'lucide-react';
import '../styles/luxe-bridal.css';

export const AccessoriesPage = () => {
  const {
    setCurrentView,
    setSelectedCategory,
    setSearchQuery,
    setIsAppointmentModalOpen,
    showToast
  } = useApp();

  const [activeModalCard, setActiveModalCard] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCardClick = (card) => {
    // Navigate to all-dresses filtered by this accessory type
    setSelectedCategory('accessories');
    setSearchQuery(card.filterQuery || '');
    setCurrentView('all-dresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickPreview = (e, card) => {
    e.stopPropagation();
    setActiveModalCard(card);
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(fId => fId !== id));
      if (showToast) showToast('Removed from saved accessories');
    } else {
      setFavoriteIds([...favoriteIds, id]);
      if (showToast) showToast('Added to saved accessories ❤️');
    }
  };

  return (
    <div className="velora-accessories-page animate-fade-in" id="velora-accessories-top">
      {/* 1. Breadcrumbs */}
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
            setCurrentView('all-collections');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Collections
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">Wedding Dress Accessories</span>
      </nav>

      {/* 2. Main Page Title & Editorial Header (Exact Allure structure) */}
      <header className="velora-accessories-header">
        <span className="velora-accessories-eyebrow">
          <Sparkles size={14} className="sparkle-icon" />
          <span>VELORA ATELIER TOUCHES</span>
        </span>
        <h1 className="velora-accessories-main-title">{ACCESSORIES_PAGE_HEADER.title}</h1>
        <div className="velora-accessories-rte">
          <p className="velora-accessories-lead">{ACCESSORIES_PAGE_HEADER.lead}</p>
          <p className="velora-accessories-body">{ACCESSORIES_PAGE_HEADER.body}</p>
        </div>
      </header>

      {/* 3. 11 Collection Category Cards (3-Column Desktop Grid) */}
      <section className="velora-accessories-grid-section" aria-label="Wedding Dress Accessories Categories">
        <div className="velora-accessories-grid">
          {ACCESSORIES_COLLECTION_CARDS.map((card) => {
            const isFav = favoriteIds.includes(card.id);
            return (
              <article
                key={card.id}
                className="velora-acc-card group"
                onClick={() => handleCardClick(card)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCardClick(card);
                }}
              >
                {/* Media Container */}
                <div className="velora-acc-media">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="velora-acc-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      if (card.fallbackImage) {
                        e.currentTarget.src = card.fallbackImage;
                      }
                    }}
                  />

                  {/* Top Badges */}
                  <div className="velora-acc-top-strip">
                    <span className="velora-acc-badge">{card.badge}</span>
                    <button
                      type="button"
                      className={`velora-acc-fav-btn ${isFav ? 'is-fav' : ''}`}
                      onClick={(e) => toggleFavorite(e, card.id)}
                      aria-label="Save accessory"
                    >
                      <Heart size={16} fill={isFav ? '#c5a880' : 'none'} color={isFav ? '#c5a880' : '#ffffff'} />
                    </button>
                  </div>

                  {/* Hover Overlay with Quick Preview CTA */}
                  <div className="velora-acc-overlay">
                    <button
                      type="button"
                      className="velora-acc-quick-btn"
                      onClick={(e) => handleQuickPreview(e, card)}
                    >
                      QUICK DETAILS
                    </button>
                    <span className="velora-acc-view-cta">
                      <span>SHOP COLLECTION</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Card Caption Info */}
                <div className="velora-acc-info">
                  <h3 className="velora-acc-title">
                    <span className="velora-acc-link-text">{card.title}</span>
                    <span className="velora-acc-arrow-wrap">
                      <ChevronRight size={18} className="velora-acc-chevron" />
                    </span>
                  </h3>
                  <p className="velora-acc-caption">{card.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Our Brands Carousel (Exact match to Allure Bridals footer brand slider) */}
      <section className="velora-brands-slider-section" aria-label="VELORA Brands & Lines">
        <div className="velora-brands-container">
          <div className="velora-brands-header">
            <h2 className="velora-brands-title">Our Brands</h2>
            <div className="velora-brands-subline">
              Explore the distinct bridal aesthetics across the house of VELORA
            </div>
          </div>

          <div className="velora-brands-grid">
            {VELORA_BRANDS_CAROUSEL.map((brand) => (
              <div
                key={brand.id}
                className="velora-brand-tile"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery(brand.filterTag);
                  setCurrentView(brand.linkView);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${brand.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedCategory('all');
                    setSearchQuery(brand.filterTag);
                    setCurrentView(brand.linkView);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <div className="velora-brand-badge-monogram">
                  <span>VELORA</span>
                </div>
                <h3 className="velora-brand-name">{brand.name}</h3>
                <span className="velora-brand-tagline">{brand.tagline}</span>
                <p className="velora-brand-desc">{brand.description}</p>
                <span className="velora-brand-link">
                  <span>EXPLORE LINE</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Boutique Fitting & Appointment Consultation Banner */}
      <section className="velora-accessories-booking-strip" aria-label="Accessory Styling Consultation">
        <div className="velora-acc-booking-inner">
          <div className="velora-acc-booking-icon">
            <Gem size={32} strokeWidth={1.5} />
          </div>
          <div className="velora-acc-booking-content">
            <h3 className="velora-acc-booking-title">Complete Your Bridal Look In Person</h3>
            <p className="velora-acc-booking-desc">
              Bring your gown or gown inspiration to a VELORA flagship boutique. Our bridal stylists will help you pair veils, detachable sleeves, and custom royal trains for the perfect ceremony transition.
            </p>
          </div>
          <div className="velora-acc-booking-actions">
            <button
              type="button"
              className="velora-acc-booking-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              <Calendar size={16} />
              <span>BOOK AN APPOINTMENT</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Quick Details Modal */}
      {activeModalCard && (
        <div
          className="velora-acc-modal-overlay"
          onClick={() => setActiveModalCard(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="velora-acc-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="velora-acc-modal-close"
              onClick={() => setActiveModalCard(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="velora-acc-modal-body">
              <div className="velora-acc-modal-image-col">
                <img
                  src={activeModalCard.image}
                  alt={activeModalCard.title}
                  className="velora-acc-modal-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    if (activeModalCard.fallbackImage) {
                      e.currentTarget.src = activeModalCard.fallbackImage;
                    }
                  }}
                />
              </div>

              <div className="velora-acc-modal-content-col">
                <span className="velora-acc-modal-badge">{activeModalCard.badge}</span>
                <h3 className="velora-acc-modal-title">{activeModalCard.title}</h3>
                <p className="velora-acc-modal-desc">{activeModalCard.caption}</p>

                <div className="velora-acc-modal-highlights">
                  <div className="velora-acc-highlight-row">
                    <CheckCircle2 size={16} className="highlight-icon" />
                    <span>Designed to coordinate seamlessly with VELORA bridal gowns</span>
                  </div>
                  <div className="velora-acc-highlight-row">
                    <CheckCircle2 size={16} className="highlight-icon" />
                    <span>Customizable in Ivory, Off-White, Champagne & Custom lengths</span>
                  </div>
                  <div className="velora-acc-highlight-row">
                    <CheckCircle2 size={16} className="highlight-icon" />
                    <span>Hand-finished in our artisan bridal atelier</span>
                  </div>
                </div>

                <div className="velora-acc-modal-actions">
                  <button
                    type="button"
                    className="velora-acc-modal-shop-btn"
                    onClick={() => {
                      const card = activeModalCard;
                      setActiveModalCard(null);
                      handleCardClick(card);
                    }}
                  >
                    <span>BROWSE {activeModalCard.title.toUpperCase()}</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    className="velora-acc-modal-book-btn"
                    onClick={() => {
                      setActiveModalCard(null);
                      setIsAppointmentModalOpen(true);
                    }}
                  >
                    <Calendar size={16} />
                    <span>BOOK ATELIER FITTING</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoriesPage;
