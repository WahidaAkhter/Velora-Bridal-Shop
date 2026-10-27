import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDB } from './data/store.js';

import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import appointmentsRouter from './routes/appointments.js';
import vouchersRouter from './routes/vouchers.js';
import authRouter from './routes/auth.js';
import mediaRouter from './routes/media.js';
import legacyCollectionRouter from './routes/legacyCollection.js';
import quickShipRouter from './routes/quickShip.js';
import sashesRouter from './routes/sashes.js';
import accessoriesRouter from './routes/accessories.js';
import allCollectionsRouter from './routes/allCollections.js';
import lookbooksRouter from './routes/lookbooks.js';
import ourStoryRouter from './routes/ourStory.js';
import channelsRouter from './routes/channels.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const startTime = Date.now();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Serve local bridal images directly from the backend server
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
app.use('/images', express.static(PUBLIC_IMAGES_DIR, {
  maxAge: '30d',
  immutable: true
}));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.originalUrl.startsWith('/api/media')) {
      console.log(`[VELORA API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health & System Info Endpoint
app.get('/api/health', (req, res) => {
  const db = getDB();
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  res.json({
    status: 'online',
    brand: 'VELORA Luxury Bridal Boutique',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    uptimeSeconds,
    database: {
      type: 'Integrated REST Data Store + Media Proxy',
      productsCount: db.products ? db.products.length : 0,
      ordersCount: db.orders ? db.orders.length : 0,
      appointmentsCount: db.appointments ? db.appointments.length : 0,
      vouchersCount: db.vouchers ? db.vouchers.length : 0,
      legacyCount: db.legacyCollection?.gowns ? db.legacyCollection.gowns.length : 0,
      quickShipCount: db.quickShip?.products ? db.quickShip.products.length : 0,
      sashesCount: db.sashes?.products ? db.sashes.products.length : 0,
      accessoriesCount: db.accessories?.items ? db.accessories.items.length : 0,
      lookbooksCount: db.lookbooks?.collections ? db.lookbooks.collections.length : 0
    },
    endpoints: [
      { method: 'GET', path: '/api/health', description: 'System health check & diagnostics' },
      { method: 'GET', path: '/api/media?url=...', description: 'Backend media streaming proxy & disk cache' },
      { method: 'GET', path: '/images/...', description: 'Local static bridal imagery directly from backend' },
      { method: 'GET', path: '/api/products', description: 'Full bridal catalog with search, filter, pagination' },
      { method: 'GET', path: '/api/products/:id', description: 'Product detail by ID or slug' },
      { method: 'POST', path: '/api/products/:id/reviews', description: 'Post new bridal gown review' },
      { method: 'GET', path: '/api/legacy-collection', description: 'Legacy bridal gown collection' },
      { method: 'GET', path: '/api/quick-ship', description: 'Quick ship gowns faster delivery catalog' },
      { method: 'GET', path: '/api/sashes', description: 'Bridal belts and sashes catalog' },
      { method: 'GET', path: '/api/accessories', description: 'Bridal accessories categories and pieces' },
      { method: 'GET', path: '/api/collections', description: 'All bridal collections, silhouettes, styles' },
      { method: 'GET', path: '/api/lookbooks', description: 'Digital lookbooks and editorial flipbooks' },
      { method: 'GET', path: '/api/our-story', description: 'VELORA brand editorial story, pillars, FAQs' },
      { method: 'GET', path: '/api/channels', description: 'Currencies, taxes, shipping rates' },
      { method: 'GET', path: '/api/orders', description: 'Customer orders' },
      { method: 'POST', path: '/api/orders', description: 'Create and confirm new bridal order' },
      { method: 'GET', path: '/api/appointments', description: 'Atelier consultation appointments' },
      { method: 'POST', path: '/api/appointments', description: 'Book bridal fitting appointment' },
      { method: 'PUT', path: '/api/appointments/:id/cancel', description: 'Cancel existing appointment' },
      { method: 'GET', path: '/api/vouchers', description: 'Promotional vouchers' },
      { method: 'POST', path: '/api/vouchers/validate', description: 'Validate promotional discount code' },
      { method: 'POST', path: '/api/auth/login', description: 'Customer login & session token' },
      { method: 'GET', path: '/api/auth/profile', description: 'Customer profile details' }
    ]
  });
});

// Mount Routes
app.use('/api/media', mediaRouter);
app.use('/api/products', productsRouter);
app.use('/api/legacy-collection', legacyCollectionRouter);
app.use('/api/quick-ship', quickShipRouter);
app.use('/api/sashes', sashesRouter);
app.use('/api/accessories', accessoriesRouter);
app.use('/api/collections', allCollectionsRouter);
app.use('/api/lookbooks', lookbooksRouter);
app.use('/api/our-story', ourStoryRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/vouchers', vouchersRouter);
app.use('/api/auth', authRouter);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Default root response
app.get('/', (req, res) => {
  res.json({
    message: 'VELORA Luxury Bridal Boutique REST API Server',
    healthCheck: '/api/health',
    documentation: 'See /api/health for full endpoints list'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`VELORA Luxury Bridal Backend Server`);
  console.log(`Active URL: http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
