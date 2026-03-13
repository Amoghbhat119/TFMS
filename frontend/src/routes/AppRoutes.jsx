import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ClientListPage from "../pages/clients/ClientListPage";
import JobListPage from "../pages/jobs/JobListPage";
import CandidateListPage from "../pages/candidates/CandidateListPage";
import ApplicationListPage from "../pages/applications/ApplicationListPage";
import CallLogsPage from "../pages/calls/CallLogsPage";
import InterviewListPage from "../pages/interviews/InterviewListPage";
import RecruiterManagementPage from "../pages/recruiters/RecruiterManagementPage";
import ReportsPage from "../pages/reports/ReportsPage";
import ImportCandidatesPage from "../pages/import/ImportCandidatesPage";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Layout */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientListPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/candidates" element={<CandidateListPage />} />
          <Route path="/applications" element={<ApplicationListPage />} />
          <Route path="/calls" element={<CallLogsPage />} />
          <Route path="/interviews" element={<InterviewListPage />} />
          <Route path="/recruiters" element={<RecruiterManagementPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/import" element={<ImportCandidatesPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;