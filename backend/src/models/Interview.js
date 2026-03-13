const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
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

    interviewDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Selected", "Rejected", "Cancelled"],
      default: "Scheduled"
    },

    feedback: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);