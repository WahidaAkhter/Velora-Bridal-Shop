import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, Home } from 'lucide-react';
import '../styles/extras.css';

export const NotFoundPage = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="velora-notfound-page animate-fade-in">
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
          <button
            type="button"
            className="velora-notfound-btn primary"
            onClick={() => setCurrentView('catalog')}
          >
            <Home size={16} /> Return to Home
          </button>
          <button
            type="button"
            className="velora-notfound-btn secondary"
            onClick={() => setCurrentView('all-dresses')}
          >
            Explore Gowns <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

