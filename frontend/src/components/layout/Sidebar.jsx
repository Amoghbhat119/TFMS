import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        TFMS
      </div>

      <nav className="flex-1 p-4 space-y-3">

        <Link className="block hover:text-purple-400" to="/dashboard">
          Dashboard
        </Link>

        <Link className="block hover:text-purple-400" to="/clients">
          Clients
        </Link>

        <Link className="block hover:text-purple-400" to="/jobs">
          Jobs
        </Link>

        <Link className="block hover:text-purple-400" to="/candidates">
          Candidates
        </Link>

        <Link className="block hover:text-purple-400" to="/applications">
          Applications
        </Link>

        <Link className="block hover:text-purple-400" to="/calls">
          Calls
        </Link>

        <Link className="block hover:text-purple-400" to="/interviews">
          Interviews
        </Link>

        <Link className="block hover:text-purple-400" to="/recruiters">
          Recruiters
        </Link>

        <Link className="block hover:text-purple-400" to="/reports">
          Reports
        </Link>

        <Link className="block hover:text-purple-400" to="/import">
          Import
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;