import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const NewArrivalsSection = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const newProducts = PRODUCTS.filter(p => p.isNew);

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (newProducts.length === 0) return null;

  return (
    <section className="merchandising-section new-arrivals-section" aria-labelledby="new-arrivals-heading">
      <div className="container">
        <div className="section-header flex-between">
          <div>
            <div className="section-badge-pill">
              <Sparkles size={13} className="text-gold" />
              <span>JUST RELEASED</span>
            </div>
            <h2 id="new-arrivals-heading" className="section-title">New Arrivals</h2>
            <p className="section-desc">Fresh pieces, just added to the collection.</p>
          </div>

          <button onClick={handleViewAll} className="btn-link-action">
            View All New Arrivals <ArrowRight size={16} />
          </button>
        </div>

        {/* 4 column desktop grid / swipeable slider on mobile */}
        <div className="products-carousel-grid">
          {newProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
