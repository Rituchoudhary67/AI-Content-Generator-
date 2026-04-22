const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  tokensUsed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const contentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  topic: { type: String, required: true },
  contentType: {
    type: String,
    enum: ['blog-post', 'linkedin-post', 'tweet-thread', 'email',
           'product-description', 'youtube-script', 'instagram-caption', 'cold-outreach'],
    required: true
  },
  tone: {
    type: String,
    enum: ['professional', 'casual', 'witty', 'inspirational', 'formal', 'conversational'],
    required: true
  },
  targetAudience: { type: String, default: 'general' },
  wordCount: { type: String, enum: ['short', 'medium', 'long'], default: 'medium' },
  language: { type: String, default: 'English' },
  versions: [versionSchema],
  currentVersion: { type: Number, default: 0 },
  improvements: { type: String, default: '' },
  isFavorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

contentSchema.pre('save', function() {
  this.updatedAt = new Date();
});

module.exports = mongoose.model('Content', contentSchema);