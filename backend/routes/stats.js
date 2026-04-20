const router = require('express').Router();
const auth = require('../middleware/auth');
const Content = require('../models/Content');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const [totalDocs, byType, byTone] = await Promise.all([
      Content.countDocuments({ user: userId }),
      Content.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$contentType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Content.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$tone', count: { $sum: 1 } } }
      ]),
    ]);
    res.json({
      totalGenerations: req.user.totalGenerations,
      totalTokensUsed: req.user.totalTokensUsed,
      totalSaved: totalDocs,
      favoriteCount: await Content.countDocuments({ user: userId, isFavorite: true }),
      byContentType: byType,
      byTone,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;