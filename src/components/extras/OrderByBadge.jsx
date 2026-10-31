import React from 'react';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { useApp } from '../../context/AppContext';
import { calcOrderBy } from '../../utils/orderBy';
import { Clock, AlertTriangle, ArrowRight, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

export const OrderByBadge = ({
  product,
  onClose,
  compact = false,
  isQuickShip = false
}) => {
  const { weddingDate } = useWeddingDate();
  const { setCurrentView } = useApp();

  if (!weddingDate) {
    if (compact) return null;
    return (
      <div className="velora-order-prompt-box animate-fade-in">
        <div className="velora-order-prompt-left">
          <Calendar size={15} className="text-accent" />
          <div className="velora-order-prompt-text">
            <span className="velora-prompt-title">Planning your wedding celebration?</span>
            <span className="velora-prompt-desc">
              Set your wedding date to calculate bespoke tailoring and delivery cutoffs.
            </span>
          </div>
        </div>
        <button
          type="button"
          className="velora-order-prompt-btn"
          onClick={() => window.dispatchEvent(new Event('velora:open_wedding_modal'))}
        >
          Set Date
        </button>
      </div>
    );
  }

  const orderCalculation = calcOrderBy({
    weddingDate,
    product,
    isQuickShip: isQuickShip || product?.category === 'quick-ship'
  });

  if (!orderCalculation) {
    return null;
  }

  const {
    formattedOrderByDate,
    daysLeft,
    status,
    isPastWedding,
    isTodayWedding,
    isQuickShipGown,
    totalDays
  } = orderCalculation;

  const handleNavigateQuickShip = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
    setCurrentView('quick-ship');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compact badge rendering (e.g., inside Quick Ship grid cards)
  if (compact) {
    return (
      <div className={`velora-order-badge-compact status-${status}`}>
        <Clock size={11} />
        <span>
          {status === 'too-late'
            ? 'Timeline passed'
            : `Order by ${formattedOrderByDate}`}
        </span>
      </div>
    );
  }

  // Full rich badge for ProductDetailModal and Page headers
  return (
    <div
      className={`velora-order-by-card status-${status} animate-fade-in`}
      role="region"
      aria-label="Atelier Order Deadline Calculation"
    >
      <div className="velora-order-by-top">
        <div className="velora-order-by-status-icon">
          {status === 'on-time' && <CheckCircle2 size={16} className="text-on-time" />}
          {status === 'tight' && <Clock size={16} className="text-tight" />}
          {status === 'too-late' && <AlertTriangle size={16} className="text-too-late" />}
        </div>

        <div className="velora-order-by-info">
          <div className="velora-order-by-heading-row">
            <span className="velora-order-by-kicker">
              {isQuickShipGown ? 'EXPRESS ATELIER TIMELINE' : 'MADE-TO-ORDER TIMELINE'}
            </span>
            <span className={`velora-order-by-status-pill status-${status}`}>
              {status === 'on-time' && 'On Time'}
              {status === 'tight' && 'Tight Timeline'}
              {status === 'too-late' && 'Cutoff Passed'}
            </span>
          </div>

          <h4 className="velora-order-by-title">
            {isPastWedding ? (
              'Wedding Date in the Past'
            ) : isTodayWedding ? (
              'Your Wedding is Today'
            ) : status === 'too-late' ? (
              `Cutoff was ${formattedOrderByDate}`
            ) : (
              `Order by ${formattedOrderByDate}`
            )}
          </h4>

          <p className="velora-order-by-desc">
            {isPastWedding ? (
              'Please update your celebration date in the header to recalculate tailoring lead times.'
            ) : status === 'on-time' ? (
              `Place your order within ${daysLeft} days to guarantee bespoke craftsmanship (${totalDays} total days for hand-tailoring, alterations buffer, and white-glove shipping).`
            ) : status === 'tight' ? (
              `Only ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left to order for your wedding date! Tailoring schedule will be expedited.`
            ) : (
              `Standard bespoke production requires ${totalDays} days. A made-to-order gown placed today will not arrive in time for your wedding.`
            )}
          </p>
        </div>
      </div>

      {/* Conditional Quick-Ship CTAs */}
      {status === 'tight' && !isQuickShipGown && (
        <div className="velora-order-by-cta-row">
          <span className="velora-cta-hint">Need more breathing room?</span>
          <button
            type="button"
            className="velora-order-btn-quickship"
            onClick={handleNavigateQuickShip}
          >
            <Sparkles size={13} />
            <span>View Quick Ship Alternatives (2–3 Wks)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {status === 'too-late' && !isQuickShipGown && (
        <div className="velora-order-by-cta-row is-urgent">
          <button
            type="button"
            className="velora-order-btn-urgent-quickship"
            onClick={handleNavigateQuickShip}
          >
            <Sparkles size={14} />
            <span>Explore Quick Ship Gowns (Dispatched in 2–3 Weeks)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

