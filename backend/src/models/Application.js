const mongoose = require("mongoose");

const stageHistorySchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true
  },

  note: {
    type: String
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

const applicationSchema = new mongoose.Schema(
{
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  currentStage: {
    type: String,
    enum: [
      "Applied",
      "Screening",
      "Shortlisted",
      "Interview Scheduled",
      "Interview Completed",
      "Selected",
      "Offered",
      "Joined",
      "Rejected",
      "On Hold"
    ],
    default: "Applied"
  },

  stageHistory: [stageHistorySchema]

},
{ timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);