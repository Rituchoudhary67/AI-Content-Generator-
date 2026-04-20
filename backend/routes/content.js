const router = require('express').Router();
const auth = require('../middleware/auth');
const Content = require('../models/Content');
const User = require('../models/User');
const { generateContent, generateImprovements } = require('../controllers/gemini');

// Generate new content
router.post('/generate', auth, async (req, res) => {
  try {
    const { topic, contentType, tone, targetAudience, wordCount, language, title } = req.body;

    if (!topic || !contentType || !tone)
      return res.status(400).json({ error: 'topic, contentType and tone are required' });

    const { text, tokensUsed } = await generateContent({
      topic,
      contentType,
      tone,
      targetAudience: targetAudience || 'general audience',
      wordCount: wordCount || 'medium',
      language: language || 'English'
    });

    // Save to MongoDB
    const content = await Content.create({
      user: req.user._id,
      title: title || `${contentType.replace(/-/g, ' ')} about ${topic}`.slice(0, 80),
      topic, contentType, tone, targetAudience, wordCount, language,
      versions: [{ text, tokensUsed }],
      currentVersion: 0
    });

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalGenerations: 1, totalTokensUsed: tokensUsed }
    });

    res.json({ content, message: 'Content generated successfully' });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate content' });
  }
});

// Regenerate — adds a new version
router.post('/:id/regenerate', auth, async (req, res) => {
  try {
    const content = await Content.findOne({ _id: req.params.id, user: req.user._id });
    if (!content) return res.status(404).json({ error: 'Content not found' });

    const { text, tokensUsed } = await generateContent({
      topic: content.topic,
      contentType: content.contentType,
      tone: content.tone,
      targetAudience: content.targetAudience,
      wordCount: content.wordCount,
      language: content.language
    });

    content.versions.push({ text, tokensUsed });
    content.currentVersion = content.versions.length - 1;
    await content.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalGenerations: 1, totalTokensUsed: tokensUsed }
    });

    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to regenerate' });
  }
});

// Get AI improvement suggestions
router.post('/:id/improve', auth, async (req, res) => {
  try {
    const content = await Content.findOne({ _id: req.params.id, user: req.user._id });
    if (!content) return res.status(404).json({ error: 'Content not found' });

    const latestText = content.versions[content.currentVersion]?.text;
    if (!latestText) return res.status(400).json({ error: 'No content to analyze' });

    const improvements = await generateImprovements(latestText, content.contentType);

    content.improvements = JSON.stringify(improvements);
    await content.save();

    res.json({ improvements });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to get improvements' });
  }
});

// Switch active version
router.patch('/:id/version', auth, async (req, res) => {
  try {
    const { versionIndex } = req.body;
    const content = await Content.findOne({ _id: req.params.id, user: req.user._id });
    if (!content) return res.status(404).json({ error: 'Not found' });
    if (versionIndex < 0 || versionIndex >= content.versions.length)
      return res.status(400).json({ error: 'Invalid version index' });

    content.currentVersion = versionIndex;
    await content.save();
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to switch version' });
  }
});

// Toggle favorite
router.patch('/:id/favorite', auth, async (req, res) => {
  try {
    const content = await Content.findOne({ _id: req.params.id, user: req.user._id });
    if (!content) return res.status(404).json({ error: 'Not found' });
    content.isFavorite = !content.isFavorite;
    await content.save();
    res.json({ isFavorite: content.isFavorite });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

// Delete content
router.delete('/:id', auth, async (req, res) => {
  try {
    await Content.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;