import React, { useState, useEffect } from 'react';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { useApp } from '../../context/AppContext';
import { Calendar, Heart, X, Check, Trash2, Clock } from 'lucide-react';
import { calcOrderBy, formatUtcDate } from '../../utils/orderBy';

export const WeddingCountdown = ({ showButton = false }) => {
  const { weddingDate, setWeddingDate, clear } = useWeddingDate();
  const { showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputDate, setInputDate] = useState('');

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Listen to open modal events from anywhere in the app (e.g. PDP OrderByBadge)
  useEffect(() => {
    const handleOpenExternal = () => {
      setInputDate(weddingDate || '');
      setIsOpen(true);
    };
    window.addEventListener('velora:open_wedding_modal', handleOpenExternal);
    return () => window.removeEventListener('velora:open_wedding_modal', handleOpenExternal);
  }, [weddingDate]);

  const handleOpenModal = () => {
    setInputDate(weddingDate || '');
    setIsOpen(true);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!inputDate) {
      clear();
      showToast('Wedding date cleared', 'info');
      setIsOpen(false);
      return;
    }

    const success = setWeddingDate(inputDate);
    if (success) {
      showToast('Wedding date saved! Atelier timelines updated.');
      setIsOpen(false);
    } else {
      showToast('Please enter a valid calendar date', 'error');
    }
  };

  const handleClear = () => {
    clear();
    setInputDate('');
    showToast('Wedding date cleared', 'info');
    setIsOpen(false);
  };

  // Derive countdown info via calcOrderBy utility
  const orderInfo = weddingDate ? calcOrderBy({ weddingDate }) : null;
  const days = orderInfo ? orderInfo.daysUntilWedding : null;

  // Pill Label
  const renderPillContent = () => {
    if (days === null || days === undefined) {
      return (
        <>
          <Calendar size={13} className="velora-countdown-icon text-accent" />
          <span className="velora-countdown-label">Set your wedding date</span>
        </>
      );
    }

    if (days > 1) {
      return (
        <>
          <Heart size={13} className="velora-countdown-icon text-accent" fill="#BCA07E" />
          <span className="velora-countdown-label">
            <strong>{days}</strong> days to go
          </span>
        </>
      );
    }

    if (days === 1) {
      return (
        <>
          <Heart size={13} className="velora-countdown-icon text-accent" fill="#BCA07E" />
          <span className="velora-countdown-label">
            <strong>Tomorrow</strong> is your wedding!
          </span>
        </>
      );
    }

    if (days === 0) {
      return (
        <>
          <Heart size={13} className="velora-countdown-icon text-accent" fill="#BCA07E" />
          <span className="velora-countdown-label">
            <strong>Today</strong> is your big day! 💍
          </span>
        </>
      );
    }

    return (
      <>
        <Clock size={13} className="velora-countdown-icon text-muted" />
        <span className="velora-countdown-label">Wedding passed</span>
      </>
    );
  };

  return (
    <>
      {/* Optional Pill Button */}
      {showButton && (
        <button
          type="button"
          className={`velora-wedding-countdown-pill ${weddingDate ? 'is-set' : 'is-empty'}`}
          onClick={handleOpenModal}
          title={weddingDate ? `Wedding: ${orderInfo?.formattedWeddingDate} (Click to change)` : 'Set your wedding date to calculate dress order deadlines'}
          aria-label="Set wedding date and view countdown"
        >
          {renderPillContent()}
        </button>
      )}

      {/* Date Picker Modal */}
      {isOpen && (
        <div
          className="velora-date-modal-overlay animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="velora-date-modal-title"
        >
          <div
            className="velora-date-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="velora-date-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close date modal"
            >
              <X size={18} />
            </button>

            <div className="velora-date-modal-header">
              <div className="velora-date-modal-icon-wrap">
                <Calendar size={22} className="text-accent" />
              </div>
              <span className="velora-date-kicker">BRIDAL CELEBRATION TIMELINE</span>
              <h2 id="velora-date-modal-title" className="velora-date-modal-title">
                {weddingDate ? 'Your Wedding Date' : 'When is Your Big Day?'}
              </h2>
              <p className="velora-date-modal-desc">
                Setting your wedding celebration date enables VELORA Atelier to calculate bespoke tailoring deadlines, fitting buffers, and express dispatch cutoffs for every gown.
              </p>
            </div>

            <form onSubmit={handleSave} className="velora-date-modal-form">
              <div className="velora-date-field">
                <label htmlFor="velora-wedding-input" className="velora-date-label">
                  Select Wedding Date
                </label>
                <div className="velora-date-input-wrap">
                  <input
                    id="velora-wedding-input"
                    type="date"
                    className="velora-date-input"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Status preview if date is selected */}
              {inputDate && (
                <div className="velora-date-preview">
                  <span className="velora-preview-label">Celebration Date:</span>
                  <span className="velora-preview-val">
                    {formatUtcDate(inputDate, 'full')}
                  </span>
                </div>
              )}

              {/* Form Actions */}
              <div className="velora-date-modal-actions">
                {weddingDate && (
                  <button
                    type="button"
                    className="velora-date-btn-clear"
                    onClick={handleClear}
                  >
                    <Trash2 size={14} /> Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="velora-date-btn-save"
                >
                  <Check size={15} /> Save Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
