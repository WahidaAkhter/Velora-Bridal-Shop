import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const BestSellersSection = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const bestSellers = PRODUCTS.filter(p => p.isBestseller || p.rating >= 4.9).slice(0, 4);

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (bestSellers.length === 0) return null;

  return (
    <section className="merchandising-section best-sellers-section" aria-labelledby="best-sellers-heading">
      <div className="container">
        <div className="section-header flex-between">
          <div>
            <h2 id="best-sellers-heading" className="section-title">Best Sellers</h2>
            <p className="section-desc">Our most coveted minimalist designs, customer-approved worldwide.</p>
          </div>

          <button onClick={handleViewAll} className="btn-link-action">
            Explore All Best Sellers <ArrowRight size={16} />
          </button>
        </div>

        <div className="products-carousel-grid">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
