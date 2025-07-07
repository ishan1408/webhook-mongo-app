const mongoose = require('mongoose');

const AirtelSchema = new mongoose.Schema({
  data: { type: Object, required: true },
  capturedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Airtel', AirtelSchema);
