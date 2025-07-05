require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const webhookRoutes = require('./routes/webhookRoutes');
dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api', webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
