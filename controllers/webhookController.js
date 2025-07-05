const CallLog = require('../models/CallLog');
const Lead = require('../models/Lead_website');
const getFormattedTimestamp = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())},${now.getMilliseconds()}`;
  return `${date} ${time}`;
};

exports.handleWebhook = async (req, res) => {
  const clientId = req.params.clientId?.toLowerCase() || 'unknown';
  const payload = req.body || {};
  const timestamp = getFormattedTimestamp();
  const serverIP = '10.249.183.74';

  try {
    // Save entire payload along with clientId
    const callLog = await CallLog.create({ data: payload, clientId });

    // Log the event (optional, adjust log format as needed)
    console.log(`[${timestamp}] Received webhook from client: ${clientId}, saved log id: ${callLog._id}`);

    return res.status(201).json({
      success: true,
      message: 'Webhook data stored successfully',
      clientId,
      logId: callLog._id,
      server: serverIP
    });
  } catch (error) {
    console.error(`[ERROR] Failed to store webhook data for client ${clientId}: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
      clientId,
      server: serverIP
    });
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