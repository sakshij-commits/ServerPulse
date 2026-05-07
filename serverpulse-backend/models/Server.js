const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  name: String,
  ip: String,
  environment: String,

  isActive: {
  type: Boolean,
  default: true
  },

  status: {
    type: String,
    default: "offline"
  },

  lastSeen: Date
}, { timestamps: true });

module.exports = mongoose.model("Server", serverSchema);