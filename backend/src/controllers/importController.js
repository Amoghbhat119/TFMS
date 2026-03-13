const excelService = require("../services/excelService");


// Import Candidates from Excel
exports.importCandidates = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Excel file required"
      });
    }

    const jobId = req.body.jobId;

    const results = await excelService.importCandidatesFromExcel(
      req.file.path,
      jobId,
      req.user._id
    );

    res.json({
      success: true,
      message: "Candidates imported successfully",
      results
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};