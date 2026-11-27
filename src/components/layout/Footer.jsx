import React from 'react';
import { Link } from 'react-router-dom';
import { stylePathFor } from '../../data/routeCatalog';

// High-fidelity social SVG icons matching the reference design
const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.045.87.134V9.42a6.34 6.34 0 0 0-.87-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.27 8.27 0 0 0 4.77 1.5V7.1a4.83 4.83 0 0 1-1-.41z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.379-.057.24-.19.29-.438.175-1.636-.761-2.658-3.154-2.658-5.078 0-4.137 3.007-7.939 8.675-7.939 4.555 0 8.096 3.245 8.096 7.581 0 4.526-2.854 8.169-6.816 8.169-1.332 0-2.585-.692-3.013-1.509l-.821 3.131c-.297 1.144-1.101 2.578-1.64 3.447 1.205.372 2.487.575 3.818.575 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer = () => {
  const shapes = [
    'A-line',
    'Princess',
    'Fit & Flare',
    'Mermaid',
    'Plus Size',
    'Basque Waist',
    'Drop Waist',
    'Corset',
    'Short'
  ];

  const styles = [
    'Lace',
    'Long Sleeve',
    'Off The Shoulder',
    'Statement Back',
    'Satin',
    'Boho',
    'Beach',
    'Simple',
    'Floral'
  ];

  return (
    <footer className="luxe-footer" id="footer-testimonials" aria-label="Bridal Boutique Footer">
      <div className="luxe-footer-inner">
        {/* Top Section: Brand Logo + 4 Category Columns */}
        <div className="footer-main-grid">
          {/* Brand Logo Block */}
          <div className="footer-brand-block">
            <Link to="/" className="footer-brand-logo" aria-label="VELORA Bridal Home" style={{ textDecoration: 'none' }}>
              <div className="footer-logo-wordmark">
                <span className="logo-word-left">VEL</span>
                <span className="logo-crest">
                  <span className="crest-digit">10</span>
                  <span className="crest-sub">YEARS</span>
                </span>
                <span className="logo-word-right">ORA</span>
              </div>
              <span className="footer-logo-tagline">BRIDAL</span>
            </Link>
          </div>

          {/* Column 1: BRAND */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-heading">BRAND</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/our-story" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/real-brides" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Real Brides
                </Link>
              </li>
              <li>
                <Link to="/collections" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Lookbooks
                </Link>
              </li>
              <li>
                <Link to="/our-story#story-contact-section" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SHAPE */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-heading">SHAPE</h4>
            <ul className="footer-nav-list">
              {shapes.map((shape) => (
                <li key={shape}>
                  <Link to={stylePathFor(shape)} className="footer-nav-link" style={{ textDecoration: 'none' }}>
                    {shape}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: STYLES */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-heading">STYLES</h4>
            <ul className="footer-nav-list">
              {styles.map((style) => (
                <li key={style}>
                  <Link to={stylePathFor(style)} className="footer-nav-link" style={{ textDecoration: 'none' }}>
                    {style}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: QUICK LINKS */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-heading">QUICK LINKS</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/size-chart" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Sizing Chart
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Wedding Accessories
                </Link>
              </li>
              <li>
                <Link to="/quick-ship" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Quick Ship Delivery
                </Link>
              </li>
              <li>
                <Link to="/signature-styles" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  Signature Styles
                </Link>
              </li>
              <li>
                <Link to="/our-story#story-qa" className="footer-nav-link" style={{ textDecoration: 'none' }}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="footer-bottom-divider" />

        {/* Centered Social Icons Row */}
        <div className="footer-social-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn"
            aria-label="TikTok"
          >
            <TikTokIcon />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn"
            aria-label="Pinterest"
          >
            <PinterestIcon />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn"
            aria-label="YouTube"
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
