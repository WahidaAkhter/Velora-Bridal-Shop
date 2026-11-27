import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Shared top navigation bar for dedicated pages:
 * Provides a real "Previous" back button (history back with safe parent fallback)
 * alongside clickable Link path breadcrumbs.
 */
export const PageBackBar = ({
  fallbackPath = '/',
  trail = [],
  className = '',
  style
}) => {
  const { goBack } = useApp();

  return (
    <div className={`velora-page-backbar ${className}`} style={style}>
      <button
        type="button"
        className="velora-prev-btn"
        onClick={() => goBack(fallbackPath)}
        aria-label="Go to previous page"
      >
        <ArrowLeft size={14} />
        <span>Previous</span>
      </button>

      {trail.length > 0 && (
        <nav className="velora-breadcrumb velora-backbar-trail" aria-label="Breadcrumb">
          {trail.map((item, idx) => {
            const isLast = idx === trail.length - 1;
            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                {idx > 0 && <span className="velora-breadcrumb-sep">/</span>}
                {!isLast && item.to ? (
                  <Link to={item.to} className="velora-breadcrumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="velora-breadcrumb-current">{item.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default PageBackBar;
