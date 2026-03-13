import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

function ClientListPage() {

  const [clients, setClients] = useState([]);

  useEffect(() => {

    const fetchClients = async () => {

      const res = await axios.get("/clients");

      setClients(res.data.clients);

    };

    fetchClients();

  }, []);

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Clients
      </h2>

      <table className="w-full bg-white rounded shadow">

        <thead className="border-b">

          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Location</th>
          </tr>

        </thead>

        <tbody>

          {clients.map((client) => (

            <tr key={client._id} className="border-b">

              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
              <td>{client.location}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ClientListPage;