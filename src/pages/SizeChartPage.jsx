import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Scissors, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WEDDING_DRESS_OPTIONS_DATA } from '../data/weddingDressesFeatures';
import { PageBackBar } from '../components/common/PageBackBar';
import '../styles/luxe-bridal.css';

const SIZE_ROWS = [
  { us: '0', uk: '4', eu: '32', bust: [32, 81], waist: [24, 61], hHip: [31, 79], lHip: [34.5, 88], hth: [58, 147] },
  { us: '2', uk: '6', eu: '34', bust: [33, 84], waist: [25, 63.5], hHip: [32, 81], lHip: [35.5, 90], hth: [58.5, 149] },
  { us: '4', uk: '8', eu: '36', bust: [34, 86.5], waist: [26, 66], hHip: [33, 84], lHip: [36.5, 93], hth: [59, 150] },
  { us: '6', uk: '10', eu: '38', bust: [35, 89], waist: [27, 68.5], hHip: [34, 86.5], lHip: [37.5, 95], hth: [59.5, 151] },
  { us: '8', uk: '12', eu: '40', bust: [36, 91.5], waist: [28, 71], hHip: [35, 89], lHip: [38.5, 98], hth: [60, 152] },
  { us: '10', uk: '14', eu: '42', bust: [37.5, 95], waist: [29.5, 75], hHip: [36.5, 93], lHip: [40, 102], hth: [60, 152] },
  { us: '12', uk: '16', eu: '44', bust: [39, 99], waist: [31, 79], hHip: [38, 96.5], lHip: [41.5, 105], hth: [60.5, 154] },
  { us: '14', uk: '18', eu: '46', bust: [41, 104], waist: [33, 84], hHip: [40, 102], lHip: [43.5, 110], hth: [61, 155] },
  { us: '16', uk: '20', eu: '48', bust: [43, 109], waist: [35, 89], hHip: [42, 107], lHip: [45.5, 116], hth: [61, 155] }
];

export const SizeChartPage = () => {
  const { setIsAppointmentModalOpen } = useApp();
  const [measurementUnit, setMeasurementUnit] = useState('in');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sizeData = WEDDING_DRESS_OPTIONS_DATA['SIZE CHART'] || {
    badge: 'Inclusive Sizes US 2–28',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'Every VELORA wedding dress is patterned with precision across US sizes 0 to 28, with custom bust cup and hollow-to-hem tailoring options.'
  };

  return (
    <div className="velora-collection-page animate-fade-in" id="velora-size-chart-page">
      <PageBackBar
        fallbackPath="/dresses"
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Wedding Dresses', to: '/dresses' },
          { label: 'Size Chart' }
        ]}
      />

      <div className="velora-dedicated-header">
        <span className="velora-dedicated-eyebrow">ATELIER SIZING & FIT GUIDE</span>
        <h1 className="velora-collection-heading" style={{ margin: '6px 0 12px 0' }}>
          ATELIER MEASUREMENT & SIZING STUDIO
        </h1>
      </div>

      <div className="special-size-chart-view">
        <div className="size-chart-hero">
          <div className="size-chart-hero-content">
            <span className="hero-pill-badge">
              <Ruler size={13} /> {sizeData.badge}
            </span>
            <h2 className="size-chart-main-heading">Precision Couture Fit Standard</h2>
            <p className="size-chart-subtext">{sizeData.thought}</p>

            <div className="unit-toggle-wrap">
              <span className="unit-toggle-label">Measurement Scale:</span>
              <div className="unit-toggle-buttons">
                <button
                  type="button"
                  className={`unit-btn ${measurementUnit === 'in' ? 'active' : ''}`}
                  onClick={() => setMeasurementUnit('in')}
                >
                  Inches (in)
                </button>
                <button
                  type="button"
                  className={`unit-btn ${measurementUnit === 'cm' ? 'active' : ''}`}
                  onClick={() => setMeasurementUnit('cm')}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>
          </div>

          <div className="size-chart-hero-media">
            <img
              src={sizeData.heroImage}
              alt="Atelier seamstress fitting bride"
              className="size-chart-media-img"
            />
            <div className="media-overlay-note">
              <Scissors size={14} /> Made-to-measure bespoke options available in all flagship boutiques
            </div>
          </div>
        </div>

        <div className="sizing-table-wrapper">
          <table className="atelier-sizing-table">
            <thead>
              <tr>
                <th>US SIZE</th>
                <th>UK / AU</th>
                <th>EU</th>
                <th>BUST ({measurementUnit})</th>
                <th>NATURAL WAIST ({measurementUnit})</th>
                <th>HIGH HIP ({measurementUnit})</th>
                <th>LOW HIP ({measurementUnit})</th>
                <th>HOLLOW TO HEM ({measurementUnit})</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_ROWS.map((row, idx) => (
                <tr key={row.us} className={idx % 2 === 0 ? 'even-row' : ''}>
                  <td className="size-highlight">US {row.us}</td>
                  <td>UK {row.uk}</td>
                  <td>EU {row.eu}</td>
                  <td>{measurementUnit === 'in' ? `${row.bust[0]}"` : `${row.bust[1]} cm`}</td>
                  <td>{measurementUnit === 'in' ? `${row.waist[0]}"` : `${row.waist[1]} cm`}</td>
                  <td>{measurementUnit === 'in' ? `${row.hHip[0]}"` : `${row.hHip[1]} cm`}</td>
                  <td>{measurementUnit === 'in' ? `${row.lHip[0]}"` : `${row.lHip[1]} cm`}</td>
                  <td>{measurementUnit === 'in' ? `${row.hth[0]}"` : `${row.hth[1]} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="measurement-steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h4>Bust Circumference</h4>
            <p>Measure gently around the fullest part of your bust across the shoulder blades, wearing the exact style of bridal lingerie you intend for your gown.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h4>Natural Waist</h4>
            <p>Wrap the tape measure around the narrowest part of your waistline, typically 1 to 1.5 inches above your navel. Keep tape comfortably snug, not tight.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h4>Hips & Hollow to Hem</h4>
            <p>Stand straight with feet together. Measure around the fullest point of your hips. For hem length, measure from collarbone hollow straight down including bridal heel height.</p>
          </div>
        </div>

        <div className="size-chart-footer-cta" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-atelier-primary"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            <Calendar size={16} /> Book Private Fitting Consultation
          </button>
          <Link to="/dresses" className="btn-atelier-secondary" style={{ textDecoration: 'none' }}>
            <span>Explore Wedding Gowns</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SizeChartPage;
