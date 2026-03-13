const Job = require("../models/Job");


// Create Job
exports.createJob = async (req, res) => {

  try {

    const job = await Job.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get All Jobs
exports.getJobs = async (req, res) => {

  try {

    const jobs = await Job.find()
      .populate("clientId", "name location")
      .populate("createdBy", "name email");

    res.json({
      success: true,
      count: jobs.length,
      jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Search Jobs
exports.searchJobs = async (req, res) => {

  try {

    const { q } = req.query;

    const jobs = await Job.find({
      $or: [
        { role: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } }
      ]
    }).populate("clientId", "name");

    res.json({
      success: true,
      jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Filter Jobs
exports.filterJobs = async (req, res) => {

  try {

    const { location, experience, status } = req.query;

    let filter = {};

    if (location) filter.location = location;
    if (experience) filter.experience = experience;
    if (status) filter.status = status;

    const jobs = await Job.find(filter)
      .populate("clientId", "name");

    res.json({
      success: true,
      jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Update Job
exports.updateJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      job: updatedJob
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Job
exports.deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};