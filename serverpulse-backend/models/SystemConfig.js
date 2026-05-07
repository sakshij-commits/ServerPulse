const mongoose = require("mongoose");

const systemConfigSchema = new mongoose.Schema({

  retentionDays: {
    type: Number,
    default: 7
  },

  pollingInterval: {
    type: Number,
    default: 5
  }

});

module.exports = mongoose.model(
  "SystemConfig",
  systemConfigSchema
);