const StartupFlora = require('../models/StartupFlora');
const Airtel = require('../models/Airtel');
const AiSensy = require('../models/AiSensy');
const GeneralWebhook = require('../models/GeneralWebhook');

exports.getStartupFloraLeads = async (req, res) => {
  try {
    const entries = await StartupFlora.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: entries.length, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch StartupFlora leads', error: error.message });
  }
};

exports.getAirtelLogs = async (req, res) => {
  try {
    const entries = await Airtel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: entries.length, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Airtel logs', error: error.message });
  }
};

// exports.getAiSensyLogs = async (req, res) => {
//   try {
//     const entries = await AiSensy.find().sort({ createdAt: -1 }); // ✅ Query correct collection
//     res.status(200).json({ success: true, count: entries.length, entries });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch AiSensy logs',
//       error: error.message
//     });
//   }
// };

exports.getGeneralWebhooks = async (req, res) => {
  try {
    const logs = await GeneralWebhook.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch general logs', error: error.message });
  }
};

exports.handleGeneralWebhook = async (req, res) => {
  const clientId = req.params.clientId || 'unknown';
  const payload = req.body || {};

  try {
    const entry = await GeneralWebhook.create({ data: payload, clientId });
    res.status(201).json({ success: true, message: 'Webhook captured', entry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.captureStartupFlora = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      companyname,
      email,
      clientServices,
      clientSubservices,
      fromPage,
      source,
      message,
      subject,
      clientFromService,
      clientFromSubService,
      createdDate,
      createdTime,
      clientIpAddress,
      clientDeviceInfo,
      clientPaymentScreenshot,
      button,
      type
    } = req.body;

    const entry = await StartupFlora.create({
      fullName,
      phoneNumber,
      companyname,
      email,
      clientServices,
      clientSubservices,
      subject,
      message,
      fromPage,
      source,
      clientFromService,
      clientFromSubService,
      createdDate,
      createdTime,
      clientIpAddress,
      clientDeviceInfo,
      clientPaymentScreenshot,
      button,
      type
    });

    res.status(201).json({ success: true, message: 'StartupFlora lead saved', entry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.captureAirtel = async (req, res) => {
  try {
    const entry = await Airtel.create({ data: req.body });
    res.status(201).json({ success: true, message: 'Airtel log saved', entry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// exports.captureAiSensy = async (req, res) => {
//   try {
//     const entry = await AiSensy.create({ data: req.body });
//     res.status(201).json({ success: true, message: 'Elision log saved', entry });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
// };

exports.getGeneralWebhooks = async (req, res) => {
  try {
    const logs = await GeneralWebhook.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch data', error: error.message });
  }
};
