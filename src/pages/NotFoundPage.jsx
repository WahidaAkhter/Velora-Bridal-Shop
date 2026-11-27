import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import { PageBackBar } from '../components/common/PageBackBar';
import '../styles/extras.css';

export const NotFoundPage = () => {
  return (
    <div className="velora-notfound-page animate-fade-in">
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto 12px', padding: '0 20px' }}>
        <PageBackBar fallbackPath="/" trail={[{ label: 'Home', to: '/' }, { label: 'Not Found' }]} />
      </div>
      <div className="velora-notfound-card">
        <div className="velora-notfound-badge">
          <Compass size={28} strokeWidth={1.5} />
        </div>
        <span className="velora-notfound-kicker">Page Not Found &bull; 404</span>
        <h1 className="velora-notfound-title">Lost on the Aisle</h1>
        <p className="velora-notfound-desc">
          The bridal atelier page you are looking for has been moved, renamed, or is currently reserved.
          Allow us to guide you back to our curated collections.
        </p>
        <div className="velora-notfound-actions">
          <Link to="/" className="velora-notfound-btn primary" style={{ textDecoration: 'none' }}>
            <Home size={16} /> Return to Home
          </Link>
          <Link to="/dresses" className="velora-notfound-btn secondary" style={{ textDecoration: 'none' }}>
            Explore Gowns <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

