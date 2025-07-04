const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  participantAddress: { type: String, default: null },
  participantType: { type: String, default: null },
  participantNumberType: { type: String, default: null },
  participantNumberCountryCode: { type: String, default: null },
  callerIdType: { type: String, default: null },
  callerIdCircle: { type: String, default: null },
  callerIdCountryCode: { type: String, default: null },
  callerId: { type: String, default: null },
  startTime: { type: Number, default: null },
  endTime: { type: Number, default: null },
  duration: { type: Number, default: null },
  status: { type: String, default: null },
  audios: [
    {
      audioURL: { type: String, default: null }
    }
  ],
  participantCallType: { type: String, default: null },
  billableDuration: { type: Number, default: null },
  pulse: { type: Number, default: null },
  requestNo: { type: Number, default: null },
  participantIndex: { type: Number, default: null },
  requestName: { type: String, default: null },
  mergeType: { type: String, default: null },
  callerIdInternationalPoint: { type: String, default: null },
  chargeType: { type: String, default: null },
  retryCount: { type: Number, default: null }
}, { _id: false });

const callLogSchema = new mongoose.Schema({
  Overall_Call_Status: String,
  Caller_ID: String,
  Customer_Name: String,
  Client_Correlation_Id: String,
  Caller_Operator_Name: String,
  Time: String,
  Caller_Circle_Name: String,
  Destination_Circle_Name: String,
  Pulse_Count: Number,
  callType: String,
  Caller_Waiting_Time: String,
  Destination_Name: String,
  duration: Number,
  Billable_Duration: String,
  conversationDuration: Number,
  Overall_Call_Duration: String,
  customerId: String,
  overallCallStatus: String,
  startTime: Number,
  Session_ID: String,
  Destination_Retry_Count: Number,
  Caller_Status: String,
  Destination_Status: String,
  timestamp: String,
  participants: [participantSchema],
  Conversation_Duration: String,
  Hangup_Cause: String,
  callerNumber: String,
  Caller_Retry_Count: Number,
  Destination_CLI: String,
  Missed_Destination_Number: String,
  Caller_Duration: String,
  Date: String,
  Caller_Status_Detail: String,
  DTMF_Capture: String,
  destinationNumber: String,
  fromWaitingTime: Number,
  Call_Type: String,
  Destination_Status_Detail: String,
  Caller_Name: String,
  Caller_Number: String,
  audios: [{ type: Object }],
  Recording: String,
  endTime: Number,
  Destination_Number: String,
  Destination_Operator_Name: String
}, {
  timestamps: true 
});

module.exports = mongoose.model('CallLog', callLogSchema);
