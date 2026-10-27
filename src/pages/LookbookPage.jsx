import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LOOKBOOKS_DATA } from '../data/lookbookData';
import {
  Maximize2,
  Share2,
  Sparkles,
  ArrowRight,
  X,
  Check,
  Calendar
} from 'lucide-react';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import '../styles/luxe-bridal.css';

export const LookbookPage = () => {
  const {
    setCurrentView,
    setIsAppointmentModalOpen,
    showToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [fullscreenLookbook, setFullscreenLookbook] = useState(null);
  const [vipEmail, setVipEmail] = useState('');
  const [vipSuccess, setVipSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter lookbooks
  const filteredLookbooks = LOOKBOOKS_DATA.filter((lb) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'latest') return lb.id === 'legacy' || lb.id === 'solara';
    if (activeFilter === 'romantic') return lb.id === 'memoirs' || lb.id === 'baciami' || lb.id === 'flora';
    if (activeFilter === 'modern') return lb.id === 'dune' || lb.id === 'oasis';
    if (activeFilter === 'royal') return lb.id === 'amore' || lb.id === 'serenade';
    return true;
  });

  const handleShare = (lb) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (showToast) showToast(`Link to ${lb.title} copied to clipboard!`);
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

  return (
    <div className="velora-lookbook-page-root animate-fade-in" id="velora-lookbook-top">
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
          Collections
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">Lookbooks</span>
      </nav>

      {/* Shop Collection Navigation Tabs */}
      <ShopCollectionNav activeTab="lookbook" style={{ margin: '0 auto 28px auto' }} />

      {/* 2. Exact Header Section from madilane.com/collection-lookbook/ */}
      <div className="velora-lookbook-header-section">
        <p className="velora-lookbook-subtitle">EXPLORE OUR</p>
        <h1 className="velora-lookbook-title">Lookbooks</h1>
        <p className="velora-lookbook-desc">
          Browse our interactive bridal flipbooks, seasonal runway editions, and atelier archives. 
          Experience our couture gowns in movement, discover bespoke tailoring details, and find your dream wedding dress.
        </p>

        {/* Category Pill Filters */}
        <div className="velora-lookbook-tabs">
          <button
            type="button"
            className={`velora-lb-tab ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Lookbooks ({LOOKBOOKS_DATA.length})
          </button>
          <button
            type="button"
            className={`velora-lb-tab ${activeFilter === 'latest' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('latest')}
          >
            Newest 2026 Drops
          </button>
          <button
            type="button"
            className={`velora-lb-tab ${activeFilter === 'romantic' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('romantic')}
          >
            Romantic & Lace
          </button>
          <button
            type="button"
            className={`velora-lb-tab ${activeFilter === 'modern' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('modern')}
          >
            Modern Architectural
          </button>
          <button
            type="button"
            className={`velora-lb-tab ${activeFilter === 'royal' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('royal')}
          >
            Royal & Sparkle
          </button>
        </div>
      </div>

      {/* 3. 3-Column Interactive Lookbook Grid (Exact Madi Lane 3x3 layout) */}
      <div className="velora-lookbook-grid-container">
        <div className="velora-lookbook-grid-3col">
          {filteredLookbooks.map((lb) => (
            <article key={lb.id} className="velora-lookbook-card">
              {/* Card Meta Bar */}
              <div className="velora-lb-card-header">
                <div>
                  <span className="velora-lb-season-badge">{lb.season}</span>
                  <h2 className="velora-lb-card-title">{lb.title}</h2>
                </div>
                <button
                  type="button"
                  className="velora-lb-action-icon-btn"
                  onClick={() => setFullscreenLookbook(lb)}
                  title="Expand to Fullscreen"
                  aria-label={`Expand ${lb.title} lookbook`}
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Embedded Interactive Flipsnack Player Iframe */}
              <div className="velora-lb-embed-wrapper">
                <iframe
                  title={`${lb.title} Digital Flipbook`}
                  src={lb.embedUrl}
                  width="100%"
                  height="480"
                  seamless="seamless"
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-read; clipboard-write; encrypted-media; gyroscope;"
                  className="velora-lb-iframe"
                  loading="lazy"
                />
              </div>

              {/* Card Bottom Footer */}
              <div className="velora-lb-card-footer">
                <p className="velora-lb-desc">{lb.description}</p>
                <div className="velora-lb-actions-row">
                  <button
                    type="button"
                    className="velora-lb-explore-btn"
                    onClick={() => {
                      setCurrentView(lb.viewSlug || 'all-dresses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span>EXPLORE GOWNS</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    className="velora-lb-share-btn"
                    onClick={() => handleShare(lb)}
                    title="Share this collection"
                    aria-label={`Share ${lb.title}`}
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 4. Bottom Banner matching Section 6 of madilane.com/collection-lookbook/ */}
      <section className="velora-lookbook-vip-banner" aria-label="VIP Lookbook Access">
        <div className="velora-vip-inner">
          <div className="velora-vip-badge">
            <Sparkles size={14} />
            <span>EXCLUSIVE COUTURE PREVIEW</span>
          </div>

          <h2 className="velora-vip-title">
            New Collection <br />
            <span>Be The First</span>
          </h2>

          <p className="velora-vip-desc">
            GET EARLY ACCESS TO THE LOOKBOOK BEFORE THE GLOBAL RELEASE
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
                aria-label="Email address for VIP lookbook access"
              />
              <button type="submit" className="velora-vip-submit-btn">
                <span>GET ACCESS</span>
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
                <p>We've sent early digital lookbook credentials to {vipEmail}.</p>
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
              <span>Book a Private Atelier Appointment to Try On Lookbook Gowns</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Fullscreen Lookbook Modal */}
      {fullscreenLookbook && (
        <div
          className="velora-fullscreen-lb-overlay animate-fade-in"
          onClick={() => setFullscreenLookbook(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="velora-fullscreen-lb-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="velora-fullscreen-lb-header">
              <div className="velora-fullscreen-title-area">
                <span className="velora-fullscreen-season">{fullscreenLookbook.season}</span>
                <h3 className="velora-fullscreen-title">{fullscreenLookbook.title}</h3>
              </div>
              <button
                type="button"
                className="velora-fullscreen-close-btn"
                onClick={() => setFullscreenLookbook(null)}
                aria-label="Close lookbook modal"
              >
                <X size={22} />
              </button>
            </div>

            <div className="velora-fullscreen-embed-body">
              <iframe
                title={`${fullscreenLookbook.title} Fullscreen Flipbook`}
                src={fullscreenLookbook.embedUrl}
                width="100%"
                height="100%"
                seamless="seamless"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-read; clipboard-write; encrypted-media; gyroscope;"
                className="velora-fullscreen-iframe"
              />
            </div>

            <div className="velora-fullscreen-footer">
              <button
                type="button"
                className="velora-btn-solid-sm"
                onClick={() => {
                  setFullscreenLookbook(null);
                  setCurrentView(fullscreenLookbook.viewSlug || 'all-dresses');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                BROWSE GOWNS FROM THIS LOOKBOOK
              </button>
              <button
                type="button"
                className="velora-btn-outline-sm"
                onClick={() => {
                  setFullscreenLookbook(null);
                  setIsAppointmentModalOpen(true);
                }}
              >
                BOOK ATELIER FITTING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookbookPage;
