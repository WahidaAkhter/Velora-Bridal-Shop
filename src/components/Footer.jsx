import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';

export const Footer = () => {
  const { setSelectedCategory, setCurrentView, setAccountTab } = useApp();

  const handleCategoryNav = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountNav = (tab) => {
    setCurrentView('account');
    setAccountTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper glass-panel">
      <div className="container footer-container">
        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-col brand-col">
            <div className="brand-logo" onClick={() => setCurrentView('catalog')}>
              <span className="logo-icon">▲</span>
              <span className="brand-name">AURA</span>
            </div>
            <p className="brand-tagline">
              Modern luxury e-commerce storefront engineered for high-speed browsing, rich product discovery, transparent sustainability, and seamless checkout.
            </p>
            <div className="social-links-row">
              <span className="social-chip">Twitter / X</span>
              <span className="social-chip">Instagram</span>
              <span className="social-chip">GitHub</span>
              <span className="social-chip">Pinterest</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop Collections</h4>
            <ul>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button onClick={() => handleCategoryNav(cat.id)}>
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul>
              <li><button onClick={() => handleAccountNav('overview')}>My Account</button></li>
              <li><button onClick={() => handleAccountNav('orders')}>Order Tracking & Returns</button></li>
              <li><button onClick={() => handleAccountNav('vouchers')}>Vouchers & Gift Cards</button></li>
              <li><button onClick={() => handleAccountNav('wishlist')}>Saved Wishlist</button></li>
              <li><span>Worldwide Shipping Info</span></li>
              <li><span>30-Day Hassle-Free Policy</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Architecture & Trust</h4>
            <div className="tech-stack-badges">
              <span className="tech-badge">Vite React SPA</span>
              <span className="tech-badge">256-Bit SSL Encrypted</span>
              <span className="tech-badge">Multi-Currency Ready</span>
              <span className="tech-badge">GOTS Organic Certified</span>
              <span className="tech-badge">Tuscan Leather Sourcing</span>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Bottom Rights Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 AURA Storefront Platform. All rights reserved.</p>
          <div className="payment-badges-row">
            <span className="pay-card">VISA</span>
            <span className="pay-card">MC</span>
            <span className="pay-card">AMEX</span>
            <span className="pay-card">PAYPAL</span>
            <span className="pay-card">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
