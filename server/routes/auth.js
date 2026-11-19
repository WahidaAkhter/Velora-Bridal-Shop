import express from 'express';

const router = express.Router();

/**
 * 410 Gone
 * Prototype server-side auth is deprecated.
 * All client authentication is performed directly via Supabase Auth.
 */
router.all('*', (req, res) => {
  res.status(410).json({
    success: false,
    message: 'Express prototype authentication has been removed (410 Gone). Authentication is now handled directly via Supabase Auth.'
  });
});

export default router;
