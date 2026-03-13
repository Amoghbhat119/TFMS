import { useEffect, useState } from "react";

import MetricCard from "../../components/dashboard/MetricCard";
import RecruiterTable from "../../components/dashboard/RecruiterTable";
import ClientCallChart from "../../components/dashboard/ClientCallChart";
import CandidateSourceChart from "../../components/dashboard/CandidateSourceChart";
import Pipeline from "../../components/dashboard/Pipeline";

import {
  getDashboardStats,
  getRecentCandidates,
  getStageDistribution,
  getCandidateSources
} from "../../api/dashboardApi";

function DashboardPage() {

  const [stats, setStats] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [pipeline, setPipeline] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const statsRes = await getDashboardStats();
        setStats(statsRes.data);

        const candRes = await getRecentCandidates();
        setCandidates(candRes.data.candidates.slice(0,5));

        const stageRes = await getStageDistribution();
        setPipeline(stageRes.data.stages);

        const sourceRes = await getCandidateSources();

        const formatted = sourceRes.data.sources.map((s) => ({
          name: s._id,
          value: s.candidates
        }));

        setSources(formatted);

      } catch (error) {
        console.error(error);
      }

    };

    fetchDashboard();

  }, []);

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* METRICS */}

      <div className="grid grid-cols-4 gap-6">

        <MetricCard
          title="Total Candidates"
          value={stats.totalCandidates}
        />

        <MetricCard
          title="New Applications"
          value={stats.newApplications}
        />

        <MetricCard
          title="Interviews Scheduled"
          value={stats.interviewsScheduled}
        />

        <MetricCard
          title="Hires This Month"
          value={stats.hiresThisMonth}
        />

      </div>


      {/* PIPELINE */}

      <div className="bg-white p-6 rounded shadow">

        <h3 className="text-lg font-semibold mb-4">
          Recruitment Pipeline
        </h3>

        <Pipeline stages={pipeline} />

      </div>


      {/* TABLE + CHARTS */}

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white p-6 rounded shadow">

          <h3 className="text-lg font-semibold mb-4">
            Recent Candidates
          </h3>

          <RecruiterTable candidates={candidates} />

        </div>

        <div className="space-y-6">

          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Performance Overview
            </h3>

            <ClientCallChart />

          </div>

          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Candidate Sources
            </h3>

            <CandidateSourceChart data={sources} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;