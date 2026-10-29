import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MONIQUE_LOOKBOOK_SPRING_2025 } from '../data/moniqueSpring2025Data';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Calendar,
  ArrowRight,
  Share2,
  Check
} from 'lucide-react';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import '../styles/monique-lookbook.css';
import '../styles/luxe-bridal.css';

export const LookbookPage = () => {
  const {
    setCurrentView,
    setIsAppointmentModalOpen,
    showToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalLook, setActiveModalLook] = useState(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [vipEmail, setVipEmail] = useState('');
  const [vipSuccess, setVipSuccess] = useState(false);

  // All looks with images only (for modal navigation and filmstrip)
  const imageLooks = MONIQUE_LOOKBOOK_SPRING_2025.filter((item) => item.type === 'image');
  const totalImageLooks = imageLooks.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalLook) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalLook(null);
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextLook();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevLook();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalLook]);

  // Modal navigation handlers
  const goToNextLook = () => {
    if (!activeModalLook) return;
    const currentIndex = imageLooks.findIndex((l) => l.id === activeModalLook.id);
    if (currentIndex < totalImageLooks - 1) {
      setActiveModalLook(imageLooks[currentIndex + 1]);
    } else {
      setActiveModalLook(imageLooks[0]); // Loop back to start
    }
  };

  const goToPrevLook = () => {
    if (!activeModalLook) return;
    const currentIndex = imageLooks.findIndex((l) => l.id === activeModalLook.id);
    if (currentIndex > 0) {
      setActiveModalLook(imageLooks[currentIndex - 1]);
    } else {
      setActiveModalLook(imageLooks[totalImageLooks - 1]); // Loop to end
    }
  };

  // Filter items
  const filteredItems = MONIQUE_LOOKBOOK_SPRING_2025.filter((item) => {
    if (item.type === 'text') return activeFilter === 'all';
    if (activeFilter === 'all') return true;
    if (activeFilter === 'platinum') return item.collectionTag?.includes('Platinum');
    if (activeFilter === 'signature') return item.collectionTag?.includes('Signature');
    if (activeFilter === 'ballgown') {
      return (
        item.description?.toLowerCase().includes('ball gown') ||
        item.description?.toLowerCase().includes('ballgown') ||
        item.title?.toLowerCase().includes('wonderland')
      );
    }
    if (activeFilter === 'trumpet') {
      return (
        item.description?.toLowerCase().includes('trumpet') ||
        item.description?.toLowerCase().includes('column') ||
        item.description?.toLowerCase().includes('jumpsuit')
      );
    }
    return true;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (showToast) showToast('Link to Bridal Spring 2025 Lookbook copied to clipboard!');
    }
  };

  const handleVipSubmit = (e) => {
    e.preventDefault();
    if (!vipEmail || !vipEmail.includes('@')) {
      if (showToast) showToast('Please enter a valid email address.');
      return;
    }
    setVipSuccess(true);
    if (showToast) showToast("You're on the VIP list! Exclusive early lookbook access sent.");
  };

  const currentModalIndex = activeModalLook
    ? imageLooks.findIndex((l) => l.id === activeModalLook.id) + 1
    : 1;

  return (
    <div className="monique-lookbook-root animate-fade-in" id="monique-lookbook-top">
      {/* 1. Breadcrumbs Navigation */}
      <nav className="velora-breadcrumb" aria-label="Breadcrumb" style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 24px' }}>
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
          Collections
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">Lookbook | Bridal: Spring 2025</span>
      </nav>

      {/* Universal Collection Navigation Tabs */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <ShopCollectionNav activeTab="lookbook" style={{ margin: '0 auto 20px auto' }} />
      </div>

      {/* ====================================================================
         2. HERO SECTION - Exact Match to User's Attached Screenshot
         Image with Text Overlay: "BRIDAL" & "Spring 2025" in Italic Serif
         ==================================================================== */}
      <section className="ml-hero-section" aria-label="Bridal Spring 2025 Collection Hero">
        <picture className="ml-hero-picture">
          <img
            src="https://moniquelhuillier.com/cdn/shop/files/LB-Header-Image_MoniqueLhuillierSpring2025Look22_Nolita.jpg?v=1712093817&width=4000"
            alt="Spring 2025 Bridal Gown Nolita on Tuscan Balcony"
            className="ml-hero-img"
          />
        </picture>
        <div className="ml-hero-scrim" />
        <div className="ml-hero-content-wrap">
          <div className="ml-hero-text-box">
            <p className="ml-hero-eyebrow">BRIDAL</p>
            <h1 className="ml-hero-title">Spring 2025</h1>
          </div>
        </div>
      </section>

      {/* ====================================================================
         3. EDITORIAL NARRATIVE STORY SECTION - Exact Match to Reference Webpage
         ==================================================================== */}
      <section className="ml-story-section" aria-label="Editorial Narrative">
        <div className="ml-story-container">
          <p className="ml-story-p">
            Nestled in the hills of Tuscany, amidst colorful frescos, Spring 2025 embarks on a surrealistic journey of beauty, abundance and enchantment. In a 14th-century villa, where secrets wander down the rabbit hole of time, our spirited heroine enters a world of fantasy, embracing the essence of “Il Dolce Far Niente.”
          </p>
          <p className="ml-story-p">
            The collection has Victorian influences, rich in floral laces, sculptural taffetas, diverse hemlines, larger-than-life embroidery and dimension. The print of the season features a wild bouquet of apple blossoms, spray roses and poppies, cascading over pique gazar and tulle, standing tall in one of the grand salons.
          </p>
        </div>
      </section>

      {/* ====================================================================
         4. RUNWAY CAMPAIGN VIDEO TEASER SECTION
         ==================================================================== */}
      <section className="ml-video-section" aria-label="Spring 2025 Campaign Film">
        <div className="ml-video-frame">
          {isPlayingVideo ? (
            <video
              className="ml-video-player"
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster="https://moniquelhuillier.com/cdn/shop/files/preview_images/e90984a4353148d89dc1f4e2010643bd.thumbnail.0000000000.jpg?v=1712096548&width=1920"
            >
              <source
                src="https://moniquelhuillier.com/cdn/shop/videos/c/vp/e90984a4353148d89dc1f4e2010643bd/e90984a4353148d89dc1f4e2010643bd.HD-1080p-7.2Mbps-26671042.mp4?v=0"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <img
                src="https://moniquelhuillier.com/cdn/shop/files/preview_images/e90984a4353148d89dc1f4e2010643bd.thumbnail.0000000000.jpg?v=1712096548&width=1920"
                alt="Spring 2025 Bridal Campaign Film Preview"
                className="ml-video-poster-img"
              />
              <div
                className="ml-video-overlay"
                onClick={() => setIsPlayingVideo(true)}
              >
                <button
                  type="button"
                  className="ml-video-play-btn"
                  aria-label="Play Campaign Film"
                  onClick={() => setIsPlayingVideo(true)}
                >
                  <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
                </button>
                <span className="ml-video-caption">THE SPRING 2025 BRIDAL FILM • PLAY RUNWAY CAMPAIGN</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ====================================================================
         5. LOOKBOOK CATEGORY FILTER BAR
         ==================================================================== */}
      <div className="ml-filter-bar">
        <div className="ml-filter-tabs">
          <button
            type="button"
            className={`ml-filter-tab ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Looks ({totalImageLooks})
          </button>
          <button
            type="button"
            className={`ml-filter-tab ${activeFilter === 'platinum' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('platinum')}
          >
            Platinum Collection
          </button>
          <button
            type="button"
            className={`ml-filter-tab ${activeFilter === 'signature' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('signature')}
          >
            Signature Collection
          </button>
          <button
            type="button"
            className={`ml-filter-tab ${activeFilter === 'ballgown' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('ballgown')}
          >
            Ball Gowns & Basque
          </button>
          <button
            type="button"
            className={`ml-filter-tab ${activeFilter === 'trumpet' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('trumpet')}
          >
            Trumpet & Jumpsuits
          </button>
        </div>

        <div className="ml-filter-count">
          <span>Click any gown to view couture specifications & zoom</span>
        </div>
      </div>

      {/* ====================================================================
         6. LOOKBOOK 4-COLUMN RESPONSIVE GRID (lookbook__grid)
         ==================================================================== */}
      <section className="ml-grid-container" aria-label="Spring 2025 Lookbook Grid">
        <ul className="ml-lookbook-grid" role="list">
          {filteredItems.map((item) => {
            if (item.type === 'text') {
              return (
                <li key={item.id} className="ml-grid-text-card">
                  <div className="ml-grid-text-inner">
                    <p className="ml-grid-narrative-p">"{item.text}"</p>
                  </div>
                </li>
              );
            }

            return (
              <li
                key={item.id}
                className="ml-grid-item"
                onClick={() => setActiveModalLook(item)}
              >
                <div className="ml-item-media">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="ml-item-img"
                  />
                  <div className="ml-item-overlay">
                    <span className="ml-item-tag">{item.collectionTag || 'Spring 2025'}</span>
                    <h3 className="ml-item-title">
                      {item.lookNumber ? `Look ${item.lookNumber} — ` : ''}{item.title}
                    </h3>
                  </div>
                  <div className="ml-item-zoom-icon">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ====================================================================
         7. MONIQUE LHUILLIER LIGHTBOX MODAL (lookbook-modal)
         ==================================================================== */}
      {activeModalLook && (
        <div
          className="ml-modal-backdrop animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeModalLook.title} Details`}
        >
          {/* Top Left Counter */}
          <p className="ml-modal-counter">
            LOOK <strong>{currentModalIndex}</strong> / {totalImageLooks}
          </p>

          <div className="ml-modal-dialog">
            {/* Left Media Area */}
            <div className="ml-modal-media-wrap">
              {/* Previous Arrow */}
              <button
                type="button"
                className="ml-modal-nav-arrow prev"
                onClick={goToPrevLook}
                aria-label="Previous Gown Look"
                title="Previous Look (Left Arrow)"
              >
                <ChevronLeft size={24} />
              </button>

              <img
                src={activeModalLook.image}
                alt={activeModalLook.title}
                className="ml-modal-main-img animate-fade-in"
                key={activeModalLook.id}
              />

              {/* Next Arrow */}
              <button
                type="button"
                className="ml-modal-nav-arrow next"
                onClick={goToNextLook}
                aria-label="Next Gown Look"
                title="Next Look (Right Arrow)"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Right Details Sidebar */}
            <div className="ml-modal-details-col">
              <button
                type="button"
                className="ml-modal-close-btn"
                onClick={() => setActiveModalLook(null)}
                aria-label="Close Lookbook Dialog"
                title="Close (Esc)"
              >
                <X size={26} />
              </button>

              <div>
                <div className="ml-modal-header">
                  <span className="ml-modal-collection-tag">
                    {activeModalLook.collectionTag || 'SPRING 2025 BRIDAL'}
                  </span>
                  <h3 className="ml-modal-season">Spring 2025</h3>
                  <h2 className="ml-modal-gown-title">{activeModalLook.title}</h2>
                </div>

                <div className="ml-modal-desc-box">
                  <p>{activeModalLook.description || 'Handcrafted couture gown designed with meticulous attention to tailoring, silhouette, and heirloom textiles.'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ml-modal-actions">
                <button
                  type="button"
                  className="ml-modal-btn-primary"
                  onClick={() => {
                    setActiveModalLook(null);
                    setIsAppointmentModalOpen(true);
                  }}
                >
                  <Calendar size={15} />
                  <span>BOOK PRIVATE ATELIER APPOINTMENT</span>
                </button>

                <button
                  type="button"
                  className="ml-modal-btn-secondary"
                  onClick={() => {
                    setActiveModalLook(null);
                    setCurrentView('all-dresses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>BROWSE SIMILAR SILHOUETTES</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  className="ml-modal-btn-secondary"
                  onClick={handleShare}
                >
                  <Share2 size={14} />
                  <span>SHARE THIS LOOK</span>
                </button>
              </div>
            </div>

            {/* Bottom Filmstrip Thumbnails */}
            <div className="ml-modal-filmstrip">
              <ul className="ml-filmstrip-list">
                {imageLooks.map((look, idx) => (
                  <li key={look.id}>
                    <button
                      type="button"
                      className={`ml-filmstrip-thumb ${look.id === activeModalLook.id ? 'is-active' : ''}`}
                      onClick={() => setActiveModalLook(look)}
                      title={`Look ${idx + 1}: ${look.title}`}
                      aria-label={`Jump to Look ${idx + 1}`}
                    >
                      <img
                        src={look.image}
                        alt={look.title}
                        className="ml-filmstrip-thumb-img"
                        loading="lazy"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
         8. VIP EARLY ACCESS & CONSULTATION FOOTER
         ==================================================================== */}
      <section className="velora-lookbook-vip-banner" aria-label="VIP Lookbook Access">
        <div className="velora-vip-inner">
          <div className="velora-vip-badge">
            <span>HAUTE COUTURE ATELIER</span>
          </div>

          <h2 className="velora-vip-title">
            Spring 2025 Bridal <br />
            <span>Private Appointments</span>
          </h2>

          <p className="velora-vip-desc">
            EXPERIENCE THE SPRING 2025 COLLECTION IN OUR FLAGSHIP ATELIERS WORLDWIDE
          </p>

          {!vipSuccess ? (
            <form onSubmit={handleVipSubmit} className="velora-vip-form">
              <input
                type="email"
                placeholder="Enter your bridal email address..."
                value={vipEmail}
                onChange={(e) => setVipEmail(e.target.value)}
                required
                className="velora-vip-input"
                aria-label="Email address for lookbook updates"
              />
              <button type="submit" className="velora-vip-submit-btn">
                <span>REQUEST TRUNK SHOW ACCESS</span>
                <ArrowRight size={15} />
              </button>
            </form>
          ) : (
            <div className="velora-vip-success animate-fade-in">
              <div className="velora-vip-success-icon">
                <Check size={20} />
              </div>
              <div>
                <strong>You're on the exclusive VIP list!</strong>
                <p>We've sent early trunk show invitations to {vipEmail}.</p>
              </div>
            </div>
          )}

          <div className="velora-vip-actions">
            <button
              type="button"
              className="velora-vip-appt-link"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              <Calendar size={15} />
              <span>Book a Private Atelier Appointment to Try On Spring 2025 Gowns</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LookbookPage;
