import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const DreamDressBanner = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    weddingDate: '',
    city: '',
    country: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.75 }
      });
    } catch {
      // Confetti fallback
    }

    if (showToast) {
      showToast("VIP Access Granted! You're on the priority list.");
    }
  };

  return (
    <section className="luxe-dream-banner-section" id="dream-dress-banner" aria-label="Ready to say yes to your dream dress">
      <div className="dream-access-container">
        <h2 className="dream-access-heading">
          Ready to say yes to your dream dress? Stay updated
        </h2>

        {isSubmitted ? (
          <div className="dream-access-success">
            <div className="dream-success-badge">
              <Check size={18} />
            </div>
            <h3 className="dream-success-title">VIP ACCESS GRANTED</h3>
            <p className="dream-success-desc">
              Thank you, {formData.firstName}! You have been added to our exclusive bridal priority list. Our bridal concierge will reach out to you shortly with early access and private appointment scheduling.
            </p>
            <button
              type="button"
              className="dream-reset-btn"
              onClick={() => {
                setFormData({ firstName: '', email: '', weddingDate: '', city: '', country: '' });
                setIsSubmitted(false);
              }}
            >
              REGISTER ANOTHER APPOINTMENT
            </button>
          </div>
        ) : (
          <form className="dream-access-form" onSubmit={handleSubmit} noValidate={false}>
            <div className="dream-form-grid">
              {/* Row 1 - Col 1: Name */}
              <div className="dream-form-field">
                <label htmlFor="dream-first-name" className="dream-field-label">
                  Name
                </label>
                <input
                  id="dream-first-name"
                  type="text"
                  required
                  placeholder="First Name"
                  className="dream-field-input"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              {/* Row 1 - Col 2: Email Address */}
              <div className="dream-form-field">
                <label htmlFor="dream-email" className="dream-field-label">
                  Email Address
                </label>
                <input
                  id="dream-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="dream-field-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Row 1 - Col 3: Wedding Date */}
              <div className="dream-form-field">
                <label htmlFor="dream-wedding-date" className="dream-field-label">
                  Wedding Date
                </label>
                <input
                  id="dream-wedding-date"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="dream-field-input"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                />
              </div>

              {/* Row 2 - Col 1: City */}
              <div className="dream-form-field">
                <label htmlFor="dream-city" className="dream-field-label">
                  City
                </label>
                <input
                  id="dream-city"
                  type="text"
                  placeholder="City"
                  className="dream-field-input"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              {/* Row 2 - Col 2: Country */}
              <div className="dream-form-field">
                <label htmlFor="dream-country" className="dream-field-label">
                  Country
                </label>
                <div className="dream-select-wrapper">
                  <select
                    id="dream-country"
                    className={`dream-field-select ${!formData.country ? 'is-placeholder' : ''}`}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="" disabled>Select your country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="Spain">Spain</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="dream-select-chevron" size={16} strokeWidth={2.5} />
                </div>
              </div>

              {/* Row 2 - Col 3: Submit Button */}
              <div className="dream-form-field dream-btn-field">
                <span className="dream-field-label-spacer" aria-hidden="true">&nbsp;</span>
                <button type="submit" className="dream-access-btn">
                  GET ACCESS
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default DreamDressBanner;
