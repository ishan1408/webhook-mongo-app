const express = require('express');
const router = express.Router();
const {
  handleWebhook,
  captureLead,
  getCallLogs,
  getLeads
} = require('../controllers/webhookController');

router.post('/webhook/:clientId', handleWebhook);
router.post('/leads/source/:sourceName', captureLead);

router.get('/logs/call', getCallLogs);  
router.get('/leads', getLeads);

module.exports = router;
