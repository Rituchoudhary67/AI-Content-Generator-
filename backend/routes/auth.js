const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid email or password' });

    const token = signToken(user._id);
    res.json({ token, user });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get current logged in user
router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;