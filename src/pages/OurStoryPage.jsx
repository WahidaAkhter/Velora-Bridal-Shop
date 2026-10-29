import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  OUR_STORY_SECTIONS,
  OUR_STORY_QA_LIST,
  OUR_STORY_VIP_BANNER
} from '../data/ourStoryData';
import { getOurStoryData } from '../services/api';
import { ShopCollectionNav } from '../components/common/ShopCollectionNav';
import { ChevronDown, Plus, Minus, ArrowRight, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import '../styles/luxe-bridal.css';

export const OurStoryPage = () => {
  const { setCurrentView, setIsAppointmentModalOpen, showToast } = useApp();
  const [openAccordionId, setOpenAccordionId] = useState('qa-1');

  const [storyState, setStoryState] = useState({
    sections: OUR_STORY_SECTIONS,
    faqs: OUR_STORY_QA_LIST,
    vipBanner: OUR_STORY_VIP_BANNER
  });

  useEffect(() => {
    let mounted = true;
    getOurStoryData().then((res) => {
      if (mounted && res && res.success && res.data && res.data.sections) {
        setStoryState(res.data);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleAccordion = (id) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  const scrollToRow = (index) => {
    const el = document.getElementById(`story-row-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="velora-our-story-page animate-fade-in" id="our-story-top">
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
        <span className="velora-breadcrumb-current">Our Story</span>
      </nav>

      {/* 2. Shop Collection Navigation Bar */}
      <ShopCollectionNav activeTab="our-story" style={{ margin: '0 auto 36px auto' }} />

      {/* 3. Main Alternating Story Grid (Exact Match to madilane.com/our-story/ Reference Screenshot) */}
      <div className="madilane-story-grid-container">
        {(storyState.sections || []).map((section, idx) => {
          const isImageLeft = section.layout === 'image-left';

          return (
            <section
              key={section.id}
              id={`story-row-${idx}`}
              className={`madilane-story-row ${isImageLeft ? 'image-on-left' : 'image-on-right'}`}
            >
              {/* Image Column */}
              <div className="madilane-story-col-image">
                <div className="madilane-story-img-wrapper">
                  <img
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    className="madilane-story-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="madilane-story-col-text">
                <div className="madilane-story-text-inner">
                  {/* Optional Pretitle (e.g. "OUR STORY" on row 1) */}
                  {section.kicker && (
                    <span className="madilane-story-kicker">{section.kicker}</span>
                  )}

                  {/* Heading in warm tan/gold serif */}
                  <h2 className="madilane-story-title">{section.title}</h2>

                  {/* Paragraphs (centered text) */}
                  <div className="madilane-story-paragraphs">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="madilane-story-p">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Buttons on row 1 ("VIEW OUR 10-YEAR STORY" & "CONTACT US") */}
                  {section.button && (
                    <div className="madilane-story-btn-wrap" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="madilane-gold-button"
                        onClick={() => scrollToRow(1)}
                      >
                        {section.button.text}
                      </button>
                      <button
                        type="button"
                        className="madilane-outline-contact-btn"
                        onClick={() => {
                          const contactSec = document.getElementById('story-contact-section');
                          if (contactSec) {
                            contactSec.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            setIsAppointmentModalOpen(true);
                          }
                        }}
                      >
                        <Phone size={13} />
                        <span>CONTACT US</span>
                      </button>
                    </div>
                  )}

                  {/* Real Bride Tag / Link */}
                  {section.brideTag && (
                    <div className="madilane-bride-citation">
                      <span className="bride-citation-name">{section.brideTag.name}</span>
                      <span className="bride-citation-sep">—</span>
                      <span className="bride-citation-loc">{section.brideTag.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. Complete Q&A Section Matching Reference Site */}
      <section className="madilane-qa-section" id="story-qa" aria-label="Q&A Section">
        <div className="madilane-qa-container">
          <h2 className="madilane-qa-main-heading">Q&A</h2>

          <div className="madilane-qa-accordion-list">
            {(storyState.faqs || []).map((item) => {
              const isOpen = openAccordionId === item.id;
              return (
                <article
                  key={item.id}
                  className={`madilane-qa-card ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="madilane-qa-header-btn"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`qa-body-${item.id}`}
                  >
                    <span className="madilane-qa-question-title">{item.question}</span>
                    <span className="madilane-qa-icon-wrap">
                      {isOpen ? (
                        <Minus size={18} className="madilane-qa-toggle-icon" />
                      ) : (
                        <Plus size={18} className="madilane-qa-toggle-icon" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className="madilane-qa-content-body animate-accordion-down"
                      id={`qa-body-${item.id}`}
                    >
                      {item.answer && (
                        <p className="madilane-qa-answer-text">{item.answer}</p>
                      )}

                      {item.answerHeader && (
                        <h4 className="madilane-qa-subheading">{item.answerHeader}</h4>
                      )}

                      {item.listItems && (
                        <ul className="madilane-qa-bullet-list">
                          {item.listItems.map((li, liIdx) => (
                            <li key={liIdx} className="madilane-qa-bullet-item">
                              {li}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Quick Ship Notice Callout */}
                      {item.quickShipNotice && (
                        <div className="madilane-qa-quickship-box">
                          <h5 className="quickship-box-title">
                            {item.quickShipNotice.title}
                          </h5>
                          <p className="quickship-box-body">
                            {item.quickShipNotice.body}
                          </p>
                          <button
                            type="button"
                            className="quickship-box-btn"
                            onClick={() => {
                              setCurrentView('quick-ship');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            Explore Quick Ship Gowns
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Dedicated Contact Us Section Inside Our Story */}
      <section className="story-contact-section" id="story-contact-section" aria-label="Contact Our Atelier">
        <div className="story-contact-card">
          <span className="appointment-eyebrow" style={{ color: '#B76E65', letterSpacing: '0.2em' }}>
            ATELIER CONCIERGE & CARE
          </span>
          <h2 className="appointment-title" style={{ fontSize: '32px', margin: '8px 0 14px' }}>
            Get in Touch With Our Atelier
          </h2>
          <p className="appointment-subtitle" style={{ maxWidth: '620px', margin: '0 auto 28px', fontSize: '14px', lineHeight: 1.6 }}>
            Whether you have inquiries regarding custom bridal measurements, bespoke veil pairings,
            or wish to reserve an exclusive styling suite, our master atelier team is delighted to assist you.
          </p>

          {/* Prominent Boutique Address & Concierge Strip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              background: '#FFFFFF',
              border: '1px solid #E2D7CC',
              borderRadius: '999px',
              padding: '10px 26px',
              margin: '0 auto 28px',
              boxShadow: '0 4px 14px rgba(31, 25, 23, 0.04)',
              flexWrap: 'wrap',
              fontSize: '13px',
              color: '#3F312D'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={15} style={{ color: '#B76E65', flexShrink: 0 }} />
              <span>
                <strong>Visit Our Boutique:</strong> 123 Bridal Lane, New York, NY 10001
              </span>
            </div>
            <span style={{ color: '#D4C4B7' }}>•</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={15} style={{ color: '#B76E65', flexShrink: 0 }} />
              <span>
                <strong>Concierge:</strong> (123) 456-7890
              </span>
            </div>
          </div>

          <div className="story-contact-grid">
            <div className="story-contact-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#B76E65' }}>
                <MapPin size={20} />
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1F1917', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Visit Our Boutique
                </h4>
              </div>
              <p style={{ fontSize: '12.5px', color: '#6C5B56', lineHeight: 1.65, margin: 0 }}>
                • <strong>New York Flagship:</strong> 123 Bridal Lane, New York, NY 10001<br />
                • <strong>Paris Atelier:</strong> 18 Rue Saint-Honoré<br />
                • <strong>London Studio:</strong> 45 Mayfair Boulevard<br />
                • <strong>Sydney Showroom:</strong> Gold Coast Design Suite
              </p>
            </div>

            <div className="story-contact-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#B76E65' }}>
                <Phone size={20} />
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1F1917', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Direct Concierge
                </h4>
              </div>
              <p style={{ fontSize: '12.5px', color: '#6C5B56', lineHeight: 1.65, margin: 0 }}>
                • <strong>Concierge Direct:</strong> (123) 456-7890<br />
                • <strong>Toll-Free Hotline:</strong> +1 (800) 892-LUXE<br />
                • <strong>Email:</strong> concierge@velorabridal.com<br />
                • <strong>Hours:</strong> Mon – Sat: 9:00 AM – 7:00 PM EST
              </p>
            </div>

            <div className="story-contact-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#B76E65' }}>
                <Calendar size={20} />
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1F1917', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Bespoke Appointments
                </h4>
              </div>
              <p style={{ fontSize: '12.5px', color: '#6C5B56', lineHeight: 1.65, margin: 0 }}>
                Reserve a private 1-on-1 champagne fitting with Master Bridal Stylist Chloe Laurent at our 123 Bridal Lane boutique or schedule a virtual styling session.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
            <button
              type="button"
              className="madilane-gold-button"
              style={{ padding: '14px 32px', fontSize: '12px' }}
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              BOOK AN ATELIER APPOINTMENT
            </button>
            <a
              href="mailto:concierge@velorabridal.com?subject=Bridal%20Inquiry%20-%20VELORA%20Atelier"
              className="madilane-outline-contact-btn"
              style={{ padding: '14px 32px', fontSize: '12px', textDecoration: 'none' }}
            >
              <Mail size={14} />
              <span>SEND EMAIL INQUIRY</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. VIP Lookbook Banner (Matching Reference Site Bottom Banner) */}
      <section className="madilane-bottom-vip-banner" aria-label="New Collection Access">
        <div className="madilane-vip-inner">
          <h2 className="madilane-vip-heading">{(storyState.vipBanner || OUR_STORY_VIP_BANNER).title}</h2>
          <p className="madilane-vip-sub">
            {(storyState.vipBanner || OUR_STORY_VIP_BANNER).subtitle}
          </p>
          <button
            type="button"
            className="madilane-vip-access-btn"
            onClick={() => {
              setCurrentView((storyState.vipBanner || OUR_STORY_VIP_BANNER).actionView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {(storyState.vipBanner || OUR_STORY_VIP_BANNER).buttonText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;
