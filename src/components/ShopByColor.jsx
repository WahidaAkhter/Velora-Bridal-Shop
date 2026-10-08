import React from 'react';
import { useApp } from '../context/AppContext';
import { COLOR_DRESSES, PRODUCTS } from '../data/products';

export const ShopByColor = () => {
  const { setSelectedProduct, setSelectedCategory, setCurrentView } = useApp();

  const handleColorClick = (colorItem) => {
    // Find matching product in catalog
    const matched = PRODUCTS.find(p => p.slug === colorItem.slug) || {
      id: colorItem.id,
      name: `${colorItem.colorName} BRIDAL GOWN`,
      subtitle: colorItem.subtitle,
      category: 'color-collection',
      categoryName: `Color Gowns (${colorItem.colorName})`,
      price: colorItem.price,
      originalPrice: colorItem.price + 250,
      rating: 5.0,
      reviewCount: 32,
      badge: colorItem.colorName,
      isNew: true,
      isBestseller: true,
      stock: 5,
      description: colorItem.description,
      images: [colorItem.image],
      variants: [
        { id: `vc-${colorItem.colorName}-2`, name: `US 2 / ${colorItem.colorName}`, color: colorItem.colorName, colorHex: colorItem.colorHex, size: 'US 2', price: colorItem.price, stock: 2, sku: `C-${colorItem.colorName}-02` },
        { id: `vc-${colorItem.colorName}-4`, name: `US 4 / ${colorItem.colorName}`, color: colorItem.colorName, colorHex: colorItem.colorHex, size: 'US 4', price: colorItem.price, stock: 3, sku: `C-${colorItem.colorName}-04` },
        { id: `vc-${colorItem.colorName}-6`, name: `US 6 / ${colorItem.colorName}`, color: colorItem.colorName, colorHex: colorItem.colorHex, size: 'US 6', price: colorItem.price, stock: 2, sku: `C-${colorItem.colorName}-06` }
      ],
      attributes: {
        'Silhouette': 'A-Line / Ballgown',
        'Fabric': 'Multi-Tiered Soft Tulle & Silk Satin Underlay',
        'Color Tone': colorItem.colorName,
        'Origin': 'Designer Boutique Collection'
      },
      reviews: []
    };
    setSelectedProduct(matched);
  };

  return (
    <section className="luxe-color-section" id="shop-by-color-heading" aria-label="Shop By Color">
      {/* Decorative Section Header */}
      <div className="luxe-ornament-header">
        <span className="ornament-line"></span>
        <span className="ornament-diamond">◇</span>
        <h2 className="ornament-title">SHOP BY COLOR</h2>
        <span className="ornament-diamond">◇</span>
        <span className="ornament-line"></span>
      </div>

      {/* 7 Color Cards Grid */}
      <div className="color-cards-container">
        {COLOR_DRESSES.map((item) => (
          <div
            key={item.id}
            className="color-gown-card"
            onClick={() => handleColorClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleColorClick(item);
            }}
          >
            <div className="color-img-wrapper">
              <img
                src={item.image}
                alt={`${item.colorName} wedding dress`}
                className="color-gown-img"
                loading="lazy"
              />
            </div>
            <span className="color-gown-label">{item.colorName}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByColor;
