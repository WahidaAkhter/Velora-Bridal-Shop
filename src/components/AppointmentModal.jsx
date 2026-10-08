import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const AppointmentModal = ({ onClose }) => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    appointmentDate: '',
    timeSlot: '11:00 AM',
    service: 'Signature Bridal Gown Consultation',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
    showToast('Your private bridal consultation has been reserved!');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="appointment-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="appointment-header">
              <span className="appointment-eyebrow">LUXE BRIDES BOUTIQUE</span>
              <h2 className="appointment-title">Reserve Your Bridal Appointment</h2>
              <p className="appointment-subtitle">
                Enjoy a private one-on-one consultation with our master bridal stylists in our New York salon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jessica@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Wedding Date</label>
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time Slot</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  >
                    <option value="10:00 AM">10:00 AM - Morning Fitting</option>
                    <option value="11:30 AM">11:30 AM - Private Consultation</option>
                    <option value="2:00 PM">2:00 PM - Afternoon Champagne</option>
                    <option value="4:00 PM">4:00 PM - Sunset Styling</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Experience Type</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Signature Bridal Gown Consultation">Signature Bridal Gown Consultation (90 Mins)</option>
                  <option value="VIP Champagne Suite Styling">VIP Champagne Suite Styling (120 Mins)</option>
                  <option value="Custom Alterations & Fitting">Custom Alterations & Fitting (60 Mins)</option>
                  <option value="Veil & Accessories Styling">Veil & Accessories Styling (45 Mins)</option>
                </select>
              </div>

              <button type="submit" className="appointment-submit-btn">
                <Sparkles size={16} /> CONFIRM RESERVATION
              </button>
            </form>
          </>
        ) : (
          <div className="appointment-success-state">
            <CheckCircle2 size={54} className="success-icon-gold" />
            <h3>Your Appointment is Confirmed!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. We look forward to welcoming you to Luxe Brides on{' '}
              <strong>{formData.appointmentDate || 'your selected date'}</strong> at <strong>{formData.timeSlot}</strong>.
            </p>
            <span className="location-reminder">
              📍 123 Bridal Lane, New York, NY 10001
            </span>
            <button className="appointment-done-btn" onClick={onClose}>
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
