const express = require("express");
const router = express.Router();

const candidateController = require("../controllers/candidateController");
const { protect } = require("../middleware/authMiddleware");
const { uploadResume } = require("../middleware/uploadMiddleware");


// Create Candidate (with resume upload)
router.post(
  "/",
  protect,
  uploadResume.single("resume"),
  candidateController.createCandidate
);


// Get All Candidates
router.get(
  "/",
  protect,
  candidateController.getCandidates
);


// Search Candidates
router.get(
  "/search",
  protect,
  candidateController.searchCandidates
);


// Update Candidate
router.put(
  "/:id",
  protect,
  candidateController.updateCandidate
);


// Delete Candidate
router.delete(
  "/:id",
  protect,
  candidateController.deleteCandidate
);


module.exports = router;