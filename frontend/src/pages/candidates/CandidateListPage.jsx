import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

function CandidateListPage() {

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    const fetchCandidates = async () => {

      const res = await axios.get("/candidates");

      setCandidates(res.data.candidates);

    };

    fetchCandidates();

  }, []);

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Candidates
      </h2>

      <table className="w-full bg-white rounded shadow">

        <thead className="border-b">

          <tr>
            <th>Name</th>
            <th>Skill</th>
            <th>Experience</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {candidates.map((c) => (

            <tr key={c._id} className="border-b">

              <td>{c.name}</td>
              <td>{c.skill}</td>
              <td>{c.experience}</td>
              <td>{c.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CandidateListPage;