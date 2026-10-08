export const VOUCHERS = [
  {
    code: 'SALEOR20',
    type: 'percentage',
    value: 20,
    minSpend: 50,
    description: '20% off site-wide on orders over $50',
    expiry: '2026-12-31'
  },
  {
    code: 'WELCOME10',
    type: 'fixed',
    value: 10,
    minSpend: 30,
    description: '$10 off your first purchase',
    expiry: '2026-12-31'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    minSpend: 0,
    description: 'Free Express Shipping on any order',
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
  id: 'usr-901',
  name: 'Eleanor Vance',
  email: 'eleanor.vance@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  phone: '+1 (555) 234-8901',
  memberSince: 'January 2024',
  membershipTier: 'VELORA VIP Club',
  addresses: [
    {
      id: 'addr-1',
      title: 'Primary Residence',
      isDefault: true,
      firstName: 'Eleanor',
      lastName: 'Vance',
      street: '742 Evergreen Terrace, Suite 4B',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'United States',
      phone: '+1 (555) 234-8901'
    },
    {
      id: 'addr-2',
      title: 'Studio Office',
      isDefault: false,
      firstName: 'Eleanor',
      lastName: 'Vance',
      street: '100 Pine Street, Floor 12',
      city: 'San Francisco',
      state: 'CA',
      zip: '94111',
      country: 'United States',
      phone: '+1 (555) 987-6543'
    }
  ],
  giftCards: [
    { code: 'GIFT-VELORA-9821', initialBalance: 200.00, currentBalance: 150.00, expiry: '2027-01-01' },
    { code: 'GIFT-SALEOR-5541', initialBalance: 50.00, currentBalance: 50.00, expiry: '2026-11-30' }
  ],
  orders: [
    {
      id: 'SLR-89241',
      date: '2026-09-28',
      status: 'Delivered',
      trackingNumber: 'TRK-908234-US',
      carrier: 'FedEx Express',
      estimatedDelivery: 'Sep 30, 2026',
      items: [
        {
          id: 'prod-1',
          name: 'Minimalist Artisan Leather Tote',
          variantName: 'Tan Leather / Medium',
          price: 285.00,
          quantity: 1,
          image: '/images/tote-bag.png'
        }
      ],
      subtotal: 285.00,
      discount: 28.50,
      shipping: 0.00,
      tax: 20.52,
      total: 277.02,
      shippingAddress: {
        firstName: 'Eleanor',
        lastName: 'Vance',
        street: '742 Evergreen Terrace, Suite 4B',
        city: 'Seattle',
        state: 'WA',
        zip: '98101'
      },
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'SLR-77402',
      date: '2026-08-14',
      status: 'Delivered',
      trackingNumber: 'TRK-552199-US',
      carrier: 'DHL Express',
      estimatedDelivery: 'Aug 17, 2026',
      items: [
        {
          id: 'prod-3',
          name: 'Heavyweight Organic Hoodie',
          variantName: 'Sand Beige / Medium',
          price: 145.00,
          quantity: 1,
          image: '/images/hoodie.png'
        },
        {
          id: 'prod-10',
          name: 'Artisan Pour-Over Ceramic Dripper Set',
          variantName: 'Matte Slate Grey / 600ml',
          price: 75.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
        }
      ],
      subtotal: 220.00,
      discount: 20.00,
      shipping: 5.00,
      tax: 16.40,
      total: 221.40,
      shippingAddress: {
        firstName: 'Eleanor',
        lastName: 'Vance',
        street: '742 Evergreen Terrace, Suite 4B',
        city: 'Seattle',
        state: 'WA',
        zip: '98101'
      },
      paymentMethod: 'Apple Pay'
    }
  ]
};
