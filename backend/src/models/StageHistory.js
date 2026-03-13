const mongoose = require("mongoose");

const stageHistorySchema = new mongoose.Schema({

  stage: {
    type: String,
    required: true
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = stageHistorySchema;