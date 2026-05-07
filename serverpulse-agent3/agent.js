console.log("Agent started...");
const si = require("systeminformation");
const axios = require("axios");

// 🔥 CHANGE THIS PER SERVER
const SERVER_ID = "Server-3";

// 🔥 YOUR BACKEND URL
const BACKEND_URL = "http://13.206.248.136:5000/metrics";
let pollingInterval = 5000;
let metricsLoop;

async function fetchPollingConfig() {

  try {

    const res = await fetch(
      "http://13.206.248.136:5000/config/system"
    );

    const config = await res.json();

    const newInterval =
      config.pollingInterval * 1000;

    // only restart if changed
    if (newInterval !== pollingInterval) {

      pollingInterval = newInterval;

      console.log(
        `⏱️ Polling interval updated to ${config.pollingInterval}s`
      );

      restartMetricsLoop();
    }

  } catch (err) {

    console.log(
      "Failed to fetch polling config"
    );
  }
}

function restartMetricsLoop() {

  if (metricsLoop) {
    clearInterval(metricsLoop);
  }

  metricsLoop = setInterval(() => {
    sendMetrics();
  }, pollingInterval);
}

async function getMetrics() {
  try {
    console.log("Collecting metrics...");

    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const uptime = await si.time();

    let network = [];
    let processes = {};

    try {
      network = await si.networkStats();
    } catch (err) {
      console.log("⚠️ Network error:", err.message);
    }

    try {
      processes = await si.processes();
    } catch (err) {
      console.log("⚠️ Process error:", err.message);
    }

    return {
      serverId: SERVER_ID,
      cpu: cpu.currentLoad,
      ramUsed: mem.used,
      ramTotal: mem.total,
      diskUsed: disk[0].used,
      diskTotal: disk[0].size,
      uptime: uptime.uptime,

      // SAFE ACCESS
      networkIn: network[0]?.rx_sec || 0,
      networkOut: network[0]?.tx_sec || 0,
      totalProcesses: processes?.all || 0
    };

  } catch (err) {
    console.error("🔥 CRASH:", err);
  }
}

async function sendMetrics() {
  try {
    const data = await getMetrics();

    await axios.post(BACKEND_URL, data);

    console.log("📡 Sent:", data.cpu.toFixed(2), "% CPU");
  } catch (err) {
    console.error("❌ FULL ERROR:", err);
  }
}

// start metrics sending
restartMetricsLoop();

// refresh config every 10 sec
setInterval(fetchPollingConfig, 10000);

// initial fetch
fetchPollingConfig();