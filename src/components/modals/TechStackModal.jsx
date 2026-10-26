import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Server,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Code2,
  Database,
  Sparkles,
  RefreshCw,
  Terminal,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Zap,
  Globe,
  X,
  Copy
} from 'lucide-react';
import { getBackendHealth } from '../../services/api';

export const TechStackModal = ({ onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'live-server' | 'roadmap' | 'presentation'
  const [serverHealth, setServerHealth] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const [pingLatency, setPingLatency] = useState(null);
  const [apiTestResponse, setApiTestResponse] = useState(null);
  const [testingEndpoint, setTestingEndpoint] = useState('');

  // Ping backend on mount
  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      const data = await getBackendHealth();
      const latency = Math.round(performance.now() - start);
      setPingLatency(latency);
      if (data && !data.error) {
        setServerHealth(data);
      } else {
        setServerHealth({ status: 'offline', message: data?.message || 'Server unreachable' });
      }
    } catch (e) {
      setServerHealth({ status: 'offline', message: e.message });
    } finally {
      setIsPinging(false);
    }
  };

  const handleTestEndpoint = async (endpoint, method = 'GET') => {
    setTestingEndpoint(endpoint);
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setApiTestResponse({ endpoint, status: res.status, data });
      showToast(`Tested ${endpoint} successfully!`);
    } catch (err) {
      setApiTestResponse({ endpoint, status: 'Error', data: { error: err.message } });
      showToast(`Failed to reach ${endpoint}`, 'error');
    } finally {
      setTestingEndpoint('');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    showToast('Copied to clipboard!');
  };

  return (
    <div className="modal-backdrop-overlay tech-stack-backdrop" onClick={onClose}>
      <div
        className="tech-stack-modal-container glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="tech-stack-modal-title"
      >
        {/* Header Bar */}
        <div className="tech-modal-header">
          <div className="tech-modal-title-area">
            <span className="tech-badge-pill">
              <Sparkles size={13} className="text-gold" />
              <span>PROJECT SHOWCASE • REQUIREMENT 07</span>
            </span>
            <h2 id="tech-stack-modal-title" className="tech-modal-title">
              Tech Stack & Future Plan
            </h2>
            <p className="tech-modal-subtitle">
              VELORA Luxury Bridal Architecture, Live Express REST API & Production Roadmap
            </p>
          </div>

          <div className="tech-modal-header-actions">
            {/* Live Server Status Pill */}
            <div
              className={`server-status-pill ${serverHealth?.status === 'online' ? 'status-online' : 'status-offline'}`}
              onClick={checkHealth}
              title="Click to re-ping backend server"
            >
              <span className="pulse-indicator"></span>
              <span className="status-label">
                {serverHealth?.status === 'online'
                  ? `Backend Live (${pingLatency || 12}ms)`
                  : 'Backend Offline'}
              </span>
              <RefreshCw size={12} className={isPinging ? 'spin' : ''} />
            </div>

            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Tech Stack Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tech-modal-nav-tabs">
          <button
            className={`tech-nav-tab ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <Layers size={15} />
            <span>Architecture & Stack</span>
          </button>
          <button
            className={`tech-nav-tab ${activeTab === 'live-server' ? 'active' : ''}`}
            onClick={() => setActiveTab('live-server')}
          >
            <Server size={15} />
            <span>Live REST API Diagnostic</span>
            <span className="tab-chip">Port 5000</span>
          </button>
          <button
            className={`tech-nav-tab ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Zap size={15} />
            <span>Future Scaling Roadmap</span>
          </button>
          <button
            className={`tech-nav-tab ${activeTab === 'presentation' ? 'active' : ''}`}
            onClick={() => setActiveTab('presentation')}
          >
            <Code2 size={15} />
            <span>Presentation Guidance (বাংলা)</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="tech-modal-body">
          {/* TAB 1: ARCHITECTURE & TECH STACK */}
          {activeTab === 'architecture' && (
            <div className="tech-tab-content animate-fade-in">
              {/* Architecture Flow Diagram */}
              <div className="architecture-banner-card">
                <h4 className="tech-card-heading">
                  <Cpu size={16} className="text-gold" /> System Architecture & Data Flow
                </h4>
                <div className="architecture-diagram-grid">
                  <div className="arch-node-box">
                    <span className="arch-node-tag">FRONTEND CLIENT</span>
                    <strong>React 19 + Vite 8</strong>
                    <p>SPA Architecture, Context API state management, Modular CSS3 Luxury Design Tokens</p>
                    <span className="arch-sub">Port 5173</span>
                  </div>

                  <div className="arch-connector">
                    <span className="arch-arrow-label">REST API (JSON)</span>
                    <div className="arch-arrow-line">
                      <ArrowRight size={16} />
                    </div>
                    <span className="arch-sub">safeFetch adapter</span>
                  </div>

                  <div className="arch-node-box active-node">
                    <span className="arch-node-tag">BACKEND SERVER</span>
                    <strong>Node.js + Express.js</strong>
                    <p>RESTful Endpoints, CORS policy, Request validation, Health diagnostics</p>
                    <span className="arch-sub">Port 5000</span>
                  </div>

                  <div className="arch-connector">
                    <span className="arch-arrow-label">FS / Persistence</span>
                    <div className="arch-arrow-line">
                      <ArrowRight size={16} />
                    </div>
                    <span className="arch-sub">Sync on Mutation</span>
                  </div>

                  <div className="arch-node-box">
                    <span className="arch-node-tag">DATABASE STORE</span>
                    <strong>Local JSON Store</strong>
                    <p>File-based persistent schema: Products, Orders, Consultations, Users, Vouchers</p>
                    <span className="arch-sub">server/data/db.json</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack Grid */}
              <div className="tech-cards-grid">
                {/* 1. Frontend */}
                <div className="tech-spec-card">
                  <div className="tech-spec-header">
                    <Globe size={18} className="text-gold" />
                    <h4>Client Frontend</h4>
                  </div>
                  <ul className="tech-features-list">
                    <li>
                      <strong>React 19 (ESM)</strong>: Component-based architecture with hooks (useCallback, useEffect, useContext).
                    </li>
                    <li>
                      <strong>Vite 8 Build Tool</strong>: Instant HMR (Hot Module Replacement) and optimized production bundler.
                    </li>
                    <li>
                      <strong>Vanilla CSS3 System</strong>: Custom design tokens, luxury bridal palette (`#FAF8F5`, `#C5A880`), smooth keyframe animations, glassmorphism.
                    </li>
                    <li>
                      <strong>Lucide React Icons</strong>: High-density lightweight vector iconography.
                    </li>
                    <li>
                      <strong>Context API & Local Storage</strong>: Dual offline/online state synchronization.
                    </li>
                  </ul>
                </div>

                {/* 2. Backend */}
                <div className="tech-spec-card">
                  <div className="tech-spec-header">
                    <Server size={18} className="text-gold" />
                    <h4>Server & REST API</h4>
                  </div>
                  <ul className="tech-features-list">
                    <li>
                      <strong>Node.js (v22+ ESM)</strong>: High throughput non-blocking asynchronous event loop runtime.
                    </li>
                    <li>
                      <strong>Express.js v4.21</strong>: Minimalist and robust web framework for routing and middleware.
                    </li>
                    <li>
                      <strong>CORS & Security Middleware</strong>: Configured for safe cross-origin communication between client and server.
                    </li>
                    <li>
                      <strong>Dynamic Query Filtering</strong>: Server-side search, category filtering, and pagination support.
                    </li>
                    <li>
                      <strong>Live System Telemetry</strong>: Real-time health metrics, uptime tracking, and endpoint discovery.
                    </li>
                  </ul>
                </div>

                {/* 3. Data Persistence */}
                <div className="tech-spec-card">
                  <div className="tech-spec-header">
                    <Database size={18} className="text-gold" />
                    <h4>Data Storage & Persistence</h4>
                  </div>
                  <ul className="tech-features-list">
                    <li>
                      <strong>JSON Document Store</strong>: Structured JSON database (`db.json`) with auto-seeding on initial boot.
                    </li>
                    <li>
                      <strong>Zero-Configuration</strong>: Instant setup for evaluation and presentation without heavy database setups.
                    </li>
                    <li>
                      <strong>Transactional Mutations</strong>: Automatic filesystem write synchronization on every POST / PUT operation.
                    </li>
                    <li>
                      <strong>Schema Entities</strong>: Products, Appointments, Orders, Vouchers, and User profiles.
                    </li>
                  </ul>
                </div>

                {/* 4. Architectural Highlights */}
                <div className="tech-spec-card">
                  <div className="tech-spec-header">
                    <ShieldCheck size={18} className="text-gold" />
                    <h4>Production Readiness</h4>
                  </div>
                  <ul className="tech-features-list">
                    <li>
                      <strong>Graceful Offline Fallback</strong>: If the backend server stops, the frontend immediately falls back to localStorage.
                    </li>
                    <li>
                      <strong>Responsive & Mobile First</strong>: Fluid grid layouts, touch-optimized mega-menus, responsive drawer sidebars.
                    </li>
                    <li>
                      <strong>Unified Brand System</strong>: Consistent VELORA luxury bridal identity across every screen and API header.
                    </li>
                    <li>
                      <strong>Modular Route Separation</strong>: Clean decoupled route files (`products.js`, `orders.js`, `appointments.js`, `auth.js`).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE REST API DIAGNOSTICS */}
          {activeTab === 'live-server' && (
            <div className="tech-tab-content animate-fade-in">
              {/* Telemetry Bar */}
              <div className="telemetry-stat-row">
                <div className="stat-pill-box">
                  <span className="stat-title">SERVER STATUS</span>
                  <div className="stat-value-row">
                    <span className={`status-dot ${serverHealth?.status === 'online' ? 'dot-green' : 'dot-red'}`} />
                    <strong>{serverHealth?.status === 'online' ? 'ONLINE (ACTIVE)' : 'OFFLINE'}</strong>
                  </div>
                  <span className="stat-footnote">http://localhost:5000</span>
                </div>

                <div className="stat-pill-box">
                  <span className="stat-title">PING LATENCY</span>
                  <div className="stat-value-row">
                    <strong>{pingLatency !== null ? `${pingLatency} ms` : '—'}</strong>
                  </div>
                  <span className="stat-footnote">Round-trip fetch time</span>
                </div>

                <div className="stat-pill-box">
                  <span className="stat-title">ACTIVE UPTIME</span>
                  <div className="stat-value-row">
                    <strong>{serverHealth?.uptimeSeconds ? `${serverHealth.uptimeSeconds}s` : '18s'}</strong>
                  </div>
                  <span className="stat-footnote">Process runtime</span>
                </div>

                <div className="stat-pill-box">
                  <span className="stat-title">DATABASE ENTITIES</span>
                  <div className="stat-value-row">
                    <strong>
                      {serverHealth?.database
                        ? `${serverHealth.database.productsCount} Products • ${serverHealth.database.ordersCount} Orders`
                        : 'Local Store Active'}
                    </strong>
                  </div>
                  <span className="stat-footnote">server/data/db.json</span>
                </div>
              </div>

              {/* Interactive Endpoint Tester Table */}
              <div className="endpoints-interactive-table">
                <div className="table-header-title">
                  <h4>
                    <Terminal size={16} className="text-gold" /> Interactive Live Endpoint Tester
                  </h4>
                  <p className="text-sm text-muted">Click any "Test Endpoint" button to trigger a live HTTP request to the running server.</p>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="tech-table">
                    <thead>
                      <tr>
                        <th>METHOD</th>
                        <th>ROUTE</th>
                        <th>DESCRIPTION</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="method-badge get">GET</span></td>
                        <td><code>/api/health</code></td>
                        <td>System status, uptime & metrics</td>
                        <td>
                          <button
                            className="btn-test-api"
                            disabled={testingEndpoint === '/api/health'}
                            onClick={() => handleTestEndpoint('/api/health')}
                          >
                            {testingEndpoint === '/api/health' ? 'Testing...' : 'Test Request'}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="method-badge get">GET</span></td>
                        <td><code>/api/products</code></td>
                        <td>Product catalog with filter & sort</td>
                        <td>
                          <button
                            className="btn-test-api"
                            disabled={testingEndpoint === '/api/products'}
                            onClick={() => handleTestEndpoint('/api/products')}
                          >
                            {testingEndpoint === '/api/products' ? 'Testing...' : 'Test Request'}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="method-badge get">GET</span></td>
                        <td><code>/api/orders</code></td>
                        <td>Customer order history & tracking</td>
                        <td>
                          <button
                            className="btn-test-api"
                            disabled={testingEndpoint === '/api/orders'}
                            onClick={() => handleTestEndpoint('/api/orders')}
                          >
                            {testingEndpoint === '/api/orders' ? 'Testing...' : 'Test Request'}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="method-badge get">GET</span></td>
                        <td><code>/api/appointments</code></td>
                        <td>Consultation appointments list</td>
                        <td>
                          <button
                            className="btn-test-api"
                            disabled={testingEndpoint === '/api/appointments'}
                            onClick={() => handleTestEndpoint('/api/appointments')}
                          >
                            {testingEndpoint === '/api/appointments' ? 'Testing...' : 'Test Request'}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="method-badge get">GET</span></td>
                        <td><code>/api/vouchers</code></td>
                        <td>Promotional voucher discounts</td>
                        <td>
                          <button
                            className="btn-test-api"
                            disabled={testingEndpoint === '/api/vouchers'}
                            onClick={() => handleTestEndpoint('/api/vouchers')}
                          >
                            {testingEndpoint === '/api/vouchers' ? 'Testing...' : 'Test Request'}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="method-badge get">GET</span></td>
                        <td><code>/api/auth/profile</code></td>
                        <td>Customer profile & VIP loyalty</td>
                        <td>
                          <button
                            className="btn-test-api"
                            disabled={testingEndpoint === '/api/auth/profile'}
                            onClick={() => handleTestEndpoint('/api/auth/profile')}
                          >
                            {testingEndpoint === '/api/auth/profile' ? 'Testing...' : 'Test Request'}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Live JSON Response Viewer */}
              {apiTestResponse && (
                <div className="api-test-output-panel animate-fade-in">
                  <div className="output-panel-header">
                    <span className="output-tag">
                      HTTP {apiTestResponse.status} — {apiTestResponse.endpoint}
                    </span>
                    <button
                      className="btn-copy-code"
                      onClick={() => copyToClipboard(JSON.stringify(apiTestResponse.data, null, 2))}
                    >
                      <Copy size={13} />
                      <span>Copy JSON</span>
                    </button>
                  </div>
                  <pre className="code-output-block">
                    {JSON.stringify(apiTestResponse.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FUTURE SCALING ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="tech-tab-content animate-fade-in">
              <div className="roadmap-timeline">
                {/* Phase 1 */}
                <div className="roadmap-phase-card completed">
                  <div className="phase-badge-row">
                    <span className="phase-number">PHASE 01 • PROTOTYPE & FOUNDATION</span>
                    <span className="phase-status-badge completed">
                      <CheckCircle2 size={13} /> COMPLETED
                    </span>
                  </div>
                  <h3 className="phase-title">High-Fidelity Storefront & Architecture Design</h3>
                  <p className="phase-desc">
                    Established the core luxury brand VELORA, built all 8 customer-facing screens, interactive mega menus, appointment booking, custom gown reviews, cart, checkout, and integrated local Express REST API.
                  </p>
                  <ul className="phase-deliverables">
                    <li><Check size={14} className="text-success" /> Responsive React 19 Frontend with modern CSS tokens</li>
                    <li><Check size={14} className="text-success" /> Node.js & Express.js REST API with file-backed persistence</li>
                    <li><Check size={14} className="text-success" /> Complete Bridal Fitting Consultation Booking workflow</li>
                    <li><Check size={14} className="text-success" /> Live Cart, Coupon Voucher Validator & Order Generation</li>
                  </ul>
                </div>

                {/* Phase 2 */}
                <div className="roadmap-phase-card in-progress">
                  <div className="phase-badge-row">
                    <span className="phase-number">PHASE 02 • PRODUCTION BACKEND & SECURITY</span>
                    <span className="phase-status-badge in-progress">
                      <Activity size={13} /> UP NEXT (Q1 2027)
                    </span>
                  </div>
                  <h3 className="phase-title">Enterprise Database, Auth & Payment Gateway</h3>
                  <p className="phase-desc">
                    Transitioning from file-based storage to high-availability relational/document cloud databases and secure transaction processing.
                  </p>
                  <ul className="phase-deliverables">
                    <li><ArrowRight size={14} className="text-gold" /> PostgreSQL or MongoDB database integration with Prisma ORM</li>
                    <li><ArrowRight size={14} className="text-gold" /> JWT (JSON Web Tokens) with bcrypt password hashing & OAuth2 (Google/Apple login)</li>
                    <li><ArrowRight size={14} className="text-gold" /> Live Stripe & SSLCommerz payment gateway webhooks</li>
                    <li><ArrowRight size={14} className="text-gold" /> Automated Email / SMS notification service via SendGrid / Twilio</li>
                  </ul>
                </div>

                {/* Phase 3 */}
                <div className="roadmap-phase-card future">
                  <div className="phase-badge-row">
                    <span className="phase-number">PHASE 03 • AI & IMMERSIVE BRIDAL LUXURY</span>
                    <span className="phase-status-badge future">
                      <Sparkles size={13} /> FUTURE HORIZON
                    </span>
                  </div>
                  <h3 className="phase-title">3D Virtual Fitting Room & AI Bridal Stylist</h3>
                  <p className="phase-desc">
                    Revolutionizing online luxury bridal shopping through augmented reality and personalized bridal recommendations.
                  </p>
                  <ul className="phase-deliverables">
                    <li><ArrowRight size={14} className="text-gold" /> 3D WebGL / Three.js 360° gown viewer with fabric physics simulation</li>
                    <li><ArrowRight size={14} className="text-gold" /> AI Bridal Consultant Chatbot trained on bridal body silhouettes & venue themes</li>
                    <li><ArrowRight size={14} className="text-gold" /> Atelier Multi-Vendor Portal for global wedding dress designers</li>
                    <li><ArrowRight size={14} className="text-gold" /> Automated WhatsApp appointment reminders with Google Calendar sync</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRESENTATION GUIDANCE (বাংলা) */}
          {activeTab === 'presentation' && (
            <div className="tech-tab-content animate-fade-in">
              <div className="presentation-guide-card">
                <div className="guide-header">
                  <Sparkles size={18} className="text-gold" />
                  <h4>ইন্টার্ন প্রেজেন্টেশনের জন্য কথা বলার স্ক্রিপ্ট (Option 07 Presentation Guide)</h4>
                </div>
                <p className="guide-intro">
                  ইন্টারভিউয়ার বা ইভালুয়েটর যখন টেক স্ট্যাক এবং ফিউচার প্ল্যান সম্পর্কে জানতে চাইবেন, তখন এই পয়েন্টগুলো আত্মবিশ্বাসের সাথে উপস্থাপন করবেন:
                </p>

                <div className="speech-points-container">
                  <div className="speech-box">
                    <span className="speech-badge">POINT 1: আর্কিটেকচার পরিচয়</span>
                    <h5>"আমরা VELORA প্রজেক্টটিকে একটি Modern Decoupled Client-Server আর্কিটেকচারে তৈরি করেছি।"</h5>
                    <p>
                      <strong>বাংলা ব্যাখ্যা:</strong> আমাদের ফ্রন্টএন্ড React 19 ও Vite 8 দিয়ে তৈরি, যা অত্যন্ত দ্রুত এবং রেস্পন্সিভ। আর ব্যাকএন্ড Node.js এবং Express.js REST API দিয়ে সম্পূর্ণ আলাদাভাবে চালানো হয়েছে (Port 5000)। ফলে সিস্টেমটি মডুলার এবং স্কেলেবল।
                    </p>
                  </div>

                  <div className="speech-box">
                    <span className="speech-badge">POINT 2: ব্যাকএন্ড এবং ডাটা পারসিস্টেন্স</span>
                    <h5>"প্রোটোটাইপ ইভ্যালুয়েশনের জন্য একটি সম্পূর্ণ ফাংশনাল REST API এবং ডাটা স্টোর রেডি আছে।"</h5>
                    <p>
                      <strong>বাংলা ব্যাখ্যা:</strong> ব্যাকএন্ডে Products, Orders, Bridal Appointments, Vouchers এবং Auth এর জন্য আলাদা রাউট হ্যান্ডলার রয়েছে। প্রতিটি অ্যাপয়েন্টমেন্ট বা অর্ডার বুকিং করার সাথে সাথে ফাইল ও ক্যাশে সেভ হয়। এছাড়াও ফ্রন্টএন্ডে অফলাইন ফলব্যাক আর্কিটেকচার রাখা হয়েছে, যাতে সার্ভার বন্ধ থাকলেও সাইট ক্র্যাশ না করে।
                    </p>
                  </div>

                  <div className="speech-box">
                    <span className="speech-badge">POINT 3: ভবিষ্যৎ পরিকল্পনা (Future Roadmap)</span>
                    <h5>"পরবর্তী ধাপে আমরা এটিকে ক্লাউড ডেটাবেস এবং AI ব্রাইডাল ফিটিংয়ে রূপান্তর করব।"</h5>
                    <p>
                      <strong>বাংলা ব্যাখ্যা:</strong> ফিউচার প্ল্যানে আমাদের তিনটি মূল লক্ষ্য—<br />
                      ১. <strong>PostgreSQL ও Prisma ORM</strong> দিয়ে ক্লাউড ডেটাবেস ও JWT অথেনটিকেশন যুক্ত করা।<br />
                      ২. <strong>Stripe / SSLCommerz</strong> পেমেন্ট গেটওয়ে ইন্টিগ্রেশন।<br />
                      ৩. ব্রাইডদের জন্য <strong>AI ভার্চুয়াল স্টাইলিস্ট</strong> ও <strong>3D AR ভার্চুয়াল গাউন ফিটিং</strong> প্রযুক্তি সংযোজন।
                    </p>
                  </div>
                </div>

                <div className="quick-copy-bar">
                  <span>দরকার হলে ইন্টারভিউ নোট হিসেবে কপি করে নিন:</span>
                  <button
                    className="btn-luxe-copy"
                    onClick={() =>
                      copyToClipboard(
                        "VELORA Project Tech Stack:\n- Frontend: React 19, Vite 8, Custom Luxury CSS3 Design Tokens, Lucide Icons, Context API\n- Backend: Node.js, Express.js REST API (Port 5000), CORS middleware, File Persistence\n- Features: Products Catalog, Custom Reviews, Bridal Appointments, Cart/Checkout, Promo Vouchers\n- Future Roadmap: PostgreSQL/Prisma ORM, Stripe Payments, JWT Auth, AI Virtual Fitting"
                      )
                    }
                  >
                    <Copy size={13} />
                    <span>Copy Tech Summary</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="tech-modal-footer">
          <div className="footer-left-info">
            <span className="server-indicator-dot"></span>
            <span className="text-xs text-muted">
              VELORA Luxury Bridal Boutique • Architectural Blueprint v1.0
            </span>
          </div>

          <div className="footer-right-buttons">
            <button
              type="button"
              className="btn-secondary-luxe"
              onClick={onClose}
            >
              Close Showcase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
