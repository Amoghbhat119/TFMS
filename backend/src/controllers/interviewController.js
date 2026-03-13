const Interview = require("../models/Interview");
const emailService = require("../services/emailService");


// Schedule Interview
exports.scheduleInterview = async (req, res) => {

  try {

    const interview = await Interview.create({

      candidateId: req.body.candidateId,
      jobId: req.body.jobId,
      recruiterId: req.user._id,
      interviewDate: req.body.interviewDate,
      status: "Scheduled",
      feedback: req.body.feedback

    });

    if (req.body.email) {
      await emailService.sendInterviewEmail(
        req.body.email,
        req.body.candidateName,
        req.body.role,
        req.body.interviewDate
      );
    }

    res.status(201).json({
      success: true,
      interview
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get Interviews
exports.getInterviews = async (req, res) => {

  try {

    const interviews = await Interview.find()
      .populate("candidateId", "name phone")
      .populate("jobId", "role")
      .populate("recruiterId", "name");

    res.json({
      success: true,
      count: interviews.length,
      interviews
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Update Interview Status
exports.updateInterview = async (req, res) => {

  try {

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      interview: updatedInterview
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Interview
exports.deleteInterview = async (req, res) => {

  try {

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    await interview.deleteOne();

    res.json({
      success: true,
      message: "Interview deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};