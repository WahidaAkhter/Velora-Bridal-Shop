import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { COLOR_DRESSES, PRODUCTS } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ShopByColor = () => {
  const { setSelectedProduct } = useApp();
  const [currentIndex, setCurrentIndex] = useState(2); // Start with romantic Blush Pink in center
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollAccRef = useRef(0);
  const lastStepTime = useRef(0);

  const totalColors = COLOR_DRESSES.length;

  // 1. Idle auto-rotate every 6.5 seconds (slower, majestic pace for editorial viewing)
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalColors);
    }, 6500);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, isHovered, totalColors]);

  // 2. Scroll-driven auto-rotation: calm, paced rotation as user scrolls through this section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastScrollY.current = window.scrollY;

    const handleWindowScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) {
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      scrollAccRef.current += delta;
      const now = Date.now();

      // Threshold: 145px of scroll delta triggers smooth card rotation with a 260ms cooldown
      const threshold = 145;
      if (now - lastStepTime.current > 260) {
        if (scrollAccRef.current >= threshold) {
          setCurrentIndex((prev) => (prev + 1) % totalColors);
          scrollAccRef.current = 0;
          lastStepTime.current = now;
        } else if (scrollAccRef.current <= -threshold) {
          setCurrentIndex((prev) => (prev - 1 + totalColors) % totalColors);
          scrollAccRef.current = 0;
          lastStepTime.current = now;
        }
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [totalColors]);

  // 3. Trackpad / mouse-wheel handler over the carousel stage
  const handleStageWheel = (e) => {
    const now = Date.now();
    if (now - lastStepTime.current < 260) return;

    scrollAccRef.current += e.deltaY;
    const threshold = 90;
    if (scrollAccRef.current >= threshold) {
      setCurrentIndex((prev) => (prev + 1) % totalColors);
      scrollAccRef.current = 0;
      lastStepTime.current = now;
    } else if (scrollAccRef.current <= -threshold) {
      setCurrentIndex((prev) => (prev - 1 + totalColors) % totalColors);
      scrollAccRef.current = 0;
      lastStepTime.current = now;
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalColors);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalColors) % totalColors);
  };

  const openProductDetails = (colorItem) => {
    const matched = PRODUCTS.find((p) => p.slug === colorItem.slug) || {
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

  const handleCardClick = (colorItem) => {
    const idx = COLOR_DRESSES.findIndex((c) => c.id === colorItem.id);
    if (idx !== -1) setCurrentIndex(idx);
    openProductDetails(colorItem);
  };

  // Calculate relative offset for continuous rotation
  const getCardOffset = (index) => {
    let diff = (index - currentIndex) % totalColors;
    if (diff > totalColors / 2) diff -= totalColors;
    if (diff < -totalColors / 2) diff += totalColors;
    return diff;
  };

  return (
    <section
      ref={sectionRef}
      className="luxe-color-section editorial-showcase"
      id="shop-by-color-heading"
      aria-label="Editorial Gown Showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="editorial-container">
        {/* The 5-Image Rotating Editorial Showcase */}
        <div className="triptych-stage-wrapper" onWheel={handleStageWheel}>
          {/* Previous Arrow */}
          <button
            className="triptych-nav-arrow arrow-prev"
            onClick={handlePrev}
            aria-label="Previous color gown"
            title="Previous shade"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Stage (5 Visible Images: Far Left, Left, Center, Right, Far Right) */}
          <div className="triptych-stage">
            {COLOR_DRESSES.map((item, idx) => {
              const offset = getCardOffset(idx);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isFarLeft = offset === -2;
              const isFarRight = offset === 2;
              const isVisible = Math.abs(offset) <= 2;

              // Derive CSS slot class
              let slotClass = 'slot-hidden';
              if (isCenter) slotClass = 'slot-center';
              else if (isLeft) slotClass = 'slot-left';
              else if (isRight) slotClass = 'slot-right';
              else if (isFarLeft) slotClass = 'slot-far-left';
              else if (isFarRight) slotClass = 'slot-far-right';

              return (
                <div
                  key={item.id}
                  className={`triptych-card ${slotClass}`}
                  onClick={() => handleCardClick(item)}
                  role="button"
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`${item.colorName} Bridal Gown - ${item.name}. Click to view full details.`}
                  title={`Click to view full details of ${item.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCardClick(item);
                  }}
                >
                  <div className="triptych-img-box">
                    <img
                      src={item.image}
                      alt={`${item.colorName} wedding dress`}
                      className="triptych-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            className="triptych-nav-arrow arrow-next"
            onClick={handleNext}
            aria-label="Next color gown"
            title="Next shade"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Poetic Editorial Story Statement matching Reference Image */}
        <div className="editorial-story-box">
          <p className="editorial-story-quote">
            You've always imagined this moment—one that lives on in photos, memories, and the way you felt wearing the dress. As you step into this new chapter with the person you love, choose a gown that reflects your story and the connection you share. With a wide range of collections and silhouettes, the Luxe Brides family of brands offers something for every bride—fashion-forward designs that are made to be remembered and crafted to stand the test of time.
          </p>
          <div className="editorial-signature">
            <span className="sig-line"></span>
            <span className="sig-text">LUXE BRIDES HAUTE COUTURE</span>
            <span className="sig-line"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByColor;
