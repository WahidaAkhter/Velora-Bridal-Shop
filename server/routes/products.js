import express from 'express';
import { getDB, saveDB } from '../data/store.js';

const router = express.Router();

// GET /api/products - list all products with optional filtering/search
router.get('/', (req, res) => {
  try {
    const db = getDB();
    let products = [...(db.products || [])];
    const { category, search, sort, limit, page } = req.query;

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category || p.categoryName?.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const total = products.length;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 50;
    const start = (pageNum - 1) * limitNum;
    const paginated = products.slice(start, start + limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      data: paginated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id - get single product by ID or slug
router.get('/:id', (req, res) => {
  try {
    const db = getDB();
    const product = db.products.find(p => p.id === req.params.id || p.slug === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products/:id/reviews - submit a new review
router.post('/:id/reviews', (req, res) => {
  try {
    const db = getDB();
    const product = db.products.find(p => p.id === req.params.id || p.slug === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const { author, rating, comment, title } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Author, rating, and comment are required' });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author,
      title: title || 'Verified Bride Experience',
      rating: Number(rating),
      comment,
      date: 'Just now',
      verified: true
    };

    if (!product.reviews) product.reviews = [];
    product.reviews.unshift(newReview);

    // Recalculate average rating
    const totalRating = product.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    product.rating = Number((totalRating / product.reviews.length).toFixed(1));
    product.reviewCount = product.reviews.length;

    saveDB();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: newReview,
      productRating: product.rating,
      productReviewCount: product.reviewCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
