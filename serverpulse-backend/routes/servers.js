const express = require("express");
const router = express.Router();
const Server = require("../models/Server");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

// ➕ Add server (ADMIN ONLY)
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { name, ip, environment } = req.body;

    const server = await Server.create({
      name,
      ip,
      environment
    });

    res.json(server);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get all servers (ALL USERS)
router.get("/", auth, async (req, res) => {
  try {
    const servers = await Server.find();

    const now = Date.now();

    const updated = servers.map(s => {
      const diff = now - new Date(s.lastSeen || 0).getTime();

      if (diff > 15000) {
        s.status = "offline";
      }

      return s;
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete server (ADMIN ONLY)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    await Server.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:name/toggle", async (req, res) => {
  const server = await Server.findOne({
    name: req.params.name
  });

  if (!server) return res.status(404).json({ error: "Not found" });

  server.isActive = !server.isActive;
  await server.save();

  res.json(server);
});

module.exports = router;