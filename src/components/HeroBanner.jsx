import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, Award } from 'lucide-react';

export const HeroBanner = () => {
  const { setCurrentView, setSelectedCategory, formatPrice, setSelectedProduct } = useApp();
  const featured = PRODUCTS[0];

  return (
    <div className="hero-section">
      <div className="hero-backdrop">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} className="text-gold" />
            <span>SALEOR STOREFRONT ARCHITECTURE</span>
          </div>
          <h1 className="hero-title">
            Engineered for <span className="hero-gradient-text">Pure Elegance</span> & Performance
          </h1>
          <p className="hero-subtitle">
            Experience our next-generation product catalog, dynamic variants, real-time inventory management, multi-currency simulation, and lightning-fast checkout.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('catalog');
                document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Collection <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-outline btn-lg"
              onClick={() => {
                setSelectedCategory('electronics');
                setCurrentView('catalog');
                document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Tech & Accessories
            </button>
          </div>

          {/* Feature Badges Grid */}
          <div className="hero-features-bar">
            <div className="feature-item">
              <Truck size={18} className="text-accent" />
              <div>
                <strong>Express Shipping</strong>
                <span>Global dispatch within 24h</span>
              </div>
            </div>

            <div className="feature-item">
              <ShieldCheck size={18} className="text-accent" />
              <div>
                <strong>Authentic Guarantee</strong>
                <span>100% verified artisan products</span>
              </div>
            </div>

            <div className="feature-item">
              <RefreshCw size={18} className="text-accent" />
              <div>
                <strong>30-Day Returns</strong>
                <span>Hassle-free instant refunds</span>
              </div>
            </div>

            <div className="feature-item">
              <Award size={18} className="text-accent" />
              <div>
                <strong>Saleor Ready</strong>
                <span>GraphQL powered schema</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Showcase Card */}
        <div className="hero-visual">
          <div className="hero-card-frame glass-panel" onClick={() => setSelectedProduct(featured)} style={{ cursor: 'pointer' }}>
            <div className="hero-badge">NEW ARRIVAL</div>
            <img
              src="/images/tote-bag.png"
              alt="Minimalist Artisan Leather Tote"
              className="hero-img"
            />
            <div className="hero-card-meta">
              <div>
                <span className="card-cat">ACCESSORIES</span>
                <h3 className="card-title">Minimalist Artisan Leather Tote</h3>
              </div>
              <div className="card-price">{formatPrice(featured.price)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
