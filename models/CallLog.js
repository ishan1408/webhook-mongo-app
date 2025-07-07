const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
  data: { type: Object, required: true },  
  clientId: { type: String, default: 'unknown', unique: true},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallLog', callLogSchema);
