# VELORA Atelier — Luxury Bridal Haute Couture E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind & Vanilla CSS](https://img.shields.io/badge/Styling-Custom%20Haute%20Couture%20CSS-B76E65?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-Private-black?style=for-the-badge)]()

**VELORA Atelier** is a modern, high-performance luxury bridal boutique and couture wedding gowns storefront. Designed with an editorial French haute-couture aesthetic, the application provides an immersive bridal shopping experience featuring interactive 3D color triptychs, a multi-step bespoke checkout flow, dynamic size guide studios, VIP client portals, and seamless appointment booking.

---

## Table of Contents

- [Key Features](#key-features)
- [Project Architecture & Components (18 UI Modules)](#project-architecture--components-18-ui-modules)
- [Comprehensive Page Directory (12 Live Views)](#comprehensive-page-directory-12-live-views)
- [Detailed Log of Accomplishments & Bug Fixes](#detailed-log-of-accomplishments--bug-fixes)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## Key Features

- **Haute Couture Editorial UI:** Glassmorphism headers, serif typography, high-fashion layout compositions, and smooth micro-interactions.
- **Dynamic Product Detail Modals (PDP):** Multi-angle high-resolution image galleries, real-time variant selectors (Size/Color), live stock tracking, and customer reviews.
- **Interactive Size Chart & Fitting Studio:** Dedicated measurement studio with imperial (inches) and metric (cm) unit toggles, comprehensive US/UK/EU size conversion tables, and 3-step measurement instructions.
- **Slide-in Shopping Bag (Cart Drawer):** Real-time subtotal calculation, free delivery threshold indicator, voucher code application, quantity modifiers, and direct routing to the All Dresses catalog when empty.
- **Robust Multi-Step Checkout:** 
  - Express checkout options (Apple Pay, PayPal, Credit/Debit Card).
  - Strict card validation requiring a 16-digit card number, valid MM/YY expiration date, and 3-digit CVV before payment authorization.
  - Promo code discounts & gift card redemption.
- **VIP Client Sanctuary & Account Portal:**
  - 1-Click instant demo logins for VIP Brides.
  - Active order tracking with visual progress timelines.
  - Printable and downloadable invoice receipts with DHL Express VIP tracking numbers.
  - Saved addresses manager and personalized bridal wishlists.
- **VIP Consultation Booking:** Interactive bridal appointment scheduling with date, time slot, boutique location selectors, and celebratory confetti animations.
- **Curated By Palette (Shop by Color):** Interactive multi-angle color carousel dynamically showcasing gowns in Ivory, Champagne, Blush, and Pearl.
- **Zero-Crash Storefront:** Built with resilient fallbacks for products without pre-configured variant arrays or missing thumbnail sets.

---

## Project Architecture & Components (18 UI Modules)

The application's interface is modularized into **18 distinct UI components** grouped into 5 architectural tiers:

### 1. Modals & Interactive Overlays (6 Components)
| Component | File Path | Description |
| :--- | :--- | :--- |
| **ProductDetailModal** | [`src/components/modals/ProductDetailModal.jsx`](src/components/modals/ProductDetailModal.jsx) | Quick-view modal with zoom gallery, size selection, stock status, reviews, and "Add to Bag". |
| **CartDrawer** | [`src/components/modals/CartDrawer.jsx`](src/components/modals/CartDrawer.jsx) | Slide-over cart with live pricing, free shipping progress bar, promo code input, and "Start Shopping" router. |
| **AppointmentModal** | [`src/components/modals/AppointmentModal.jsx`](src/components/modals/AppointmentModal.jsx) | Boutique fitting appointment scheduler with custom date/time pickers and celebration feedback. |
| **AuthModal** | [`src/components/modals/AuthModal.jsx`](src/components/modals/AuthModal.jsx) | VIP account portal with sign-in, registration, password recovery, and 1-click VIP test profiles. |
| **WeddingDressFeatureModal** | [`src/components/modals/WeddingDressFeatureModal.jsx`](src/components/modals/WeddingDressFeatureModal.jsx) | Dedicated Atelier Size Chart & Measurement Guide with unit toggles and silhouette craftsmanship showcase. |
| **OrderConfirmationModal** | [`src/components/modals/OrderConfirmationModal.jsx`](src/components/modals/OrderConfirmationModal.jsx) | Post-checkout receipt popup displaying order ID, carrier tracking, items list, and invoice download. |

### 2. Homepage Editorial Sections (5 Components)
| Component | File Path | Description |
| :--- | :--- | :--- |
| **HeroBanner** | [`src/components/sections/HeroBanner.jsx`](src/components/sections/HeroBanner.jsx) | Full-width editorial hero with primary CTA buttons and brand storytelling. |
| **FeaturedCollection** | [`src/components/sections/FeaturedCollection.jsx`](src/components/sections/FeaturedCollection.jsx) | Spring 2025 curated romance collection showcase with interactive carousel. |
| **EditorialSplitBanner** | [`src/components/sections/EditorialSplitBanner.jsx`](src/components/sections/EditorialSplitBanner.jsx) | Magazine-style split banner pairing large bridal imagery with atelier philosophy. |
| **ShopByColor** | [`src/components/sections/ShopByColor.jsx`](src/components/sections/ShopByColor.jsx) | Interactive 3D triptych color palette browser (Ivory, Champagne, Pearl, Blush). |
| **DreamDressBanner** | [`src/components/sections/DreamDressBanner.jsx`](src/components/sections/DreamDressBanner.jsx) | High-conversion bridal styling and appointment call-to-action banner. |

### 3. Product Catalog & Listing (2 Components)
| Component | File Path | Description |
| :--- | :--- | :--- |
| **ProductGrid** | [`src/components/product/ProductGrid.jsx`](src/components/product/ProductGrid.jsx) | 4-column responsive gown grid with price filters, search queries, sort dropdowns, and wishlist toggles. |
| **ShopCollectionNav** | [`src/components/common/ShopCollectionNav.jsx`](src/components/common/ShopCollectionNav.jsx) | Horizontal category filter pills (All Dresses, Ballgown, A-Line, Mermaid, Quick-Ship, Accessories). |

### 4. Layout & Navigation (3 Components)
| Component | File Path | Description |
| :--- | :--- | :--- |
| **Header** | [`src/components/layout/Header.jsx`](src/components/layout/Header.jsx) | Glassmorphism sticky navbar with megamenus, live cart counter, search trigger, and VIP status pill. |
| **Footer** | [`src/components/layout/Footer.jsx`](src/components/layout/Footer.jsx) | Boutique flagship locations, newsletter subscription form, customer care links, and social channels. |
| **MobileTabBar** | [`src/components/layout/MobileTabBar.jsx`](src/components/layout/MobileTabBar.jsx) | Fixed bottom bar tailored for mobile devices (Home, Collections, Wishlist, Cart). |

### 5. Feedback & Utility (2 Components)
| Component | File Path | Description |
| :--- | :--- | :--- |
| **Toast** | [`src/components/common/Toast.jsx`](src/components/common/Toast.jsx) | Floating animated toast alerts for cart updates, appointment confirmations, and validation notices. |
| **SeoHead** | [`src/components/common/SeoHead.jsx`](src/components/common/SeoHead.jsx) | Headless runtime manager for document titles, OpenGraph meta tags, and Schema.org JSON-LD. |

---

## Comprehensive Page Directory (12 Live Views)

The storefront operates as a responsive Single Page Application (SPA) driven by `AppContext` state routing:

1. **Home / Catalog (`catalog`):** Full homepage featuring the Hero, Featured Gowns, Editorial Split, Shop by Color, and Dream Dress banner.
2. **All Dresses (`all-dresses`):** Complete collection catalog with live sorting, search filters, and quick category pills.
3. **New Dresses (`new-dresses`):** Fresh Spring/Summer haute-couture runway arrivals.
4. **Signature Styles (`signature-styles`):** Exclusive hand-appliquéd lace masterpieces and architectural basque waists.
5. **Quick Ship Styles (`quick-ship`):** Ready-to-wear gowns crafted for short-timeline weddings.
6. **Lookbooks (`lookbook`):** Runway video showcase, editorial campaign photo shoots, and high-definition lightbox zoom.
7. **All Collections (`all-collections`):** Overview of all curated bridal collections.
8. **Accessories (`accessories`):** Cathedral veils, detachable mikado trains, pearl capes, and bridal boleros.
9. **Belts & Sashes (`belts-and-sashes`):** Crystal-embellished, floral lace, and satin bridal belts.
10. **Our Story (`our-story`):** The atelier's heritage, Parisian atelier history, and craftsmanship video player.
11. **Checkout (`checkout`):** Multi-step checkout with delivery methods, address validation, card verification, and discount vouchers.
12. **Account (`account`):** VIP Atelier Portal featuring active orders, historical order receipts, address management, and wishlists.

---

## Detailed Log of Accomplishments & Bug Fixes

Here is an honest, technical summary of all optimizations, bugs resolved, and features implemented to date:

### 1. Fatal Runtime Exceptions & Bug Fixes
- **Product Detail Modal Crash Fix:** 
  - *Issue:* Clicking gowns in the catalog threw `ReferenceError: reviewsList is not defined` in `ProductDetailModal.jsx` (line 148), crashing the modal.
  - *Fix:* Corrected the reference to `combinedReviews.length` and added safe array checks.
- **Cart & Variant Crash Resolution:**
  - *Issue:* Over 100 gowns in the database lacked a `variants` array. Clicking "Add to Bag" threw `TypeError: Cannot read properties of undefined (reading '0')` in `AppContext.jsx`.
  - *Fix:* Implemented an automatic `defaultVariant` fallback (`Standard Atelier Sizing`, price, stock) and optional chaining `product.variants?.[0]`.
- **Order Placement Image Crash:**
  - *Issue:* Placing an order with products having only a single `image` string instead of an `images` array caused `placeOrder` to crash on `item.product.images[0]`.
  - *Fix:* Standardized fallback `i.product.images?.[0] || i.product.image || ''` across `AppContext.jsx`, `CartDrawer.jsx`, `CheckoutPage.jsx`, and `AccountPage.jsx`.
- **Feature Modal Escape Key Bug:**
  - *Issue:* Pressing `Escape` or the close icon in `WeddingDressFeatureModal.jsx` would not close the modal due to a desynchronized `activeTabOption` state.
  - *Fix:* Synchronized state unmounting and removed residual condition blockers.

### 2. Functional & UX Enhancements
- **Empty Cart Drawer Navigation:**
  - Updated the "Start Shopping" button inside the empty cart drawer to close the drawer, clear filters, and smoothly navigate the user directly to the **"All Dresses"** catalog view (`setCurrentView('all-dresses')`).
- **Dedicated Size Chart View:**
  - In `WeddingDressFeatureModal.jsx`, removed unrelated category pills (`SIGNATURE STYLES`, `ALL DRESSES`, etc.) when viewing the Size Chart. The modal now cleanly displays only the **Atelier Size Chart & Measurement Studio**.
  - Replaced the low-resolution placeholder hero image with a high-definition architectural modern crepe fitting photograph ([`style-modern-crepe.jpg`](public/images/bridal/style-modern-crepe.jpg)).
- **Payment Card Validation:**
  - Enforced strict client-side validation in `CheckoutPage.jsx` ensuring that users cannot authorize credit card payment without supplying a valid 16-digit card number, expiration date, and 3-digit CVV.

### 3. Code Quality & Performance Testing
- **Cross-Component Verification:** Tested all 12 views, forms, modals, and user interaction buttons across desktop, tablet, and mobile breakpoints.
- **Strict Linting & Clean Architecture:** Zero runtime exceptions, comprehensive prop validations, and optimized state handling across all components.

---

## Tech Stack

- **Frontend Core:** [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **FX & Animations:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti), CSS Keyframe Transitions, Glassmorphism
- **Backend / Mock Sync:** Node.js, Express (`server/server.js`) with offline LocalStorage fallback
- **Code Quality:** [Oxlint](https://oxc.rs/)

---

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/WahidaAkhter/e-commerce.git

# Navigate into the project directory
cd e-commerce

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the Vite development server (runs on http://localhost:5173)
npm run dev

# (Optional) Start the Express backend server
npm run server
```

### Production Build
```bash
# Compile and bundle assets for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```text
├── public/
│   └── images/
│       └── bridal/              # Gown assets, editorial photos & colors
├── server/
│   └── server.js                # Express mock backend server
├── src/
│   ├── components/
│   │   ├── common/              # SeoHead, ShopCollectionNav, Toast
│   │   ├── layout/              # Header, Footer, MobileTabBar
│   │   ├── modals/              # CartDrawer, PDP, Auth, Sizing, Appointments
│   │   ├── product/             # ProductGrid, Card displays
│   │   └── sections/            # Hero, Featured, Editorial, ShopByColor
│   ├── context/
│   │   └── AppContext.jsx       # Central state: Cart, User, Orders, Modals
│   ├── data/
│   │   ├── allShopDresses.js    # Complete bridal gown catalog data
│   │   ├── weddingDressesFeatures.js # Sizing chart, silhouettes & craftsmanship
│   │   └── channels.js          # Delivery channels & payment configurations
│   ├── pages/                   # All 12 SPA view components
│   ├── styles/                  # Haute couture custom luxury CSS
│   ├── App.jsx                  # Root layout & modal orchestrator
│   └── main.jsx                 # Vite application entry point
├── package.json
└── README.md
```

---

<div align="center">
  <sub>Crafted with passion for haute-couture bridal elegance. Designed for high performance and luxury shopping experiences.</sub>
</div>
