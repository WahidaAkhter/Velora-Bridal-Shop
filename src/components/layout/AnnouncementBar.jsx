import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export const AnnouncementBar = () => {

  return (
    <aside className="top-utility-bar" aria-label="Store contact, shipping and actions">
      <div className="top-utility-container">
        {/* Left: Boutique Location */}
        <div className="utility-left">
          <MapPin size={13} className="utility-icon" />
          <span>Visit Our Boutique: 123 Bridal Lane, New York, NY 10001</span>
        </div>


        {/* Right: Phone & Concierge */}
        <div className="utility-right">
          <div className="utility-phone">
            <Phone size={13} className="utility-icon" />
            <span>Concierge: (123) 456-7890</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
