const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  contactPerson: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    lowercase: true
  },

  phone: {
    type: String
  },

  location: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);