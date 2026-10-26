import React from 'react';
import { Heart, Gift } from 'lucide-react';

// Custom delicate dress line icon matching the mockup
const DressIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="trust-icon-svg">
    <path d="M9 3l3 2 3-2" />
    <path d="M10 5v2c-2 2-2 4-2 7 0 5 2 7 4 7s4-2 4-7c0-3 0-5-2-7V5" />
    <path d="M8 14h8" />
    <path d="M7 21h10" />
  </svg>
);

// Diamond line icon matching the mockup
const DiamondIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="trust-icon-svg">
    <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <polyline points="10 3 12 9 14 3" />
    <line x1="12" y1="9" x2="12" y2="21" />
  </svg>
);

const TRUST_ITEMS = [
  {
    icon: DressIcon,
    title: 'CURATED COLLECTION',
    subtitle: 'Handpicked designer gowns for every style.'
  },
  {
    icon: DiamondIcon,
    title: 'PREMIUM QUALITY',
    subtitle: 'Finest fabrics and elegant craftsmanship.'
  },
  {
    icon: Heart,
    title: 'PERSONALIZED SERVICE',
    subtitle: 'One-on-one styling with our bridal experts.'
  },
  {
    icon: Gift,
    title: 'SPECIAL BENEFITS',
    subtitle: 'Exclusive offers for our beautiful brides.'
  }
];

export const TrustStrip = () => {
  return (
    <section className="luxe-trust-strip" aria-label="Boutique Guarantees">
      <div className="trust-strip-pill">
        {TRUST_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="trust-item-col">
              <div className="trust-icon-box">
                <Icon size={20} className="trust-icon-svg" />
              </div>
              <div className="trust-text-box">
                <h3 className="trust-item-title">{item.title}</h3>
                <p className="trust-item-subtitle">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustStrip;
