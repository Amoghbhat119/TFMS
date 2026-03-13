const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const recruiterController = require("../controllers/recruiterController");


// Admin only routes
router.get(
  "/",
  protect,
  authorizeRoles("Admin"),
  recruiterController.getRecruiters
);


router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  recruiterController.createRecruiter
);


router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  recruiterController.deleteRecruiter
);


module.exports = router;