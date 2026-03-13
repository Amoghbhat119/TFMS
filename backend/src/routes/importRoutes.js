const express = require("express");
const router = express.Router();

const importController = require("../controllers/importController");
const { protect } = require("../middleware/authMiddleware");


const { uploadExcel } = require("../middleware/uploadMiddleware");

router.post(
  "/",
  protect,
  uploadExcel.single("file"),
  importController.importCandidates
);

module.exports = router;