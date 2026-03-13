const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true
  },

  skill: {
    type: String
  },

  experience: {
    type: Number
  },

  currentCompany: {
    type: String
  },

  currentSalary: {
    type: Number
  },

  expectedSalary: {
    type: Number
  },

  noticePeriod: {
    type: String
  },

  location: {
    type: String
  },

  source: {
    type: String,
    enum: ["Naukri", "LinkedIn", "Referral", "Excel", "Manual"],
    default: "Manual"
  },

  resumePath: {
    type: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);