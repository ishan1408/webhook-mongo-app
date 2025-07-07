const mongoose = require('mongoose');

const StartupFloraSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  phoneNumber: { type: String, default: null },
  companyname: { type: String, default: null },
  email: { type: String, default: null },
  subject: { type: String, default: null },
  message: { type: String, default: null },
  clientSubservices: { type: String, default: null },
  fromPage: { type: String, default: null },
  source: { type: String, default: null },
  clientFromService: { type: String, default: null },
  clientFromSubService: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  createdUnixTym: { type: Number, default: () => Date.now() },
  createdDate: { type: String, default: null },
  createdTime: { type: String, default: null },
  clientIpAddress: { type: String, default: null },
  clientDeviceInfo: { type: String, default: null },
  clientPaymentScreenshot: { type: String, default: null },
  updatedAt: { type: Date, default: null },
  button: { type: String, default: null },
  type: { type: String, default: null }
}, {
  timestamps: true 
});

module.exports = mongoose.model('StartupFlora', StartupFloraSchema);
