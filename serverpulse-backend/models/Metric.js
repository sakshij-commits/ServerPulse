const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true
  },
  cpu: Number,
  ramUsed: Number,
  ramTotal: Number,
  diskUsed: Number,
  diskTotal: Number,
  uptime: Number,
  networkIn: Number,
  networkOut: Number,
  totalProcesses: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Metric", metricSchema);