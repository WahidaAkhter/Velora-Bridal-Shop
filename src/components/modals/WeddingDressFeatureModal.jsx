import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WEDDING_DRESS_OPTIONS_DATA } from '../../data/weddingDressesFeatures';
import { WEDDING_DRESS_CATEGORIES } from '../layout/Header';
import {
  X,
  Heart,
  ShoppingBag,
  Eye,
  Calendar,
  Check,
  Ruler,
  BookOpen,
  ArrowRight,
  Compass,
  Scissors
} from 'lucide-react';

export const WeddingDressFeatureModal = () => {
  const {
    activeWeddingDressOption,
    setActiveWeddingDressOption,
    formatPrice,
    addToCart,
    setSelectedProduct,
    setIsAppointmentModalOpen,
    wishlist,
    toggleWishlist,
    showToast,
    setCurrentView,
    setSearchQuery,
    setSelectedCategory
  } = useApp();

  const [measurementUnit, setMeasurementUnit] = useState('in'); // 'in' | 'cm'
  const [activeTabOption, setActiveTabOption] = useState(null);

  // Sync activeTabOption with activeWeddingDressOption
  useEffect(() => {
    setActiveTabOption(activeWeddingDressOption);
  }, [activeWeddingDressOption]);

  if (!activeWeddingDressOption) return null;

  const currentOptionKey = activeTabOption || activeWeddingDressOption;
  const featureData = WEDDING_DRESS_OPTIONS_DATA[currentOptionKey] || {
    category: 'BY SILHOUETTE',
    title: currentOptionKey,
    badge: 'Haute Couture',
    tagline: 'Hand-tailored Parisian bridal craftsmanship',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'Every silhouette in our bridal atelier is crafted with architectural boning and French lace to flatter every bride with grace and poise.',
    stylistNote: 'Pair with an heirloom cathedral veil and diamond drop earrings.',
    curatedGowns: []
  };

  // Find the category column for tab pills
  const currentCategory = WEDDING_DRESS_CATEGORIES.find(cat =>
    cat.items.includes(currentOptionKey)
  ) || WEDDING_DRESS_CATEGORIES[1];

  const handleClose = () => {
    setActiveWeddingDressOption(null);
    setActiveTabOption(null);
  };

  const handleOptionSelect = (optionName) => {
    setActiveTabOption(optionName);
    setActiveWeddingDressOption(optionName);
  };

  const handleQuickAdd = (gown) => {
    // Construct product payload for cart
    const cartProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.id,
      subtitle: gown.subtitle,
      category: 'wedding-dresses',
      categoryName: 'Wedding Dresses',
      price: gown.price,
      images: [gown.image],
      description: gown.description,
      variants: [
        {
          id: `${gown.id}-v1`,
          name: 'US Size 4 / Ivory',
          color: 'Ivory',
          colorHex: '#FAF7F2',
          size: 'US 4',
          price: gown.price,
          stock: 3,
          sku: `${gown.id}-04`
        }
      ]
    };

    addToCart(cartProduct, cartProduct.variants[0], 1);
    showToast(`Added ${gown.name} to your Bridal Bag!`);
  };

  const handleViewGown = (gown) => {
    const fullProduct = {
      id: gown.id,
      name: gown.name,
      slug: gown.id,
      subtitle: gown.subtitle,
      category: 'wedding-dresses',
      categoryName: 'Wedding Dresses',
      price: gown.price,
      originalPrice: gown.originalPrice,
      rating: 5.0,
      reviewCount: 32,
      badge: featureData.badge,
      isNew: true,
      stock: 4,
      description: gown.description,
      images: [gown.image, ...(gown.hoverImage ? [gown.hoverImage] : []), featureData.heroImage],
      variants: [
        { id: `${gown.id}-v0`, name: 'US Size 2 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 2', price: gown.price, stock: 2, sku: `${gown.id}-02` },
        { id: `${gown.id}-v1`, name: 'US Size 4 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 4', price: gown.price, stock: 3, sku: `${gown.id}-04` },
        { id: `${gown.id}-v2`, name: 'US Size 6 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 6', price: gown.price, stock: 3, sku: `${gown.id}-06` },
        { id: `${gown.id}-v3`, name: 'US Size 8 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 8', price: gown.price, stock: 2, sku: `${gown.id}-08` },
        { id: `${gown.id}-v4`, name: 'US Size 10 / Ivory', color: 'Ivory', colorHex: '#FAF7F2', size: 'US 10', price: gown.price, stock: 1, sku: `${gown.id}-10` }
      ],
      attributes: {
        'Silhouette': gown.silhouette || featureData.title,
        'Fabrication': gown.fabric || featureData.title,
        'Craftsmanship': 'Handcrafted in Paris Atelier',
        'Train Length': 'Cathedral / Chapel Available',
        'Fitting Service': 'Complimentary boutique alteration consultation'
      },
      reviews: [
        { id: 'rev-1', name: 'Genevieve M.', avatar: '/images/bridal/avatars.png', rating: 5, date: '2 weeks ago', comment: 'Exceeded every single dream. The corset fit and tailoring is extraordinary.', verified: true },
        { id: 'rev-2', name: 'Camille R.', avatar: '/images/bridal/avatars.png', rating: 5, date: '1 month ago', comment: 'The fabric quality is unreal. Felt like absolute royalty on my wedding day.', verified: true }
      ]
    };

    setSelectedProduct(fullProduct);
  };

  return (
    <div className="wedding-feature-modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="wedding-feature-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Navigation & Category Pill Bar */}
        <div className="wedding-feature-modal-header">
          <div className="modal-header-left">
            <span className="modal-category-eyebrow">
              {featureData.isSpecialView === 'size-chart' || currentOptionKey === 'SIZE CHART'
                ? 'ATELIER SIZING & FIT GUIDE'
                : `WEDDING DRESSES • ${featureData.category}`}
            </span>
            <h2 className="modal-feature-title">{featureData.title}</h2>
          </div>

          <button
            className="modal-close-icon-btn"
            onClick={handleClose}
            aria-label="Close feature details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Option Pill Bar (Hidden for Size Chart so only the size chart is displayed without other unrelated buttons) */}
        {featureData.isSpecialView !== 'size-chart' && currentOptionKey !== 'SIZE CHART' && (
          <div className="wedding-feature-pills-bar">
            <div className="pills-scroll-track">
              {currentCategory.items.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className={`feature-pill-btn ${opt === currentOptionKey ? 'is-active' : ''}`}
                  onClick={() => handleOptionSelect(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="wedding-feature-modal-body">
          {/* SPECIAL VIEW 1: SIZE CHART */}
          {featureData.isSpecialView === 'size-chart' ? (
            <div className="special-size-chart-view">
              <div className="size-chart-hero">
                <div className="size-chart-hero-content">
                  <span className="hero-pill-badge">
                    <Ruler size={13} /> {featureData.badge}
                  </span>
                  <h3 className="size-chart-main-heading">Atelier Measurement & Sizing Studio</h3>
                  <p className="size-chart-subtext">{featureData.thought}</p>

                  <div className="unit-toggle-wrap">
                    <span className="unit-toggle-label">Measurement Scale:</span>
                    <div className="unit-toggle-buttons">
                      <button
                        className={`unit-btn ${measurementUnit === 'in' ? 'active' : ''}`}
                        onClick={() => setMeasurementUnit('in')}
                      >
                        Inches (in)
                      </button>
                      <button
                        className={`unit-btn ${measurementUnit === 'cm' ? 'active' : ''}`}
                        onClick={() => setMeasurementUnit('cm')}
                      >
                        Centimeters (cm)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="size-chart-hero-media">
                  <img
                    src={featureData.heroImage}
                    alt="Atelier seamstress fitting bride"
                    className="size-chart-media-img"
                  />
                  <div className="media-overlay-note">
                    <Scissors size={14} /> Made-to-measure bespoke options available in all flagship boutiques
                  </div>
                </div>
              </div>

              {/* Sizing Table */}
              <div className="sizing-table-wrapper">
                <table className="atelier-sizing-table">
                  <thead>
                    <tr>
                      <th>US SIZE</th>
                      <th>UK / AU</th>
                      <th>EU</th>
                      <th>BUST ({measurementUnit})</th>
                      <th>NATURAL WAIST ({measurementUnit})</th>
                      <th>HIGH HIP ({measurementUnit})</th>
                      <th>LOW HIP ({measurementUnit})</th>
                      <th>HOLLOW TO HEM ({measurementUnit})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { us: '0', uk: '4', eu: '32', bust: [32, 81], waist: [24, 61], hHip: [31, 79], lHip: [34.5, 88], hth: [58, 147] },
                      { us: '2', uk: '6', eu: '34', bust: [33, 84], waist: [25, 63.5], hHip: [32, 81], lHip: [35.5, 90], hth: [58.5, 149] },
                      { us: '4', uk: '8', eu: '36', bust: [34, 86.5], waist: [26, 66], hHip: [33, 84], lHip: [36.5, 93], hth: [59, 150] },
                      { us: '6', uk: '10', eu: '38', bust: [35, 89], waist: [27, 68.5], hHip: [34, 86.5], lHip: [37.5, 95], hth: [59.5, 151] },
                      { us: '8', uk: '12', eu: '40', bust: [36, 91.5], waist: [28, 71], hHip: [35, 89], lHip: [38.5, 98], hth: [60, 152] },
                      { us: '10', uk: '14', eu: '42', bust: [37.5, 95], waist: [29.5, 75], hHip: [36.5, 93], lHip: [40, 102], hth: [60, 152] },
                      { us: '12', uk: '16', eu: '44', bust: [39, 99], waist: [31, 79], hHip: [38, 96.5], lHip: [41.5, 105], hth: [60.5, 154] },
                      { us: '14', uk: '18', eu: '46', bust: [41, 104], waist: [33, 84], hHip: [40, 102], lHip: [43.5, 110], hth: [61, 155] },
                      { us: '16', uk: '20', eu: '48', bust: [43, 109], waist: [35, 89], hHip: [42, 107], lHip: [45.5, 116], hth: [61, 155] }
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'even-row' : ''}>
                        <td className="size-highlight">US {row.us}</td>
                        <td>UK {row.uk}</td>
                        <td>EU {row.eu}</td>
                        <td>{measurementUnit === 'in' ? `${row.bust[0]}"` : `${row.bust[1]} cm`}</td>
                        <td>{measurementUnit === 'in' ? `${row.waist[0]}"` : `${row.waist[1]} cm`}</td>
                        <td>{measurementUnit === 'in' ? `${row.hHip[0]}"` : `${row.hHip[1]} cm`}</td>
                        <td>{measurementUnit === 'in' ? `${row.lHip[0]}"` : `${row.lHip[1]} cm`}</td>
                        <td>{measurementUnit === 'in' ? `${row.hth[0]}"` : `${row.hth[1]} cm`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 3-Step Measurement Guide Cards */}
              <div className="measurement-steps-grid">
                <div className="step-card">
                  <div className="step-number">01</div>
                  <h4>Bust Circumference</h4>
                  <p>Measure gently around the fullest part of your bust across the shoulder blades, wearing the exact style of bridal lingerie you intend for your gown.</p>
                </div>
                <div className="step-card">
                  <div className="step-number">02</div>
                  <h4>Natural Waist</h4>
                  <p>Wrap the tape measure around the narrowest part of your waistline, typically 1 to 1.5 inches above your navel. Keep tape comfortably snug, not tight.</p>
                </div>
                <div className="step-card">
                  <div className="step-number">03</div>
                  <h4>Hips & Hollow to Hem</h4>
                  <p>Stand straight with feet together. Measure around the fullest point of your hips. For hem length, measure from collarbone hollow straight down including bridal heel height.</p>
                </div>
              </div>

              <div className="size-chart-footer-cta">
                <button
                  className="btn-atelier-primary"
                  onClick={() => {
                    handleClose();
                    setIsAppointmentModalOpen(true);
                  }}
                >
                  <Calendar size={16} /> Book Private Fitting Consultation
                </button>
              </div>
            </div>
          ) : featureData.isSpecialView === 'lookbooks' ? (
            /* SPECIAL VIEW 2: LOOKBOOKS */
            <div className="special-lookbooks-view">
              <div className="lookbook-intro-bar">
                <span className="hero-pill-badge">
                  <BookOpen size={13} /> {featureData.badge}
                </span>
                <h3 className="lookbook-main-title">Editorial Bridal Lookbooks & Runways</h3>
                <p className="lookbook-desc">{featureData.thought}</p>
              </div>

              <div className="lookbooks-grid">
                {[
                  {
                    title: 'Château de Chantilly, France',
                    season: 'Spring / Summer Haute Couture',
                    image: '/images/bridal/style-basque-waist.jpg',
                    quote: 'Historic 16th-century stone arches framed by French Chantilly lace and structured basque waistlines.',
                    featuredDress: 'The Sovereign Basque Gown'
                  },
                  {
                    title: 'Villa Balbiano, Lake Como',
                    season: 'Mediterranean Solstice Bridal',
                    image: '/images/bridal/style-mermaid.jpg',
                    quote: 'Sculptured hourglass contours reflected in azure waters, draped in cascading silk organza.',
                    featuredDress: 'The Venetian Mermaid Couture'
                  },
                  {
                    title: 'Parisian Grand Ballroom & Opera',
                    season: 'Celestial Starlight Gala',
                    image: '/images/bridal/style-sparkle-beaded.jpg',
                    quote: 'Hand-sewn Swarovski starlight crystals dancing beneath 200-year-old crystal chandeliers.',
                    featuredDress: 'Lumière Crystal Chandelier Gown'
                  },
                  {
                    title: 'Cornish Coastline Sunset',
                    season: 'Barefoot Luxury & Seaside Vows',
                    image: '/images/bridal/style-boho-beach.jpg',
                    quote: 'Featherweight silk chiffon catching golden hour breezes for effortless destination romance.',
                    featuredDress: 'Coastal Bohemian Lace Gown'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="lookbook-editorial-card">
                    <div className="lookbook-card-image-wrap">
                      <img src={item.image} alt={item.title} className="lookbook-card-img" />
                      <span className="lookbook-tag">{item.season}</span>
                    </div>
                    <div className="lookbook-card-content">
                      <h4 className="lookbook-card-title">{item.title}</h4>
                      <p className="lookbook-card-quote">"{item.quote}"</p>
                      <div className="lookbook-card-footer">
                        <span className="featured-dress-label">Featured: <strong>{item.featuredDress}</strong></span>
                        <button
                          className="btn-explore-look"
                          onClick={() => handleOptionSelect('SIGNATURE STYLES')}
                        >
                          Explore Gowns <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STANDARD WEDDING DRESS FEATURE VIEW (Hero Card + Curated Gowns Grid) */
            <div className="standard-feature-content">
              {/* Feature Hero Card */}
              <div className="feature-hero-card">
                <div className="feature-hero-media">
                  <img
                    src={featureData.heroImage}
                    alt={featureData.title}
                    className="feature-hero-img"
                  />
                  <div className="feature-hero-badge-tag">
                    {featureData.badge}
                  </div>
                </div>

                <div className="feature-hero-info">
                  <div className="feature-badge-row">
                    <span className="hero-category-label">{featureData.category}</span>
                    <span className="hero-pill-badge">{featureData.badge}</span>
                  </div>

                  <h3 className="feature-hero-name">{featureData.title}</h3>
                  <p className="feature-hero-tagline">{featureData.tagline}</p>

                  <div className="feature-thought-box">
                    <h5 className="thought-box-title">
                      <Compass size={14} /> Atelier Design Philosophy
                    </h5>
                    <p className="thought-box-body">{featureData.thought}</p>
                  </div>

                  <div className="stylist-note-box">
                    <strong>Stylist's Recommendation:</strong> {featureData.stylistNote}
                  </div>

                  <div className="feature-cta-row">
                    <button
                      className="btn-atelier-primary"
                      onClick={() => {
                        handleClose();
                        setIsAppointmentModalOpen(true);
                      }}
                    >
                      <Calendar size={15} /> Book Fitting for {featureData.title}
                    </button>
                    {currentOptionKey === 'QUICK SHIP STYLES' ? (
                      <button
                        className="btn-atelier-secondary"
                        onClick={() => {
                          handleClose();
                          setCurrentView('quick-ship');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ArrowRight size={15} /> Open Quick Ship Full Page
                      </button>
                    ) : currentOptionKey === 'NEW DRESSES' ? (
                      <button
                        className="btn-atelier-secondary"
                        onClick={() => {
                          handleClose();
                          setCurrentView('new-dresses');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ArrowRight size={15} /> View Legacy Collection
                      </button>
                    ) : (
                      currentOptionKey !== 'SIZE CHART' && currentOptionKey !== 'LOOKBOOKS' && (
                        <button
                          className="btn-atelier-secondary"
                          onClick={() => {
                            handleClose();
                            setSelectedCategory('all');
                            setSearchQuery(featureData.title);
                            setCurrentView('all-dresses');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <ArrowRight size={15} /> Explore All in Gallery
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Curated Gowns for this Feature */}
              {featureData.curatedGowns && featureData.curatedGowns.length > 0 && (
                <div className="curated-gowns-section">
                  <div className="curated-gowns-header">
                    <div>
                      <h4 className="curated-section-title">
                        Curated Gowns: {featureData.title}
                      </h4>
                      <p className="curated-section-subtitle">
                        Hand-selected creations embodying this signature aesthetic
                      </p>
                    </div>
                    <span className="gowns-count-badge">
                      {featureData.curatedGowns.length} Masterpiece{featureData.curatedGowns.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="curated-gowns-grid">
                    {featureData.curatedGowns.map((gown) => {
                      const isWishlisted = wishlist.includes(gown.id);

                      return (
                        <div key={gown.id} className="curated-gown-card">
                          <div className="gown-card-media" onClick={() => handleViewGown(gown)}>
                            <img
                              src={gown.image}
                              alt={gown.name}
                              className="gown-card-img"
                              loading="lazy"
                            />
                            <button
                              type="button"
                              className={`gown-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(gown.id);
                              }}
                              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                              aria-label="Wishlist toggle"
                            >
                              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                            </button>
                            <div className="gown-media-overlay">
                              <span className="gown-view-quick">
                                <Eye size={14} /> Quick View
                              </span>
                            </div>
                          </div>

                          <div className="gown-card-details">
                            <div className="gown-attributes-chips">
                              {gown.silhouette && (
                                <span className="gown-chip">{gown.silhouette}</span>
                              )}
                              {gown.fabric && (
                                <span className="gown-chip">{gown.fabric}</span>
                              )}
                            </div>

                            <h5 className="gown-name" onClick={() => handleViewGown(gown)}>
                              {gown.name}
                            </h5>
                            <p className="gown-subtitle">{gown.subtitle}</p>
                            <p className="gown-desc-text">{gown.description}</p>

                            <div className="gown-card-footer">
                              <div className="gown-pricing">
                                <span className="gown-price-current">
                                  {formatPrice(gown.price)}
                                </span>
                                {gown.originalPrice && (
                                  <span className="gown-price-original">
                                    {formatPrice(gown.originalPrice)}
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                className="btn-gown-add-bag"
                                onClick={() => handleQuickAdd(gown)}
                              >
                                <ShoppingBag size={14} /> Add to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
