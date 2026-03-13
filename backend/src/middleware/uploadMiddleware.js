const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Ensure upload folders exist
const resumeDir = "src/uploads/resumes";
const excelDir = "src/uploads/excel";

if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });
if (!fs.existsSync(excelDir)) fs.mkdirSync(excelDir, { recursive: true });


// Resume Storage
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumeDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  }
});


// Excel Storage
const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, excelDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  }
});


// File Filters

const resumeFilter = (req, file, cb) => {
  const allowed = ["application/pdf"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF resumes allowed"), false);
  }
};


const excelFilter = (req, file, cb) => {
  const allowed = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv"
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel or CSV files allowed"), false);
  }
};


// Upload Instances

const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: resumeFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});


const uploadExcel = multer({
  storage: excelStorage,
  fileFilter: excelFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});


module.exports = {
  uploadResume,
  uploadExcel
};