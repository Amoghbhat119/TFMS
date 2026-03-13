import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

function JobListPage() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const fetchJobs = async () => {

      const res = await axios.get("/jobs");

      setJobs(res.data.jobs);

    };

    fetchJobs();

  }, []);

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Job Requirements
      </h2>

      <table className="w-full bg-white rounded shadow">

        <thead className="border-b">

          <tr>
            <th>Role</th>
            <th>Experience</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job._id} className="border-b">

              <td>{job.role}</td>
              <td>{job.experience}</td>
              <td>{job.location}</td>
              <td>{job.salaryRange}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default JobListPage;