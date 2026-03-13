const Application = require("../models/Application");

exports.updateCandidateStage = async (
  applicationId,
  newStage,
  recruiterId,
  note = ""
) => {

  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  application.currentStage = newStage;

  application.stageHistory.push({
    stage: newStage,
    note: note,
    updatedBy: recruiterId,
    timestamp: new Date()
  });

  await application.save();

  return application;
};