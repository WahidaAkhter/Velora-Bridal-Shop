import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    id: 1,
    text: "Complimentary Worldwide Shipping on orders over $100",
    badge: "FREE SHIPPING",
    code: null,
    linkText: "Learn More"
  },
  {
    id: 2,
    text: "20% OFF selected luxury essentials — Use code SALEOR20 at checkout",
    badge: "LIMITED PROMO",
    code: "SALEOR20",
    linkText: "Shop Sale"
  },
  {
    id: 3,
    text: "30-Day Hassle-Free Returns & 24/7 Global Express Dispatch",
    badge: "GUARANTEE",
    code: null,
    linkText: "Our Policy"
  },
  {
    id: 4,
    text: "New Autumn/Winter minimalist arrivals just landed in store",
    badge: "NEW ARRIVALS",
    code: null,
    linkText: "Explore Now"
  }
];

export const AnnouncementBar = () => {
  const { setCurrentView, setSelectedCategory } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const current = ANNOUNCEMENTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleActionClick = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside
      className="announcement-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Announcement ticker"
    >
      <div className="container announcement-container">
        <button
          className="announcement-arrow prev"
          onClick={handlePrev}
          aria-label="Previous announcement"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="announcement-content" aria-live="polite">
          <span className="announcement-badge">
            <Sparkles size={12} />
            {current.badge}
          </span>
          <span className="announcement-text">
            {current.text.includes(current.code) ? (
              <>
                {current.text.split(current.code)[0]}
                <strong className="code-highlight">{current.code}</strong>
                {current.text.split(current.code)[1]}
              </>
            ) : (
              current.text
            )}
          </span>
          <button
            onClick={handleActionClick}
            className="announcement-link"
          >
            {current.linkText} <ChevronRight size={12} />
          </button>
        </div>

        <div className="announcement-controls">
          <button
            className="announcement-pause-btn"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume announcements" : "Pause announcements"}
            aria-label={isPaused ? "Resume announcements" : "Pause announcements"}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>

          <button
            className="announcement-arrow next"
            onClick={handleNext}
            aria-label="Next announcement"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
