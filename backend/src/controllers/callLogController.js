const CallLog = require("../models/CallLog");


// Add Call Log
exports.addCallLog = async (req, res) => {

  try {

    const callLog = await CallLog.create({

      recruiterId: req.user._id,
      clientId: req.body.clientId,
      jobId: req.body.jobId,
      candidateId: req.body.candidateId,
      status: req.body.status,
      comments: req.body.comments

    });

    res.status(201).json({
      success: true,
      callLog
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get All Call Logs
exports.getCallLogs = async (req, res) => {

  try {

    const callLogs = await CallLog.find()
      .populate("recruiterId", "name")
      .populate("candidateId", "name phone")
      .populate("clientId", "name")
      .populate("jobId", "role");

    res.json({
      success: true,
      count: callLogs.length,
      callLogs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Filter Call Logs
exports.filterCallLogs = async (req, res) => {

  try {

    const { recruiterId, status } = req.query;

    let filter = {};

    if (recruiterId) filter.recruiterId = recruiterId;
    if (status) filter.status = status;

    const callLogs = await CallLog.find(filter)
      .populate("candidateId", "name phone")
      .populate("jobId", "role");

    res.json({
      success: true,
      callLogs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Call Log
exports.deleteCallLog = async (req, res) => {

  try {

    const callLog = await CallLog.findById(req.params.id);

    if (!callLog) {
      return res.status(404).json({
        success: false,
        message: "Call log not found"
      });
    }

    await callLog.deleteOne();

    res.json({
      success: true,
      message: "Call log deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};