const express = require("express");
const router = express.Router();

const callLogController = require("../controllers/callLogController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, callLogController.addCallLog);
router.get("/", protect, callLogController.getCallLogs);
router.get("/filter", protect, callLogController.filterCallLogs);
router.delete("/:id", protect, callLogController.deleteCallLog);

module.exports = router;