import express from 'express';
import { getDB } from '../data/store.js';

const router = express.Router();

// GET /api/collections
router.get('/', (req, res) => {
  try {
    const db = getDB();
    res.json({
      success: true,
      data: db.allCollections
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
