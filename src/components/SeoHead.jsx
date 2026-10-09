import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const SeoHead = () => {
  const { currentView, selectedCategory, selectedProduct, currency } = useApp();

  useEffect(() => {
    let title = 'VELORA — Modern Luxury Storefront';
    let description = 'High-performance modern e-commerce experience. Discover curated apparel, tech, accessories, and home design.';
    let image = '/images/bridal/featured-lace-dream.jpg';

    if (selectedProduct) {
      title = `${selectedProduct.name} | VELORA Storefront`;
      description = selectedProduct.description;
      image = selectedProduct.images[0];
    } else if (currentView === 'checkout') {
      title = 'Secure Checkout | VELORA Storefront';
      description = 'Complete your order with multiple delivery options and card, PayPal, Apple Pay or gift card payment.';
    } else if (currentView === 'account') {
      title = 'My Account & Orders | VELORA Storefront';
      description = 'Manage your saved addresses, order history, wishlist, vouchers and gift cards.';
    } else if (selectedCategory !== 'all') {
      const name = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      title = `${name} Collection | VELORA Storefront`;
      description = `Explore our curated ${selectedCategory} collection featuring bespoke designer wedding dresses.`;
    }

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', new URL(image, window.location.origin).href);
    setMeta('property', 'og:type', selectedProduct ? 'product' : 'website');

    // schema.org Product structured data (Google rich results)
    const existing = document.getElementById('ld-product');
    if (existing) existing.remove();
    if (selectedProduct) {
      const p = selectedProduct;
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-product';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: p.images.map(src => new URL(src, window.location.origin).href),
        sku: p.attributes?.SKU,
        category: p.categoryName,
        brand: { '@type': 'Brand', name: 'VELORA' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: currency.code,
          lowPrice: (Math.min(...p.variants.map(v => v.price)) * currency.rate).toFixed(2),
          highPrice: (Math.max(...p.variants.map(v => v.price)) * currency.rate).toFixed(2),
          offerCount: p.variants.length,
          availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }
      });
      document.head.appendChild(script);
    }
  }, [currentView, selectedCategory, selectedProduct, currency]);

  return null;
};
