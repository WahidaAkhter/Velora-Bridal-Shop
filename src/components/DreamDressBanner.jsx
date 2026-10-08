import React from 'react';
import { Calendar, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Custom Hanger / Stylist line icon
const HangerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="banner-icon-svg">
    <path d="M12 4a2 2 0 0 1 2 2c0 1-1 1.5-2 2.5L2 15h20L14 8.5" />
    <path d="M2 15v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
  </svg>
);

// Diamond line icon
const DiamondIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="banner-icon-svg">
    <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <polyline points="10 3 12 9 14 3" />
    <line x1="12" y1="9" x2="12" y2="21" />
  </svg>
);

export const DreamDressBanner = () => {
  const { setIsAppointmentModalOpen } = useApp();

  return (
    <section className="luxe-dream-banner-section" id="dream-dress-banner" aria-label="Book Bridal Consultation">
      <div className="dream-banner-card">
        {/* Col 1: Book Appointment */}
        <div className="dream-col">
          <div className="dream-icon-wrap">
            <Calendar size={22} className="banner-icon-svg" />
          </div>
          <h4 className="dream-col-title">BOOK APPOINTMENT</h4>
          <p className="dream-col-subtitle">Schedule your private consultation today.</p>
        </div>

        {/* Col 2: Expert Stylists */}
        <div className="dream-col">
          <div className="dream-icon-wrap">
            <HangerIcon />
          </div>
          <h4 className="dream-col-title">EXPERT STYLISTS</h4>
          <p className="dream-col-subtitle">Our stylists are here to help you shine.</p>
        </div>

        {/* Center Col: Your Dream Dress Awaits You */}
        <div className="dream-center-col">
          <h3 className="dream-center-heading">
            Your Dream Dress<br />
            <span>Awaits You</span>
          </h3>
          <button
            className="dream-cta-button"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            BOOK YOUR APPOINTMENT
          </button>
        </div>

        {/* Col 4: Perfect Fit */}
        <div className="dream-col">
          <div className="dream-icon-wrap">
            <DiamondIcon />
          </div>
          <h4 className="dream-col-title">PERFECT FIT</h4>
          <p className="dream-col-subtitle">Custom alterations for your perfect fit.</p>
        </div>

        {/* Col 5: Visit Our Boutique */}
        <div className="dream-col">
          <div className="dream-icon-wrap">
            <Store size={22} className="banner-icon-svg" />
          </div>
          <h4 className="dream-col-title">VISIT OUR BOUTIQUE</h4>
          <p className="dream-col-subtitle">Experience luxury in our beautiful bridal salon.</p>
        </div>
      </div>
    </section>
  );
};

export default DreamDressBanner;
