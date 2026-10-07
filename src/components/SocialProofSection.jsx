import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 'rev-1',
    name: 'Sophia Reynolds',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'Verified Buyer · 2 days ago',
    productName: 'Minimalist Artisan Leather Tote',
    comment: 'The quality of the Tuscan calfskin leather is extraordinary. The stitching, internal laptop sleeve, and brass hardware are top tier. I get compliments daily.'
  },
  {
    id: 'rev-2',
    name: 'Alexander Chen',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'Verified Buyer · 1 week ago',
    productName: 'AURA ANC Headphones',
    comment: 'Acoustic clarity is unreal. Noise cancellation easily rivals flagship brands, and the matte aluminum build feels premium yet incredibly lightweight.'
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    location: 'Berlin, DE',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'Verified Buyer · 2 weeks ago',
    productName: 'Heavyweight Organic Hoodie',
    comment: 'The 480 GSM french terry cotton is thick, soft, and holds its boxy structure perfectly after multiple cold washes. True modern minimalism.'
  }
];

export const SocialProofSection = () => {
  return (
    <section className="social-proof-section" aria-labelledby="social-proof-heading">
      <div className="container">
        <div className="social-proof-header text-center">
          <div className="rating-summary-pill">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" className="text-amber" />
              ))}
            </div>
            <span className="summary-rating">4.9 / 5.0 Rating</span>
            <span className="summary-count">(2,400+ Verified Customer Reviews)</span>
          </div>

          <h2 id="social-proof-heading" className="section-title text-center">
            Loved by Modern Minimalists Worldwide
          </h2>
          <p className="section-desc text-center">
            Read authentic experiences from verified customers across 45+ countries.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="review-card glass-panel">
              <Quote size={28} className="quote-watermark" />
              
              <div className="review-card-header">
                <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                <div>
                  <h3 className="reviewer-name">{rev.name}</h3>
                  <span className="reviewer-meta">{rev.location}</span>
                </div>
              </div>

              <div className="review-stars-row">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-amber" />
                ))}
                <span className="verified-badge">
                  <ShieldCheck size={12} /> {rev.date}
                </span>
              </div>

              <p className="review-comment">"{rev.comment}"</p>

              <div className="review-product-tag">
                <span>Item: <strong>{rev.productName}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
