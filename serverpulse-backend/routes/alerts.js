router.post("/alerts/:id/resolve", async (req, res) => {
  const alert = await Alert.findById(req.params.id);

  if (!alert) {
    return res.status(404).json({ error: "Not found" });
  }

  alert.isResolved = true;
  alert.resolvedAt = new Date();

  await alert.save();

  res.json({ success: true });
});