import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

const CATEGORY_MEDIA = {
  accessories: {
    image: '/images/bridal/featured-floral-fantasy.jpg',
    tagline: 'Handcrafted luxury bridal accessories'
  },
  classic: {
    image: '/images/bridal/featured-lace-dream.jpg',
    tagline: 'Royal lace & cathedral trains'
  },
  modern: {
    image: '/images/bridal/featured-modern-romance.jpg',
    tagline: 'Contemporary silhouette gowns'
  },
  home: {
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=800&q=80',
    tagline: 'Architectural ceramics & pour-over sets'
  },
  footwear: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    tagline: 'Recycled ocean knit & Italian suede'
  }
};

export const CategoryDiscovery = () => {
  const { setSelectedCategory, setCurrentView } = useApp();

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoriesToShow = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="category-discovery-section" aria-labelledby="category-heading">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 id="category-heading" className="section-title">Shop by Category</h2>
          </div>
          <p className="section-desc hide-mobile">
            Explore meticulously designed product categories built with sustainable, high-grade materials.
          </p>
        </div>

        <div className="category-cards-grid">
          {categoriesToShow.map((cat, index) => {
            const media = CATEGORY_MEDIA[cat.id] || {
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
              tagline: 'Explore collection'
            };

            const count = PRODUCTS.filter(p => p.category === cat.id).length;

            return (
              <div
                key={cat.id}
                className={`category-card ${index === 0 ? 'card-featured' : ''}`}
                onClick={() => handleCategorySelect(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategorySelect(cat.id);
                  }
                }}
              >
                <div className="category-card-media">
                  <img src={media.image} alt={cat.name} loading="lazy" />
                  <div className="category-overlay"></div>
                </div>

                <div className="category-card-content">
                  <div className="category-meta-top">
                    <span className="category-badge">{count} Items</span>
                  </div>

                  <div className="category-meta-bottom">
                    <h3 className="category-name">{cat.name}</h3>
                    <p className="category-tagline">{media.tagline}</p>

                    <span className="category-cta">
                      Explore Category <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
