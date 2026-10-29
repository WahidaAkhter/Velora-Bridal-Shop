import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Calendar,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser,
    registerUser,
    showToast
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMsg('');
    setResetSuccess(false);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    const res = loginUser(email, password);
    if (!res.success) {
      setErrorMsg(res.message || 'Unable to sign in. Please try again.');
    } else {
      handleClose();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password && password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    const res = registerUser({ name, email, phone, weddingDate });
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      handleClose();
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    setErrorMsg('');
    setResetSuccess(true);
    showToast(`Password reset link dispatched to ${email}!`, 'info');
  };

  const handleQuickDemo = (demoEmail) => {
    setErrorMsg('');
    loginUser(demoEmail);
    handleClose();
  };

  return (
    <div
      className="velora-auth-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="velora-auth-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Editorial Visual Sidebar */}
        <div
          className="velora-auth-sidebar"
          style={{ backgroundImage: `url('/images/bridal/signature-odelle.jpg')` }}
        >
          <div className="velora-auth-sidebar-overlay" />
          <div className="velora-auth-sidebar-content">
            <div>
              <div className="velora-auth-seal">
                <Sparkles size={11} /> VELORA VIP ATELIER
              </div>
              <h3 className="velora-auth-sidebar-title">
                The Bridal Sanctuary
              </h3>
              <p className="velora-auth-sidebar-desc">
                Your wedding dress journey curated with bespoke French lace, silk crepe, and personal stylist consultations.
              </p>

              <div className="velora-auth-perks-list">
                <div className="velora-auth-perk-item">
                  <CheckCircle2 size={15} className="velora-auth-perk-icon" />
                  <span>Private Digital Lookbooks & Wishlist Curation</span>
                </div>
                <div className="velora-auth-perk-item">
                  <CheckCircle2 size={15} className="velora-auth-perk-icon" />
                  <span>Complimentary Atelier Fitting Consultations</span>
                </div>
                <div className="velora-auth-perk-item">
                  <CheckCircle2 size={15} className="velora-auth-perk-icon" />
                  <span>White-Glove Order Delivery & Real-Time Tracking</span>
                </div>
                <div className="velora-auth-perk-item">
                  <CheckCircle2 size={15} className="velora-auth-perk-icon" />
                  <span>Direct Styling Notes with Chloe Laurent</span>
                </div>
              </div>
            </div>

            <div className="velora-auth-sidebar-footer">
              PARIS • NEW YORK • LONDON • SYDNEY
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="velora-auth-form-wrap">
          <button
            className="velora-auth-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={17} />
          </button>

          <div className="velora-auth-header">
            <span className="velora-auth-eyebrow">
              {authMode === 'forgot'
                ? 'ACCOUNT RECOVERY'
                : authMode === 'login'
                ? 'VIP ATELIER ACCESS'
                : 'EXCLUSIVE MEMBERSHIP'}
            </span>
            <h2 id="auth-modal-title" className="velora-auth-heading">
              {authMode === 'forgot'
                ? 'Reset Password'
                : authMode === 'login'
                ? 'Welcome Back'
                : 'Create Your Account'}
            </h2>
            <p className="velora-auth-subtext">
              {authMode === 'forgot'
                ? 'Enter your registered email address and we will dispatch a secure reset link.'
                : authMode === 'login'
                ? 'Sign in to access your reserved fittings, saved gowns, and orders.'
                : 'Join VELORA to unlock private bridal previews and personalized fittings.'}
            </p>
          </div>

          {/* Mode Switcher (Hidden in Forgot Password mode) */}
          {authMode !== 'forgot' && (
            <div className="velora-auth-tabs">
              <button
                type="button"
                className={`velora-auth-tab ${authMode === 'login' ? 'is-active' : ''}`}
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                  setResetSuccess(false);
                }}
              >
                SIGN IN
              </button>
              <button
                type="button"
                className={`velora-auth-tab ${authMode === 'register' ? 'is-active' : ''}`}
                onClick={() => {
                  setAuthMode('register');
                  setErrorMsg('');
                  setResetSuccess(false);
                }}
              >
                CREATE ACCOUNT
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div style={{
              padding: '10px 14px',
              background: '#FDECEB',
              color: '#8A1818',
              fontSize: '12px',
              borderRadius: '6px',
              border: '1px solid #F5C6CB',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>•</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Forgot Password Reset Success */}
          {resetSuccess && (
            <div style={{
              padding: '12px 14px',
              background: '#F4F9F4',
              color: '#1B6A27',
              fontSize: '12.5px',
              borderRadius: '6px',
              border: '1px solid #C8E6C9',
              marginBottom: '16px',
              lineHeight: 1.5
            }}>
              <strong>Check your inbox!</strong> A password reset link has been dispatched to <u>{email}</u>.
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="velora-auth-form">
              <div className="velora-field-group">
                <label className="velora-field-label">Email Address *</label>
                <div className="velora-field-input-box">
                  <Mail size={16} className="velora-field-icon" />
                  <input
                    type="email"
                    required
                    placeholder="eleanor.vance@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="velora-field-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="velora-field-group">
                <label className="velora-field-label">Password *</label>
                <div className="velora-field-input-box">
                  <Lock size={16} className="velora-field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="velora-field-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="velora-field-toggle-pwd"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="velora-auth-sub-row">
                <label className="velora-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="velora-auth-link"
                  onClick={() => {
                    setAuthMode('forgot');
                    setErrorMsg('');
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="velora-auth-submit-btn">
                <span>SIGN IN TO ATELIER</span>
                <ArrowRight size={15} />
              </button>

              {/* 1-Click Demo Profiles */}
              <div className="velora-demo-profiles-card">
                <span className="velora-demo-title">
                  Quick 1-Click Demo Profiles:
                </span>
                <div className="velora-demo-chips">
                  <button
                    type="button"
                    className="velora-demo-chip is-vip"
                    onClick={() => handleQuickDemo('eleanor.vance@example.com', 'Eleanor Vance')}
                    title="Sign in as Eleanor Vance (VIP Bride with full orders)"
                  >
                    <Sparkles size={12} color="#B76E65" />
                    <span>Eleanor Vance (VIP)</span>
                  </button>
                  <button
                    type="button"
                    className="velora-demo-chip"
                    onClick={() => handleQuickDemo('jessica.sterling@example.com', 'Jessica Sterling')}
                    title="Sign in as Jessica Sterling (Bride-to-be)"
                  >
                    <User size={12} />
                    <span>Jessica Sterling</span>
                  </button>
                  <button
                    type="button"
                    className="velora-demo-chip"
                    onClick={() => handleQuickDemo('chloe.laurent@velora.com', 'Chloe Laurent')}
                    title="Sign in as Chloe Laurent (Stylist)"
                  >
                    <ShieldCheck size={12} />
                    <span>Chloe (Stylist)</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* 2. CREATE ACCOUNT FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="velora-auth-form">
              <div className="velora-field-group">
                <label className="velora-field-label">Full Name *</label>
                <div className="velora-field-input-box">
                  <User size={16} className="velora-field-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="velora-field-input"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="velora-field-group">
                <label className="velora-field-label">Email Address *</label>
                <div className="velora-field-input-box">
                  <Mail size={16} className="velora-field-icon" />
                  <input
                    type="email"
                    required
                    placeholder="jessica@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="velora-field-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="velora-field-group">
                <label className="velora-field-label">Phone Number (For fitting SMS)</label>
                <div className="velora-field-input-box">
                  <Phone size={16} className="velora-field-icon" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="velora-field-input"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="velora-field-group">
                <label className="velora-field-label">Estimated Wedding Date (Optional)</label>
                <div className="velora-field-input-box">
                  <Calendar size={16} className="velora-field-icon" />
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="velora-field-input"
                  />
                </div>
              </div>

              <div className="velora-field-group">
                <label className="velora-field-label">Create Password *</label>
                <div className="velora-field-input-box">
                  <Lock size={16} className="velora-field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="velora-field-input"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="velora-field-toggle-pwd"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="velora-auth-submit-btn">
                <span>CREATE VELORA VIP ACCOUNT</span>
                <ArrowRight size={15} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#756460' }}>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="velora-auth-link"
                    onClick={() => setAuthMode('login')}
                  >
                    Sign in here
                  </button>
                </span>
              </div>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="velora-auth-form">
              <div className="velora-field-group">
                <label className="velora-field-label">Your Registered Email *</label>
                <div className="velora-field-input-box">
                  <Mail size={16} className="velora-field-icon" />
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="velora-field-input"
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className="velora-auth-submit-btn">
                <span>DISPATCH RESET LINK</span>
                <KeyRound size={15} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button
                  type="button"
                  className="velora-auth-link"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMsg('');
                    setResetSuccess(false);
                  }}
                >
                  ← Return to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
