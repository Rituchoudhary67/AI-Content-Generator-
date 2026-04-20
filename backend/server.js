const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const historyRoutes = require('./routes/history');
const statsRoutes = require('./routes/stats');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/stats', statsRoutes);

// Global rate limiter — max 100 requests per 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(globalLimiter);

// Stricter limiter for AI generation — max 20 per hour
const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: 'Generation limit reached. Try again in an hour.' }
});
app.use('/api/content/generate', generateLimiter);

// Routes (we'll add these one by one)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ContentForge API is running!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});