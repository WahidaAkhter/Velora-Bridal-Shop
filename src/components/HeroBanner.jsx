import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Sparkles, Gem, Heart, Gift } from 'lucide-react';

export const HeroBanner = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleShopCollection = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookAppointment = () => {
    const el = document.getElementById('newsletter-heading') || document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="boutique-hero-section" aria-label="Boutique Hero Section">
      <div className="container boutique-hero-container">
        {/* Left Column Text Content */}
        <div className="boutique-hero-content">
          <span className="hero-eyebrow-text">FIND THE DRESS OF YOUR DREAMS</span>
          <h1 className="boutique-hero-title">
            Timeless Elegance, <br />
            <span className="hero-serif-italic">Made For Your Moment</span>
          </h1>
          <p className="boutique-hero-subtitle">
            Discover our exclusive collection of designer wedding dresses and luxury essentials crafted to make your special day unforgettable.
          </p>
          <div className="boutique-hero-ctas">
            <button onClick={handleShopCollection} className="btn btn-rose-solid btn-lg">
              SHOP COLLECTION
            </button>
            <button onClick={handleBookAppointment} className="btn btn-rose-outline btn-lg">
              <Calendar size={16} /> BOOK APPOINTMENT
            </button>
          </div>
        </div>

        {/* Right Column Archway Bride Visual */}
        <div className="boutique-hero-visual">
          <div className="archway-image-wrapper">
            <img
              src="/images/hero-bride.png"
              alt="Timeless Elegance Bridal Collection"
              className="archway-bride-img"
            />
          </div>
        </div>
      </div>

      {/* Floating 4-Feature Benefits Bar */}
      <div className="container boutique-features-wrapper">
        <div className="boutique-features-grid glass-panel">
          <div className="feature-item">
            <div className="feature-icon-circle">
              <Sparkles size={20} className="text-rose" />
            </div>
            <div>
              <h4 className="feature-title">CURATED COLLECTION</h4>
              <p className="feature-desc">Handpicked designer gowns for every style.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-circle">
              <Gem size={20} className="text-rose" />
            </div>
            <div>
              <h4 className="feature-title">PREMIUM QUALITY</h4>
              <p className="feature-desc">Finest fabrics and elegant craftsmanship.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-circle">
              <Heart size={20} className="text-rose" />
            </div>
            <div>
              <h4 className="feature-title">PERSONALIZED SERVICE</h4>
              <p className="feature-desc">One-on-one styling with our bridal experts.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-circle">
              <Gift size={20} className="text-rose" />
            </div>
            <div>
              <h4 className="feature-title">SPECIAL BENEFITS</h4>
              <p className="feature-desc">Exclusive offers for our beautiful brides.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
