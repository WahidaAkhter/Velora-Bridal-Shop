import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
// Layout Components
import { Header, Footer } from './components/layout';

// Storefront Sections
import {
  HeroBanner,
  ShopByColor,
  FeaturedCollection,
  EditorialSplitBanner,
  DreamDressBanner
} from './components/sections';

// Catalog & Product Components
import { ProductGrid } from './components/product';

// Pages
import {
  AccountPage,
  CheckoutPage,
  QuickShipPage,
  SignatureStylesPage,
  LegacyCollectionPage
} from './pages';

// Modals & Drawers
import {
  AppointmentModal,
  AuthModal,
  CartDrawer,
  OrderConfirmationModal,
  ProductDetailModal,
  WeddingDressFeatureModal
} from './components/modals';

// Common / UI
import { Toast, SeoHead } from './components/common';
import { ArrowUp } from 'lucide-react';
import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/motion.css';
import './styles/responsive.css';
import './styles/luxe-bridal.css';

const MainContent = () => {
  const {
    currentView,
    selectedProduct,
    setSelectedProduct,
    quickViewProduct,
    setQuickViewProduct,
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    activeWeddingDressOption,
    setActiveWeddingDressOption,
    selectedOrderDetails,
    setSelectedOrderDetails,
    isCartOpen,
    setIsCartOpen,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useApp();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const anyOverlayOpen = Boolean(
    selectedProduct || quickViewProduct || selectedOrderDetails || isCartOpen || isAppointmentModalOpen || activeWeddingDressOption || isAuthModalOpen
  );

  // Escape closes the top-most overlay
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (isAuthModalOpen) setIsAuthModalOpen(false);
      else if (activeWeddingDressOption) setActiveWeddingDressOption(null);
      else if (selectedOrderDetails) setSelectedOrderDetails(null);
      else if (isAppointmentModalOpen) setIsAppointmentModalOpen(false);
      else if (quickViewProduct) setQuickViewProduct(null);
      else if (selectedProduct) setSelectedProduct(null);
      else if (isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    activeWeddingDressOption,
    selectedOrderDetails,
    isAppointmentModalOpen,
    quickViewProduct,
    selectedProduct,
    isCartOpen,
    isAuthModalOpen,
    setActiveWeddingDressOption,
    setSelectedOrderDetails,
    setIsAppointmentModalOpen,
    setQuickViewProduct,
    setSelectedProduct,
    setIsCartOpen,
    setIsAuthModalOpen
  ]);

  // Lock background scroll while an overlay is open
  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen ? 'hidden' : '';
  }, [anyOverlayOpen]);

  // Scroll to top on view change; show back-to-top button after scrolling
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentView]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app-main-layout">
      <SeoHead />
      
      {/* 1. Header with Top Announcement Bar & Main Navbar */}
      <Header />

      <main className="main-content-body">
        {currentView === 'catalog' && (
          <div className="luxe-storefront-page">
            {/* 2. Hero Section */}
            <HeroBanner />

            {/* 3. Shop By Color Grid */}
            <ShopByColor />

            {/* 4. Featured Collection Grid */}
            <FeaturedCollection />

            {/* 5. Editorial Split Banner ("Fall in Love" & "Forever After" - Lulus Reference) */}
            <EditorialSplitBanner />

            {/* 6. Dream Dress Banner Card */}
            <DreamDressBanner />
          </div>
        )}

        {currentView === 'all-dresses' && <ProductGrid />}
        {(currentView === 'new-dresses' || currentView === 'legacy-collection') && <LegacyCollectionPage />}
        {currentView === 'signature-styles' && <SignatureStylesPage />}
        {currentView === 'quick-ship' && <QuickShipPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'account' && <AccountPage />}
      </main>

      {/* 7. Footer Strip */}
      <Footer />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {quickViewProduct && (
        <ProductDetailModal
          key={`qv-${quickViewProduct.id}`}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
      {isAppointmentModalOpen && (
        <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
      )}
      {selectedOrderDetails && (
        <OrderConfirmationModal
          order={selectedOrderDetails}
          onClose={() => setSelectedOrderDetails(null)}
        />
      )}

      {/* Luxury Wedding Dress Feature & Silhouette Showcase */}
      <WeddingDressFeatureModal />

      <AuthModal />
      <CartDrawer />
      <Toast />

      {showBackToTop && !anyOverlayOpen && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
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
