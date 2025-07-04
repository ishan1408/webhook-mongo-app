const CallLog = require('../models/CallLog');

exports.handleWebhook = async (req, res) => {
  try {
    const callLog = new CallLog(req.body);
    await callLog.save();
    res.status(201).json({ success: true, message: 'Webhook data stored successfully', id: callLog._id });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ success: false, message: 'Invalid data or missing fields', error: error.message });
  }
};
