/**
 * Production and Delivery Lead Times Configuration (in Days)
 * All values are editable constants representing standard atelier turnaround times.
 */
export const DEFAULT_LEAD_TIMES = {
  // Made-to-order bespoke gowns: 18 weeks (126 days)
  MADE_TO_ORDER_DAYS: 126,

  // Quick ship priority gowns: ~1.5 weeks atelier dispatch (10 days)
  QUICK_SHIP_DAYS: 10,

  // Alteration and bespoke fitting buffer (14 days)
  ALTERATION_DAYS: 14,

  // Insured white-glove courier shipping (7 days)
  SHIPPING_DAYS: 7,

  // Threshold in days where deadline status changes from 'on-time' to 'tight'
  TIGHT_THRESHOLD_DAYS: 14
};
