import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

export const HeroBanner = () => {
  const { setSelectedCategory, setCurrentView, setIsAppointmentModalOpen } = useApp();

  const handleShopCollection = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('featured-collection-heading');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookAppointment = () => {
    setIsAppointmentModalOpen(true);
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

      {/* Pop-Out Model Cutout - Popping out over the header exactly like the reference image */}
      <div className="hero-popout-wrapper" aria-hidden="true">
        <img
          src="/images/bridal/model-popout.png"
          alt="Bride in designer blush gown popping out over hero header"
          className="hero-popout-model"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
