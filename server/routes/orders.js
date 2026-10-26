import express from 'express';
import { getDB, saveDB } from '../data/store.js';

const router = express.Router();

// GET /api/orders - list all orders
router.get('/', (req, res) => {
  try {
    const db = getDB();
    res.json({
      success: true,
      total: db.orders.length,
      data: db.orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:id - get order by ID
router.get('/:id', (req, res) => {
  try {
    const db = getDB();
    const order = db.orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders - create a new order
router.post('/', (req, res) => {
  try {
    const db = getDB();
    const { items, shippingAddress, paymentMethod, subtotal, discount, shipping, tax, total } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    const orderId = `VLR-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `TRK-${Math.floor(100000 + Math.random() * 900000)}-US`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      status: 'Processing',
      trackingNumber,
      carrier: 'White-Glove Luxury Courier',
      estimatedDelivery: '3-5 Business Days',
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      shipping: Number(shipping) || 0,
      tax: Number(tax) || 0,
      total: Number(total) || 0,
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'Credit Card'
    };

    db.orders.unshift(newOrder);
    saveDB();

    res.status(201).json({
      success: true,
      message: 'Bridal order confirmed successfully',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
