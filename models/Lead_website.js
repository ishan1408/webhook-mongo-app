const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  source: String,
  name: String,
  phone: String,
  email: String,
  campaign: String,
  createdAt: { type: Date, default: Date.now },
  pushedToDialer: { type: Boolean, default: false },
  dialerResponse: Object,
}, {
  timestamps: true 
});

module.exports = mongoose.model('Lead', leadSchema);
