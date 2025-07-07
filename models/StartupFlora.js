const mongoose = require('mongoose');

const StartupFloraSchema = new mongoose.Schema({
  clientName: { type: String, default: null },
  clientMobileNo: { type: String, default: null },
  clientCompany: { type: String, default: null },
  clientEmail: { type: String, default: null },
  clientServices: { type: String, default: null },
  clientSubservices: { type: String, default: null },
  fromPage: { type: String, default: null },
  clientFromSource: { type: String, default: null },
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
