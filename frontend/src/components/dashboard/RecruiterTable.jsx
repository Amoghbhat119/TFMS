function RecruiterTable({ candidates }) {

  return (
    <table className="w-full text-left">

      <thead>

        <tr className="border-b">
          <th>Name</th>
          <th>Skill</th>
          <th>Status</th>
          <th>Phone</th>
        </tr>

      </thead>

      <tbody>

        {candidates.map((c) => (

          <tr key={c._id} className="border-b">

            <td>{c.name}</td>
            <td>{c.skill}</td>
            <td>{c.status}</td>
            <td>{c.phone}</td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default RecruiterTable;