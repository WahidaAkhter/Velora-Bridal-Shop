import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { updatePassword, formatAuthError } from '../services/authService';
import { supabase } from '../lib/supabaseClient';
import { Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, ArrowRight, KeyRound } from 'lucide-react';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { showToast, setIsAuthModalOpen, setAuthMode } = useApp();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    // Check URL parameters and hash for error conditions (e.g. expired recovery link)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      const combined = `${hash}&${search}`;

      if (
        combined.includes('error=') ||
        combined.includes('otp_expired') ||
        combined.includes('access_denied') ||
        combined.includes('invalid')
      ) {
        setIsTokenExpired(true);
        setErrorMsg('Your password reset link has expired or has already been used. Please request a new link.');
      }
    }

    // Also listen for auth state recovery event
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsTokenExpired(false);
        }
      });
      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  }, []);

  const handleOpenForgotModal = () => {
    setAuthMode('forgot');
    setIsAuthModalOpen(true);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('The passwords do not match. Please verify your entry.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await updatePassword(password);
      if (res.success) {
        setIsSuccess(true);
        showToast('Your password has been successfully reset.');
      } else {
        setErrorMsg(res.message || 'Unable to update password. Please try again.');
      }
    } catch (err) {
      setErrorMsg(formatAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="velora-reset-page-container" style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      background: 'linear-gradient(180deg, #F9F7F4 0%, #F4EFEB 100%)'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '8px',
        padding: '40px 36px',
        boxShadow: '0 20px 48px rgba(31, 25, 23, 0.08)',
        border: '1px solid #EBE4DA'
      }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(183, 110, 101, 0.1)',
            color: '#B76E65',
            marginBottom: '16px'
          }}>
            <KeyRound size={22} />
          </div>
          <span style={{
            display: 'block',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#B76E65',
            fontWeight: 700,
            marginBottom: '6px'
          }}>
            SECURITY & ACCOUNT RECOVERY
          </span>
          <h1 style={{
            fontFamily: "var(--font-serif-luxe, 'Cinzel', serif)",
            fontSize: '24px',
            color: '#1F1917',
            margin: '0 0 8px 0',
            fontWeight: 600
          }}>
            Create New Password
          </h1>
          <p style={{ fontSize: '13px', color: '#7A6964', margin: 0 }}>
            Enter your new secure password below to regain full access to your bridal sanctuary.
          </p>
        </div>

        {/* Expired Token State */}
        {isTokenExpired ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: '#FFF5F5',
              border: '1px solid #FED7D7',
              color: '#C53030',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '13.5px',
              lineHeight: '1.5',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              textAlign: 'left'
            }}>
              <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Recovery Link Expired</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: '#9B2C2C' }}>
                  {errorMsg || 'This recovery link has expired or has already been used. Please request a fresh reset link.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="velora-auth-submit-btn"
              onClick={handleOpenForgotModal}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>REQUEST NEW RESET LINK</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : isSuccess ? (
          /* Success State */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: '#F0FFF4',
              border: '1px solid #C6F6D5',
              color: '#22543D',
              padding: '18px',
              borderRadius: '6px',
              marginBottom: '24px'
            }}>
              <CheckCircle2 size={32} color="#38A169" style={{ margin: '0 auto 10px' }} />
              <h3 style={{ fontSize: '16px', margin: '0 0 6px 0', fontWeight: 600 }}>Password Updated</h3>
              <p style={{ fontSize: '13px', margin: 0, color: '#276749' }}>
                Your password has been reset successfully. You may now sign in with your new credentials.
              </p>
            </div>

            <button
              type="button"
              className="velora-auth-submit-btn"
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
                navigate('/');
              }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>SIGN IN TO YOUR SANCTUARY</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          /* Password Reset Form */
          <form onSubmit={handleSubmit} className="velora-auth-form" style={{ gap: '18px' }}>
            {errorMsg && (
              <div style={{
                background: '#FFF5F5',
                border: '1px solid #FED7D7',
                color: '#C53030',
                padding: '12px 14px',
                borderRadius: '6px',
                fontSize: '12.5px'
              }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#3A322F', marginBottom: '6px' }}>
                NEW PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#9C8D89" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 38px',
                    borderRadius: '4px',
                    border: '1px solid #D6CBC4',
                    fontSize: '13.5px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#9C8D89',
                    cursor: 'pointer'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#3A322F', marginBottom: '6px' }}>
                CONFIRM NEW PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#9C8D89" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 38px',
                    borderRadius: '4px',
                    border: '1px solid #D6CBC4',
                    fontSize: '13.5px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="velora-auth-submit-btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '10px',
                cursor: isLoading ? 'wait' : 'pointer'
              }}
            >
              <span>{isLoading ? 'UPDATING PASSWORD...' : 'RESET PASSWORD'}</span>
              <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
