import React, { Component } from 'react';

/**
 * VELORA Luxury Bridal Boutique
 * Top-Level Application Error Boundary
 * 
 * Intercepts uncaught runtime exceptions across Router, Context, and Pages.
 * - Displays a branded VELORA luxury recovery view with "Reload" and "Go to home" buttons.
 * - Logs the error and component stack exclusively in development (import.meta.env.DEV).
 * - Eliminates white screens permanently.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('[VELORA ErrorBoundary uncaught error]:', error);
      console.error('[VELORA ErrorBoundary component stack]:', errorInfo?.componentStack);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAF8F5',
            color: '#1F1917',
            fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EBE4DA',
              boxShadow: '0 20px 48px rgba(31, 25, 23, 0.08)',
              padding: '48px 36px'
            }}
          >
            {/* Monogram / Icon Circle */}
            <div
              style={{
                width: '54px',
                height: '54px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                backgroundColor: '#F5EBE1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8C6D58'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <span
              style={{
                display: 'block',
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#8C6D58',
                marginBottom: '10px',
                fontWeight: 600
              }}
            >
              VELORA ATELIER
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '28px',
                fontWeight: 500,
                color: '#1F1917',
                margin: '0 0 14px'
              }}
            >
              Something Went Wrong
            </h2>

            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#70645C',
                margin: '0 0 32px'
              }}
            >
              An unexpected pause occurred while preparing your bridal experience.
              Please refresh your session or return to the salon.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#1F1917',
                  color: '#FAF8F5',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Reload
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                style={{
                  padding: '12px 28px',
                  backgroundColor: 'transparent',
                  color: '#1F1917',
                  border: '1px solid #D4C4B0',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Go to home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
