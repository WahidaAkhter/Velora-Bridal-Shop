import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  CreditCard,
  Truck,
  MapPin,
  Lock,
  ArrowLeft,
  ChevronRight,
  Gift,
  CheckCircle2,
  Smartphone,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const {
    cartItems,
    getCartSubtotal,
    getVoucherDiscount,
    getShippingCost,
    getTax,
    getGiftCardCredit,
    getCartTotal,
    appliedVoucher,
    appliedGiftCard,
    applyGiftCard,
    removeGiftCard,
    shippingMethod,
    setShippingMethod,
    user,
    addAddress,
    placeOrder,
    setCurrentView,
    formatPrice
  } = useApp();

  const [step, setStep] = useState(1); // 1: Address, 2: Shipping, 3: Payment, 4: Review

  // Shipping Address Form State
  const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0] || {};
  const [selectedAddrId, setSelectedAddrId] = useState(defaultAddr.id || 'custom');

  const [formData, setFormData] = useState({
    email: user.email || 'eleanor.vance@example.com',
    firstName: defaultAddr.firstName || 'Eleanor',
    lastName: defaultAddr.lastName || 'Vance',
    street: defaultAddr.street || '742 Evergreen Terrace, Suite 4B',
    city: defaultAddr.city || 'Seattle',
    state: defaultAddr.state || 'WA',
    zip: defaultAddr.zip || '98101',
    country: defaultAddr.country || 'United States',
    phone: defaultAddr.phone || '+1 (555) 234-8901',
    saveAddress: false
  });

  // Payment State
  const [paymentType, setPaymentType] = useState('card'); // 'card' | 'paypal' | 'applepay' | 'giftcard'
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [cardErrors, setCardErrors] = useState({});

  const getCardBrand = (num = '') => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (/^5[1-5]/.test(clean)) return 'MASTERCARD';
    if (/^3[47]/.test(clean)) return 'AMEX';
    if (/^6(?:011|5)/.test(clean)) return 'DISCOVER';
    return 'DEBIT / CREDIT';
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData(prev => ({ ...prev, number: formatted }));
    if (cardErrors.number) {
      setCardErrors(prev => ({ ...prev, number: '' }));
    }
  };

  const handleNameChange = (e) => {
    setCardData(prev => ({ ...prev, name: e.target.value }));
    if (cardErrors.name) {
      setCardErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardData(prev => ({ ...prev, expiry: raw }));
    if (cardErrors.expiry) {
      setCardErrors(prev => ({ ...prev, expiry: '' }));
    }
  };

  const handleCvcChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardData(prev => ({ ...prev, cvc: raw }));
    if (cardErrors.cvc) {
      setCardErrors(prev => ({ ...prev, cvc: '' }));
    }
  };

  const fillDemoCard = () => {
    setCardData({
      number: '4532 8920 1144 8923',
      name: 'Eleanor Vance',
      expiry: '12/28',
      cvc: '742'
    });
    setCardErrors({});
  };

  const validateCard = () => {
    const errors = {};
    const cleanNumber = (cardData.number || '').replace(/\s+/g, '');

    if (!cleanNumber) {
      errors.number = 'Card number is required.';
    } else if (cleanNumber.length < 15 || cleanNumber.length > 16) {
      errors.number = 'Please enter a valid 15 or 16-digit card number.';
    }

    if (!cardData.name || !cardData.name.trim()) {
      errors.name = 'Cardholder name is required.';
    } else if (cardData.name.trim().length < 2) {
      errors.name = 'Please enter the full cardholder name.';
    }

    if (!cardData.expiry) {
      errors.expiry = 'Expiry date is required (MM/YY).';
    } else {
      const match = cardData.expiry.match(/^(\d{2})\/(\d{2})$/);
      if (!match) {
        errors.expiry = 'Format must be MM/YY.';
      } else {
        const month = parseInt(match[1], 10);
        const year = parseInt(`20${match[2]}`, 10);
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (month < 1 || month > 12) {
          errors.expiry = 'Invalid month (01-12).';
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
          errors.expiry = 'Card has already expired.';
        }
      }
    }

    if (!cardData.cvc) {
      errors.cvc = 'CVC code is required.';
    } else if (cardData.cvc.length < 3 || cardData.cvc.length > 4) {
      errors.cvc = 'CVC must be 3 or 4 digits.';
    }

    return errors;
  };

  const handleProceedToReview = (e) => {
    if (e) e.preventDefault();
    if (paymentType === 'card') {
      const errors = validateCard();
      if (Object.keys(errors).length > 0) {
        setCardErrors(errors);
        return;
      }
    }
    setCardErrors({});
    setStep(4);
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddrId(addr.id);
    setFormData(prev => ({
      ...prev,
      firstName: addr.firstName,
      lastName: addr.lastName,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      phone: addr.phone
    }));
  };

  const handleCompleteOrder = () => {
    // Save address if checked
    if (formData.saveAddress) {
      addAddress({
        title: `${formData.city} Address`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        phone: formData.phone,
        isDefault: false
      });
    }

    // Trigger Confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Place Order
    const cleanCardNum = (cardData.number || '').replace(/\s+/g, '');
    const paymentName =
      paymentType === 'card'
        ? `${getCardBrand(cardData.number)} ending in ${cleanCardNum.slice(-4) || '••••'}`
        : paymentType === 'paypal'
        ? 'PayPal Account'
        : paymentType === 'applepay'
        ? 'Apple Pay'
        : 'VELORA Gift Card';

    placeOrder({
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      },
      paymentMethodName: paymentName
    });
  };

  const subtotal = getCartSubtotal();
  const discount = getVoucherDiscount();
  const shippingCost = getShippingCost();
  const tax = getTax();
  const giftCredit = getGiftCardCredit();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="container checkout-container animate-fade-in">
        <div className="step-box glass-panel text-center">
          <h3>Your bag is empty</h3>
          <p className="text-muted mt-2">Add a few products before checking out.</p>
          <button className="btn btn-primary mt-4" onClick={() => setCurrentView('catalog')}>
            <ArrowLeft size={16} /> Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-container animate-fade-in">
      {/* Top Breadcrumb Header */}
      <div className="checkout-top-bar">
        <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('catalog')}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>
        <div className="checkout-logo">
          <span>▲ VELORA CHECKOUT</span>
        </div>
        <div className="security-tag text-muted">
          <Lock size={14} className="text-success" /> 256-Bit SSL Encrypted
        </div>
      </div>

      {/* Checkout Step Stepper Bar */}
      <div className="stepper-bar glass-panel">
        <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-num">{step > 1 ? <Check size={14} /> : 1}</div>
          <span>1. Shipping Address</span>
        </div>
        <div className="step-connector" />
        <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-num">{step > 2 ? <Check size={14} /> : 2}</div>
          <span>2. Delivery Method</span>
        </div>
        <div className="step-connector" />
        <div className={`step-item ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
          <div className="step-num">{step > 3 ? <Check size={14} /> : 3}</div>
          <span>3. Payment Integration</span>
        </div>
        <div className="step-connector" />
        <div className={`step-item ${step >= 4 ? 'active' : ''}`}>
          <div className="step-num">4</div>
          <span>4. Review Order</span>
        </div>
      </div>

      {/* Main Checkout Content Grid */}
      <div className="checkout-grid">
        {/* Left Interactive Form Column */}
        <div className="checkout-form-col">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="step-box glass-panel animate-fade-in">
              <div className="step-box-header">
                <MapPin size={20} className="text-accent" />
                <h3>1. Select or Enter Shipping Address</h3>
              </div>

              {/* Saved Address Book Selector */}
              {user.addresses && user.addresses.length > 0 && (
                <div className="address-book-picker">
                  <label className="picker-label">Saved Address Book:</label>
                  <div className="address-cards-grid">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`addr-picker-card ${selectedAddrId === addr.id ? 'selected' : ''}`}
                        onClick={() => handleSelectAddress(addr)}
                      >
                        <div className="addr-card-header">
                          <strong>{addr.title}</strong>
                          {addr.isDefault && <span className="default-tag">Default</span>}
                        </div>
                        <p>{addr.firstName} {addr.lastName}</p>
                        <p className="text-muted">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <hr className="divider" />

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="address-form-grid">
                <div className="form-group full-width">
                  <label>Contact Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>State / Province</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Zip / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <select
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.saveAddress}
                      onChange={e => setFormData({ ...formData, saveAddress: e.target.checked })}
                    />
                    <span>Save this address to my Address Book for future fast checkout</span>
                  </label>
                </div>

                <div className="form-actions-bar">
                  <button type="submit" className="btn btn-accent btn-lg flex-1">
                    Continue to Delivery Method <ChevronRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: SHIPPING METHOD */}
          {step === 2 && (
            <div className="step-box glass-panel animate-fade-in">
              <div className="step-box-header">
                <Truck size={20} className="text-accent" />
                <h3>2. Select Delivery Option</h3>
              </div>

              <div className="shipping-options-list">
                {[
                  {
                    id: 'std',
                    name: 'Standard Express Shipping',
                    time: '2 - 4 Business Days',
                    cost: 5.00,
                    badge: 'POPULAR'
                  },
                  {
                    id: 'prio',
                    name: 'Priority Overnight Air Shipping',
                    time: '1 Business Day Guaranteed',
                    cost: 15.00,
                    badge: 'FASTEST'
                  },
                  {
                    id: 'eco',
                    name: 'Eco Carbon-Neutral Delivery',
                    time: '5 - 7 Business Days',
                    cost: 0.00,
                    badge: 'ECO FRIENDLY'
                  }
                ].map((option) => (
                  <div
                    key={option.id}
                    className={`shipping-option-card ${shippingMethod.id === option.id ? 'selected' : ''}`}
                    onClick={() => setShippingMethod(option)}
                  >
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={shippingMethod.id === option.id}
                      onChange={() => setShippingMethod(option)}
                    />
                    <div className="option-info">
                      <div className="option-header-row">
                        <strong>{option.name}</strong>
                        <span className="badge badge-primary">{option.badge}</span>
                      </div>
                      <span className="option-time text-muted">{option.time}</span>
                    </div>
                    <div className="option-cost">
                      {option.cost === 0 || (option.id === 'std' && subtotal >= 100) ? 'FREE' : formatPrice(option.cost)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions-bar mt-6">
                <button className="btn btn-outline" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button className="btn btn-accent btn-lg flex-1" onClick={() => setStep(3)}>
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT INTEGRATION */}
          {step === 3 && (
            <div className="step-box glass-panel animate-fade-in">
              <div className="step-box-header">
                <CreditCard size={20} className="text-accent" />
                <h3>3. Choose Payment Method</h3>
              </div>

              <div className="payment-tabs-row">
                <button
                  type="button"
                  className={`pay-tab ${paymentType === 'card' ? 'active' : ''}`}
                  onClick={() => { setPaymentType('card'); setCardErrors({}); }}
                >
                  <CreditCard size={16} /> Credit / Debit Card
                </button>
                <button
                  type="button"
                  className={`pay-tab ${paymentType === 'paypal' ? 'active' : ''}`}
                  onClick={() => { setPaymentType('paypal'); setCardErrors({}); }}
                >
                  <span>PayPal</span>
                </button>
                <button
                  type="button"
                  className={`pay-tab ${paymentType === 'applepay' ? 'active' : ''}`}
                  onClick={() => { setPaymentType('applepay'); setCardErrors({}); }}
                >
                  <Smartphone size={16} /> Apple Pay
                </button>
                <button
                  type="button"
                  className={`pay-tab ${paymentType === 'giftcard' ? 'active' : ''}`}
                  onClick={() => { setPaymentType('giftcard'); setCardErrors({}); }}
                >
                  <Gift size={16} /> Gift Card
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentType === 'card' && (
                <div className="card-payment-view mt-4">
                  <div className="card-demo-header">
                    <span className="text-sm font-semibold text-secondary">
                      Debit / Credit / Visa Card Details
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs demo-fill-btn"
                      onClick={fillDemoCard}
                      title="Quick fill sample Visa credentials for testing"
                    >
                      <Sparkles size={13} className="text-accent" /> Fill Demo Visa Card
                    </button>
                  </div>

                  {/* Top Validation Alert if there are errors */}
                  {Object.keys(cardErrors).length > 0 && (
                    <div className="payment-alert-error animate-fade-in">
                      <AlertCircle size={17} />
                      <span>Please enter complete debit, credit, or Visa card details to proceed.</span>
                    </div>
                  )}

                  {/* Live Credit Card Component */}
                  <div className="visual-credit-card">
                    <div className="card-top-row">
                      <div className="card-chip-icon">⚡</div>
                      <span className="card-brand-badge">
                        {getCardBrand(cardData.number)}
                      </span>
                    </div>
                    <div className="card-number-display">
                      {cardData.number || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-bottom-row">
                      <div>
                        <span className="card-label">CARDHOLDER</span>
                        <span className="card-val">{cardData.name.toUpperCase() || 'FULL NAME'}</span>
                      </div>
                      <div>
                        <span className="card-label">EXPIRES</span>
                        <span className="card-val">{cardData.expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-inputs-grid mt-4">
                    <div className={`form-group full-width ${cardErrors.number ? 'has-error' : ''}`}>
                      <label>Card Number (Visa, Mastercard, Amex)</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                      />
                      {cardErrors.number && (
                        <span className="field-error-text">
                          <AlertCircle size={13} /> {cardErrors.number}
                        </span>
                      )}
                    </div>
                    <div className={`form-group ${cardErrors.name ? 'has-error' : ''}`}>
                      <label>Name on Card</label>
                      <input
                        type="text"
                        placeholder="e.g. Jane Doe"
                        value={cardData.name}
                        onChange={handleNameChange}
                      />
                      {cardErrors.name && (
                        <span className="field-error-text">
                          <AlertCircle size={13} /> {cardErrors.name}
                        </span>
                      )}
                    </div>
                    <div className={`form-group ${cardErrors.expiry ? 'has-error' : ''}`}>
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                      />
                      {cardErrors.expiry && (
                        <span className="field-error-text">
                          <AlertCircle size={13} /> {cardErrors.expiry}
                        </span>
                      )}
                    </div>
                    <div className={`form-group ${cardErrors.cvc ? 'has-error' : ''}`}>
                      <label>CVC Security Code</label>
                      <input
                        type="password"
                        placeholder="CVC"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={handleCvcChange}
                      />
                      {cardErrors.cvc && (
                        <span className="field-error-text">
                          <AlertCircle size={13} /> {cardErrors.cvc}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {paymentType === 'paypal' && (
                <div className="mock-paypal-box text-center p-6 glass-panel mt-4">
                  <span className="paypal-logo text-accent font-bold text-xl">PayPal Express</span>
                  <p className="text-muted mt-2">You will be redirected to PayPal to authorize payment securely.</p>
                  <button type="button" className="btn btn-primary mt-4" onClick={() => setStep(4)}>
                    Authorize PayPal Payment
                  </button>
                </div>
              )}

              {paymentType === 'applepay' && (
                <div className="mock-applepay-box text-center p-6 glass-panel mt-4">
                  <Smartphone size={36} className="mx-auto text-accent mb-2" />
                  <h4>Apple Pay Instant Touch / FaceID</h4>
                  <p className="text-muted mt-1">Pay quickly using saved Apple Wallet cards.</p>
                  <button type="button" className="btn btn-primary mt-4" onClick={() => setStep(4)}>
                    Pay with Apple Pay
                  </button>
                </div>
              )}

              {paymentType === 'giftcard' && (
                <div className="mock-giftcard-box p-4 glass-panel mt-4">
                  <h4>Redeem a VELORA Gift Card</h4>
                  <p className="text-muted text-sm mt-1">Gift card credit is applied after tax. Any remainder is charged to your card.</p>
                  <div className="gift-card-list mt-2">
                    {user.giftCards.map(card => {
                      const isApplied = appliedGiftCard === card.code;
                      return (
                        <div key={card.code} className={`gift-card-balance-card ${isApplied ? 'applied' : ''}`}>
                          <div>
                            <strong>{card.code}</strong>
                            <span className="text-muted text-sm block">Expires {card.expiry}</span>
                          </div>
                          <span className="badge badge-gold">{formatPrice(card.currentBalance)}</span>
                          {isApplied ? (
                            <button type="button" className="btn btn-outline btn-sm" onClick={removeGiftCard}>Remove</button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              disabled={card.currentBalance <= 0}
                              onClick={() => applyGiftCard(card.code)}
                            >
                              Apply
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="form-actions-bar mt-6">
                <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  className="btn btn-accent btn-lg flex-1"
                  onClick={handleProceedToReview}
                >
                  Review Order Details <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PLACE ORDER */}
          {step === 4 && (
            <div className="step-box glass-panel animate-fade-in">
              <div className="step-box-header">
                <CheckCircle2 size={20} className="text-success" />
                <h3>4. Final Review & Place Order</h3>
              </div>

              <div className="review-summary-blocks">
                <div className="review-block">
                  <span className="block-title">Shipping Address:</span>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.street}, {formData.city}, {formData.state} {formData.zip}</p>
                  <button onClick={() => setStep(1)} className="btn-link">Edit Address</button>
                </div>

                <div className="review-block">
                  <span className="block-title">Delivery Method:</span>
                  <p>{shippingMethod.name} ({shippingMethod.time})</p>
                  <button onClick={() => setStep(2)} className="btn-link">Edit Delivery</button>
                </div>

                <div className="review-block">
                  <span className="block-title">Payment Method:</span>
                  <p>
                    {paymentType === 'card'
                      ? `${getCardBrand(cardData.number)} (${(cardData.number || '').replace(/\s+/g, '').slice(-4) || '••••'})`
                      : paymentType === 'paypal'
                      ? 'PayPal Express'
                      : paymentType === 'applepay'
                      ? 'Apple Pay'
                      : 'VELORA Gift Card'}
                  </p>
                  <button onClick={() => setStep(3)} className="btn-link">Edit Payment</button>
                </div>
              </div>

              <button
                className="btn btn-accent btn-lg w-full mt-6 place-order-btn"
                onClick={handleCompleteOrder}
              >
                <Lock size={18} /> Complete Purchase — {formatPrice(total)}
              </button>
            </div>
          )}
        </div>

        {/* Right Order Summary Sidebar */}
        <div className="checkout-summary-col">
          <div className="order-summary-card glass-panel sticky-summary">
            <h3>Order Summary</h3>

            <div className="summary-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item-row">
                  <img src={item.product.images?.[0] || item.product.image || ''} alt={item.product.name} />
                  <div className="item-meta">
                    <span className="item-title">{item.product.name}</span>
                    <span className="item-sub">{item.variant.name} × {item.quantity}</span>
                  </div>
                  <span className="item-price">{formatPrice(item.variant.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <hr className="divider" />

            <div className="summary-calculations">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="calc-row text-success">
                  <span>Discount ({appliedVoucher?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="calc-row">
                <span>Shipping ({shippingMethod.name})</span>
                <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>

              <div className="calc-row">
                <span>Estimated Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              {giftCredit > 0 && (
                <div className="calc-row text-success">
                  <span>Gift card ({appliedGiftCard})</span>
                  <span>-{formatPrice(giftCredit)}</span>
                </div>
              )}

              <div className="calc-row total-calc">
                <span>Total Due</span>
                <span className="total-val">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
