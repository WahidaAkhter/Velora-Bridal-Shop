import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';
import { VOUCHERS, INITIAL_USER } from '../data/vouchers';
import { CURRENCIES, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../data/channels';
import {
  createOrder as apiCreateOrder,
  bookAppointment as apiBookAppointment,
  submitProductReview as apiSubmitReview
} from '../services/api';

const AppContext = createContext();

const loadJSON = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

// Sanitizes wishlist IDs to keep only valid, unique IDs that actually exist in PRODUCTS
const sanitizeWishlistIds = (rawIds) => {
  if (!Array.isArray(rawIds)) return [];
  const validIdSet = new Set(PRODUCTS.map(p => p.id));
  const seen = new Set();
  const clean = [];
  for (const id of rawIds) {
    if (validIdSet.has(id) && !seen.has(id)) {
      seen.add(id);
      clean.push(id);
    }
  }
  return clean;
};

export const AppProvider = ({ children }) => {
  // Theme — VELORA is an editorial bridal luxury storefront (Light Palette)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('aura_theme');
    if (saved === 'dark') {
      localStorage.setItem('aura_theme', 'light');
    }
    return false;
  });

  // Channel / currency
  const [currencyCode, setCurrencyCode] = useState(() => localStorage.getItem('aura_currency') || 'USD');
  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];

  // Navigation: 'catalog' | 'checkout' | 'account' | 'lookbook' | 'all-dresses' etc.
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('view')) return p.get('view');
    }
    return 'catalog';
  });
  const [accountTab, setAccountTab] = useState('overview');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Product modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('modal') === 'appointment';
    }
    return false;
  });
  const [activeWeddingDressOption, setActiveWeddingDressOption] = useState(null);

  // Recently viewed (product ids, newest first)
  const [recentlyViewed, setRecentlyViewed] = useState(() => loadJSON('aura_recent', []));

  // Cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() =>
    loadJSON('aura_cart', [
      { id: 'cart-1', productId: 'prod-1', product: PRODUCTS[0], variant: PRODUCTS[0].variants[0], quantity: 1 },
      { id: 'cart-2', productId: 'prod-3', product: PRODUCTS[2], variant: PRODUCTS[2].variants[1], quantity: 1 }
    ])
  );

  const [wishlist, setWishlist] = useState(() => {
    const raw = loadJSON('aura_wishlist', ['prod-1', 'prod-2']);
    return sanitizeWishlistIds(raw);
  });

  // Discounts
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [appliedGiftCard, setAppliedGiftCard] = useState(null); // gift card code
  const [shippingMethod, setShippingMethod] = useState({
    id: 'std',
    name: 'Standard Express Shipping',
    time: '2 - 4 Business Days',
    cost: 5.0
  });

  const [user, setUser] = useState(() => {
    const saved = loadJSON('aura_user', INITIAL_USER);
    return {
      ...INITIAL_USER,
      ...saved,
      appointments: saved?.appointments || INITIAL_USER.appointments || []
    };
  });

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadJSON('velora_logged_in', false));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'

  // Custom Product Reviews State
  const [customReviews, setCustomReviews] = useState(() => loadJSON('velora_custom_reviews', {}));

  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => setToast(prev => (prev?.id === id ? null : prev)), 3200);
  }, []);

  // Persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('aura_theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  useEffect(() => localStorage.setItem('aura_currency', currencyCode), [currencyCode]);
  useEffect(() => localStorage.setItem('aura_cart', JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => {
    const clean = sanitizeWishlistIds(wishlist);
    if (clean.length !== wishlist.length) {
      setWishlist(clean);
      localStorage.setItem('aura_wishlist', JSON.stringify(clean));
    } else {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);
  useEffect(() => localStorage.setItem('aura_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('aura_recent', JSON.stringify(recentlyViewed)), [recentlyViewed]);

  // Track recently viewed whenever a product is opened
  useEffect(() => {
    const opened = selectedProduct || quickViewProduct;
    if (!opened) return;
    setRecentlyViewed(prev => [opened.id, ...prev.filter(id => id !== opened.id)].slice(0, 8));
  }, [selectedProduct, quickViewProduct]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // Price formatting in the active channel currency (input is always USD)
  const formatPrice = useCallback(
    (usdAmount) => {
      const value = (usdAmount || 0) * currency.rate;
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        maximumFractionDigits: currency.code === 'BDT' ? 0 : 2
      }).format(value);
    },
    [currency]
  );

  // Cart helpers
  const addToCart = (product, variant = null, quantity = 1) => {
    const defaultVariant = {
      id: `${product.id}-default`,
      name: 'Standard Atelier Sizing',
      price: product.price || 0,
      stock: product.stock ?? 10
    };
    const selectedVar = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : defaultVariant);
    const existing = cartItems.find(i => i.productId === product.id && i.variant?.id === selectedVar.id);
    if (existing) {
      setCartItems(prev =>
        prev.map(i => (i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i))
      );
    } else {
      setCartItems(prev => [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          productId: product.id,
          product,
          variant: selectedVar,
          quantity
        }
      ]);
    }
    showToast(`Added "${product.name}" to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(i => i.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) return removeFromCart(cartItemId);
    setCartItems(prev => prev.map(i => (i.id === cartItemId ? { ...i, quantity: newQty } : i)));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedVoucher(null);
    setAppliedGiftCard(null);
  };

  const toggleWishlist = (productId) => {
    const item = PRODUCTS.find(p => p.id === productId);
    if (!item) return;

    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist(prev => sanitizeWishlistIds([...prev, productId]));
      showToast(`Saved "${item.name}" to wishlist`);
    }
  };

  // ---- Pricing pipeline (all USD) ----
  const getCartSubtotal = () => cartItems.reduce((acc, i) => acc + i.variant.price * i.quantity, 0);

  const getShippingCost = () => {
    if (cartItems.length === 0) return 0;
    if (appliedVoucher?.type === 'shipping') return 0;
    if (shippingMethod.id === 'std' && getCartSubtotal() >= FREE_SHIPPING_THRESHOLD) return 0;
    return shippingMethod.cost;
  };

  const getVoucherDiscount = () => {
    if (!appliedVoucher) return 0;
    const subtotal = getCartSubtotal();
    if (appliedVoucher.type === 'percentage') return (subtotal * appliedVoucher.value) / 100;
    if (appliedVoucher.type === 'fixed') return Math.min(subtotal, appliedVoucher.value);
    return 0; // shipping vouchers are handled in getShippingCost
  };

  const getTax = () => Math.max(0, getCartSubtotal() - getVoucherDiscount()) * TAX_RATE;

  const getTotalBeforeGiftCard = () =>
    Math.max(0, getCartSubtotal() - getVoucherDiscount() + getShippingCost() + getTax());

  const getGiftCardCredit = () => {
    if (!appliedGiftCard) return 0;
    const card = user.giftCards.find(g => g.code === appliedGiftCard);
    if (!card) return 0;
    return Math.min(card.currentBalance, getTotalBeforeGiftCard());
  };

  const getCartTotal = () => Math.max(0, getTotalBeforeGiftCard() - getGiftCardCredit());

  // Vouchers
  const applyVoucherCode = (code) => {
    const voucher = VOUCHERS.find(v => v.code === code.trim().toUpperCase());
    if (!voucher) return { success: false, message: 'Invalid promo code' };
    if (voucher.minSpend && getCartSubtotal() < voucher.minSpend) {
      const msg = `Minimum spend of ${formatPrice(voucher.minSpend)} required for ${voucher.code}`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }
    setAppliedVoucher(voucher);
    showToast(`Voucher "${voucher.code}" applied!`);
    return { success: true, message: 'Voucher applied successfully!' };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Voucher removed', 'info');
  };

  // Gift cards
  const applyGiftCard = (code) => {
    const card = user.giftCards.find(g => g.code === code.trim().toUpperCase());
    if (!card) return { success: false, message: 'Gift card not found on your account' };
    if (card.currentBalance <= 0) return { success: false, message: 'This gift card has no remaining balance' };
    setAppliedGiftCard(card.code);
    showToast(`Gift card ${card.code} applied`);
    return { success: true };
  };
  const removeGiftCard = () => setAppliedGiftCard(null);

  // Address book
  const addAddress = (newAddr) => {
    const addr = { ...newAddr, id: `addr-${Date.now()}` };
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses
        .map(a => (newAddr.isDefault ? { ...a, isDefault: false } : a))
        .concat(addr)
    }));
    showToast('Address added to your address book!');
  };

  const updateAddress = (addrId, updates) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => {
        if (a.id === addrId) return { ...a, ...updates };
        return updates.isDefault ? { ...a, isDefault: false } : a;
      })
    }));
    showToast('Address updated');
  };

  const deleteAddress = (addrId) => {
    setUser(prev => {
      const remaining = prev.addresses.filter(a => a.id !== addrId);
      if (remaining.length && !remaining.some(a => a.isDefault)) remaining[0] = { ...remaining[0], isDefault: true };
      return { ...prev, addresses: remaining };
    });
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (addrId) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === addrId }))
    }));
    showToast('Default address updated!');
  };

  // Appointments Management (Persistent)
  const addAppointment = (aptData) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      service: aptData.service || 'Signature Bridal Gown Consultation',
      appointmentDate: aptData.appointmentDate,
      timeSlot: aptData.timeSlot || '11:00 AM',
      weddingDate: aptData.weddingDate || 'TBD',
      stylist: 'Chloe Laurent (Master Bridal Stylist)',
      status: 'Confirmed',
      location: 'VELORA Atelier, 123 Bridal Lane, New York, NY',
      notes: aptData.notes || '',
      createdAt: new Date().toISOString()
    };
    setUser(prev => ({
      ...prev,
      appointments: [newApt, ...(prev.appointments || [])]
    }));
    // Sync to Express Backend asynchronously
    apiBookAppointment({
      name: newApt.name,
      email: newApt.email,
      phone: newApt.phone,
      service: newApt.service,
      appointmentDate: newApt.appointmentDate,
      timeSlot: newApt.timeSlot,
      weddingDate: newApt.weddingDate,
      stylist: newApt.stylist,
      location: newApt.location,
      notes: newApt.notes
    }).catch(err => console.warn('Backend sync error (appointment):', err.message));
    showToast('Your bridal appointment has been reserved!');
    return newApt;
  };

  const cancelAppointment = (aptId) => {
    setUser(prev => ({
      ...prev,
      appointments: (prev.appointments || []).map(a =>
        a.id === aptId ? { ...a, status: 'Cancelled' } : a
      )
    }));
    showToast('Appointment has been cancelled', 'info');
  };

  // Preconfigured Demo VIP Profiles
  const PRECONFIGURED_USERS = [
    INITIAL_USER,
    {
      ...INITIAL_USER,
      id: 'usr-902',
      name: 'Jessica Sterling',
      email: 'jessica.sterling@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      phone: '+1 (555) 890-1234',
      memberSince: 'August 2026',
      membershipTier: 'Bride-to-be (Summer 2027)',
      orders: [],
      appointments: [
        {
          id: 'apt-demo-1',
          name: 'Jessica Sterling',
          email: 'jessica.sterling@example.com',
          phone: '+1 (555) 890-1234',
          service: 'Signature Bridal Gown Consultation',
          appointmentDate: '2026-11-15',
          timeSlot: '2:00 PM',
          stylist: 'Chloe Laurent (Master Bridal Stylist)',
          status: 'Confirmed',
          location: 'VELORA Atelier Flagship, New York'
        }
      ]
    },
    {
      ...INITIAL_USER,
      id: 'usr-903',
      name: 'Chloe Laurent',
      email: 'chloe.laurent@velora.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      phone: '+1 (800) 892-LUXE',
      memberSince: 'Senior Atelier Team',
      membershipTier: 'Master Bridal Stylist',
      orders: [],
      appointments: []
    }
  ];

  // Authentication Helpers
  const loginUser = (email) => {
    const savedUsers = loadJSON('velora_users_list', PRECONFIGURED_USERS);
    const matched = savedUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (matched) {
      setUser(matched);
      setIsLoggedIn(true);
      localStorage.setItem('velora_logged_in', 'true');
      localStorage.setItem('aura_user', JSON.stringify(matched));
      showToast(`Welcome back, ${matched.name}!`);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    const namePart = email.split('@')[0];
    const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newUser = {
      ...INITIAL_USER,
      id: `usr-${Date.now()}`,
      name: capitalized,
      email: email.trim(),
      memberSince: 'October 2026',
      membershipTier: 'VELORA VIP Club',
      orders: [],
      appointments: []
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('velora_logged_in', 'true');
    localStorage.setItem('aura_user', JSON.stringify(newUser));
    localStorage.setItem('velora_users_list', JSON.stringify([...savedUsers, newUser]));
    showToast(`Welcome to VELORA, ${newUser.name}!`);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const registerUser = ({ name, email, phone, weddingDate }) => {
    const savedUsers = loadJSON('velora_users_list', PRECONFIGURED_USERS);
    const existing = savedUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      setUser(existing);
      setIsLoggedIn(true);
      localStorage.setItem('velora_logged_in', 'true');
      localStorage.setItem('aura_user', JSON.stringify(existing));
      showToast(`Welcome back, ${existing.name}!`);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    const newUser = {
      ...INITIAL_USER,
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '+1 (555) 000-0000',
      memberSince: 'Today',
      membershipTier: weddingDate ? `Bride-to-be (Wedding: ${weddingDate})` : 'VELORA VIP Club',
      orders: [],
      appointments: []
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('velora_logged_in', 'true');
    localStorage.setItem('aura_user', JSON.stringify(newUser));
    localStorage.setItem('velora_users_list', JSON.stringify([...savedUsers, newUser]));
    showToast(`Welcome to VELORA, ${newUser.name}! Your VIP account is ready.`);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    localStorage.setItem('velora_logged_in', 'false');
    showToast('Signed out of VELORA account', 'info');
  };

  // Product Reviews Management
  const addProductReview = (productId, reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || (isLoggedIn ? user.name : 'Bridal Guest'),
      date: 'Just now',
      rating: reviewData.rating || 5,
      title: reviewData.title || 'Exquisite gown & perfect fitting!',
      comment: reviewData.comment || '',
      verified: true
    };
    setCustomReviews(prev => {
      const existing = prev[productId] || [];
      const updated = [newReview, ...existing];
      const next = { ...prev, [productId]: updated };
      localStorage.setItem('velora_custom_reviews', JSON.stringify(next));
      return next;
    });
    // Sync review to Express backend asynchronously
    apiSubmitReview(productId, {
      author: newReview.author,
      rating: newReview.rating,
      comment: newReview.comment,
      title: newReview.title
    }).catch(err => console.warn('Backend sync error (review):', err.message));
    showToast('Thank you! Your bridal review has been published.');
    return newReview;
  };

  // Orders
  const placeOrder = (orderData) => {
    const giftCredit = getGiftCardCredit();
    const newOrder = {
      id: `VLR-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}-US`,
      carrier: shippingMethod.id === 'prio' ? 'UPS Next Day Air' : 'FedEx Express',
      estimatedDelivery: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      items: cartItems.map(i => ({
        id: i.productId,
        name: i.product.name,
        variantName: i.variant?.name || 'Standard Atelier Sizing',
        price: i.variant?.price || i.product.price || 0,
        quantity: i.quantity,
        image: i.product.images?.[0] || i.product.image || ''
      })),
      subtotal: getCartSubtotal(),
      discount: getVoucherDiscount(),
      voucherCode: appliedVoucher?.code || null,
      shipping: getShippingCost(),
      tax: getTax(),
      giftCardCredit: giftCredit,
      giftCardCode: giftCredit > 0 ? appliedGiftCard : null,
      total: getCartTotal(),
      currency: currency.code,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethodName || 'Credit Card'
    };

    setUser(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      giftCards: prev.giftCards.map(g =>
        g.code === appliedGiftCard ? { ...g, currentBalance: +(g.currentBalance - giftCredit).toFixed(2) } : g
      )
    }));

    clearCart();
    setSelectedOrderDetails(newOrder);
    setCurrentView('account');
    setAccountTab('orders');
    // Sync to Express Backend asynchronously
    apiCreateOrder(newOrder).catch(err => console.warn('Backend sync error (order):', err.message));
    showToast('Order placed successfully! Receipt generated.');
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        isDark, toggleTheme,
        currency, currencyCode, setCurrencyCode, formatPrice,
        currentView, setCurrentView, accountTab, setAccountTab,
        selectedCategory, setSelectedCategory, searchQuery, setSearchQuery,
        priceRange, setPriceRange, sortBy, setSortBy,
        inStockOnly, setInStockOnly, minRating, setMinRating,
        selectedProduct, setSelectedProduct, quickViewProduct, setQuickViewProduct,
        isAppointmentModalOpen, setIsAppointmentModalOpen,
        activeWeddingDressOption, setActiveWeddingDressOption,
        recentlyViewed,
        isCartOpen, setIsCartOpen, cartItems, addToCart, updateCartQuantity, removeFromCart, clearCart,
        wishlist, toggleWishlist,
        appliedVoucher, applyVoucherCode, removeVoucher,
        appliedGiftCard, applyGiftCard, removeGiftCard,
        shippingMethod, setShippingMethod,
        user, addAddress, updateAddress, deleteAddress, setDefaultAddress,
        addAppointment, cancelAppointment,
        isLoggedIn, isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode,
        loginUser, registerUser, logoutUser,
        customReviews, addProductReview,
        getCartSubtotal, getVoucherDiscount, getShippingCost, getTax, getGiftCardCredit, getCartTotal,
        placeOrder, selectedOrderDetails, setSelectedOrderDetails,
        toast, showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
