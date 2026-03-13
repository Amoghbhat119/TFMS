const CallLog = require("../models/CallLog");
const Interview = require("../models/Interview");

exports.getDashboardStats = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const totalCallsToday = await CallLog.countDocuments({
      createdAt: { $gte: today }
    });

    const interestedCandidates = await CallLog.countDocuments({
      status: "Interested"
    });

    const interviewsScheduled = await Interview.countDocuments({
      status: "Scheduled"
    });

    const followUps = await CallLog.countDocuments({
      status: "Call Back Later"
    });

    res.status(200).json({
      success: true,
      data: {
        totalCallsToday,
        interestedCandidates,
        interviewsScheduled,
        followUps
      }
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};