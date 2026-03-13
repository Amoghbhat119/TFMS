const XLSX = require("xlsx");
const Candidate = require("../models/Candidate");
const Application = require("../models/Application");

exports.importCandidatesFromExcel = async (filePath, jobId, recruiterId) => {

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json(sheet);

  const results = {
    newCandidates: 0,
    existingCandidates: 0,
    duplicateApplications: 0
  };

  for (let row of rows) {

    const name = row.name || row.Name;
    const phone = row.phone || row.Phone;
    const email = row.email || row.Email;

    if (!phone && !email) continue;

    let candidate = await Candidate.findOne({
      $or: [{ phone }, { email }]
    });

    if (!candidate) {

      candidate = await Candidate.create({
        name,
        phone,
        email,
        skill: row.skill || "",
        experience: row.experience || 0,
        currentCompany: row.currentCompany || "",
        source: "Excel"
      });

      results.newCandidates++;

    } else {
      results.existingCandidates++;
    }

    const existingApplication = await Application.findOne({
      candidateId: candidate._id,
      jobId
    });

    if (existingApplication) {
      results.duplicateApplications++;
      continue;
    }

    await Application.create({
      candidateId: candidate._id,
      jobId,
      recruiterId,
      currentStage: "Applied",
      stageHistory: [
        {
          stage: "Applied",
          updatedBy: recruiterId
        }
      ]
    });

  }

  return results;
};