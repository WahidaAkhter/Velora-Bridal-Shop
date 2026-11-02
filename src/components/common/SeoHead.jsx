import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ROUTE_SEO, ACCOUNT_TAB_SEO } from '../../data/seoConfig';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export const SeoHead = () => {
  const { currentView, accountTab, selectedCategory, selectedProduct, currency } = useApp();

  useEffect(() => {
    let title = ROUTE_SEO.catalog.title;
    let description = ROUTE_SEO.catalog.description;
    let image = '/images/bridal/featured-lace-dream.jpg';

    if (selectedProduct) {
      title = `${selectedProduct.name} | VELORA Bridal Atelier`;
      description = selectedProduct.description || selectedProduct.subtitle || ROUTE_SEO['all-dresses'].description;
      image = selectedProduct.images?.[0] || selectedProduct.image || image;
    } else if (currentView === 'account') {
      const seo = ACCOUNT_TAB_SEO[accountTab] || ACCOUNT_TAB_SEO.overview;
      title = seo.title;
      description = seo.description;
    } else if (ROUTE_SEO[currentView]) {
      const seo = ROUTE_SEO[currentView];
      title = seo.title;
      description = seo.description;
    } else if (selectedCategory !== 'all') {
      const name = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      title = `${name} Collection | VELORA Atelier`;
      description = `Explore our curated ${selectedCategory} collection featuring bespoke designer wedding dresses.`;
    }

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const canonicalUrl = `${currentOrigin}${currentPath}`;
    const fullImageUrl = new URL(image, currentOrigin).href;

    document.title = title;
    setCanonical(canonicalUrl);
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', fullImageUrl);
    setMeta('property', 'og:type', selectedProduct ? 'product' : 'website');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImageUrl);

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
        image: imagesList.map(src => new URL(src, currentOrigin).href),
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
          availability: (p.stock ?? 10) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: canonicalUrl
        }
      });
      document.head.appendChild(script);
    }
  }, [currentView, accountTab, selectedCategory, selectedProduct, currency]);

  return null;
};
