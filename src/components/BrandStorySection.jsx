import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, Shield, Leaf, Gem } from 'lucide-react';

export const BrandStorySection = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleExploreCraft = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="brand-story-section" aria-labelledby="brand-story-heading">
      <div className="container">
        <div className="brand-story-grid glass-panel">
          <div className="brand-story-media">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan Leather Craftsmanship"
              loading="lazy"
            />
          </div>

          <div className="brand-story-content">
            <h2 id="brand-story-heading" className="story-title">Designed with Intention</h2>

            <p className="story-lead">
              We reject fast fashion and disposable tech. At VELORA, every piece is born from a commitment to radical simplicity, transparent sourcing, and enduring beauty.
            </p>

            <ul className="story-pillars">
              <li>
                <CheckCircle2 size={18} className="text-accent" />
                <div>
                  <strong>Sustainably Sourced Materials</strong>
                  <span>Full-grain Tuscan calfskin, GOTS organic cotton, and recycled ocean polymers.</span>
                </div>
              </li>
              <li>
                <Leaf size={18} className="text-success" />
                <div>
                  <strong>Zero Single-Use Plastic</strong>
                  <span>All shipments arrive in 100% compostable and recyclable minimal packaging.</span>
                </div>
              </li>
              <li>
                <Shield size={18} className="text-gold" />
                <div>
                  <strong>Lifetime Craft Guarantee</strong>
                  <span>Engineered with double-stitched seams and high-grade stainless steel hardware.</span>
                </div>
              </li>
            </ul>

            <div className="story-action-row">
              <button onClick={handleExploreCraft} className="btn btn-primary btn-lg">
                Discover Our Craftsmanship <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
