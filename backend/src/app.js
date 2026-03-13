const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const jobRoutes = require("./routes/jobRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const callLogRoutes = require("./routes/callLogRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const importRoutes = require("./routes/importRoutes");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

/* ADD THESE TWO */
const recruiterRoutes = require("./routes/recruiterRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Talent Flow Management System API Running"
  });
});


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/calllogs", callLogRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/import", importRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* NEW ROUTES */
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/test", testRoutes);


module.exports = app;