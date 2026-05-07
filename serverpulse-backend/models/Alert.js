const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  serverId: String,
  type: String,       // cpu / ram / disk
  value: Number,
  severity: String,   // warning / critical
  message: String,
  isResolved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
    snoozedUntil: {
    type: Date,
    default: null
  },
  resolvedAt: Date
});

module.exports = mongoose.model("Alert", alertSchema);