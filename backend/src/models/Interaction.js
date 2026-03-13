const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
{
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true
  },

  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  interactionType: {
    type: String,
    enum: [
      "Call",
      "Email",
      "Interview Feedback",
      "Follow-up"
    ],
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  nextActionDate: {
    type: Date
  },

  reminderCompleted: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Interaction", interactionSchema);