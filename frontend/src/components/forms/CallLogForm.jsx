import { useState } from "react";
import { addCallLog } from "../../api/callLogApi";

function CallLogForm({ refresh }) {

  const [form, setForm] = useState({
    candidateName: "",
    phone: "",
    role: "",
    experience: "",
    status: "Interested",
    comments: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addCallLog(form);

      setForm({
        candidateName: "",
        phone: "",
        role: "",
        experience: "",
        status: "Interested",
        comments: ""
      });

      refresh();

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6 grid grid-cols-3 gap-4"
    >

      <input
        name="candidateName"
        placeholder="Candidate Name"
        className="border p-2 rounded"
        value={form.candidateName}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        className="border p-2 rounded"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        className="border p-2 rounded"
        value={form.role}
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience"
        className="border p-2 rounded"
        value={form.experience}
        onChange={handleChange}
      />

      <select
        name="status"
        className="border p-2 rounded"
        value={form.status}
        onChange={handleChange}
      >

        <option>Interested</option>
        <option>Not Interested</option>
        <option>Wrong Number</option>
        <option>Call Back Later</option>
        <option>Interview Scheduled</option>

      </select>

      <input
        name="comments"
        placeholder="Comments"
        className="border p-2 rounded"
        value={form.comments}
        onChange={handleChange}
      />

      <button className="bg-blue-600 text-white p-2 rounded col-span-3">
        Add Call Log
      </button>

    </form>
  );
}

export default CallLogForm;