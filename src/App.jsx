import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
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
  LegacyCollectionPage,
  LookbookPage,
  AllCollectionsPage,
  AccessoriesPage,
  BeltsAndSashesPage,
  OurStoryPage,
  SizeChartPage,
  StyleFeaturePage,
  AccessoryCategoryPage,
  CollectionDetailPage,
  RealBridesPage,
  ProductDetailPage,
  ShopRomancePage,
  NotFoundPage,
  ResetPasswordPage
} from './pages';

// Modals & Drawers
import {
  AppointmentModal,
  AuthModal,
  CartDrawer,
  OrderConfirmationModal
} from './components/modals';

// Common / UI
import { Toast, SeoHead } from './components/common';
import { SharedWishlistView } from './components/extras/SharedWishlistView';
import { CompareBar } from './components/extras/CompareBar';
import { CompareView } from './components/extras/CompareView';
import { parseShareUrl, getLegacyWishlistRedirect } from './utils/wishlistShare';
import { ArrowUp } from 'lucide-react';
import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/motion.css';
import './styles/responsive.css';
import './styles/luxe-bridal.css';
import './styles/extras.css';

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentView,
    selectedProduct,
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    selectedOrderDetails,
    setSelectedOrderDetails,
    isCartOpen,
    setIsCartOpen,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useApp();

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Detect old links of the form /?w=... (or any path with ?w=) and redirect to /wishlist/shared?ids=...
  useEffect(() => {
    const redirectUrl = getLegacyWishlistRedirect(location.search);
    if (redirectUrl) {
      navigate(redirectUrl, { replace: true });
    }
  }, [location.search, navigate]);

  const isWishlistSharedRoute = location.pathname === '/wishlist/shared';
  const sharedWishlist = (isWishlistSharedRoute || location.search.includes('ids=') || location.search.includes('w='))
    ? parseShareUrl(location.search)
    : null;

  const anyOverlayOpen = Boolean(
    selectedOrderDetails || isCartOpen || isAppointmentModalOpen || isAuthModalOpen
  );

  // Escape closes the top-most overlay
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (isAuthModalOpen) setIsAuthModalOpen(false);
      else if (selectedOrderDetails) setSelectedOrderDetails(null);
      else if (isAppointmentModalOpen) setIsAppointmentModalOpen(false);
      else if (isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    selectedOrderDetails,
    isAppointmentModalOpen,
    isCartOpen,
    isAuthModalOpen,
    setSelectedOrderDetails,
    setIsAppointmentModalOpen,
    setIsCartOpen,
    setIsAuthModalOpen
  ]);

  // Lock background scroll and mark body while an overlay is open
  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen ? 'hidden' : '';
    document.body.classList.toggle('modal-open', anyOverlayOpen);
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [anyOverlayOpen]);

  // Scroll to top on route change (or smoothly to hash target when present)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

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
        {sharedWishlist?.isShared ? (
          <SharedWishlistView
            sharedData={sharedWishlist}
            onDismiss={() => navigate('/')}
          />
        ) : (
          <>
            {(currentView === 'catalog' || currentView === 'wishlist-shared') && (
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
            {currentView === 'product-detail' && (
              <ProductDetailPage key={selectedProduct?.id || location.pathname} />
            )}
            {(currentView === 'new-dresses' || currentView === 'legacy-collection') && <LegacyCollectionPage />}
            {currentView === 'signature-styles' && <SignatureStylesPage />}
            {currentView === 'romance' && <ShopRomancePage />}
            {currentView === 'quick-ship' && <QuickShipPage />}
            {(currentView === 'lookbook' || currentView === 'lookbooks') && <LookbookPage />}
            {(currentView === 'all-collections' || currentView === 'collections') && <AllCollectionsPage />}
            {(currentView === 'accessories' || currentView === 'wedding-accessories') && <AccessoriesPage />}
            {(currentView === 'belts-and-sashes' || currentView === 'sashes' || currentView === 'bridal-belts-sashes') && <BeltsAndSashesPage />}
            {(currentView === 'our-story' || currentView === 'about' || currentView === 'about-us') && <OurStoryPage />}
            {currentView === 'size-chart' && <SizeChartPage />}
            {currentView === 'style-feature' && <StyleFeaturePage />}
            {currentView === 'accessory-category' && <AccessoryCategoryPage />}
            {currentView === 'collection-detail' && <CollectionDetailPage />}
            {currentView === 'real-brides' && <RealBridesPage />}
            {currentView === 'checkout' && <CheckoutPage />}
            {currentView === 'account' && <AccountPage />}
            {currentView === 'compare' && <CompareView />}
            {currentView === 'reset-password' && <ResetPasswordPage />}
            {currentView === 'not-found' && <NotFoundPage />}
          </>
        )}
      </main>

      {/* 7. Footer Strip */}
      <Footer />

      {/* Modals & Drawers */}
      {isAppointmentModalOpen && (
        <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
      )}
      {selectedOrderDetails && (
        <OrderConfirmationModal
          order={selectedOrderDetails}
          onClose={() => setSelectedOrderDetails(null)}
        />
      )}

      <AuthModal />
      <CartDrawer />
      <CompareBar />
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
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <MainContent />
      </AppProvider>
    </MotionConfig>
  );
}

export default App;
