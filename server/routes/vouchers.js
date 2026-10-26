import express from 'express';
import { getDB } from '../data/store.js';

const router = express.Router();

// GET /api/vouchers - list all active promo vouchers
router.get('/', (req, res) => {
  try {
    const db = getDB();
    res.json({
      success: true,
      total: db.vouchers.length,
      data: db.vouchers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/vouchers/validate - validate voucher and calculate discount
router.post('/validate', (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Voucher code is required' });
    }

    const db = getDB();
    const cleanCode = code.trim().toUpperCase();
    const voucher = db.vouchers.find(v => v.code.toUpperCase() === cleanCode);

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Invalid voucher code. Try VELORA20 for 20% off.'
      });
    }

    const currentSubtotal = Number(subtotal) || 0;
    if (voucher.minSpend && currentSubtotal < voucher.minSpend) {
      return res.status(400).json({
        success: false,
        message: `Voucher requires a minimum spend of $${voucher.minSpend.toFixed(2)}`
      });
    }

    let discountAmount = 0;
    if (voucher.type === 'percentage') {
      discountAmount = (currentSubtotal * voucher.value) / 100;
    } else if (voucher.type === 'fixed') {
      discountAmount = Math.min(voucher.value, currentSubtotal);
    } else if (voucher.type === 'shipping') {
      discountAmount = 0; // free shipping flag
    }

    res.json({
      success: true,
      data: {
        code: voucher.code,
        type: voucher.type,
        value: voucher.value,
        discountAmount: Number(discountAmount.toFixed(2)),
        description: voucher.description,
        freeShipping: voucher.type === 'shipping'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
