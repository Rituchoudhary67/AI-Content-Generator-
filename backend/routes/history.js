const router = require('express').Router();
const auth = require('../middleware/auth');
const Content = require('../models/Content');

router.get('/', auth, async (req, res) => {
  try {
    const { contentType, tone, favorite, search, page = 1, limit = 10 } = req.query;
    const filter = { user: req.user._id };
    if (contentType) filter.contentType = contentType;
    if (tone) filter.tone = tone;
    if (favorite === 'true') filter.isFavorite = true;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { topic: { $regex: search, $options: 'i' } }
    ];
    const total = await Content.countDocuments(filter);
    const contents = await Content.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-versions.text');
    res.json({ contents, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOne({ _id: req.params.id, user: req.user._id });
    if (!content) return res.status(404).json({ error: 'Not found' });
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

module.exports = router;