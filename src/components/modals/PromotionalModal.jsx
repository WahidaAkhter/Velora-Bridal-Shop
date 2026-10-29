import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { getActiveCampaign } from '../../data/campaigns';
import { X, Copy, Check, ArrowRight, Tag } from 'lucide-react';

export const PromotionalModal = () => {
  const { applyVoucherCode, showToast, setCurrentView, setSelectedCategory } = useApp();
  const campaign = getActiveCampaign();

  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const dismissModal = useCallback((reason = 'user_action') => {
    if (!campaign) return;
    setIsClosing(true);

    // Save frequency suppression in localStorage
    localStorage.setItem(`aura_promo_dismissed_${campaign.id}`, 'true');

    // Dispatch analytics event
    window.dispatchEvent(
      new CustomEvent('aura:promo_dismiss', { detail: { campaignId: campaign.id, reason } })
    );

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 250); // matches animation exit duration
  }, [campaign]);

  useEffect(() => {
    if (!campaign) return;

    const storageKey = `aura_promo_dismissed_${campaign.id}`;
    if (import.meta.env.DEV) {
      localStorage.removeItem(storageKey);
    } else if (localStorage.getItem(storageKey)) {
      return;
    }

    // 1-2 second delay before appearing to allow homepage render first
    const timer = setTimeout(() => {
      previousFocusRef.current = document.activeElement;
      setIsVisible(true);

      // Dispatch custom analytics event
      window.dispatchEvent(
        new CustomEvent('aura:promo_view', { detail: { campaignId: campaign.id } })
      );
    }, campaign.showDelay || 1500);

    return () => clearTimeout(timer);
  }, [campaign]);

  // Lock body scroll and set up Escape key & Focus trap while modal is open
  useEffect(() => {
    if (!isVisible) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button or modal container
    if (modalRef.current) {
      const focusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dismissModal('escape_key');
      }

      // Trap Tab key navigation inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isVisible, dismissModal]);

  if (!campaign || !isVisible) return null;

  const handleCopyCode = async (e) => {
    e.stopPropagation();
    if (!campaign.code) return;

    try {
      await navigator.clipboard.writeText(campaign.code);
    } catch {
      // Fallback if clipboard API is restricted
      const el = document.createElement('textarea');
      el.value = campaign.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    // Apply promo voucher automatically
    applyVoucherCode(campaign.code);

    setIsCopied(true);
    showToast(`Code "${campaign.code}" copied & 20% discount applied!`);

    window.dispatchEvent(
      new CustomEvent('aura:promo_copy_code', { detail: { campaignId: campaign.id, code: campaign.code } })
    );

    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrimaryCTA = () => {
    // Automatically apply voucher code if present
    if (campaign.code) {
      applyVoucherCode(campaign.code);
    }

    // Analytics event
    window.dispatchEvent(
      new CustomEvent('aura:promo_cta_click', { detail: { campaignId: campaign.id } })
    );

    // Navigate to catalog
    setSelectedCategory('all');
    setCurrentView('catalog');

    dismissModal('cta_click');

    // Smooth scroll to catalog grid
    setTimeout(() => {
      const el = document.getElementById('catalog-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div
      className={`promo-modal-backdrop ${isClosing ? 'is-closing' : 'is-open'}`}
      onClick={() => dismissModal('backdrop_click')}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`promo-modal-card glass-panel ${isClosing ? 'is-closing' : 'is-open'}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-dialog-title"
        aria-describedby="promo-dialog-desc"
      >
        {/* Close Button (44px touch target) */}
        <button
          className="promo-modal-close"
          onClick={() => dismissModal('close_button')}
          aria-label="Close promotion dialog"
        >
          <X size={20} />
        </button>

        {/* Split Desktop Layout / Compact Mobile Layout */}
        <div className="promo-modal-layout">
          {/* Left Visual Column */}
          <div className="promo-modal-visual">
            <img src={campaign.image} alt={campaign.imageAlt || campaign.title} loading="eager" />
            <div className="visual-gradient-overlay"></div>
          </div>

          {/* Right Content Column */}
          <div className="promo-modal-content">
            <h2 id="promo-dialog-title" className="promo-title">
              {campaign.title}
            </h2>

            <p className="promo-subtitle">
              {campaign.subtitle}
            </p>

            <p id="promo-dialog-desc" className="promo-description">
              {campaign.description}
            </p>

            {/* Promo Code Copy Box */}
            {campaign.code && (
              <div className="promo-code-box">
                <div className="code-info">
                  <span className="code-label">PROMO CODE:</span>
                  <span className="code-value">{campaign.code}</span>
                </div>
                <button
                  type="button"
                  className={`btn-copy-code ${isCopied ? 'copied' : ''}`}
                  onClick={handleCopyCode}
                  aria-label={`Copy promo code ${campaign.code}`}
                >
                  {isCopied ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Code
                    </>
                  )}
                </button>
              </div>
            )}

            {/* CTAs */}
            <div className="promo-actions-group">
              <button
                type="button"
                className="btn btn-accent btn-lg promo-primary-btn"
                onClick={handlePrimaryCTA}
              >
                {campaign.ctaText || 'Shop Now'} <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-secondary-link"
                onClick={() => dismissModal('secondary_cta')}
              >
                {campaign.secondaryCtaText || 'Maybe Later'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
