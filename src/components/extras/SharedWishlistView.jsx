import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Compass, Eye } from 'lucide-react';

export const SharedWishlistView = ({ sharedData, onDismiss }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    setSelectedProduct,
    setCurrentView,
    showToast
  } = useApp();

  const products = sharedData?.products || [];
  const curatorName = sharedData?.name || '';

  const handleClearUrlAndNavigate = (targetView = 'all-dresses') => {
    try {
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (err) {
      console.warn('history.replaceState error:', err);
    }
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddAllToBag = () => {
    if (products.length === 0) return;

    products.forEach((product) => {
      const defaultVariant = Array.isArray(product.variants) && product.variants.length > 0
        ? product.variants[0]
        : null;
      addToCart(product, defaultVariant, 1);
    });

    showToast(`Added ${products.length} bridal gowns to your bag!`);
  };

  const handleSaveToMyWishlist = () => {
    if (products.length === 0) return;

    let addedCount = 0;
    products.forEach((product) => {
      if (!wishlist.includes(product.id)) {
        toggleWishlist(product.id);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      showToast(`Saved ${addedCount} gowns to your wishlist!`);
    } else {
      showToast('All gowns are already in your wishlist', 'info');
    }
  };

  return (
    <div className="velora-shared-wishlist-page animate-fade-in" role="region" aria-label="Shared Wishlist">
      <div className="velora-shared-hero">
        <span className="velora-shared-kicker">CURATED BRIDAL SELECTION</span>
        <h1 className="velora-shared-title">
          {curatorName ? `${curatorName}’s Wishlist` : 'Shared Bridal Wishlist'}
        </h1>
        <p className="velora-shared-desc">
          {curatorName
            ? `${curatorName} has invited you to view their curated selection of haute-couture bridal designs.`
            : 'Explore this privately shared collection of hand-picked luxury bridal gowns and accessories.'}
        </p>

        {/* Action Button Bar */}
        <div className="velora-shared-action-bar">
          <button
            type="button"
            className="velora-shared-btn velora-shared-btn-primary"
            onClick={handleAddAllToBag}
          >
            <ShoppingBag size={18} />
            <span>Add All to Bag ({products.length})</span>
          </button>

          <button
            type="button"
            className="velora-shared-btn velora-shared-btn-secondary"
            onClick={handleSaveToMyWishlist}
          >
            <Heart size={18} />
            <span>Save to My Wishlist</span>
          </button>

          <button
            type="button"
            className="velora-shared-btn velora-shared-btn-outline"
            onClick={() => handleClearUrlAndNavigate('all-dresses')}
          >
            <Compass size={18} />
            <span>Browse All Dresses</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="velora-shared-grid-wrap">
        <div className="velora-shared-grid">
          {products.map((product) => {
            const img = product.images?.[0] || product.image || '/images/bridal/hero-bride-clean.jpg';
            const price = product.price ?? product.variants?.[0]?.price ?? 0;
            const isSaved = wishlist.includes(product.id);

            return (
              <article key={product.id} className="velora-shared-card">
                <div className="velora-shared-card-media" onClick={() => setSelectedProduct(product)}>
                  <img src={img} alt={product.name} className="velora-shared-card-img" loading="lazy" />
                  <span className="velora-shared-quick-view">
                    <Eye size={14} /> Quick View
                  </span>
                </div>

                <div className="velora-shared-card-body">
                  <span className="velora-shared-card-cat">
                    {product.categoryName || product.silhouette || 'Haute Couture'}
                  </span>
                  <h3 className="velora-shared-card-name" onClick={() => setSelectedProduct(product)}>
                    {product.name}
                  </h3>
                  {product.subtitle && (
                    <p className="velora-shared-card-subtitle">{product.subtitle}</p>
                  )}
                  <span className="velora-shared-card-price">{formatPrice(price)}</span>

                  <div className="velora-shared-card-actions">
                    <button
                      type="button"
                      className="velora-shared-card-add-btn"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                    <button
                      type="button"
                      className={`velora-shared-card-heart-btn ${isSaved ? 'is-saved' : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                      title={isSaved ? 'Remove from your wishlist' : 'Save to your wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart size={16} fill={isSaved ? '#BCA07E' : 'none'} stroke={isSaved ? '#BCA07E' : 'currentColor'} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
