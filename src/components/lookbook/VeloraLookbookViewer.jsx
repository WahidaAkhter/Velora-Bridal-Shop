import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Maximize2,
  ArrowRight,
  Calendar,
  Layers,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VeloraLookbookViewer = ({
  lookbook,
  onOpenFullscreen,
  isFullscreen = false
}) => {
  const { setCurrentView, setIsAppointmentModalOpen } = useApp();
  
  // View mode: 'flip' (3D Book Page-Turn) | 'scroll' (Continuous Magazine Scroll)
  const [viewMode, setViewMode] = useState('flip');
  
  // Spread index (0 = Cover, 1 = Spread 1 [pages 1 & 2], 2 = Spread 2 [pages 3 & 4], etc.)
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'
  const [isLoading, setIsLoading] = useState(true);

  const scrollContainerRef = useRef(null);

  // Standardize pages into magazine spreads
  const pages = lookbook.pages || [];
  
  // Total pages including cover
  const totalPages = pages.length;

  // We organize pages into spreads:
  // Spread 0: Cover (single front cover)
  // Spread 1: Left: Page 1, Right: Page 2
  // Spread 2: Left: Page 3, Right: Page 4
  // Spread N: Last spread
  const spreads = [];
  // Spread 0 is always the Cover
  spreads.push({
    isCover: true,
    page: pages[0] || {
      title: lookbook.title.replace(' COLLECTION', ''),
      subtitle: `${lookbook.season} • Product Book`,
      image: lookbook.coverImage
    }
  });

  // Inner spreads (2 pages per spread)
  for (let i = 1; i < pages.length; i += 2) {
    spreads.push({
      isCover: false,
      leftPage: pages[i],
      rightPage: pages[i + 1] || null
    });
  }

  const totalSpreads = spreads.length;
  const activeSpread = spreads[currentSpreadIndex] || spreads[0];

  // Preloader simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [lookbook.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        flipToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        flipToPrev();
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen, currentSpreadIndex, totalSpreads]);

  const flipToNext = () => {
    if (isFlipping || currentSpreadIndex >= totalSpreads - 1) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpreadIndex((prev) => Math.min(prev + 1, totalSpreads - 1));
      setIsFlipping(false);
    }, 450);
  };

  const flipToPrev = () => {
    if (isFlipping || currentSpreadIndex <= 0) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpreadIndex((prev) => Math.max(prev - 1, 0));
      setIsFlipping(false);
    }, 450);
  };

  const jumpToSpread = (index) => {
    if (isFlipping || index === currentSpreadIndex) return;
    setFlipDirection(index > currentSpreadIndex ? 'next' : 'prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpreadIndex(index);
      setIsFlipping(false);
    }, 350);
  };

  return (
    <div
      className={`velora-book-reader-root ${isFullscreen ? 'is-fullscreen' : ''}`}
      aria-label={`${lookbook.title} Velora Digital Book`}
    >
      {/* 1. VELORA Luxury Preloader */}
      {isLoading && (
        <div className="velora-book-preloader animate-fade-in">
          <div className="velora-book-preloader-inner">
            <span className="velora-book-preloader-brand">VELORA ATELIER</span>
            <div className="velora-book-shimmer-bar" />
            <span className="velora-book-preloader-sub">
              OPENING LOOKBOOK: {lookbook.title}
            </span>
          </div>
        </div>
      )}

      {/* 2. Top Book Status & Mode Switcher Bar */}
      <div className="velora-book-top-bar">
        <div className="velora-book-brand-badge">
          <span>VELORA HAUTE COUTURE</span>
        </div>

        {/* View Mode Toggle: 3D Flip vs Continuous Scroll */}
        <div className="velora-book-mode-toggle">
          <button
            type="button"
            className={`velora-mode-btn ${viewMode === 'flip' ? 'is-active' : ''}`}
            onClick={() => setViewMode('flip')}
            title="3D Book Page Flip Mode"
          >
            <BookOpen size={13} />
            <span>3D BOOK FLIP</span>
          </button>
          <button
            type="button"
            className={`velora-mode-btn ${viewMode === 'scroll' ? 'is-active' : ''}`}
            onClick={() => setViewMode('scroll')}
            title="Continuous Magazine Scroll Mode"
          >
            <Layers size={13} />
            <span>MAGAZINE SCROLL</span>
          </button>
        </div>

        <div className="velora-book-top-actions">
          {currentSpreadIndex > 0 && (
            <button
              type="button"
              className="velora-book-reset-btn"
              onClick={() => jumpToSpread(0)}
              title="Close book and return to Cover"
            >
              <RotateCcw size={12} />
              <span>COVER</span>
            </button>
          )}

          {!isFullscreen && onOpenFullscreen && (
            <button
              type="button"
              className="velora-book-fullscreen-btn"
              onClick={onOpenFullscreen}
              title="Expand to Fullscreen Cinema Mode"
              aria-label="Expand book to fullscreen"
            >
              <Maximize2 size={13} />
              <span>FULLSCREEN</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Book Stage */}
      <div className="velora-book-stage">
        {viewMode === 'flip' ? (
          /* =================================================================
             MODE A: 3D PHYSICAL BOOK PAGE TURN (বইয়ের পাতার মতো উল্টানো)
             ================================================================= */
          <div className="velora-3d-book-container">
            {activeSpread.isCover ? (
              /* -------------------------------------------------------------
                 A1. CLOSED FRONT COVER VIEW
                 Luxury Hardcover bridal lookbook with gold embossed foil
                 ------------------------------------------------------------- */
              <div
                className={`velora-hardcover-book ${isFlipping ? 'flipping-open' : ''}`}
                onClick={flipToNext}
                title="Click anywhere to open the book"
              >
                {/* Book Spine Texture on Left Edge */}
                <div className="velora-hardcover-spine-edge" />

                {/* Cover Main Content */}
                <div
                  className="velora-hardcover-face"
                  style={{ backgroundImage: `url(${activeSpread.page.image})` }}
                >
                  <div className="velora-hardcover-scrim" />

                  {/* Gold Foil Border Frame */}
                  <div className="velora-hardcover-frame">
                    <div className="velora-hardcover-top-kicker">
                      <span>VELORA BRIDAL ATELIER</span>
                    </div>

                    <h2 className="velora-hardcover-title">
                      {activeSpread.page.title || lookbook.title.replace(' COLLECTION', '')}
                    </h2>

                    <div className="velora-hardcover-edition-line">
                      <span>{lookbook.season}</span>
                      <span className="velora-edition-sep">•</span>
                      <span>PRODUCT BOOK</span>
                    </div>

                    {/* Gold Embossed Emblem */}
                    <div className="velora-hardcover-emblem">
                      <div className="velora-emblem-inner">
                        <span className="velora-emblem-v">V</span>
                        <span className="velora-emblem-sub">COUTURE</span>
                      </div>
                    </div>

                    <p className="velora-hardcover-quote">
                      "A celebration of architectural corsetry and enduring romantic silhouettes."
                    </p>

                    {/* Animated Corner Curl calling to flip open */}
                    <div className="velora-corner-curl-hint">
                      <span className="velora-curl-arrow">📖</span>
                      <span>CLICK TO OPEN BOOK</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>

                {/* Stacked Paper Edge at right and bottom */}
                <div className="velora-book-stacked-edges" />
              </div>
            ) : (
              /* -------------------------------------------------------------
                 A2. OPEN DOUBLE-PAGE SPREAD (২ পাতার খোলা বই)
                 Spine crease in center, realistic paper lighting, page curl
                 ------------------------------------------------------------- */
              <div
                className={`velora-open-book-spread ${isFlipping ? `is-flipping-${flipDirection}` : ''}`}
              >
                {/* Book Spine Center Fold (Realistic lighting & shadow crease) */}
                <div className="velora-spread-spine-fold" />

                {/* LEFT PAGE */}
                <div
                  className="velora-book-page left"
                  onClick={flipToPrev}
                  title="Click left page to flip back"
                >
                  <div className="velora-page-paper-texture" />
                  
                  {activeSpread.leftPage && (
                    <div className="velora-page-content-wrapper">
                      {/* Page Header */}
                      <div className="velora-page-header">
                        <span className="velora-page-brand">VELORA ATELIER</span>
                        <span className="velora-page-num">
                          PAGE {activeSpread.leftPage.pageNumber || currentSpreadIndex * 2}
                        </span>
                      </div>

                      {/* Photo Container */}
                      <div
                        className="velora-page-photo-frame"
                        style={{ backgroundImage: `url(${activeSpread.leftPage.image})` }}
                      >
                        <div className="velora-page-photo-scrim" />
                        <div className="velora-page-watermark">
                          <span>VELORA COUTURE</span>
                        </div>
                      </div>

                      {/* Editorial Caption */}
                      <div className="velora-page-caption">
                        <h4 className="velora-caption-gown">
                          {activeSpread.leftPage.gownName || activeSpread.leftPage.title}
                        </h4>
                        <p className="velora-caption-text">
                          {activeSpread.leftPage.description || activeSpread.leftPage.quote}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Left Page Turn Button on hover */}
                  <button
                    type="button"
                    className="velora-page-edge-nav prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      flipToPrev();
                    }}
                    aria-label="Flip back page"
                    title="Flip back (Left Arrow)"
                  >
                    <ChevronLeft size={22} />
                  </button>
                </div>

                {/* RIGHT PAGE */}
                <div
                  className="velora-book-page right"
                  onClick={flipToNext}
                  title="Click right page to flip forward"
                >
                  <div className="velora-page-paper-texture" />

                  {activeSpread.rightPage ? (
                    <div className="velora-page-content-wrapper">
                      {/* Page Header */}
                      <div className="velora-page-header">
                        <span className="velora-page-num">
                          PAGE {activeSpread.rightPage.pageNumber || currentSpreadIndex * 2 + 1}
                        </span>
                        <span className="velora-page-brand">{lookbook.title}</span>
                      </div>

                      {/* Photo Container */}
                      <div
                        className="velora-page-photo-frame"
                        style={{ backgroundImage: `url(${activeSpread.rightPage.image})` }}
                      >
                        <div className="velora-page-photo-scrim" />
                        <div className="velora-page-watermark">
                          <span>VELORA ATELIER</span>
                        </div>
                      </div>

                      {/* Specs / Gown details */}
                      <div className="velora-page-specs-box">
                        <h4 className="velora-caption-gown">
                          {activeSpread.rightPage.gownName || activeSpread.rightPage.title}
                        </h4>

                        {activeSpread.rightPage.silhouette && (
                          <div className="velora-spec-row">
                            <span className="velora-spec-k">Silhouette:</span>
                            <span className="velora-spec-v">{activeSpread.rightPage.silhouette}</span>
                          </div>
                        )}
                        {activeSpread.rightPage.fabric && (
                          <div className="velora-spec-row">
                            <span className="velora-spec-k">Fabric:</span>
                            <span className="velora-spec-v">{activeSpread.rightPage.fabric}</span>
                          </div>
                        )}
                        {activeSpread.rightPage.train && (
                          <div className="velora-spec-row">
                            <span className="velora-spec-k">Train:</span>
                            <span className="velora-spec-v">{activeSpread.rightPage.train}</span>
                          </div>
                        )}

                        <div className="velora-page-action-links">
                          <button
                            type="button"
                            className="velora-page-action-btn primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentView(lookbook.viewSlug || 'all-dresses');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            <span>EXPLORE IN CATALOG</span>
                            <ArrowRight size={13} />
                          </button>

                          <button
                            type="button"
                            className="velora-page-action-btn secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAppointmentModalOpen(true);
                            }}
                          >
                            <Calendar size={13} />
                            <span>BOOK FITTING</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Final Page / Atelier Signature */
                    <div className="velora-page-content-wrapper velora-final-page">
                      <div className="velora-final-crest">
                        <span className="velora-final-crest-v">V</span>
                        <h3 className="velora-final-heading">VELORA ATELIER</h3>
                        <p className="velora-final-sub">
                          HAUTE COUTURE BRIDAL
                        </p>
                      </div>

                      <p className="velora-final-body">
                        Every gown within the {lookbook.title} represents hours of bespoke hand-craftsmanship, sculpted boning, and delicate French lace appliqués.
                      </p>

                      <div className="velora-final-actions">
                        <button
                          type="button"
                          className="velora-page-action-btn primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAppointmentModalOpen(true);
                          }}
                        >
                          <Calendar size={14} />
                          <span>SCHEDULE ATELIER CONSULTATION</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Corner Curl Effect on Right Page */}
                  {currentSpreadIndex < totalSpreads - 1 && (
                    <div
                      className="velora-page-curl-corner"
                      onClick={(e) => {
                        e.stopPropagation();
                        flipToNext();
                      }}
                      title="Turn to next page"
                    >
                      <div className="velora-curl-fold" />
                    </div>
                  )}

                  {/* Right Page Turn Button on hover */}
                  {currentSpreadIndex < totalSpreads - 1 && (
                    <button
                      type="button"
                      className="velora-page-edge-nav next"
                      onClick={(e) => {
                        e.stopPropagation();
                        flipToNext();
                      }}
                      aria-label="Flip forward page"
                      title="Flip forward (Right Arrow)"
                    >
                      <ChevronRight size={22} />
                    </button>
                  )}
                </div>

                {/* Stacked Paper Edges at Bottom */}
                <div className="velora-book-stacked-edges" />
              </div>
            )}
          </div>
        ) : (
          /* =================================================================
             MODE B: CONTINUOUS MAGAZINE SCROLL (বইয়ের পাতার মতো পর পর স্ক্রল)
             ================================================================= */
          <div className="velora-scroll-magazine-flow" ref={scrollContainerRef}>
            {pages.map((p, idx) => (
              <div key={idx} className="velora-scroll-magazine-page">
                <div className="velora-magazine-page-inner">
                  {/* Page Top Header */}
                  <div className="velora-magazine-header">
                    <span className="velora-magazine-brand">VELORA ATELIER</span>
                    <span className="velora-magazine-num">PAGE 0{idx + 1}</span>
                  </div>

                  {/* Image */}
                  <div
                    className="velora-magazine-img"
                    style={{ backgroundImage: `url(${p.image})` }}
                  >
                    <div className="velora-magazine-watermark">
                      <span>VELORA BRIDAL</span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="velora-magazine-footer">
                    <h4 className="velora-magazine-title">
                      {p.gownName || p.title || `LOOK 0${idx + 1}`}
                    </h4>
                    {p.silhouette && (
                      <span className="velora-magazine-tag">{p.silhouette}</span>
                    )}
                    <p className="velora-magazine-desc">
                      {p.description || p.quote || `${lookbook.title} • Handcrafted Haute Couture.`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Bottom Navigation & Spread Thumbnails */}
      <div className="velora-book-footer-bar">
        {/* Navigation arrows */}
        <div className="velora-book-nav-arrows">
          <button
            type="button"
            className="velora-book-step-btn"
            onClick={flipToPrev}
            disabled={currentSpreadIndex === 0}
            aria-label="Previous book spread"
          >
            <ChevronLeft size={16} />
            <span>PREV</span>
          </button>

          <span className="velora-book-spread-counter">
            {currentSpreadIndex === 0 ? (
              <strong>BOOK COVER</strong>
            ) : (
              <span>
                SPREAD <strong>{currentSpreadIndex}</strong> / {totalSpreads - 1}
              </span>
            )}
          </span>

          <button
            type="button"
            className="velora-book-step-btn"
            onClick={flipToNext}
            disabled={currentSpreadIndex >= totalSpreads - 1}
            aria-label="Next book spread"
          >
            <span>NEXT</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Thumbnail Dots Bar */}
        <div className="velora-book-thumb-dots">
          {spreads.map((s, idx) => (
            <button
              key={idx}
              type="button"
              className={`velora-thumb-dot ${idx === currentSpreadIndex ? 'is-active' : ''}`}
              onClick={() => jumpToSpread(idx)}
              aria-label={`Go to spread ${idx === 0 ? 'Cover' : idx}`}
              title={idx === 0 ? 'Cover' : `Spread ${idx}`}
            >
              <span className="velora-dot-indicator" />
            </button>
          ))}
        </div>

        {/* Quick Gown Jump */}
        <div className="velora-book-jump-title">
          <span className="velora-jump-label">
            {currentSpreadIndex === 0 ? 'FRONT COVER' : activeSpread.leftPage?.gownName || 'COUTURE SPREAD'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VeloraLookbookViewer;
