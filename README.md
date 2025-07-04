# 📡 Webhook Mongo App

This Node.js application receives and stores incoming webhook data (e.g. call logs, form data) into MongoDB. It supports:

- Dynamic webhook endpoints
- Schema validation with Mongoose
- Automatic `createdAt` and `updatedAt` timestamps
- Scalable architecture for multiple clients or services

## 📁 Folder Structure

webhook-mongo-app/
├── controllers/
│ └── webhookController.js # Handles POST logic
├── models/
│ └── CallLog.js # Mongoose schema for call logs
├── routes/
│ └── webhookRoutes.js # Dynamic routes like /webhook/:clientId
├── config/
│ └── db.js # MongoDB connection
├── .env # Environment variables
├── server.js # Main server file
├── sample.json # Sample test data
├── package.json
└── README.md


## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/yourusername/webhook-mongo-app.git
cd webhook-mongo-app
2. Install dependencies
npm install
3. Set up environment
Create a .env file:

MONGO_URI=mongodb://localhost:27017/webhook-mongo-app
PORT=3000
4. Run the server
npm start
Server will run at http://localhost:3000

🔄 API Usage
POST /api/webhook/:clientId
:clientId is dynamic — example: startupflora, myclient, meta, etc.

Example

curl -X POST http://localhost:3000/api/webhook/startupflora \
  -H "Content-Type: application/json" \
  -d @sample.json
Sample Payload
A sample webhook payload is available in sample.json.

📦 MongoDB Schema Highlights
Automatically includes createdAt, updatedAt timestamps

Stores participant call data and audio URLs

Handles null/missing fields gracefully

🚀 Scaling to Multiple Webhooks
Dynamic endpoints via POST /api/webhook/:clientId

Support for PM2 or Docker scaling

You can host on separate ports or containers for isolation if needed

Use NGINX or API Gateway to route traffic by client

🧪 Testing
You can test the webhook locally using:

bash
Copy
Edit
curl -X POST http://localhost:3000/api/webhook/startupflora \
  -H "Content-Type: application/json" \
  -d @sample.json
Or use tools like Postman or Ngrok to expose locally hosted APIs.

📌 Future Improvements
Add retry logic queue (Redis or DB)

Webhook secret/token verification

Email or Slack alerts on failed deliveries

Dashboard to view submissions

🧑‍💻 Author
Ishan Jain
Backend Developer | Node.js | MongoDB | API Architect
GitHub: @ishan1408

📝 License
MIT License – Free to use and modify

Let me know if you want me to generate a `.env.example`, Dockerfile, or push this as a GitHub boilerplate for you.