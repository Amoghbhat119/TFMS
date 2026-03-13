const Application = require("../models/Application");
const workflowService = require("../services/workflowService");


// Create Application
exports.createApplication = async (req, res) => {

  try {

    const { candidateId, jobId } = req.body;

    const existingApplication = await Application.findOne({
      candidateId,
      jobId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Candidate already applied for this job"
      });
    }

    const application = await Application.create({

      candidateId,
      jobId,
      recruiterId: req.user._id,

      currentStage: "Applied",

      stageHistory: [
        {
          stage: "Applied",
          updatedBy: req.user._id
        }
      ]

    });

    res.status(201).json({
      success: true,
      application
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get Applications
exports.getApplications = async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("candidateId")
      .populate("jobId")
      .populate("recruiterId", "name email");

    res.json({
      success: true,
      count: applications.length,
      applications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Update Candidate Stage
exports.updateStage = async (req, res) => {

  try {

    const { stage, note } = req.body;

    const application = await workflowService.updateCandidateStage(
      req.params.id,
      stage,
      req.user._id,
      note
    );

    res.json({
      success: true,
      application
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get Applications by Job
exports.getApplicationsByJob = async (req, res) => {

  try {

    const applications = await Application.find({
      jobId: req.params.jobId
    })
      .populate("candidateId")
      .populate("recruiterId", "name");

    res.json({
      success: true,
      applications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Application
exports.deleteApplication = async (req, res) => {

  try {

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    await application.deleteOne();

    res.json({
      success: true,
      message: "Application deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};