import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

export const HeroBanner = () => {
  const { setSelectedCategory, setCurrentView, setIsAppointmentModalOpen } = useApp();
  const popoutHeadRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!popoutHeadRef.current) {
            ticking = false;
            return;
          }
          const scrollY = window.scrollY || 0;
          // Smoothly dissolve and blur out the protruding head as the user scrolls (0px to 130px)
          const scrollRange = 130;
          const progress = Math.min(1, Math.max(0, scrollY / scrollRange));

          // Silky smooth easing curve
          const eased = Math.pow(progress, 1.25);
          const opacity = Math.max(0, 1 - eased * 1.05);
          const blur = (eased * 12).toFixed(1);
          const translateY = (eased * 10).toFixed(1);

          popoutHeadRef.current.style.setProperty('--head-opacity', opacity.toFixed(2));
          popoutHeadRef.current.style.setProperty('--head-blur', `${blur}px`);
          popoutHeadRef.current.style.setProperty('--head-y', `${translateY}px`);
          popoutHeadRef.current.style.visibility = progress >= 1 ? 'hidden' : 'visible';

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShopCollection = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('featured-collection-heading');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookAppointment = () => {
    const el = document.getElementById('dream-dress-banner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('dream-first-name');
        if (input) input.focus();
      }, 600);
    } else {
      setIsAppointmentModalOpen(true);
    }
  };

  return (
    <section className="luxe-hero-section" aria-label="Luxe Brides Hero Showcase">
      <div className="luxe-hero-container">
        {/* Left Editorial Content */}
        <div className="luxe-hero-left">
          <span className="luxe-hero-tag">FIND THE DRESS OF YOUR DREAMS</span>

          <h1 className="luxe-hero-heading">
            <span className="hero-serif-line">Timeless Elegance,</span>
            <span className="hero-script-line">Made For Your Moment</span>
          </h1>

          <p className="luxe-hero-desc">
            Discover our exclusive collection of designer wedding dresses crafted to make your special day unforgettable.
          </p>

          <div className="luxe-hero-actions">
            <button
              onClick={handleShopCollection}
              className="luxe-btn-solid"
            >
              SHOP COLLECTION
            </button>
            <button
              onClick={handleBookAppointment}
              className="luxe-btn-outline"
            >
              <Calendar size={14} className="icon-calendar" />
              <span>BOOK APPOINTMENT</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Base Model: Always grounded in hero, passes naturally behind sticky header */}
      <div className="hero-popout-wrapper hero-model-base" aria-hidden="true">
        <img
          src="/images/bridal/model-popout.png"
          alt="Bride in designer blush gown"
          className="hero-popout-model"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* 2. Floating Pop-Out Head: In front of header at top (z-index 110), smoothly blurs & dissolves to back on scroll */}
      <div
        ref={popoutHeadRef}
        className="hero-popout-wrapper hero-popout-head"
        aria-hidden="true"
      >
        <img
          src="/images/bridal/model-popout.png"
          alt=""
          className="hero-popout-model hero-head-model"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
