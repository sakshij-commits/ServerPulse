const express = require("express");
const router = express.Router();

const Threshold = require("../models/Threshold");
const Metric = require("../models/Metric");
const Alert = require("../models/Alert");
const Server = require("../models/Server");

// 🔥 Alert Logic
async function checkAlert(io, serverId, type, value, threshold) {

  const existing = await Alert.findOne({
    serverId,
    type,
    isResolved: false
  }).sort({ createdAt: -1 });

  // 🔕 Snooze check
  if (existing && existing.snoozedUntil && existing.snoozedUntil > new Date()) {
    return;
  }

  // ✅ If threshold increased and alert no longer valid
  if (existing && value <= threshold) {
    existing.isResolved = true;
    existing.resolvedAt = new Date();
    existing.snoozedUntil = null;

    await existing.save();

    return;
  }

  if (value > threshold) {

    // ✅ Update existing alert
    if (existing && !existing.isResolved) {
      existing.value = value;
      existing.message = `${type.toUpperCase()} usage is ${value.toFixed(1)}%`;
      existing.severity = value > threshold + 10 ? "critical" : "warning";
      await existing.save();

    } else {
      // ✅ Create new alert
      const severity = value > threshold + 10 ? "critical" : "warning";

      const alert = await Alert.create({
        serverId,
        type,
        value,
        severity,
        message: `${type.toUpperCase()} usage is ${value.toFixed(1)}%`
      });

      io.emit("new-alert", alert);
    }

  } else {

    // ✅ Auto resolve
    if (existing && !existing.isResolved) {
      existing.isResolved = true;
      existing.resolvedAt = new Date();
      existing.snoozedUntil = null;
      await existing.save();
    }
  }
}

module.exports = (io) => {

  // 🔥 POST /metrics
  router.post("/", async (req, res) => {
    try {
      const data = req.body;

      // ✅ Check server exists
      const server = await Server.findOne({ name: data.serverId });

      if (!server) {
        return res.status(404).json({ error: "Server not registered" });
      }

      if (!server.isActive) {
        console.log("⛔ Monitoring disabled, ignoring metrics");
        return res.status(200).json({ message: "ignored" });
      }

      // ✅ Update status
      await Server.findOneAndUpdate(
        { name: data.serverId },
        {
          status: "online",
          lastSeen: new Date()
        }
      );

      // ✅ Save metric
      const saved = await Metric.create(data);

      // ✅ Emit realtime
      io.emit("metrics", saved);

      // 🔥 FETCH THRESHOLD (PER SERVER)
      const threshold =
        await Threshold.findOne({ serverId: data.serverId }) || {};

      console.log("🔥 Threshold used:", threshold);

      // 🔥 APPLY THRESHOLDS (ONLY ONCE — NO HARDCODE)
      await checkAlert(
        io,
        data.serverId,
        "cpu",
        data.cpu,
        threshold.cpu || 80
      );

      await checkAlert(
        io,
        data.serverId,
        "ram",
        (data.ramUsed / data.ramTotal) * 100,
        threshold.ram || 75
      );

      await checkAlert(
        io,
        data.serverId,
        "disk",
        (data.diskUsed / data.diskTotal) * 100,
        threshold.disk || 85
      );

      res.status(200).json({ message: "Metrics saved" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 📊 GET history
  router.get("/history/:serverId", async (req, res) => {
    try {
      const { range } = req.query;

      let fromTime = new Date();

      if (range === "24h") {
        fromTime.setHours(fromTime.getHours() - 24);
      } else if (range === "7d") {
        fromTime.setDate(fromTime.getDate() - 7);
      } else if (range === "30d") {
        fromTime.setDate(fromTime.getDate() - 30);
      } else {
        fromTime.setHours(fromTime.getHours() - 1);
      }

      const data = await Metric.find({
        serverId: req.params.serverId,
        timestamp: { $gte: fromTime }
      }).sort({ timestamp: 1 });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 🚨 GET alerts
  router.get("/alerts", async (req, res) => {
    const showAll = req.query.all === "true";

    const query = showAll ? {} : { isResolved: false };

    const alerts = await Alert.find(query).sort({ createdAt: -1 });

    res.json(alerts);
  });

  // 🔕 Resolve / Snooze
  router.post("/alerts/:id/resolve", async (req, res) => {
    try {
      const alert = await Alert.findById(req.params.id);

      if (!alert) {
        return res.status(404).json({ error: "Alert not found" });
      }

      alert.isResolved = true;
      alert.resolvedAt = new Date();
      alert.snoozedUntil = new Date(Date.now() + 10 * 60 * 1000);

      await alert.save();

      console.log("🔕 Alert snoozed:", alert._id);

      res.json({ message: "Acknowledged (snoozed)" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

    // 🗑️ PURGE ALL METRICS
  router.delete("/purge", async (req, res) => {

    try {

      await Metric.deleteMany({});

      res.json({
        message: "All metrics deleted"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  });

  return router;
};