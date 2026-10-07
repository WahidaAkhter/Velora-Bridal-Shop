import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Lock } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: 'Free Worldwide Shipping',
    subtitle: 'Complimentary express delivery on orders over $100'
  },
  {
    icon: ShieldCheck,
    title: 'Authentic Guarantee',
    subtitle: '100% verified materials & artisan craftsmanship'
  },
  {
    icon: RefreshCw,
    title: '30-Day Easy Returns',
    subtitle: 'Hassle-free exchanges and instant refunds'
  },
  {
    icon: Lock,
    title: 'Secure Encrypted Checkout',
    subtitle: 'Protected with 256-bit SSL encryption'
  }
];

export const TrustStrip = () => {
  return (
    <section className="trust-strip-section" aria-label="Store Benefits and Guarantees">
      <div className="container">
        <div className="trust-strip-grid">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="trust-card glass-panel">
                <div className="trust-icon-wrapper">
                  <Icon size={22} className="trust-icon" />
                </div>
                <div className="trust-info">
                  <h3 className="trust-title">{item.title}</h3>
                  <p className="trust-subtitle">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
