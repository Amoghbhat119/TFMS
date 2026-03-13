import { useEffect, useState } from "react";
import {
  getApplications,
  updateStage,
  deleteApplication
} from "../../api/applicationApi";

function ApplicationListPage() {

  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {

      const res = await getApplications();

      setApplications(res.data.applications || []);

    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStageChange = async (id, stage) => {
    try {

      await updateStage(id, stage);

      fetchApplications();

    } catch (error) {
      console.error("Stage update failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {

      await deleteApplication(id);

      fetchApplications();

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Applications
      </h2>

      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full text-left">

          <thead className="border-b bg-gray-100">

            <tr>

              <th className="p-3">Candidate</th>
              <th className="p-3">Job</th>
              <th className="p-3">Stage</th>
              <th className="p-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {applications.length === 0 && (

              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No applications found
                </td>
              </tr>

            )}

            {applications.map((app) => (

              <tr key={app._id} className="border-b">

                <td className="p-3">
                  {app.candidateId?.name}
                </td>

                <td className="p-3">
                  {app.jobId?.role}
                </td>

                <td className="p-3">

                  <select
                    className="border rounded p-1"
                    value={app.currentStage}
                    onChange={(e) =>
                      handleStageChange(app._id, e.target.value)
                    }
                  >

                    <option>Sourced</option>
                    <option>Screening</option>
                    <option>Interview</option>
                    <option>Offered</option>
                    <option>Hired</option>

                  </select>

                </td>

                <td className="p-3">

                  <button
                    onClick={() => handleDelete(app._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ApplicationListPage;