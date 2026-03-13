import { useEffect, useState } from "react";
import { getCallLogs, deleteCallLog } from "../../api/callLogApi";
import CallLogForm from "../../components/forms/CallLogForm";

function CallLogsPage() {

  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {

    try {

      const res = await getCallLogs();

      setLogs(res.data.callLogs);

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = async (id) => {

    await deleteCallLog(id);

    fetchLogs();
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Daily Call Logs
      </h2>

      <CallLogForm refresh={fetchLogs} />

      <table className="w-full bg-white rounded shadow">

        <thead className="border-b bg-gray-100">

          <tr>

            <th className="p-3">Candidate</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Comments</th>
            <th className="p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {logs.map((log) => (

            <tr key={log._id} className="border-b">

              <td className="p-3">{log.candidateName}</td>

              <td className="p-3">{log.phone}</td>

              <td className="p-3">{log.role}</td>

              <td className="p-3">{log.status}</td>

              <td className="p-3">{log.comments}</td>

              <td className="p-3">

                <button
                  onClick={() => handleDelete(log._id)}
                  className="text-red-500"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CallLogsPage;