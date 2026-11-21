export const VOUCHERS = [
  {
    code: 'VELORA20',
    type: 'percentage',
    value: 20,
    minSpend: 50,
    description: '20% off luxury bridal gowns',
    expiry: '2026-12-31'
  },
  {
    code: 'SALEOR20',
    type: 'percentage',
    value: 20,
    minSpend: 50,
    description: '20% off luxury bridal gowns',
    expiry: '2026-12-31'
  },
  {
    code: 'WELCOME10',
    type: 'fixed',
    value: 10,
    minSpend: 30,
    description: '$10 off your first appointment & purchase',
    expiry: '2026-12-31'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    minSpend: 0,
    description: 'Complimentary White-Glove Bridal Delivery',
    expiry: '2026-12-31'
  },
  {
    code: 'LUXE100',
    type: 'fixed',
    value: 100,
    minSpend: 400,
    description: '$100 off luxury purchases over $400',
    expiry: '2026-12-31'
  }
];

export const INITIAL_USER = {
  id: null,
  name: 'VIP Bride',
  email: '',
  avatar: '',
  phone: '',
  memberSince: '',
  membershipTier: 'VELORA VIP Club',
  addresses: [],
  giftCards: [],
  orders: [],
  appointments: []
};
