const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  totalGenerations: { type: Number, default: 0 },
  totalTokensUsed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Auto-hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to check password at login
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Never send password in API responses
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);