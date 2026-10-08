import React from 'react';
import { MapPin, Sparkles, Phone, Search, User, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnnouncementBar = ({ onOpenSearch }) => {
  const {
    cartItems,
    setIsCartOpen,
    wishlist,
    setCurrentView,
    setAccountTab
  } = useApp();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside className="top-utility-bar" aria-label="Store contact, shipping and actions">
      <div className="top-utility-container">
        {/* Left: Boutique Location */}
        <div className="utility-left">
          <MapPin size={13} className="utility-icon" />
          <span>Visit Our Boutique: 123 Bridal Lane, New York, NY 10001</span>
        </div>

        {/* Center: Free Shipping Promotion */}
        <div className="utility-center">
          <Sparkles size={13} className="utility-icon" />
          <span>Free Shipping on Orders Over $150</span>
        </div>

        {/* Right: Phone & Action Icons */}
        <div className="utility-right">
          <div className="utility-phone">
            <Phone size={13} className="utility-icon" />
            <span>(123) 456-7890</span>
          </div>

          <div className="utility-actions">
            {/* Search */}
            <button
              className="utility-btn"
              onClick={onOpenSearch}
              title="Search Bridal Gowns"
              aria-label="Search gowns"
            >
              <Search size={14} />
            </button>

            {/* Account */}
            <button
              className="utility-btn"
              onClick={() => {
                setCurrentView('account');
                setAccountTab('overview');
              }}
              title="Bride Account"
              aria-label="Bride account"
            >
              <User size={14} />
            </button>

            {/* Wishlist */}
            <button
              className="utility-btn"
              onClick={() => {
                setCurrentView('account');
                setAccountTab('wishlist');
              }}
              title="Saved Gowns"
              aria-label={`Wishlist with ${wishlist.length} saved gowns`}
            >
              <Heart size={14} />
              {wishlist.length > 0 && (
                <span className="utility-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag with Count */}
            <button
              className="utility-btn utility-cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="View Bridal Bag"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={14} />
              <span className="cart-num-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
