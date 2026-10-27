import express from 'express';
import { getDB } from '../data/store.js';

const router = express.Router();

// GET /api/accessories
router.get('/', (req, res) => {
  try {
    const db = getDB();
    res.json({
      success: true,
      data: db.accessories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
