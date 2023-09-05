
import { Link } from 'react-router-dom';
import VolunteerOrg from './VolunteerOrg';
import { AuthContextOrg } from "../context/AuthOrg";
import { useContext } from "react";

const DashboardOrg = () => {
    const { organization } = useContext(AuthContextOrg);


  return (
    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white py-16 text-center">
        <h1 className="text-4xl font-semibold">Welcome, <span className='text-orange-500'> {organization.organizationName}!</span></h1>
        <p className="text-lg mt-4">This is your dashboard.</p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Create New Project Card */}
          <div className="bg-green-500 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Projects</h2>
            <p className="text-gray-100">
              Start new volunteer projects and make a difference in your community.
            </p>
            <Link
              to="/projects/new"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 inline-block"
            >
              Create Project
            </Link>
          </div>

          {/* Manage Projects Card */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Manage Projects</h2>
            <p className="text-gray-100">
              View and manage your projects.
            </p>
            <Link
              to="/organizations/:id/projects"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-orange-600 inline-block"
            >
              Manage Projects
            </Link>
          </div>

          {/* Volunteer List Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <VolunteerOrg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrg;
