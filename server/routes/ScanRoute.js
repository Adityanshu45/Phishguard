const router = require("express").Router();
const { saveScan, getUserScans } = require("../controllers/ScanController");
const { userVerification } = require("../middlewares/AuthMiddleware");

router.post("/save", userVerification, saveScan);
router.get("/history", userVerification, getUserScans);

module.exports = router;