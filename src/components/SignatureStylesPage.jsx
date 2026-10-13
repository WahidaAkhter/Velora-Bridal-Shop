import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SIGNATURE_GOWNS_PAGES } from '../data/signatureStylesData';
import { Heart, ChevronRight, ArrowLeft } from 'lucide-react';

export const SignatureStylesPage = () => {
  const {
    setCurrentView,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    showToast
  } = useApp();

  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const currentGowns = SIGNATURE_GOWNS_PAGES[currentPage] || SIGNATURE_GOWNS_PAGES[1];

  const handlePageClick = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < 8 ? prev + 1 : 1));
  };

  const handleCardClick = (gown) => {
    const fullProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.slug,
      subtitle: gown.subtitle,
      category: 'signature-styles',
      categoryName: 'Signature Styles',
      price: gown.price,
      originalPrice: gown.originalPrice,
      rating: 5.0,
      reviewCount: 42,
      badge: 'Signature Collection',
      isNew: true,
      stock: 5,
      description: gown.description,
      images: [gown.image, '/images/bridal/hero-salon-bg.jpg'],
      variants: [
        { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
        { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
        { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
        { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
        { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 1, sku: `${gown.id}-10` }
      ],
      attributes: {
        'Silhouette': gown.silhouette,
        'Fabrication': gown.fabric,
        'Neckline': gown.neckline,
        'Origin': 'Handcrafted in Paris Atelier',
        'Fitting Service': 'Complimentary boutique alteration consultation'
      },
      reviews: [
        { id: 'rev-sig-1', name: 'Arabella K.', avatar: '/images/bridal/avatars.png', rating: 5, date: '1 week ago', comment: 'The signature cut is unmatched. Felt so confident and majestic.', verified: true }
      ]
    };

    setSelectedProduct(fullProduct);
  };

  return (
    <div className="signature-styles-page-wrapper">
      {/* Top Breadcrumb Navigation */}
      <div className="signature-breadcrumb-container">
        <button
          className="signature-breadcrumb-link"
          onClick={() => setCurrentView('catalog')}
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="signature-breadcrumb-current">WEDDING DRESSES</span>
        <span className="breadcrumb-divider">/</span>
        <span className="signature-breadcrumb-current highlight">SIGNATURE STYLES</span>
      </div>

      {/* Editorial Header Subtitle (Matching Reference Image) */}
      <div className="signature-editorial-header">
        <p className="signature-editorial-quote">
          There's something truly special about wearing a signature Aura Luxe wedding gown, designed in Australia & Paris.
        </p>
      </div>

      {/* 4-Column Editorial Gowns Grid */}
      <div className="signature-grid-container">
        <div className="signature-gowns-grid">
          {currentGowns.map((gown) => {
            const isWishlisted = wishlist.includes(gown.id);

            return (
              <div
                key={gown.id}
                className="signature-gown-item"
                onClick={() => handleCardClick(gown)}
                role="button"
                tabIndex={0}
                aria-label={`View gown: ${gown.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCardClick(gown);
                }}
              >
                {/* Image Container with Floating Heart Button */}
                <div className="signature-media-wrap">
                  <img
                    src={gown.image}
                    alt={gown.name}
                    className="signature-gown-img"
                    loading="lazy"
                  />

                  {/* Floating Circular Wishlist Heart */}
                  <button
                    type="button"
                    className={`signature-wishlist-circle-btn ${isWishlisted ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(gown.id);
                      showToast(
                        isWishlisted
                          ? `Removed ${gown.name} from Wishlist`
                          : `Saved ${gown.name} to your Wishlist!`
                      );
                    }}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    aria-label={`Wishlist toggle for ${gown.name}`}
                  >
                    <Heart
                      size={15}
                      strokeWidth={2}
                      fill={isWishlisted ? '#D44A4A' : 'none'}
                      color={isWishlisted ? '#D44A4A' : '#7A6965'}
                    />
                  </button>
                </div>

                {/* Minimal All-Caps Centered Name (Matching Reference Image) */}
                <h3 className="signature-gown-title">{gown.name}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls (Matching Reference Image: 1, 2, 3, ..., 8, →) */}
      <div className="signature-pagination-container">
        <div className="signature-pagination-strip">
          <button
            type="button"
            className={`pagination-num-box ${currentPage === 1 ? 'is-active' : ''}`}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
          <button
            type="button"
            className={`pagination-num-box ${currentPage === 2 ? 'is-active' : ''}`}
            onClick={() => handlePageClick(2)}
          >
            2
          </button>
          <button
            type="button"
            className={`pagination-num-box ${currentPage === 3 ? 'is-active' : ''}`}
            onClick={() => handlePageClick(3)}
          >
            3
          </button>
          <span className="pagination-ellipsis">&ndash;</span>
          <button
            type="button"
            className={`pagination-num-box ${currentPage === 8 ? 'is-active' : ''}`}
            onClick={() => handlePageClick(8)}
          >
            8
          </button>
          <button
            type="button"
            className="pagination-num-box next-arrow"
            onClick={handleNextPage}
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
