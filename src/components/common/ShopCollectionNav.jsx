import React from 'react';
import { useApp } from '../../context/AppContext';

export const SHOP_COLLECTION_TABS = [
  { id: 'all-dresses', label: 'All Gowns', view: 'all-dresses' },
  { id: 'legacy-collection', label: 'Legacy Collection', view: 'new-dresses' },
  { id: 'signature-styles', label: 'Signature Styles', view: 'signature-styles' },
  { id: 'quick-ship', label: 'Quick Ship', view: 'quick-ship' },
  { id: 'all-collections', label: 'All Collections', view: 'all-collections' },
  { id: 'lookbook', label: 'Lookbooks', view: 'lookbook' },
  { id: 'accessories', label: 'Accessories', view: 'accessories' },
  { id: 'our-story', label: 'Our Story', view: 'our-story' }
];

export const ShopCollectionNav = ({ activeTab = 'legacy-collection', className = '' }) => {
  const { setCurrentView, setSelectedCategory, setSearchQuery } = useApp();

  const handleTabClick = (tab) => {
    if (tab.view === 'all-dresses') {
      setSelectedCategory('all');
      if (setSearchQuery) setSearchQuery('');
    } else if (tab.view === 'accessories') {
      setSelectedCategory('accessories');
      if (setSearchQuery) setSearchQuery('');
    }
    setCurrentView(tab.view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`velora-quick-category-tabs ${className}`}
      aria-label="Shop Collection Navigation"
    >
      {SHOP_COLLECTION_TABS.map((tab) => {
        const isActive = activeTab === tab.id || activeTab === tab.view;
        return (
          <button
            key={tab.id}
            type="button"
            className={`velora-cat-tab ${isActive ? 'is-active' : ''}`}
            onClick={() => handleTabClick(tab)}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default ShopCollectionNav;
