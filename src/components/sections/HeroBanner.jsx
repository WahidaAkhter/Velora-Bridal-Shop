import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar } from 'lucide-react';

export const HeroBanner = () => {
  const { setSelectedCategory, setCurrentView, setIsAppointmentModalOpen, setPriceRange, setSearchQuery } = useApp();
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

          if (document.body.classList.contains('megamenu-open')) {
            popoutHeadRef.current.style.visibility = 'hidden';
            popoutHeadRef.current.style.setProperty('--head-opacity', '0');
            ticking = false;
            return;
          }

          popoutHeadRef.current.style.setProperty('--head-opacity', opacity.toFixed(2));
          popoutHeadRef.current.style.setProperty('--head-blur', `${blur}px`);
          popoutHeadRef.current.style.setProperty('--head-y', `${translateY}px`);
          popoutHeadRef.current.style.visibility = progress >= 1 ? 'hidden' : 'visible';

          ticking = false;
        });
        ticking = true;
      }
    };

    const checkMegaMenu = () => {
      if (!popoutHeadRef.current) return;
      if (document.body.classList.contains('megamenu-open')) {
        popoutHeadRef.current.style.visibility = 'hidden';
        popoutHeadRef.current.style.setProperty('--head-opacity', '0');
      } else {
        handleScroll();
      }
    };

    const observer = new MutationObserver(checkMegaMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleShopCollection = () => {
    setSelectedCategory('all');
    if (setPriceRange) setPriceRange([0, 10000]);
    if (setSearchQuery) setSearchQuery('');
    setCurrentView('new-dresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookAppointment = () => {
    setIsAppointmentModalOpen(true);
  };

  return (
    <section className="luxe-hero-section" aria-label="Luxe Brides Hero Showcase">
      <div className="luxe-hero-container">
        {/* Left Editorial Content */}
        <div className="luxe-hero-left">
          <h1 className="luxe-hero-heading">
            <span className="hero-serif-line">Timeless Elegance</span>
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
