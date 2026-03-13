const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, applicationController.createApplication);
router.get("/", protect, applicationController.getApplications);
router.get("/job/:jobId", protect, applicationController.getApplicationsByJob);
router.put("/:id/stage", protect, applicationController.updateStage);
router.delete("/:id", protect, applicationController.deleteApplication);

module.exports = router;