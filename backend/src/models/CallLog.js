const mongoose = require("mongoose");

const callLogSchema = new mongoose.Schema(
{
  date: {
    type: Date,
    default: Date.now
  },

  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true
  },

  status: {
    type: String,
    enum: [
      "Interested",
      "Not Interested",
      "Wrong Number",
      "Call Back Later",
      "Interview Scheduled"
    ],
    required: true
  },

  comments: {
    type: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("CallLog", callLogSchema);