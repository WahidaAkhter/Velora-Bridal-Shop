import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { ArrowRight, Shield, Globe, Award, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { setSelectedCategory, setCurrentView, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('Subscribed to AURA Insider Newsletter!');
    setNewsletterEmail('');
  };

  return (
    <footer className="footer-wrapper glass-panel">
      <div className="container footer-container">
        {/* Newsletter Box */}
        <div className="footer-newsletter-banner">
          <div className="newsletter-text">
            <h3>Join AURA Insider Club</h3>
            <p>Subscribe to receive private sale invitations, product drops, and exclusive voucher codes.</p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-col brand-col">
            <div className="brand-logo">
              <span className="logo-icon">▲</span>
              <span className="brand-name">A U R A</span>
            </div>
            <p className="brand-tagline">
              Modern luxury e-commerce storefront inspired by Saleor demo. Engineered for high-speed browsing, rich product catalog, and seamless checkout.
            </p>
            <div className="social-links-row">
              <span className="social-chip">Twitter / X</span>
              <span className="social-chip">Instagram</span>
              <span className="social-chip">GitHub</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Catalog Categories</h4>
            <ul>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentView('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul>
              <li><button onClick={() => { setCurrentView('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>My Account</button></li>
              <li><button onClick={() => { setCurrentView('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Order History & Tracking</button></li>
              <li><button onClick={() => { setCurrentView('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Vouchers & Gift Cards</button></li>
              <li><span>Shipping & Delivery Policy</span></li>
              <li><span>Returns & Exchanges</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Saleor Tech Stack</h4>
            <div className="tech-stack-badges">
              <span className="tech-badge">Vite React SPA</span>
              <span className="tech-badge">Vanilla CSS Tokens</span>
              <span className="tech-badge">Saleor Schema Ready</span>
              <span className="tech-badge">Multi-Currency Ready</span>
              <span className="tech-badge">Responsive Grid</span>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Bottom Rights Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 AURA Storefront Demo. Inspired by Saleor.io. All rights reserved.</p>
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
