const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, jobController.createJob);
router.get("/", protect, jobController.getJobs);
router.get("/search", protect, jobController.searchJobs);
router.get("/filter", protect, jobController.filterJobs);
router.put("/:id", protect, jobController.updateJob);
router.delete("/:id", protect, jobController.deleteJob);

module.exports = router;