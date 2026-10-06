// Saleor-style "channels": each channel has its own currency.
// Rates are fixed demo values (not live FX) — all catalog prices are stored in USD.
export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1, locale: 'en-US', label: 'United States (USD)' },
  { code: 'EUR', symbol: '€', rate: 0.92, locale: 'de-DE', label: 'Europe (EUR)' },
  { code: 'GBP', symbol: '£', rate: 0.79, locale: 'en-GB', label: 'United Kingdom (GBP)' },
  { code: 'BDT', symbol: '৳', rate: 118, locale: 'en-BD', label: 'Bangladesh (BDT)' }
];

export const FREE_SHIPPING_THRESHOLD = 100; // USD, applies to Standard delivery
export const TAX_RATE = 0.08;
