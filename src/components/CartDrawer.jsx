import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FREE_SHIPPING_THRESHOLD } from '../data/channels';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import { useDelayedUnmount } from '../hooks/useMotion';

export const CartDrawer = () => {
  const {
    isCartOpen, setIsCartOpen, cartItems, updateCartQuantity, removeFromCart,
    getCartSubtotal, getVoucherDiscount, getShippingCost, getTax, getGiftCardCredit, getCartTotal,
    appliedVoucher, applyVoucherCode, removeVoucher, setCurrentView, shippingMethod, formatPrice
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const { shouldRender, isClosing } = useDelayedUnmount(isCartOpen, 280);

  if (!shouldRender) return null;

  const subtotal = getCartSubtotal();
  const discount = getVoucherDiscount();
  const shipping = getShippingCost();
  const tax = getTax();
  const giftCredit = getGiftCardCredit();
  const total = getCartTotal();

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCode = (e) => {
    e.preventDefault();
    setPromoError('');
    if (!inputCode.trim()) return;
    const res = applyVoucherCode(inputCode);
    if (!res.success) setPromoError(res.message);
    else setInputCode('');
  };

  return (
    <div className={`cart-drawer-overlay ${isClosing ? 'is-closing' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className={`cart-drawer glass-panel ${isClosing ? 'is-closing' : 'animate-slide-right'}`} onClick={e => e.stopPropagation()} role="dialog" aria-label="Shopping bag">
        <div className="drawer-header">
          <div className="drawer-title-row">
            <ShoppingBag size={20} className="text-accent" />
            <h3>Shopping Bag</h3>
            <span className="count-pill">({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="close-btn" aria-label="Close bag">
            <X size={20} />
          </button>
        </div>

        {cartItems.length > 0 && (
          <div className="free-ship-meter">
            <div className="free-ship-text">
              <Truck size={15} />
              {remainingForFree > 0 ? (
                <span>Add <strong>{formatPrice(remainingForFree)}</strong> more for free Standard shipping</span>
              ) : (
                <span><strong>You've unlocked free Standard shipping!</strong></span>
              )}
            </div>
            <div className="free-ship-track">
              <div className={`free-ship-fill ${remainingForFree === 0 ? 'done' : ''}`} style={{ width: `${freeShipProgress}%` }} />
            </div>
          </div>
        )}

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-icon-circle"><ShoppingBag size={32} className="text-muted" /></div>
              <h4>Your bag is currently empty</h4>
              <p className="text-muted">Discover our curated artisan products and add items to your cart.</p>
              <button className="btn btn-primary mt-4" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, i) => (
                <div key={item.id} className="cart-item-card cart-item-enter" style={{ '--i': i }}>
                  <img src={item.product.images[0]} alt={item.product.name} className="item-thumb" />
                  <div className="item-details">
                    <span className="item-cat">{item.product.categoryName}</span>
                    <h4 className="item-name">{item.product.name}</h4>
                    <span className="item-variant">{item.variant.name}</span>
                    <div className="item-price-qty-row">
                      <span className="item-price">{formatPrice(item.variant.price * item.quantity)}</span>
                      <div className="small-qty-stepper">
                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={12} /></button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock}
                          title={item.quantity >= item.variant.stock ? 'No more stock for this variant' : ''}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button className="btn-trash" onClick={() => removeFromCart(item.id)} title="Remove item"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="promo-box">
              {appliedVoucher ? (
                <div className="applied-voucher-bar">
                  <div className="voucher-info">
                    <CheckCircle2 size={16} className="text-success" />
                    <div><strong>{appliedVoucher.code}</strong> applied <span className="voucher-desc">({appliedVoucher.description})</span></div>
                  </div>
                  <button onClick={removeVoucher} className="remove-voucher-btn">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="promo-form">
                  <div className="input-with-button">
                    <Tag size={16} className="input-icon" />
                    <input type="text" placeholder="Promo code (e.g. SALEOR20)" value={inputCode} onChange={e => setInputCode(e.target.value)} />
                    <button type="submit" className="btn btn-secondary btn-sm">Apply</button>
                  </div>
                  {promoError && <span className="error-text">{promoError}</span>}
                  <div className="suggested-codes">
                    <span>Try: </span>
                    {['SALEOR20', 'WELCOME10', 'FREESHIP', 'LUXE100'].map(code => (
                      <button key={code} type="button" className="code-chip" onClick={() => {
                        const res = applyVoucherCode(code);
                        setPromoError(res.success ? '' : res.message);
                      }}>{code}</button>
                    ))}
                  </div>
                </form>
              )}
            </div>

            <div className="summary-rows">
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && (
                <div className="summary-row text-success"><span>Discount ({appliedVoucher?.code})</span><span>-{formatPrice(discount)}</span></div>
              )}
              <div className="summary-row">
                <span>Shipping ({shippingMethod.id === 'std' ? 'Standard' : shippingMethod.name})</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="summary-row"><span>Estimated Tax (8%)</span><span>{formatPrice(tax)}</span></div>
              {giftCredit > 0 && (
                <div className="summary-row text-success"><span>Gift card credit</span><span>-{formatPrice(giftCredit)}</span></div>
              )}
              <div className="summary-row total-row"><span>Total</span><span className="total-amount">{formatPrice(total)}</span></div>
            </div>

            <button className="btn btn-accent btn-lg w-full checkout-trigger-btn" onClick={() => { setIsCartOpen(false); setCurrentView('checkout'); }}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
