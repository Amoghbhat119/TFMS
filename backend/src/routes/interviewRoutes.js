const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, interviewController.scheduleInterview);
router.get("/", protect, interviewController.getInterviews);
router.put("/:id", protect, interviewController.updateInterview);
router.delete("/:id", protect, interviewController.deleteInterview);

module.exports = router;