import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { History } from 'lucide-react';

export const RecentlyViewed = () => {
  const { recentlyViewed, setSelectedProduct, formatPrice } = useApp();

  const items = recentlyViewed
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="container recent-section" aria-labelledby="recent-heading">
      <div className="recent-header">
        <h2 id="recent-heading"><History size={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />Recently viewed</h2>
        <span className="text-muted text-sm">{items.length} item{items.length > 1 ? 's' : ''}</span>
      </div>
      <div className="recent-strip">
        {items.map(p => (
          <button key={p.id} className="recent-card glass-panel" onClick={() => setSelectedProduct(p)}>
            <img src={p.images[0]} alt={p.name} loading="lazy" />
            <span className="related-name">{p.name}</span>
            <span className="related-price">{formatPrice(p.price)}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
