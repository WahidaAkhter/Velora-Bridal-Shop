import { DEFAULT_LEAD_TIMES } from '../data/leadTimes.js';
import { isValidDateString } from '../hooks/useWeddingDate.js';

const MS_PER_DAY = 86400000;

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MONTH_NAMES_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Formats a YYYY-MM-DD string into a human-readable format strictly in UTC.
 * Example: '2026-10-24' -> 'October 24, 2026' or 'Oct 24, 2026'
 */
export const formatUtcDate = (dateStr, format = 'short') => {
  if (!isValidDateString(dateStr)) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const monthName = format === 'full' ? MONTH_NAMES_FULL[m - 1] : MONTH_NAMES_SHORT[m - 1];
  return `${monthName} ${d}, ${y}`;
};

/**
 * Calculate the order-by deadline and timeline status for a bridal gown.
 *
 * @param {Object} options
 * @param {string} options.weddingDate - 'YYYY-MM-DD'
 * @param {number} [options.leadTimeDays] - Override production lead days
 * @param {number} [options.alterationDays] - Override fitting/alteration buffer
 * @param {number} [options.shippingDays] - Override shipping transit time
 * @param {Object} [options.product] - Product object with optional leadTimeDays or category
 * @param {boolean} [options.isQuickShip] - Flag if this is an express dispatch gown
 * @returns {Object|null}
 */
export const calcOrderBy = ({
  weddingDate,
  leadTimeDays,
  alterationDays,
  shippingDays,
  product,
  isQuickShip
} = {}) => {
  if (!isValidDateString(weddingDate)) {
    return null;
  }

  // Parse wedding date strictly into UTC Midnight timestamp
  const [wYear, wMonth, wDay] = weddingDate.split('-').map(Number);
  const weddingUtc = Date.UTC(wYear, wMonth - 1, wDay);

  // Today at UTC Midnight
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  // Determine production lead time
  let effectiveLeadDays = DEFAULT_LEAD_TIMES.MADE_TO_ORDER_DAYS;
  if (typeof leadTimeDays === 'number' && !Number.isNaN(leadTimeDays)) {
    effectiveLeadDays = leadTimeDays;
  } else if (typeof product?.leadTimeDays === 'number') {
    effectiveLeadDays = product.leadTimeDays;
  } else if (isQuickShip || product?.category === 'quick-ship') {
    effectiveLeadDays = DEFAULT_LEAD_TIMES.QUICK_SHIP_DAYS;
  }

  const effectiveAlterationDays = typeof alterationDays === 'number'
    ? alterationDays
    : DEFAULT_LEAD_TIMES.ALTERATION_DAYS;

  const effectiveShippingDays = typeof shippingDays === 'number'
    ? shippingDays
    : DEFAULT_LEAD_TIMES.SHIPPING_DAYS;

  const totalDays = effectiveLeadDays + effectiveAlterationDays + effectiveShippingDays;

  // Order-by UTC Midnight
  const orderByUtc = weddingUtc - (totalDays * MS_PER_DAY);
  const orderDateObj = new Date(orderByUtc);
  const oYear = orderDateObj.getUTCFullYear();
  const oMonth = String(orderDateObj.getUTCMonth() + 1).padStart(2, '0');
  const oDay = String(orderDateObj.getUTCDate()).padStart(2, '0');
  const orderByDate = `${oYear}-${oMonth}-${oDay}`;

  // Days left to place order (can be negative if deadline passed)
  const daysLeft = Math.round((orderByUtc - todayUtc) / MS_PER_DAY);

  // Days until the wedding day
  const daysUntilWedding = Math.round((weddingUtc - todayUtc) / MS_PER_DAY);

  // Determine status: "on-time" | "tight" | "too-late"
  let status = 'on-time';
  if (daysUntilWedding < 0) {
    status = 'too-late';
  } else if (daysLeft < 0) {
    status = 'too-late';
  } else if (daysLeft <= DEFAULT_LEAD_TIMES.TIGHT_THRESHOLD_DAYS) {
    status = 'tight';
  } else {
    status = 'on-time';
  }

  return {
    orderByDate,
    formattedOrderByDate: formatUtcDate(orderByDate, 'short'),
    fullFormattedOrderByDate: formatUtcDate(orderByDate, 'full'),
    formattedWeddingDate: formatUtcDate(weddingDate, 'full'),
    daysLeft,
    daysUntilWedding,
    status,
    totalDays,
    leadDays: effectiveLeadDays,
    isPastWedding: daysUntilWedding < 0,
    isTodayWedding: daysUntilWedding === 0,
    isQuickShipGown: Boolean(isQuickShip || product?.category === 'quick-ship')
  };
};
