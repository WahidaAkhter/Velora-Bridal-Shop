import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCatalog, getCatalog } from '../services/catalogStore';
import { getProducts, isSupabaseConfigured } from '../services/productsService';
import { supabase } from '../lib/supabaseClient';
import {
  isAuthAvailable,
  signInUser,
  signInWithGoogle,
  signUpUser,
  signOutUser,
  fetchUserProfile,
  mergeWishlistOnAuth
} from '../services/authService';
import { VOUCHERS, INITIAL_USER } from '../data/vouchers';
import { CURRENCIES, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../data/channels';
import { routeFor, viewFor, accountTabFor, productFor, toProductSlug } from '../routes/routeMap';
import {
  createOrder as apiCreateOrder,
  bookAppointment as apiBookAppointment,
  submitProductReview as apiSubmitReview
} from '../services/api';

const AppContext = createContext();

const LEGACY_DEFAULT_WISHLIST = ['prod-1', 'prod-2'];
const WISHLIST_TOUCHED_KEY = 'velora_wishlist_touched';
const WISHLIST_STORAGE_KEY = 'aura_wishlist';
const WISHLIST_PICKS_KEY = 'velora_wishlist_picks';

const loadJSON = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

// Sanitizes wishlist IDs to keep only valid, unique IDs that actually exist in the catalog
const sanitizeWishlistIds = (rawIds) => {
  if (!Array.isArray(rawIds)) return [];
  const catalogList = getCatalog();
  if (!Array.isArray(catalogList) || catalogList.length === 0) return [];
  const validIdSet = new Set(catalogList.filter(p => p && p.id).map(p => p.id));
  const seen = new Set();
  const clean = [];
  for (const id of rawIds) {
    if (typeof id === 'string' && validIdSet.has(id) && !seen.has(id)) {
      seen.add(id);
      clean.push(id);
    }
  }
  return clean;
};

// Records user wishlist toggle history in localStorage
const recordWishlistPick = (productId, isAdding) => {
  if (typeof window === 'undefined' || !productId) return;
  try {
    const raw = localStorage.getItem(WISHLIST_PICKS_KEY);
    let picks = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) picks = parsed;
    }
    if (isAdding) {
      if (!picks.includes(productId)) {
        picks.push(productId);
      }
    } else {
      picks = picks.filter(id => id !== productId);
    }
    localStorage.setItem(WISHLIST_PICKS_KEY, JSON.stringify(picks));
  } catch {
    // ignore
  }
};

// Checks if an array consists only of legacy default IDs (e.g. ['prod-1'], ['prod-2'], ['prod-1', 'prod-2'])
const isLegacyDefaultWishlist = (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) return false;
  return ids.every(id => LEGACY_DEFAULT_WISHLIST.includes(id));
};

// Initializes the wishlist state with safe cleanup of legacy default gowns
const getInitialWishlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const rawSaved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!rawSaved) return [];

    const parsed = JSON.parse(rawSaved);
    if (!Array.isArray(parsed) || parsed.length === 0) return [];

    // If localStorage holds only legacy default items ('prod-1', 'prod-2'), clear it
    if (isLegacyDefaultWishlist(parsed)) {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      return [];
    }

    // For a guest (not logged in), ensure items were actually picked via velora_wishlist_picks
    const loggedIn = localStorage.getItem('velora_logged_in') === 'true';
    if (!loggedIn) {
      const rawPicks = localStorage.getItem(WISHLIST_PICKS_KEY);
      let picks = [];
      if (rawPicks) {
        try {
          const parsedPicks = JSON.parse(rawPicks);
          if (Array.isArray(parsedPicks)) picks = parsedPicks;
        } catch {
          picks = [];
        }
      }
      // If guest has no recorded picks in this browser, start at 0 and clear storage
      if (picks.length === 0) {
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
        return [];
      }
      // If guest has picks, return only those picks
      const validPicks = parsed.filter(id => picks.includes(id));
      if (validPicks.length === 0) {
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
        return [];
      }
      return sanitizeWishlistIds(validPicks);
    }

    return sanitizeWishlistIds(parsed);
  } catch {
    return [];
  }
};

// Detects legacy hardcoded default cart items (LISSY and WARD from template seed)
const isLegacyDefaultCart = (items) => {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.every(i =>
    (i?.id === 'cart-1' && i?.productId === 'prod-1') ||
    (i?.id === 'cart-2' && i?.productId === 'prod-3')
  );
};

// Initializes the cart with clean empty bag fallback and legacy cleanup
const getInitialCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const rawSaved = localStorage.getItem('aura_cart');
    if (!rawSaved) return [];
    const parsed = JSON.parse(rawSaved);
    if (!Array.isArray(parsed) || parsed.length === 0) return [];
    if (isLegacyDefaultCart(parsed)) {
      localStorage.removeItem('aura_cart');
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

// Sanitizes user addresses to purge legacy template seeds ('addr-1', 'addr-2')
const sanitizeAddresses = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.filter((a) => a && a.id !== 'addr-1' && a.id !== 'addr-2');
};

// Sanitizes user appointments to purge legacy template seeds ('apt-101')
const sanitizeAppointments = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.filter((a) => a && a.id !== 'apt-101');
};

// Sanitizes user orders to purge legacy template seeds ('SLR-89241', 'SLR-77402')
const sanitizeOrders = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.filter((o) => o && o.id !== 'SLR-89241' && o.id !== 'SLR-77402');
};

export const AppProvider = ({ children }) => {
  // Catalog store subscription & Supabase loading
  const catalog = useCatalog();
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const loadProducts = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setIsProductsLoading(true);
    setProductsError(null);
    try {
      const res = await getProducts();
      if (!res.success && res.error) {
        setProductsError(res.error);
      }
    } catch (err) {
      setProductsError(err);
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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

  const location = useLocation();
  const navigate = useNavigate();

  // Track visited routes for reliable in-app Previous button navigation
  const navStackRef = useRef([`${location.pathname}${location.search}`]);
  useEffect(() => {
    const full = `${location.pathname}${location.search}`;
    const stack = navStackRef.current;
    if (stack[stack.length - 1] !== full) {
      stack.push(full);
      if (stack.length > 30) stack.shift();
    }
  }, [location.pathname, location.search]);

  const goBack = useCallback((fallbackPath = '/') => {
    if (
      navStackRef.current.length > 1 ||
      (typeof window !== 'undefined' && (window.history.state?.idx ?? 0) > 0)
    ) {
      navigate(-1);
    } else {
      navigate(fallbackPath || '/');
    }
  }, [navigate]);

  // Navigation: derived from current location via viewFor
  const currentView = viewFor(location.pathname, location.search);
  const pathAccountTab = accountTabFor(location.pathname);
  const [internalAccountTab, setInternalAccountTab] = useState('overview');
  const accountTab = pathAccountTab || internalAccountTab;

  const setCurrentView = useCallback((view) => {
    navigate(routeFor(view));
  }, [navigate]);

  const setAccountTab = useCallback((tab) => {
    setInternalAccountTab(tab);
    navigate(routeFor('account', { accountTab: tab }));
  }, [navigate]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Product detail page resolution
  const routeProduct = productFor(location.pathname);
  const stateProduct = currentView === 'product-detail' ? (location.state?.product || null) : null;
  const [internalSelectedProduct, setInternalSelectedProduct] = useState(null);
  const selectedProduct = routeProduct || stateProduct || (currentView === 'product-detail' ? internalSelectedProduct : null);

  const setSelectedProduct = useCallback((product) => {
    if (product) {
      setInternalSelectedProduct(product);
      const slug = toProductSlug(product);
      const target = slug ? `/dresses/${slug}` : '/dresses';
      navigate(target, { state: { fromInternal: true, product } });
    } else {
      setInternalSelectedProduct(null);
      if (location.pathname.startsWith('/dresses/') && location.pathname !== '/dresses') {
        goBack('/dresses');
      }
    }
  }, [location.pathname, navigate, goBack]);
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
  const [cartItems, setCartItems] = useState(getInitialCart);

  const [wishlist, setWishlist] = useState(getInitialWishlist);
  const wishlistRef = useRef(wishlist);
  useEffect(() => {
    wishlistRef.current = wishlist;
  }, [wishlist]);

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
    const saved = loadJSON('aura_user', null);
    if (!saved) return INITIAL_USER;
    const cleanEmail = saved.email === 'eleanor.vance@example.com' ? '' : (saved.email || '');
    return {
      ...INITIAL_USER,
      ...saved,
      name: saved.name || INITIAL_USER.name || 'VIP Bride',
      email: cleanEmail,
      phone: saved.phone || INITIAL_USER.phone || '+1 (555) 000-0000',
      role: saved.role || INITIAL_USER.role || 'customer',
      membershipTier: saved.membershipTier || INITIAL_USER.membershipTier || 'VELORA VIP Club',
      orders: sanitizeOrders(saved.orders),
      addresses: sanitizeAddresses(saved.addresses),
      appointments: sanitizeAppointments(saved.appointments),
      giftCards: Array.isArray(saved.giftCards) ? saved.giftCards : []
    };
  });

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadJSON('velora_logged_in', false));
  const [tier, setTier] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const logged = loadJSON('velora_logged_in', false);
      const path = window.location.pathname;
      return !logged && (path === '/account' || path.startsWith('/account/'));
    }
    return false;
  });
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'

  const setAuthTarget = useCallback((path) => {
    try {
      if (path) sessionStorage.setItem('velora_auth_target', path);
      else sessionStorage.removeItem('velora_auth_target');
    } catch {
      // ignore
    }
  }, []);

  // 1. Redirect /account directly to the first tab /account/overview
  useEffect(() => {
    if (location.pathname === '/account' || location.pathname === '/account/') {
      navigate('/account/overview', { replace: true });
    }
  }, [location.pathname, navigate]);

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
  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem('aura_cart');
    } else {
      localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  useEffect(() => {
    const clean = sanitizeWishlistIds(wishlist);
    if (clean.length !== wishlist.length) {
      setWishlist(clean);
    }
    const toSave = clean.length !== wishlist.length ? clean : wishlist;
    if (toSave.length === 0 && !isLoggedIn) {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } else {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(toSave));
    }
  }, [wishlist, catalog, isLoggedIn]);
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
    const item = catalog.find(p => p.id === productId);
    if (!item) return;

    try {
      localStorage.setItem(WISHLIST_TOUCHED_KEY, 'true');
    } catch {
      // ignore
    }

    const isAdding = !wishlist.includes(productId);
    recordWishlistPick(productId, isAdding);

    if (!isAdding) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist', 'info');
      if (supabase && user?.id) {
        supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .catch(err => console.warn('[VELORA Auth] Wishlist delete error:', err));
      }
    } else {
      setWishlist(prev => sanitizeWishlistIds([...prev, productId]));
      showToast(`Saved "${item.name}" to wishlist`);
      if (supabase && user?.id) {
        supabase
          .from('wishlists')
          .upsert({ user_id: user.id, product_id: productId }, { onConflict: 'user_id, product_id', ignoreDuplicates: true })
          .catch(err => console.warn('[VELORA Auth] Wishlist upsert error:', err));
      }
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
    if (isSupabaseConfigured) return 0;
    if (!appliedGiftCard) return 0;
    const card = (user?.giftCards || []).find(g => g.code === appliedGiftCard);
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
    if (isSupabaseConfigured) {
      const msg = 'Gift card redemption is temporarily disabled during backend upgrade.';
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }
    const card = (user?.giftCards || []).find(g => g.code === code.trim().toUpperCase());
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
      addresses: (prev?.addresses || [])
        .map(a => (newAddr.isDefault ? { ...a, isDefault: false } : a))
        .concat(addr)
    }));
    showToast('Address added to your address book!');
  };

  const updateAddress = (addrId, updates) => {
    setUser(prev => ({
      ...prev,
      addresses: (prev?.addresses || []).map(a => {
        if (a.id === addrId) return { ...a, ...updates };
        return updates.isDefault ? { ...a, isDefault: false } : a;
      })
    }));
    showToast('Address updated');
  };

  const deleteAddress = (addrId) => {
    setUser(prev => {
      const remaining = (prev?.addresses || []).filter(a => a.id !== addrId);
      if (remaining.length && !remaining.some(a => a.isDefault)) remaining[0] = { ...remaining[0], isDefault: true };
      return { ...prev, addresses: remaining };
    });
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (addrId) => {
    setUser(prev => ({
      ...prev,
      addresses: (prev?.addresses || []).map(a => ({ ...a, isDefault: a.id === addrId }))
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

  // Synchronizes authenticated Supabase user & public.profiles row with context
  const syncUserSession = useCallback(async (authUser) => {
    if (!authUser) return;

    const profile = await fetchUserProfile(authUser.id);

    const realName = profile?.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'VIP Bride';
    const realPhone = profile?.phone || authUser.user_metadata?.phone || '+1 (555) 000-0000';
    const role = profile?.role || 'customer';

    setUser(prev => {
      const base = prev || INITIAL_USER;
      const updated = {
        ...INITIAL_USER,
        ...base,
        id: authUser.id,
        name: realName,
        email: authUser.email || base.email,
        phone: realPhone,
        role,
        membershipTier: role === 'admin' ? 'Master Atelier Admin' : (base.membershipTier || 'VELORA VIP Club'),
        orders: sanitizeOrders(base.orders),
        addresses: sanitizeAddresses(base.addresses),
        appointments: sanitizeAppointments(base.appointments),
        giftCards: Array.isArray(base.giftCards) ? base.giftCards : []
      };
      localStorage.setItem('aura_user', JSON.stringify(updated));
      return updated;
    });

    setIsLoggedIn(true);
    localStorage.setItem('velora_logged_in', 'true');

    // Merge any local picks and hydrate account wishlist from Supabase
    try {
      const mergedWishlist = await mergeWishlistOnAuth(authUser.id, wishlistRef.current);
      if (Array.isArray(mergedWishlist)) {
        setWishlist(sanitizeWishlistIds(mergedWishlist));
      }
    } catch (err) {
      console.warn('[VELORA Auth] Wishlist sync error:', err);
    }

    // Hydrate member tier in memory from Supabase (never localStorage)
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: tierData, error: tierError } = await supabase.rpc('get_my_tier');
        if (!tierError && tierData) {
          setTier(tierData);
        } else {
          setTier(null);
        }
      } catch (err) {
        console.warn('[VELORA Auth] Tier fetch error:', err);
        setTier(null);
      }
    }
  }, []);

  // Listen to Supabase Auth State changes & restore session on page load
  useEffect(() => {
    if (!supabase) return;

    let isMounted = true;

    // 1. Restore active session on load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        await syncUserSession(session.user);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('velora_logged_in');
      }
    }).catch(err => {
      console.warn('[VELORA Auth] Error restoring session:', err);
    });

    // 2. Subscribe to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          await syncUserSession(session.user);

          // Return trip from a Google OAuth redirect: close the modal, honour the pending destination
          try {
            const oauthDest = sessionStorage.getItem('velora_oauth_target');
            if (oauthDest) {
              sessionStorage.removeItem('velora_oauth_target');
              sessionStorage.removeItem('velora_auth_target');
              setIsAuthModalOpen(false);
              navigate(oauthDest);
            }
          } catch {
            // ignore
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setTier(null);
        setUser(INITIAL_USER);
        setWishlist([]);
        setCartItems([]);
        setAppliedVoucher(null);
        setAppliedGiftCard(null);
        localStorage.removeItem('velora_logged_in');
        localStorage.removeItem('aura_user');
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
        localStorage.removeItem(WISHLIST_PICKS_KEY);
        localStorage.removeItem('aura_cart');
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [syncUserSession]);

  // Authentication Helpers using Supabase Auth
  const loginUser = async (email, password) => {
    if (!isAuthAvailable) {
      showToast('Accounts are temporarily unavailable.', 'error');
      return { success: false, message: 'Accounts are temporarily unavailable.' };
    }

    const res = await signInUser({ email, password });
    if (!res.success) {
      return res;
    }

    const authUser = res.user;
    await syncUserSession(authUser);

    showToast(`Welcome back, ${authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'VIP Bride'}!`);
    setIsAuthModalOpen(false);

    let dest = null;
    try {
      dest = sessionStorage.getItem('velora_auth_target');
      sessionStorage.removeItem('velora_auth_target');
    } catch {
      // ignore
    }
    if (dest) navigate(dest);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    if (!isAuthAvailable) {
      showToast('Accounts are temporarily unavailable.', 'error');
      return { success: false, message: 'Accounts are temporarily unavailable.' };
    }

    // Preserve the destination the guest was heading to before the OAuth redirect
    try {
      const dest = sessionStorage.getItem('velora_auth_target');
      if (dest) sessionStorage.setItem('velora_oauth_target', dest);
    } catch {
      // ignore
    }

    const res = await signInWithGoogle(typeof window !== 'undefined' ? window.location.origin : undefined);
    if (!res.success) {
      showToast(res.message || 'Google sign-in is unavailable right now.', 'error');
    }
    return res;
  };

  const registerUser = async ({ name, email, password, phone, weddingDate }) => {
    if (!isAuthAvailable) {
      showToast('Accounts are temporarily unavailable.', 'error');
      return { success: false, message: 'Accounts are temporarily unavailable.' };
    }

    // Signup sends ONLY full_name and phone in options.data
    const res = await signUpUser({ email, password, fullName: name, phone });
    if (!res.success) {
      return res;
    }

    const authUser = res.user;
    if (authUser) {
      await syncUserSession(authUser);
    }

    showToast(`Welcome to VELORA, ${name.trim()}! Your VIP account is ready.`);
    setIsAuthModalOpen(false);

    let dest = null;
    try {
      dest = sessionStorage.getItem('velora_auth_target');
      sessionStorage.removeItem('velora_auth_target');
    } catch {
      // ignore
    }
    if (dest) navigate(dest);
    return { success: true };
  };

  const logoutUser = async () => {
    await signOutUser();
    setUser(INITIAL_USER);
    setIsLoggedIn(false);
    setTier(null);
    setWishlist([]);
    setCartItems([]);
    setAppliedVoucher(null);
    setAppliedGiftCard(null);
    localStorage.removeItem('velora_logged_in');
    localStorage.removeItem('aura_user');
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    localStorage.removeItem(WISHLIST_PICKS_KEY);
    localStorage.removeItem('aura_cart');
    showToast('Signed out of VELORA account', 'info');
  };

  // Product Reviews Management
  const addProductReview = (productId, reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || (isLoggedIn ? (user?.name || 'VIP Bride') : 'Bridal Guest'),
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
  const placeOrder = async (orderData) => {
    if (isSupabaseConfigured && supabase) {
      showToast('Online card payment is coming soon. Your order cannot be placed yet.', 'warning');
      return null;
    }

    // Fallback: Local offline mock order flow
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
        catalog, isProductsLoading, productsError, isSupabaseConfigured, reloadProducts: loadProducts,
        isDark, toggleTheme,
        currency, currencyCode, setCurrencyCode, formatPrice,
        currentView, setCurrentView, accountTab, setAccountTab, goBack,
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
        isLoggedIn, tier, isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setAuthTarget,
        isAuthAvailable, loginUser, loginWithGoogle, registerUser, logoutUser,
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
