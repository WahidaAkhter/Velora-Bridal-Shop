import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { RecentlyViewed } from './components/RecentlyViewed';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SeoHead } from './components/SeoHead';
import { MobileTabBar } from './components/MobileTabBar';
import { ArrowUp } from 'lucide-react';
import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/motion.css';
import './styles/responsive.css';

const MainContent = () => {
  const {
    currentView,
    selectedCategory,
    searchQuery,
    selectedProduct,
    setSelectedProduct,
    quickViewProduct,
    setQuickViewProduct,
    selectedOrderDetails,
    setSelectedOrderDetails,
    isCartOpen,
    setIsCartOpen
  } = useApp();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const anyOverlayOpen = Boolean(selectedProduct || quickViewProduct || selectedOrderDetails || isCartOpen);

  // Escape closes the top-most overlay
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (selectedOrderDetails) setSelectedOrderDetails(null);
      else if (quickViewProduct) setQuickViewProduct(null);
      else if (selectedProduct) setSelectedProduct(null);
      else if (isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedOrderDetails, quickViewProduct, selectedProduct, isCartOpen,
      setSelectedOrderDetails, setQuickViewProduct, setSelectedProduct, setIsCartOpen]);

  // Lock background scroll while an overlay is open
  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen ? 'hidden' : '';
  }, [anyOverlayOpen]);

  // Scroll to top on view change; show back-to-top button after scrolling
  useEffect(() => { window.scrollTo({ top: 0 }); }, [currentView]);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app-main-layout">
      <SeoHead />
      <Header />

      <main className="main-content-body">
        {currentView === 'catalog' && (
          <>
            {selectedCategory === 'all' && !searchQuery && <HeroBanner />}
            <ProductGrid />
            <RecentlyViewed />
          </>
        )}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'account' && <AccountPage />}
      </main>

      {/* key forces a fresh modal state when switching to a related product */}
      {selectedProduct && (
        <ProductDetailModal key={selectedProduct.id} product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      {quickViewProduct && (
        <ProductDetailModal key={`qv-${quickViewProduct.id}`} product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
      {selectedOrderDetails && (
        <OrderConfirmationModal order={selectedOrderDetails} onClose={() => setSelectedOrderDetails(null)} />
      )}

      <CartDrawer />
      <Footer />
      <Toast />
      <MobileTabBar />

      {showBackToTop && !anyOverlayOpen && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
