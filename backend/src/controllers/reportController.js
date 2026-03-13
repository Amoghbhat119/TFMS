const reportService = require("../services/reportService");


// Recruiter Performance Report
exports.getRecruiterPerformance = async (req, res) => {

  try {

    const recruiterId = req.params.recruiterId;

    const report = await reportService.getRecruiterPerformance(recruiterId);

    res.json({
      success: true,
      report
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Stage Distribution Report
exports.getStageDistribution = async (req, res) => {

  try {

    const stages = await reportService.getStageDistribution();

    res.json({
      success: true,
      stages
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Monthly Hiring Trends
exports.getMonthlyHiringTrends = async (req, res) => {

  try {

    const trends = await reportService.getMonthlyHiringTrends();

    res.json({
      success: true,
      trends
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Source Effectiveness Report
exports.getSourceEffectiveness = async (req, res) => {

  try {

    const sources = await reportService.getSourceEffectiveness();

    res.json({
      success: true,
      sources
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Daily Recruiter Report
exports.getDailyRecruiterReport = async (req, res) => {

  try {

    const report = await reportService.getDailyRecruiterReport();

    res.json({
      success: true,
      report
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Client Wise Call Report
exports.getClientCallReport = async (req, res) => {

  try {

    const report = await reportService.getClientCallReport();

    res.json({
      success: true,
      report
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};