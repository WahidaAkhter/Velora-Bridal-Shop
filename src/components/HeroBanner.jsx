import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';

export const HeroBanner = () => {
  const { setCurrentView, setSelectedCategory, formatPrice, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useApp();
  const featured = PRODUCTS[0]; // Minimalist Artisan Leather Tote
  const isWishlisted = wishlist.includes(featured.id);

  const handleShopNewArrivals = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('new-arrivals-heading') || document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCollection = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" aria-label="Hero Section">
      <div className="hero-backdrop">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} className="text-gold" />
            <span>AUTUMN / WINTER 2026 EDITION</span>
          </div>

          <h1 className="hero-title">
            Designed for Everyday Motion. <br />
            <span className="hero-gradient-text">Engineered for Pure Elegance.</span>
          </h1>

          <p className="hero-subtitle">
            Discover our curated collection of handcrafted full-grain Italian leather, GOTS organic apparel, and high-fidelity acoustics — built for timeless performance.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleShopNewArrivals}
            >
              Shop New Arrivals <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-outline btn-lg"
              onClick={handleExploreCollection}
            >
              Explore Collection
            </button>
          </div>

          {/* Micro trust highlights */}
          <div className="hero-trust-highlights">
            <div className="trust-highlight-item">
              <ShieldCheck size={16} className="text-accent" />
              <span>Complimentary Shipping Over $100</span>
            </div>
            <div className="trust-highlight-item">
              <Star size={16} className="text-amber" fill="currentColor" />
              <span>4.9 Star Rating (2,400+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* Hero Showcase Product Card */}
        <div className="hero-visual">
          <div
            className="hero-card-frame glass-panel"
            onClick={() => setSelectedProduct(featured)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedProduct(featured);
              }
            }}
          >
            <div className="hero-badge-container">
              <span className="hero-badge">FEATURED ESSENTIAL</span>
              <button
                className={`hero-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(featured.id);
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="hero-img-wrapper">
              <img
                src="/images/tote-bag.png"
                alt="Minimalist Artisan Leather Tote"
                className="hero-img"
              />
            </div>

            <div className="hero-card-meta">
              <div>
                <div className="card-rating-inline">
                  <Star size={12} fill="currentColor" className="text-amber" />
                  <span>4.9 (38 reviews)</span>
                </div>
                <h3 className="card-title">{featured.name}</h3>
                <span className="card-subtitle-small">Handcrafted in Florence, Italy</span>
              </div>

              <div className="card-price-col">
                <span className="card-price">{formatPrice(featured.price)}</span>
                <button
                  className="btn btn-accent btn-sm hero-quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(featured);
                  }}
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
