import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';

/** Bottom navigation shown only on small screens (see responsive.css). */
export const MobileTabBar = () => {
  const {
    currentView, setCurrentView, accountTab, setAccountTab,
    setSelectedCategory, setIsCartOpen, isCartOpen, cartItems, wishlist
  } = useApp();

  const cartCount = cartItems.reduce((a, b) => a + b.quantity, 0);

  const tabs = [
    {
      id: 'shop', label: 'Shop', icon: Home,
      active: currentView === 'catalog' && !isCartOpen,
      onClick: () => { setSelectedCategory('all'); setCurrentView('catalog'); setIsCartOpen(false); }
    },
    {
      id: 'search', label: 'Search', icon: Search, active: false,
      onClick: () => window.dispatchEvent(new Event('aura:open-search'))
    },
    {
      id: 'wishlist', label: 'Saved', icon: Heart, badge: wishlist.length,
      active: currentView === 'account' && accountTab === 'wishlist' && !isCartOpen,
      onClick: () => { setCurrentView('account'); setAccountTab('wishlist'); setIsCartOpen(false); }
    },
    {
      id: 'bag', label: 'Bag', icon: ShoppingBag, badge: cartCount, active: isCartOpen,
      onClick: () => setIsCartOpen(true)
    },
    {
      id: 'account', label: 'Account', icon: User,
      active: currentView === 'account' && accountTab !== 'wishlist' && !isCartOpen,
      onClick: () => { setCurrentView('account'); setAccountTab('overview'); setIsCartOpen(false); }
    }
  ];

  return (
    <nav className="mobile-tabbar glass-panel" aria-label="Mobile navigation">
      {tabs.map(({ id, label, icon: Icon, active, onClick, badge }) => (
        <button
          key={id}
          className={`tabbar-item ${active ? 'active' : ''}`}
          onClick={onClick}
          aria-current={active ? 'page' : undefined}
        >
          <span className="tabbar-icon">
            <Icon size={21} strokeWidth={active ? 2.4 : 1.9} />
            {badge > 0 && <span key={badge} className="tabbar-badge badge-bump">{badge}</span>}
          </span>
          <span className="tabbar-label">{label}</span>
        </button>
      ))}
    </nav>
  );
};
