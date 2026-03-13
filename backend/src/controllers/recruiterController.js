const User = require("../models/User");
const bcrypt = require("bcryptjs");


// Get All Recruiters
exports.getRecruiters = async (req, res) => {

  try {

    const recruiters = await User.find({
      role: "Recruiter"
    }).select("-password");

    res.json({

      success: true,
      count: recruiters.length,
      recruiters

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Create Recruiter
exports.createRecruiter = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Recruiter already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const recruiter = await User.create({

      name,
      email,
      password: hashedPassword,
      role: "Recruiter"

    });

    res.status(201).json({

      success: true,
      recruiter

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Delete Recruiter
exports.deleteRecruiter = async (req, res) => {

  try {

    const recruiter = await User.findById(req.params.id);

    if (!recruiter) {

      return res.status(404).json({
        message: "Recruiter not found"
      });

    }

    await recruiter.deleteOne();

    res.json({

      success: true,
      message: "Recruiter deleted"

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};