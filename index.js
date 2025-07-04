require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const webhookSchema = new mongoose.Schema({
  event: String,
  payload: Object,
  receivedAt: { type: Date, default: Date.now }
});

const WebhookEvent = mongoose.model('WebhookEvent', webhookSchema);

app.post('/webhook', async (req, res) => {
  try {
    const { event, data } = req.body;

    const newEvent = new WebhookEvent({
      event,
      payload: data
    });

    await newEvent.save();
    console.log('Webhook saved:', newEvent);

    res.status(200).json({ success: true, message: 'Webhook received and saved' });
  } catch (error) {
    console.error('Error saving webhook:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Webhook server running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
