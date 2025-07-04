const CallLog = require('../models/CallLog_Airtel');
const Lead = require('../models/Lead_website');
const sendToElision = require('../services/elisionService');
const logger = require('../utils/logger');

const getFormattedTimestamp = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())},${now.getMilliseconds()}`;
  return `${date} ${time}`;
};

exports.handleWebhook = async (req, res) => {
  const body = req.body;
  const clientId = req.params.clientId?.toLowerCase() || 'unknown';
  const customerName = body.Customer_Name || body.customerId || 'unknown_customer';
  const sessionId = body.Session_ID || 'no-session';
  const logId = `${sessionId}_${clientId}_1`;
  const topic = 'customer_cdr_default_topic_v2';
  const timestamp = getFormattedTimestamp();
  const serverIP = '10.249.183.74';
  const logPath = '/data/logs/iq-customer-cdr-publisher/iq-customer-cdr-publisher/logs/';

  // Check if required fields are missing
  const missingFields = !body.Customer_Name || !body.Session_ID || !body.Caller_ID;

  // Create log string
  const logResponse = `
Results from ${serverIP} in ${logPath}:
${timestamp} [listener-default-7-C-1] INFO com.airtel.iq.online.cdrpublisher.service.impl.PublisherServiceImpl - Client cdr publish request for customer:${customerName} with id:${logId} on topic : ${topic}
${timestamp} [listener-default-7-C-1] INFO com.airtel.iq.online.cdrpublisher.adapter.impl.ClientAdapterImpl - Response time: 599 , Response : ClientResponse(response={"statusCode":400,"message":"Missing required fields or incorrect data format"}, responseCode=400 BAD_REQUEST, date=null) for clientMessage uuid:${logId}
${timestamp} [listener-default-7-C-1] INFO com.airtel.iq.online.cdrpublisher.service.impl.PublisherServiceImpl - Failure in sending custom cdr : ${logId} to client: ${customerName} with response:ClientResponse(response={"statusCode":400,"message":"Missing required fields or incorrect data format"}, responseCode=400 BAD_REQUEST, date=null), adding to retry queue
${timestamp} [listener-default-7-C-1] INFO com.airtel.iq.online.cdrpublisher.service.impl.PublisherServiceImpl - Publishing message in retry queue for destination :event->${topic} and id :${logId}
${timestamp} [listener-default-7-C-1] INFO com.airtel.iq.online.usagecommon.service.impl.InstanceRetryQueueServiceImpl - Successfully pushed instance with id : ${logId} with delay 180 of retry count : 0
`;

  // If missing required fields, return full log as plain text response
  if (missingFields) {
    console.log(logResponse.trim());
    return res.status(400).type('text/plain').send(logResponse.trim());
  }

  // Else try saving to DB
  try {
    const callLog = new CallLog(body);
    await callLog.save();

    return res.status(201).json({
      statusCode: 201,
      message: 'Webhook data stored successfully',
      logId,
      customer: customerName,
      clientId,
      server: serverIP
    });
  } catch (error) {
    console.error(`[ERROR] Failed to store data for ${customerName}: ${error.message}`);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
      logId,
      customer: customerName,
      clientId,
      server: serverIP
    });
  }
};

exports.captureLead = async (req, res) => {
  const { name, phone, email, campaign } = req.body;
  const source = req.params.source;

  if (!phone || !name) {
    return res.status(400).json({ success: false, message: 'Missing name or phone' });
  }

  try {
    const lead = await Lead.create({ name, phone, email, campaign, source });

    // Push to Elision Dialer (Stage 2)
    const dialerRes = await sendToElision(lead);

    lead.pushedToDialer = true;
    lead.dialerResponse = dialerRes;
    await lead.save();

    logger.info(`Lead pushed to Elision: ${lead.phone}`);
    res.status(201).json({ success: true, message: 'Lead captured and pushed to dialer', lead });
  } catch (error) {
    logger.error('Lead capture failed: ' + error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};