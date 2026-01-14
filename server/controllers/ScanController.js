const Scan = require("../model/Scan");

// 🔹 SAVE SCAN RESULT
module.exports.saveScan = async (req, res) => {
  try {
    const { url, result } = req.body;

    const scan = await Scan.create({
      userId: req.user.id, // from JWT
      url,
      result,
    });

    res.status(201).json({ success: true, scan });
  } catch (err) {
    res.status(500).json({ message: "Failed to save scan" });
  }
};

// 🔹 GET USER SCAN HISTORY
module.exports.getUserScans = async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch scans" });
  }
};