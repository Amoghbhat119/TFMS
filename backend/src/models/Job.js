const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },

  role: {
    type: String,
    required: true,
    trim: true
  },

  experience: {
    type: Number
  },

  location: {
    type: String
  },

  openPositions: {
    type: Number,
    default: 1
  },

  salaryRange: {
    min: Number,
    max: Number
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);