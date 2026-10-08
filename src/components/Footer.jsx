import React from 'react';

// Crisp SVG social icons matching the mockup
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const PinterestIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.379-.057.24-.19.29-.438.175-1.636-.761-2.658-3.154-2.658-5.078 0-4.137 3.007-7.939 8.675-7.939 4.555 0 8.096 3.245 8.096 7.581 0 4.526-2.854 8.169-6.816 8.169-1.332 0-2.585-.692-3.013-1.509l-.821 3.131c-.297 1.144-1.101 2.578-1.64 3.447 1.205.372 2.487.575 3.818.575 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.045.87.134V9.42a6.34 6.34 0 0 0-.87-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.27 8.27 0 0 0 4.77 1.5V7.1a4.83 4.83 0 0 1-1-.41z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="luxe-footer" id="footer-testimonials" aria-label="Boutique Footer">
      <div className="luxe-footer-container">
        {/* Left: Customer Reviews & Avatars */}
        <div className="footer-reviews-col">
          <img
            src="/images/bridal/avatars.png"
            alt="Happy Brides"
            className="footer-avatars-img"
            width="90"
            height="28"
          />
          <div className="footer-review-text">
            <span className="happy-brides-title">10,000+ HAPPY BRIDES</span>
            <div className="rating-stars-row">
              <span className="stars-gold">★★★★★</span>
              <span className="rating-score">4.9 (2,500+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* Center: Quote */}
        <div className="footer-quote-col">
          <blockquote className="footer-quote-text">
            "The best bridal experience ever!<br />
            They made my dream come true."
          </blockquote>
          <cite className="footer-quote-author">— Sarah J.</cite>
        </div>

        {/* Right: Follow Us & Social Icons */}
        <div className="footer-social-col">
          <span className="follow-us-title">FOLLOW US @LUXEBRIDES</span>
          <div className="social-links-row">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Pinterest">
              <PinterestIcon />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="TikTok">
              <TikTokIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
