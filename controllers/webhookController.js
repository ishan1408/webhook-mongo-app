const CallLog = require('../models/CallLog');
const Lead = require('../models/Lead_website');


exports.handleWebhook = async (req, res) => {
  const source = req.params.sourceName || 'unknown';
  const payload = req.body || {};

  try {
    const lead = await Lead.create({ data: payload, source });

    res.status(201).json({ success: true, message: 'Lead captured', lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


exports.captureLead = async (req, res) => {
  const source = req.params.sourceName || 'unknown';
  const payload = req.body || {};

  try {
    const lead = await Lead.create({ data: payload, source });

    res.status(201).json({ success: true, message: 'Lead captured', lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getCallLogs = async (req, res) => {
  try {
    const logs = await CallLog.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch call logs', error: error.message });
  }
};

// GET all captured leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, count: leads.length, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch leads', error: error.message });
  }
};