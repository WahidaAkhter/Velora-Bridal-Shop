import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

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
    let title = 'VELORA — Luxury Bridal Boutique';
    let description = 'High-performance luxury bridal boutique and couture wedding gowns atelier.';
    let image = '/images/bridal/featured-lace-dream.jpg';

    if (selectedProduct) {
      title = `${selectedProduct.name} | VELORA Storefront`;
      description = selectedProduct.description || selectedProduct.subtitle || description;
      image = selectedProduct.images?.[0] || selectedProduct.image || image;
    } else if (currentView === 'not-found') {
      title = 'Page Not Found | VELORA Storefront';
      description = 'The requested bridal atelier page could not be found.';
    } else if (currentView === 'compare') {
      title = 'Compare Gowns | VELORA Storefront';
      description = 'Compare bridal gowns side by side, evaluating silhouettes, fabrics, necklines, and pricing.';
    } else if (currentView === 'wishlist-shared') {
      title = 'Curated Bridal Wishlist | VELORA Storefront';
      description = 'Explore a hand-picked bridal gown wishlist curated with VELORA haute couture.';
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
    setMeta('property', 'og:url', typeof window !== 'undefined' ? window.location.href : '');
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
      const imagesList = Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : []);
      const variantsList = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [{ price: p.price || 0 }];
      const minPrice = Math.min(...variantsList.map(v => v.price || p.price || 0));
      const maxPrice = Math.max(...variantsList.map(v => v.price || p.price || 0));

      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.description || p.subtitle || '',
        image: imagesList.map(src => new URL(src, window.location.origin).href),
        sku: p.attributes?.SKU || p.id,
        category: p.categoryName || 'Bridal Gowns',
        brand: { '@type': 'Brand', name: 'VELORA' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating || 5.0,
          reviewCount: p.reviewCount || 12
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: currency.code,
          lowPrice: (minPrice * currency.rate).toFixed(2),
          highPrice: (maxPrice * currency.rate).toFixed(2),
          offerCount: variantsList.length,
          availability: (p.stock ?? 10) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }
      });
      document.head.appendChild(script);
    }
  }, [currentView, selectedCategory, selectedProduct, currency]);

  return null;
};
