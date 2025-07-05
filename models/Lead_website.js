const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  source: {
    type: String,
    default: 'unknown'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
