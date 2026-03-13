const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/recruiter/:recruiterId", protect, reportController.getRecruiterPerformance);
router.get("/stages", protect, reportController.getStageDistribution);
router.get("/hiring-trends", protect, reportController.getMonthlyHiringTrends);
router.get("/sources", protect, reportController.getSourceEffectiveness);

module.exports = router;