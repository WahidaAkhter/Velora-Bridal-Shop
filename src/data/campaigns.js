/**
 * AURA Promotional Campaign Data & Configuration
 * Marketing teams can update campaign attributes here without touching UI component code.
 */

export const CAMPAIGNS = {
  welcome: {
    id: 'welcome-aura-2026',
    enabled: true,
    badge: 'VELORA EXCLUSIVE',
    title: 'Welcome to VELORA',
    subtitle: 'Enjoy 20% off your first order',
    discountText: '20% OFF',
    description: 'Discover our exclusive bridal collection and enjoy complimentary private boutique styling consultations.',
    code: 'SALEOR20',
    ctaText: 'Shop Now',
    secondaryCtaText: 'Maybe Later',
    image: '/images/bridal/featured-lace-dream.jpg',
    imageAlt: 'Luxe Brides Lace Dream Gown',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    showDelay: 1500, // delay in ms after page load
  }
};

/**
 * Returns the currently active promotional campaign if enabled and within date boundaries.
 */
export const getActiveCampaign = () => {
  const campaign = CAMPAIGNS.welcome;
  if (!campaign || !campaign.enabled) return null;

  const now = new Date();
  if (campaign.startDate && new Date(campaign.startDate) > now) return null;
  if (campaign.endDate && new Date(campaign.endDate) < now) return null;

  return campaign;
};
