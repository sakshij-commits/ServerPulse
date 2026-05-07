const express = require("express");
const router = express.Router();
const Threshold = require("../models/Threshold");
const SystemConfig = require("../models/SystemConfig");

router.get("/thresholds", async (req, res) => {
  const serverId = req.query.serverId;

  let t = await Threshold.findOne({ serverId });

  if (!t) {
    t = await Threshold.create({ serverId });
  }

  res.json(t);
});

// SAVE thresholds
router.post("/thresholds", async (req, res) => {
  const { serverId, cpu, ram, disk } = req.body;

  let t = await Threshold.findOne({ serverId });

  if (!t) {
    t = new Threshold({ serverId });
  }

  t.cpu = cpu;
  t.ram = ram;
  t.disk = disk;

  await t.save();

  res.json(t);
});

// ── SYSTEM SETTINGS ──

// GET system settings
router.get("/system", async (req, res) => {

  let config = await SystemConfig.findOne();

  if (!config) {
    config = await SystemConfig.create({
      retentionDays: 7,
      pollingInterval: 5
    });
  }

  res.json(config);
});

// SAVE system settings
router.post("/system", async (req, res) => {

  const {
    retentionDays,
    pollingInterval
  } = req.body;

  let config = await SystemConfig.findOne();

  if (!config) {
    config = new SystemConfig();
  }

  config.retentionDays = retentionDays;
  config.pollingInterval = pollingInterval;

  await config.save();

  res.json(config);
});

module.exports = router;