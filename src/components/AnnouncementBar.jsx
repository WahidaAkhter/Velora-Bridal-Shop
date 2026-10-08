import React from 'react';
import { MapPin, Sparkles, Phone } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <aside className="top-utility-bar" aria-label="Store contact and promotion bar">
      <div className="container top-utility-container">
        <div className="utility-left">
          <MapPin size={13} className="text-rose" />
          <span>Visit Our Boutique: 123 Bridal Lane, New York, NY 10001</span>
        </div>

        <div className="utility-center">
          <Sparkles size={13} className="text-rose" />
          <span>Free Shipping on Orders Over $150</span>
        </div>

        <div className="utility-right">
          <Phone size={13} className="text-rose" />
          <span>(123) 456-7890</span>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
