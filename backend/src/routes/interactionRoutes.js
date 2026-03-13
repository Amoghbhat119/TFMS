const express = require("express");
const router = express.Router();

const interactionController = require("../controllers/interactionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, interactionController.addInteraction);
router.get("/:applicationId", protect, interactionController.getInteractions);
router.put("/reminder/:id", protect, interactionController.completeReminder);
router.delete("/:id", protect, interactionController.deleteInteraction);

module.exports = router;