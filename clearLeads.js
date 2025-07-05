// scripts/clearLeads.js
require('dotenv').config(); // Load variables from .env
const mongoose = require('mongoose');

// Now use the MONGO_URI from environment
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env');
  process.exit(1);
}

// Generic schema if dynamic keys
const LeadSchema = new mongoose.Schema({}, { strict: false });
const Lead = mongoose.model('Lead', LeadSchema, 'leads');

const clearLeads = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const result = await Lead.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} leads`);

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error clearing leads:', err.message);
  }
};

clearLeads();
