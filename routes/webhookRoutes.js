const express = require('express');
const router = express.Router();

const {
  handleGeneralWebhook,
  captureStartupFlora,
  captureAirtel,
  captureAiSensy,
  getGeneralWebhooks,
  getStartupFloraLeads,
  getAirtelLogs,
  getAiSensyLogs
} = require('../controllers/webhookController');

router.post('/webhook/startupflora', captureStartupFlora);
router.post('/webhook/airtel', captureAirtel);
router.post('/webhook/aisensy', captureAiSensy);
router.post('/leads/source/general-web-hooks', handleGeneralWebhook);

router.get('/webhook/startupflora', getStartupFloraLeads);
router.get('/webhook/airtel', getAirtelLogs);
router.get('/webhook/aisnsy', getAiSensyLogs);
router.get('/webhook/general/logs', getGeneralWebhooks);

module.exports = router;
