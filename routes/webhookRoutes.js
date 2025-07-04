const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const { captureLead } = require('../controllers/webhookController');

router.post('/webhook/:clientId', handleWebhook);
router.post('/webhook/:source', captureLead);

module.exports = router;
