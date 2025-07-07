const mongoose = require('mongoose');

const AiSensySchema = new mongoose.Schema({
  data: { type: Object, required: true },
  capturedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('AiSensy', AiSensySchema);
