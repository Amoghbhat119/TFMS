const Candidate = require("../models/Candidate");


// Create Candidate
exports.createCandidate = async (req, res) => {

  try {

    const resumePath = req.file ? req.file.path : null;

    if (!req.body.name || !req.body.phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required"
      });
    }

    const existingCandidate = await Candidate.findOne({
      $or: [
        { phone: req.body.phone },
        { email: req.body.email }
      ]
    });

    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: "Candidate already exists"
      });
    }

    const candidate = await Candidate.create({
      ...req.body,
      resumePath
    });

    res.status(201).json({
      success: true,
      candidate
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get All Candidates
exports.getCandidates = async (req, res) => {

  try {

    const candidates = await Candidate.find();

    res.json({
      success: true,
      count: candidates.length,
      candidates
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Search Candidates
exports.searchCandidates = async (req, res) => {

  try {

    const { q } = req.query;

    const candidates = await Candidate.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { skill: { $regex: q, $options: "i" } }
      ]
    });

    res.json({
      success: true,
      candidates
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Update Candidate
exports.updateCandidate = async (req, res) => {

  try {

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      candidate: updatedCandidate
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Candidate
exports.deleteCandidate = async (req, res) => {

  try {

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    await candidate.deleteOne();

    res.json({
      success: true,
      message: "Candidate deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};