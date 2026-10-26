import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDB } from './data/store.js';

import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import appointmentsRouter from './routes/appointments.js';
import vouchersRouter from './routes/vouchers.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const startTime = Date.now();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[VELORA API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
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
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    uptimeSeconds,
    database: {
      type: 'Local File Persistence (db.json)',
      productsCount: db.products ? db.products.length : 0,
      ordersCount: db.orders ? db.orders.length : 0,
      appointmentsCount: db.appointments ? db.appointments.length : 0,
      vouchersCount: db.vouchers ? db.vouchers.length : 0,
      usersCount: db.users ? db.users.length : 0
    },
    endpoints: [
      { method: 'GET', path: '/api/health', description: 'System health check & diagnostics' },
      { method: 'GET', path: '/api/products', description: 'Product catalog with search, filter, pagination' },
      { method: 'GET', path: '/api/products/:id', description: 'Product detail by ID or slug' },
      { method: 'POST', path: '/api/products/:id/reviews', description: 'Post new bridal gown review' },
      { method: 'GET', path: '/api/orders', description: 'List customer orders' },
      { method: 'POST', path: '/api/orders', description: 'Create and confirm new bridal order' },
      { method: 'GET', path: '/api/appointments', description: 'List atelier bridal consultation appointments' },
      { method: 'POST', path: '/api/appointments', description: 'Book bridal fitting appointment' },
      { method: 'PUT', path: '/api/appointments/:id/cancel', description: 'Cancel existing appointment' },
      { method: 'GET', path: '/api/vouchers', description: 'List promo vouchers' },
      { method: 'POST', path: '/api/vouchers/validate', description: 'Validate promotional discount code' },
      { method: 'POST', path: '/api/auth/login', description: 'Customer login & session token' },
      { method: 'GET', path: '/api/auth/profile', description: 'Customer profile details' }
    ]
  });
});

// Mount Routes
app.use('/api/products', productsRouter);
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
