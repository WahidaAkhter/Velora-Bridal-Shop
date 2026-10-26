import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, User, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser,
    registerUser,
    isLoggedIn,
    user
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMsg('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email');
      return;
    }
    const res = loginUser(email, password);
    if (!res.success) {
      setErrorMsg(res.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg('Please enter your full name and email');
      return;
    }
    const res = registerUser({ name, email, phone });
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleQuickDemo = (demoEmail) => {
    loginUser(demoEmail);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="appointment-modal-box auth-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <button className="modal-close-icon" onClick={handleClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="appointment-header" style={{ marginBottom: '20px' }}>
          <span className="appointment-eyebrow">VELORA VIP CLUB</span>
          <h2 className="appointment-title">
            {authMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="appointment-subtitle">
            {authMode === 'login'
              ? 'Access your private bridal lookbooks, reserved fittings, and order receipts.'
              : 'Join VELORA to unlock bespoke bridal consultations and white-glove service.'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E8E2D9', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 0',
              fontFamily: 'var(--font-sans-luxe, sans-serif)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'login' ? '2px solid #1F1917' : '2px solid transparent',
              color: authMode === 'login' ? '#1F1917' : '#756460',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 0',
              fontFamily: 'var(--font-sans-luxe, sans-serif)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'register' ? '2px solid #1F1917' : '2px solid transparent',
              color: authMode === 'register' ? '#1F1917' : '#756460',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: '8px 12px', background: '#FDECEB', color: '#900B09', fontSize: '12px', borderRadius: '4px', marginBottom: '14px' }}>
            {errorMsg}
          </div>
        )}

        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="appointment-form">
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: '#4D3D39' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="eleanor.vance@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D9D2C7', borderRadius: '4px', background: '#FAF8F5' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: '#4D3D39' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D9D2C7', borderRadius: '4px', background: '#FAF8F5' }}
              />
            </div>

            <button type="submit" className="appointment-submit-btn" style={{ width: '100%' }}>
              SIGN IN TO VELORA
            </button>

            {/* Quick Demo Accounts Helper */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #E0D9CE', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#756460', display: 'block', marginBottom: '8px' }}>
                Quick 1-Click Demo Profiles:
              </span>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('eleanor.vance@example.com')}
                  style={{
                    fontSize: '11px',
                    padding: '6px 12px',
                    background: '#F1DDD7',
                    border: '1px solid #B76E65',
                    borderRadius: '3px',
                    color: '#1F1917',
                    cursor: 'pointer'
                  }}
                >
                  Eleanor Vance (VIP)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('jessica.sterling@example.com')}
                  style={{
                    fontSize: '11px',
                    padding: '6px 12px',
                    background: '#FAF8F5',
                    border: '1px solid #D9D2C7',
                    borderRadius: '3px',
                    color: '#1F1917',
                    cursor: 'pointer'
                  }}
                >
                  Jessica Sterling (Bride)
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="appointment-form">
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: '#4D3D39' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jessica Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D9D2C7', borderRadius: '4px', background: '#FAF8F5' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: '#4D3D39' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="jessica@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D9D2C7', borderRadius: '4px', background: '#FAF8F5' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: '#4D3D39' }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D9D2C7', borderRadius: '4px', background: '#FAF8F5' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: '#4D3D39' }}>
                Create Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D9D2C7', borderRadius: '4px', background: '#FAF8F5' }}
              />
            </div>

            <button type="submit" className="appointment-submit-btn" style={{ width: '100%' }}>
              JOIN VELORA VIP CLUB
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
