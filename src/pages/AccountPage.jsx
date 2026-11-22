import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useCatalog } from '../services/catalogStore';
import { VOUCHERS } from '../data/vouchers';
import {
  User,
  Package,
  MapPin,
  Heart,
  Gift,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Pencil,
  Calendar,
  LogOut,
  LogIn,
  Share2
} from 'lucide-react';
import { buildShareUrl } from '../utils/wishlistShare';

export const AccountPage = () => {
  const {
    user,
    accountTab,
    setAccountTab,
    deleteAddress,
    setDefaultAddress,
    addAddress,
    updateAddress,
    wishlist,
    toggleWishlist,
    addToCart,
    setSelectedOrderDetails,
    showToast,
    formatPrice,
    isLoggedIn,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthTarget,
    logoutUser,
    cancelAppointment,
    setIsAppointmentModalOpen
  } = useApp();

  const catalog = useCatalog();

  const [editingAddrId, setEditingAddrId] = useState(null);

  const [copiedCode, setCopiedCode] = useState('');
  const [isAddAddrOpen, setIsAddAddrOpen] = useState(false);
  const [newAddrForm, setNewAddrForm] = useState({
    title: 'Home Address',
    firstName: (user?.name || '').split(' ')[0] || '',
    lastName: (user?.name || '').split(' ')[1] || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: user?.phone || '',
    isDefault: false
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const emptyAddrForm = {
    title: 'Home Address',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    isDefault: false
  };

  const startEditAddress = (addr) => {
    setEditingAddrId(addr.id);
    setNewAddrForm({ ...emptyAddrForm, ...addr });
    setIsAddAddrOpen(true);
  };

  const closeAddrForm = () => {
    setIsAddAddrOpen(false);
    setEditingAddrId(null);
    setNewAddrForm(emptyAddrForm);
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddrForm.street || !newAddrForm.city) return;
    if (editingAddrId) {
      const { id, ...updates } = newAddrForm;
      updateAddress(editingAddrId, updates);
    } else {
      addAddress(newAddrForm);
    }
    closeAddrForm();
  };

  const wishlistedProducts = catalog.filter(p => p && p.id && Array.isArray(wishlist) && wishlist.includes(p.id));

  const handleShareWishlist = async () => {
    const url = buildShareUrl(wishlist, user?.name);
    if (!url) {
      showToast('No items in wishlist to share', 'info');
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name || 'Bride'}’s Bridal Wishlist`,
          text: 'Explore my curated VELORA bridal wishlist',
          url
        });
        return;
      } catch (err) {
        if (err?.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Wishlist link copied to clipboard!');
    } catch {
      showToast('Failed to copy link', 'warning');
    }
  };

  // If user is not logged in on account page, remember target for post-login redirection
  useEffect(() => {
    if (!isLoggedIn) {
      try {
        sessionStorage.setItem('velora_auth_target', window.location.pathname);
      } catch {
        // ignore
      }
    }
  }, [isLoggedIn]);

  // If user is not signed in, display the luxury guest gateway
  if (!isLoggedIn) {
    return (
      <div className="container account-container animate-fade-in" style={{ padding: '40px 16px' }}>
        <div className="account-guest-gate">
          <div className="guest-gate-icon-circle">
            <User size={28} />
          </div>
          <span className="guest-gate-eyebrow">VELORA VIP ATELIER GATEWAY</span>
          <h1 className="guest-gate-title">Sign In to Your Bridal Sanctuary</h1>
          <p className="guest-gate-desc">
            Access your reserved fitting appointments, white-glove couture order tracking,
            and personal bridal wishlist curated by our master stylists.
          </p>

          <div className="guest-gate-actions">
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '13px', letterSpacing: '0.1em' }}
              onClick={() => {
                setAuthTarget(window.location.pathname);
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
            >
              SIGN IN TO ATELIER
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: '12px 28px', fontSize: '13px', letterSpacing: '0.1em' }}
              onClick={() => {
                setAuthTarget(window.location.pathname);
                setAuthMode('register');
                setIsAuthModalOpen(true);
              }}
            >
              CREATE VIP ACCOUNT
            </button>
          </div>

          <div className="guest-gate-perks-row">
            <div className="guest-gate-perk">
              <h4><Calendar size={15} color="#B76E65" /> Reserved Fittings</h4>
              <p>Book champagne consultations with Master Stylist Chloe Laurent.</p>
            </div>
            <div className="guest-gate-perk">
              <h4><Package size={15} color="#B76E65" /> White-Glove Tracking</h4>
              <p>Track your couture gown from Paris atelier directly to your door.</p>
            </div>
            <div className="guest-gate-perk">
              <h4><Heart size={15} color="#B76E65" /> Saved Dream Gowns</h4>
              <p>Curate your private moodboard and bridal styling options.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container account-container animate-fade-in">
      {/* Account Hero Banner */}
      <div className="account-hero-card glass-panel">
        <div className="user-profile-row">
          <img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt={user?.name || 'VIP Bride'} className="user-avatar-lg" />
          <div className="user-info-text">
            <div className="user-title-badge-row">
              <h2>{user?.name || 'VIP Bride'}</h2>
              <span className="badge badge-gold">
                {user?.membershipTier || 'VELORA VIP Club'}
              </span>
            </div>
            <p className="text-muted">{user?.email || ''} • Member since {user?.memberSince || 'Recent'}</p>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <User size={13} /> Switch Profile
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={logoutUser}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8B263E' }}
                >
                  <LogOut size={13} /> Sign Out
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-accent btn-sm"
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogIn size={13} /> Sign In
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-num">{user?.orders?.length || 0}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{user?.appointments?.length || 0}</span>
            <span className="stat-label">Appointments</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{user?.addresses?.length || 0}</span>
            <span className="stat-label">Saved Addresses</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{wishlistedProducts.length}</span>
            <span className="stat-label">Wishlist Items</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{formatPrice((user?.giftCards || []).reduce((a, b) => a + (b?.currentBalance || 0), 0))}</span>
            <span className="stat-label">Gift Credits</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Header */}
      <div className="account-tabs-nav glass-panel">
        <button
          className={`tab-link ${accountTab === 'overview' ? 'active' : ''}`}
          onClick={() => setAccountTab('overview')}
        >
          <User size={18} /> Overview
        </button>
        <button
          className={`tab-link ${accountTab === 'orders' ? 'active' : ''}`}
          onClick={() => setAccountTab('orders')}
        >
          <Package size={18} /> Order History ({user?.orders?.length || 0})
        </button>
        <button
          className={`tab-link ${accountTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setAccountTab('addresses')}
        >
          <MapPin size={18} /> Address Book ({user?.addresses?.length || 0})
        </button>
        <button
          className={`tab-link ${accountTab === 'wishlist' ? 'active' : ''}`}
          onClick={() => setAccountTab('wishlist')}
        >
          <Heart size={18} /> Wishlist ({wishlistedProducts.length})
        </button>
        <button
          className={`tab-link ${accountTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setAccountTab('appointments')}
        >
          <Calendar size={18} /> Appointments ({user?.appointments?.length || 0})
        </button>
        <button
          className={`tab-link ${accountTab === 'vouchers' ? 'active' : ''}`}
          onClick={() => setAccountTab('vouchers')}
        >
          <Gift size={18} /> Vouchers & Credits
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div className="account-tab-content tab-panel-enter" key={accountTab}>
        {/* OVERVIEW TAB */}
        {accountTab === 'overview' && (
          <div className="overview-tab-view grid-2-col">
            {/* Recent Orders Overview Box */}
            <div className="overview-card glass-panel">
              <div className="card-top">
                <h3>Recent Orders</h3>
                <button onClick={() => setAccountTab('orders')} className="btn-link">View All</button>
              </div>
              <div className="recent-orders-list">
                {(user?.orders || []).slice(0, 2).map((ord) => (
                  <div key={ord.id} className="recent-order-row">
                    <div>
                      <strong>Order #{ord.orderNumber || ord.id}</strong>
                      <span className="text-muted block text-sm">{ord.date} • {ord.items?.length || 0} items</span>
                    </div>
                    <div className="text-right">
                      <span className="badge badge-success">{ord.status}</span>
                      <strong className="block">{formatPrice(ord.total)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Default Address & Membership Overview */}
            <div className="overview-card glass-panel">
              <div className="card-top">
                <h3>Default Shipping Address</h3>
                <button onClick={() => setAccountTab('addresses')} className="btn-link">Manage</button>
              </div>
              {(user?.addresses || []).find(a => a.isDefault) ? (
                (() => {
                  const defAddr = (user?.addresses || []).find(a => a.isDefault);
                  return (
                    <div className="address-display-box">
                      <strong>{defAddr.title}</strong>
                      <p>{defAddr.firstName} {defAddr.lastName}</p>
                      <p>{defAddr.street}</p>
                      <p>{defAddr.city}, {defAddr.state} {defAddr.zip}</p>
                    </div>
                  );
                })()
              ) : (
                <p className="text-muted">No default address selected.</p>
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {accountTab === 'orders' && (
          <div className="orders-tab-view">
            {(!user?.orders || user.orders.length === 0) ? (
              <p className="text-muted">No orders found.</p>
            ) : (
              <div className="orders-history-list">
                {(user?.orders || []).map((ord) => (
                  <div key={ord.id} className="order-history-card glass-panel">
                    <div className="order-card-header">
                      <div>
                        <span className="order-id">Order #{ord.orderNumber || ord.id}</span>
                        <span className="order-date">{ord.date}</span>
                      </div>
                      <span className={`badge badge-${ord.status === 'Delivered' ? 'success' : 'accent'}`}>
                        {ord.status}
                      </span>
                    </div>

                    <div className="order-items-preview">
                      {ord.items.map((item, i) => (
                        <div key={i} className="order-item-mini">
                          <img src={item.image} alt={item.name} />
                          <div>
                            <strong>{item.name}</strong>
                            <span className="text-muted text-sm">{item.variantName} × {item.quantity}</span>
                          </div>
                          <span className="price">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <div className="tracking-info">
                        <Clock size={15} className="text-accent" />
                        <span>Carrier: <strong>{ord.carrier}</strong> ({ord.trackingNumber})</span>
                      </div>

                      <div className="order-actions">
                        <strong className="order-total">{formatPrice(ord.total)}</strong>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedOrderDetails(ord)}
                        >
                          <ExternalLink size={14} /> View Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADDRESSES TAB */}
        {accountTab === 'addresses' && (
          <div className="addresses-tab-view">
            <div className="addresses-header">
              <h3>My Shipping & Billing Addresses</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => { closeAddrForm(); setIsAddAddrOpen(true); }}
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            {isAddAddrOpen && (
              <form onSubmit={handleAddAddressSubmit} className="add-address-form glass-panel mt-4">
                <h4>{editingAddrId ? 'Edit Address' : 'Add New Address'}</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Address Label (e.g., Home, Office)</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.title}
                      onChange={e => setNewAddrForm({ ...newAddrForm, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.firstName}
                      onChange={e => setNewAddrForm({ ...newAddrForm, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.lastName}
                      onChange={e => setNewAddrForm({ ...newAddrForm, lastName: e.target.value })}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Street Address</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.street}
                      onChange={e => setNewAddrForm({ ...newAddrForm, street: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.city}
                      onChange={e => setNewAddrForm({ ...newAddrForm, city: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.state}
                      onChange={e => setNewAddrForm({ ...newAddrForm, state: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      required
                      value={newAddrForm.zip}
                      onChange={e => setNewAddrForm({ ...newAddrForm, zip: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-actions mt-4">
                  <button type="submit" className="btn btn-primary btn-sm">{editingAddrId ? 'Save Changes' : 'Save Address'}</button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={closeAddrForm}>Cancel</button>
                </div>
              </form>
            )}

            {(!user?.addresses || user.addresses.length === 0) ? (
              !isAddAddrOpen && (
                <div className="empty-state text-center p-8 glass-panel mt-4">
                  <MapPin size={48} className="mx-auto text-muted mb-4" />
                  <h4>No Saved Addresses</h4>
                  <p className="text-muted">You have not added any shipping or billing addresses yet.</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={() => { closeAddrForm(); setIsAddAddrOpen(true); }}
                  >
                    <Plus size={16} /> Add New Address
                  </button>
                </div>
              )
            ) : (
              <div className="addresses-cards-grid mt-4">
                {(user?.addresses || []).map((addr) => (
                  <div key={addr.id} className="address-card glass-panel">
                    <div className="card-head">
                      <strong>{addr.title}</strong>
                      {addr.isDefault && <span className="badge badge-gold">Default</span>}
                    </div>
                    <p>{addr.firstName} {addr.lastName}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} {addr.zip}</p>
                    <p className="text-muted">{addr.phone}</p>

                    <div className="card-actions mt-4">
                      <button className="btn btn-outline btn-sm" onClick={() => startEditAddress(addr)}>
                        <Pencil size={13} /> Edit
                      </button>
                      {!addr.isDefault && (
                        <button className="btn btn-outline btn-sm" onClick={() => setDefaultAddress(addr.id)}>
                          Set Default
                        </button>
                      )}
                      <button className="btn-icon-danger" onClick={() => deleteAddress(addr.id)} title="Delete address">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WISHLIST TAB */}
        {accountTab === 'wishlist' && (
          <div className="wishlist-tab-view">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center p-8 glass-panel">
                <Heart size={32} className="mx-auto text-muted mb-2" />
                <h4>Your wishlist is empty</h4>
                <p className="text-muted">Click the heart icon on any product to save it here.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
                    {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'gown' : 'gowns'} curated in your sanctuary
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleShareWishlist}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Share2 size={14} /> Share Wishlist
                  </button>
                </div>

                <div className="wishlist-grid">
                  {wishlistedProducts.map((product) => (
                    <div key={product.id} className="wishlist-card glass-panel">
                      <img src={product.images?.[0] || product.image || ''} alt={product.name} />
                      <div className="card-info">
                        <h4>{product.name}</h4>
                        <span className="price">{formatPrice(product.price)}</span>
                      </div>
                      <div className="card-actions">
                        <button className="btn btn-accent btn-sm flex-1" onClick={() => addToCart(product)}>
                          <ShoppingBag size={14} /> Add to Bag
                        </button>
                        <button className="btn btn-outline btn-sm icon-only" onClick={() => toggleWishlist(product.id)}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* VOUCHERS TAB */}
        {accountTab === 'vouchers' && (
          <div className="vouchers-tab-view">
            <h3>Active Promotional Vouchers & Gift Cards</h3>
            <div className="vouchers-grid mt-4">
              {VOUCHERS.map((v) => (
                <div key={v.code} className="voucher-card glass-panel">
                  <div className="voucher-head">
                    <Gift size={20} className="text-gold" />
                    <strong>{v.code}</strong>
                  </div>
                  <p className="voucher-desc">{v.description}</p>
                  <div className="voucher-footer">
                    <span className="text-muted text-xs">Expires: {v.expiry}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleCopyCode(v.code)}
                    >
                      {copiedCode === v.code ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                      {copiedCode === v.code ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {accountTab === 'appointments' && (
          <div className="appointments-tab-view animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ margin: 0 }}>Reserved Bridal Appointments</h3>
                <p className="text-muted" style={{ margin: '4px 0 0 0' }}>
                  Private one-on-one styling consultations at our New York bridal salon.
                </p>
              </div>
              <button
                className="btn btn-accent btn-sm"
                onClick={() => setIsAppointmentModalOpen(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Calendar size={14} /> Reserve New Appointment
              </button>
            </div>

            {(!user?.appointments || user.appointments.length === 0) ? (
              <div className="text-center p-8 glass-panel">
                <Calendar size={36} className="mx-auto text-muted mb-2" />
                <h4>No Scheduled Appointments</h4>
                <p className="text-muted">You do not have any upcoming bridal consultations reserved yet.</p>
                <button
                  className="btn btn-accent btn-sm mt-3"
                  onClick={() => setIsAppointmentModalOpen(true)}
                >
                  Book an Atelier Consultation
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(user?.appointments || []).map((apt) => (
                  <div
                    key={apt.id}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #E6DFD5',
                      background: '#FFFFFF',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            background: apt.status === 'Cancelled' ? '#FDECEB' : '#EAF7EE',
                            color: apt.status === 'Cancelled' ? '#900B09' : '#1E6B37'
                          }}
                        >
                          {apt.status}
                        </span>
                        <span style={{ fontSize: '12px', color: '#756460' }}>
                          Reservation #{apt.id}
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#1F1917' }}>
                        {apt.service}
                      </h4>
                      <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#4D3D39' }}>
                        <strong>{apt.appointmentDate}</strong> at <strong>{apt.timeSlot}</strong>
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#756460' }}>
                        {apt.location || 'VELORA Atelier, 123 Bridal Lane, New York, NY'}
                      </p>
                      {apt.notes && (
                        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#887B75', fontStyle: 'italic' }}>
                          "Notes: {apt.notes}"
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {apt.status !== 'Cancelled' && (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => cancelAppointment(apt.id)}
                          style={{ color: '#8B263E', borderColor: '#E5C6CC' }}
                        >
                          Cancel Appointment
                        </button>
                      )}
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setIsAppointmentModalOpen(true)}
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
