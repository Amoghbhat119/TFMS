const Application = require("../models/Application");
const Candidate = require("../models/Candidate");

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