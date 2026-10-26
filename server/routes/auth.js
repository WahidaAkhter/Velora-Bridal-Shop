import express from 'express';
import { getDB, saveDB } from '../data/store.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const db = getDB();
    let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Mock auto-create for prototype test convenience
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email.toLowerCase(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        phone: '+1 (555) 123-4567',
        memberSince: 'October 2026',
        membershipTier: 'VELORA Bridal Member',
        addresses: [],
        giftCards: []
      };
      db.users.push(user);
      saveDB();
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      token: `velora-token-${user.id}-${Date.now()}`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/profile
router.get('/profile', (req, res) => {
  try {
    const db = getDB();
    const user = db.users[0] || null;
    if (!user) {
      return res.status(404).json({ success: false, message: 'No active profile found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', (req, res) => {
  try {
    const db = getDB();
    const user = db.users[0];
    if (!user) {
      return res.status(404).json({ success: false, message: 'No active profile found' });
    }

    const { name, phone } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;

    saveDB();
    res.json({ success: true, message: 'Profile updated', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/addresses
router.post('/addresses', (req, res) => {
  try {
    const db = getDB();
    const user = db.users[0];
    if (!user) {
      return res.status(404).json({ success: false, message: 'No active profile found' });
    }

    const address = {
      id: `addr-${Date.now()}`,
      ...req.body
    };

    if (!user.addresses) user.addresses = [];
    user.addresses.push(address);
    saveDB();

    res.status(201).json({ success: true, message: 'Address saved', data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
