import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Download
} from 'lucide-react';

export const OrderConfirmationModal = ({ order, onClose }) => {
  const { showToast, formatPrice } = useApp();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    showToast('Invoice PDF downloaded successfully!');
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="order-receipt-modal glass-panel animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="receipt-header text-center">
          <div className="success-icon-badge">
            <CheckCircle2 size={36} className="text-success" />
          </div>
          <h2>Order Receipt & Details</h2>
          <p className="text-muted">Order ID: <strong>#{order.id}</strong> • Placed on {order.date}</p>
        </div>

        {/* Order Tracking Progress Bar */}
        <div className="tracking-progress-card glass-panel">
          <div className="tracking-header-row">
            <div>
              <span className="text-xs text-muted block">CARRIER TRACKING</span>
              <strong>{order.carrier} — {order.trackingNumber}</strong>
            </div>
            <span className="badge badge-success">{order.status}</span>
          </div>

          <div className="progress-timeline-bar mt-4">
            <div className="timeline-step completed">
              <div className="step-dot" />
              <span>Order Placed</span>
            </div>
            <div className="timeline-line completed" />
            <div className="timeline-step completed">
              <div className="step-dot" />
              <span>Processing</span>
            </div>
            <div className="timeline-line completed" />
            <div className="timeline-step active">
              <div className="step-dot" />
              <span>In Transit</span>
            </div>
            <div className="timeline-line" />
            <div className="timeline-step">
              <div className="step-dot" />
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Itemized Order Table */}
        <div className="receipt-items-section mt-4">
          <h4>Order Items ({order.items.length})</h4>
          <div className="receipt-items-table">
            {order.items.map((item, idx) => (
              <div key={idx} className="receipt-item-row">
                <img src={item.image} alt={item.name} />
                <div className="item-meta">
                  <strong>{item.name}</strong>
                  <span className="text-muted text-sm">{item.variantName}</span>
                </div>
                <div className="qty-col">
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className="price-col">
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown & Addresses Grid */}
        <div className="receipt-footer-grid mt-4">
          <div className="receipt-block">
            <div className="block-title">
              <MapPin size={15} /> Shipping Address
            </div>
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
          </div>

          <div className="receipt-block">
            <div className="block-title">
              <CreditCard size={15} /> Payment & Method
            </div>
            <p>{order.paymentMethod}</p>
            <span className="badge badge-primary mt-1">Status: Paid</span>
          </div>

          <div className="receipt-block totals-block">
            <div className="row">
              <span>Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="row text-success">
                <span>Discount{order.voucherCode ? ` (${order.voucherCode})` : ''}:</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="row">
              <span>Shipping:</span>
              <span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
            </div>
            <div className="row">
              <span>Tax (8%):</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            {order.giftCardCredit > 0 && (
              <div className="row text-success">
                <span>Gift card:</span>
                <span>-{formatPrice(order.giftCardCredit)}</span>
              </div>
            )}
            <hr />
            <div className="row grand-total">
              <span>Grand Total:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="receipt-actions-row mt-6">
          <button className="btn btn-outline" onClick={handlePrint}>
            <Printer size={16} /> Print Receipt
          </button>
          <button className="btn btn-secondary" onClick={handleDownloadInvoice}>
            <Download size={16} /> Download PDF Invoice
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
