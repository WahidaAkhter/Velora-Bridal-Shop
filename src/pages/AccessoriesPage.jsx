import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ACCESSORIES_PAGE_HEADER,
  ACCESSORIES_COLLECTION_CARDS
} from '../data/accessoriesPageData';
import { getAccessoriesData } from '../services/api';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import { ChevronRight } from 'lucide-react';
import '../styles/luxe-bridal.css';

export const AccessoriesPage = () => {
  const {
    setCurrentView,
    setSelectedCategory,
    setSearchQuery
  } = useApp();

  const [headerData, setHeaderData] = useState(ACCESSORIES_PAGE_HEADER);
  const [cardsData, setCardsData] = useState(ACCESSORIES_COLLECTION_CARDS);

  useEffect(() => {
    let mounted = true;
    getAccessoriesData().then((res) => {
      if (mounted && res && res.success && res.data) {
        if (res.data.header) setHeaderData(res.data.header);
        if (res.data.cards) setCardsData(res.data.cards);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCardClick = (card) => {
    if (card.id === 'bridal-belts-sashes' || card.category === 'Belts') {
      setCurrentView('belts-and-sashes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCategory('accessories');
    setSearchQuery(card.filterQuery || '');
    setCurrentView('all-dresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="velora-accessories-page animate-fade-in" id="velora-accessories-top">
      {/* 1. Breadcrumbs */}
      <nav className="velora-breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          className="velora-breadcrumb-link"
          onClick={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Home
        </button>
        <span className="velora-breadcrumb-sep">/</span>
        <span className="velora-breadcrumb-current">Wedding Dress Accessories</span>
      </nav>

      {/* 2. Main Page Title & Editorial Header */}
      <header className="velora-accessories-header">
        <h1 className="velora-accessories-main-title">{headerData?.title || ACCESSORIES_PAGE_HEADER.title}</h1>
        <div className="velora-accessories-rte">
          <p className="velora-accessories-lead">{headerData?.lead || ACCESSORIES_PAGE_HEADER.lead}</p>
          <p className="velora-accessories-body">{headerData?.body || ACCESSORIES_PAGE_HEADER.body}</p>
        </div>
      </header>

      {/* Shop Collection Navigation Tabs */}
      <ShopCollectionNav activeTab="accessories" style={{ margin: '0 auto 28px auto' }} />

      {/* 3. 11 Bridal Accessories Cards (3-Column Desktop Grid) */}
      <section className="velora-accessories-grid-section" aria-label="Wedding Dress Accessories">
        <div className="velora-accessories-grid">
          {(cardsData || []).map((card) => (
            <article
              key={card.id}
              className="velora-acc-card group"
              onClick={() => handleCardClick(card)}
              tabIndex={0}
              role="button"
              aria-label={`Explore ${card.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCardClick(card);
              }}
            >
              {/* Media Container - Pure, Clean Photography */}
              <div className="velora-acc-media">
                <img
                  src={card.image}
                  alt={card.title}
                  className="velora-acc-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    if (card.fallbackImage) {
                      e.currentTarget.src = card.fallbackImage;
                    }
                  }}
                />
              </div>

              {/* Card Caption Info */}
              <div className="velora-acc-info">
                <h2 className="velora-acc-title">
                  <span className="velora-acc-link-text">{card.title}</span>
                  <span className="velora-acc-arrow-wrap">
                    <ChevronRight size={18} className="velora-acc-chevron" />
                  </span>
                </h2>
                <p className="velora-acc-caption">{card.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AccessoriesPage;
