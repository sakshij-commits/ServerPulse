const mongoose = require("mongoose");

const thresholdSchema = new mongoose.Schema({
  serverId: { type: String, required: true, unique: true },

  cpu: { type: Number, default: 80 },
  ram: { type: Number, default: 75 },
  disk: { type: Number, default: 85 }
});

module.exports = mongoose.model("Threshold", thresholdSchema);