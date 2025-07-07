const mongoose = require('mongoose');

const GeneralWebhookSchema = new mongoose.Schema({
  data: { type: Object, required: true },
  clientId: { type: String, default: 'unknown' },
  capturedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GeneralWebhook', GeneralWebhookSchema);
