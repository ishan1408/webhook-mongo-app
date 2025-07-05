require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');
const CallLog = require('./models/CallLog'); // Adjust path if different

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Delete all documents
  const result = await CallLog.deleteMany({});
  console.log(`Deleted ${result.deletedCount} call logs`);

  mongoose.connection.close();
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
