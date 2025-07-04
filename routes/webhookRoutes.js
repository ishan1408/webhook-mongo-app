const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const { captureLead } = require('../controllers/webhookController');

router.post('/webhook/:clientId', handleWebhook);
router.post('/leads/source/:sourceName', captureLead);

module.exports = router;
