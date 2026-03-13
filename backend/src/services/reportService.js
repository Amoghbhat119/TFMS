const Application = require("../models/Application");
const Candidate = require("../models/Candidate");
const CallLog = require("../models/CallLog");



// Recruiter Performance Report
exports.getRecruiterPerformance = async (recruiterId) => {

  const totalCandidates = await Application.countDocuments({
    recruiterId
  });

  const interviewsScheduled = await Application.countDocuments({
    recruiterId,
    currentStage: "Interview Scheduled"
  });

  const offersMade = await Application.countDocuments({
    recruiterId,
    currentStage: "Offered"
  });

  const joinedCandidates = await Application.countDocuments({
    recruiterId,
    currentStage: "Joined"
  });

  const selectedCandidates = await Application.countDocuments({
    recruiterId,
    currentStage: "Selected"
  });

  const conversionRatio =
    totalCandidates === 0
      ? 0
      : (selectedCandidates / totalCandidates) * 100;

  const joiningRatio =
    offersMade === 0
      ? 0
      : (joinedCandidates / offersMade) * 100;

  return {
    totalCandidates,
    interviewsScheduled,
    offersMade,
    joinedCandidates,
    conversionRatio,
    joiningRatio
  };
};



// Stage Distribution Report
exports.getStageDistribution = async () => {

  const stages = await Application.aggregate([
    {
      $group: {
        _id: "$currentStage",
        count: { $sum: 1 }
      }
    }
  ]);

  return stages;
};



// Monthly Hiring Trends
exports.getMonthlyHiringTrends = async () => {

  const trends = await Application.aggregate([
    {
      $match: { currentStage: "Joined" }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        joinedCandidates: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    }
  ]);

  return trends;
};



// Source Effectiveness Report
exports.getSourceEffectiveness = async () => {

  const sources = await Candidate.aggregate([
    {
      $group: {
        _id: "$source",
        candidates: { $sum: 1 }
      }
    }
  ]);

  return sources;
};



// Daily Recruiter Report
exports.getDailyRecruiterReport = async () => {

  const today = new Date();
  today.setHours(0,0,0,0);

  const report = await CallLog.aggregate([
    {
      $match: {
        createdAt: { $gte: today }
      }
    },
    {
      $group: {
        _id: "$recruiterId",
        calls: { $sum: 1 },
        interested: {
          $sum: {
            $cond: [{ $eq: ["$status", "Interested"] }, 1, 0]
          }
        },
        notInterested: {
          $sum: {
            $cond: [{ $eq: ["$status", "Not Interested"] }, 1, 0]
          }
        },
        interviews: {
          $sum: {
            $cond: [{ $eq: ["$status", "Interview Scheduled"] }, 1, 0]
          }
        }
      }
    }
  ]);

  return report;
};



// Client Wise Call Report
exports.getClientCallReport = async () => {

  const report = await CallLog.aggregate([
    {
      $group: {
        _id: "$client",
        calls: { $sum: 1 },
        interested: {
          $sum: {
            $cond: [{ $eq: ["$status", "Interested"] }, 1, 0]
          }
        }
      }
    }
  ]);

  return report;
};