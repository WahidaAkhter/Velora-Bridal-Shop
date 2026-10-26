import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

export const SmartRecommendations = () => {
  // Deterministic recommendation rules: top-rated items ($4.8+) sorted by review count
  const recommended = PRODUCTS.filter(p => p.rating >= 4.8)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <section className="merchandising-section smart-recommendations-section" aria-labelledby="recommendations-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="recommendations-heading" className="section-title">Recommended For You</h2>
          <p className="section-desc">Handpicked items based on top buyer ratings and organic popularity.</p>
        </div>

        <div className="products-carousel-grid">
          {recommended.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
