import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Mail, CheckCircle2, Loader2 } from 'lucide-react';

export const NewsletterSection = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API network request delay
    setTimeout(() => {
      setStatus('success');
      showToast('Welcome to VELORA Insider Club! 10% code sent to your email.');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="newsletter-card glass-panel">
          <div className="newsletter-content">
            <h2 id="newsletter-heading" className="newsletter-title">
              Stay in VELORA
            </h2>

            <p className="newsletter-desc">
              Subscribe to receive private sale access, seasonal lookbooks, and <strong>10% OFF</strong> your first order.
            </p>

            {status === 'success' ? (
              <div className="newsletter-success-box">
                <CheckCircle2 size={24} className="text-success" />
                <div>
                  <h4>You're on the list!</h4>
                  <p>Check your inbox for your 10% welcome voucher code.</p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-outline btn-sm ml-auto"
                >
                  Subscribe Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
                <div className="newsletter-input-group">
                  <Mail size={18} className="input-icon text-muted" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    disabled={status === 'loading'}
                    aria-label="Email Address for newsletter"
                    aria-invalid={Boolean(errorMsg)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Join VELORA <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {errorMsg && <p className="input-error-msg">{errorMsg}</p>}

                <p className="newsletter-privacy">
                  By joining, you agree to our Privacy Policy. We respect your inbox. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
