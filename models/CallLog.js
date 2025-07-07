const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
  data: { type: Object, required: true, index: false },  
  clientId: { type: String, default: 'unknown' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallLog', callLogSchema);
