require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/auth");
const serverRoutes = require("./routes/servers");
const configRoutes = require("./routes/config");
const userRoutes = require("./routes/users");
const cron = require("node-cron");
const Metric = require("./models/Metric");
const SystemConfig = require("./models/SystemConfig");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/servers", serverRoutes);
app.use("/config", configRoutes);
app.use("/users", userRoutes);

// Socket auth middleware
const jwt = require("jsonwebtoken");

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    console.log("Socket connected without auth (agent or dev)");
    return next(); // allow connection
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

// Connect DB
connectDB();

// Routes
const metricsRoute = require("./routes/metrics")(io);
app.use("/metrics", metricsRoute);

// Test route
app.get("/", (req, res) => {
  res.send("ServerPulse Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

// 🧹 AUTO CLEAN OLD METRICS EVERY HOUR
cron.schedule("0 * * * *", async () => {

  try {

    const config = await SystemConfig.findOne();

    if (!config) return;

    const cutoff = new Date();

    cutoff.setDate(
      cutoff.getDate() - config.retentionDays
    );

    const result = await Metric.deleteMany({
      timestamp: { $lt: cutoff }
    });

    console.log(
      `🧹 Deleted ${result.deletedCount} old metrics`
    );

  } catch (err) {

    console.log("Retention cleanup error:", err.message);
  }
});

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});