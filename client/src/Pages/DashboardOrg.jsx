import { Link } from "react-router-dom";
import VolunteerOrg from "./VolunteerOrg";
import { AuthContextOrg } from "../context/AuthOrg";
import { useContext } from "react";
import HeroOrganization from "../assets/HeroOrganization.png";

const DashboardOrg = () => {
  const { organization } = useContext(AuthContextOrg);

  return (
    <div className="bg-[#d3e7cb] min-h-screen">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: `url(${HeroOrganization})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-4xl font-semibold text-center text-white">
          Welcome,{" "}
          <span className="text-white font-bold">
            {" "}
            {organization.organizationName}!
          </span>
        </h1>
        <p className="text-lg mt-4 text-center text-white">
          This is your dashboard.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Create New Project Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#2A4434] mb-4">
              Create New Projects
            </h2>
            <p className="text-[#2A4434]">
              Start new volunteer projects and make a difference in your
              community.
            </p>
            <Link
              to="/projects/new"
              className="bg-[#A9BE93] hover:bg-[#2A4434] text-white px-4 py-2 rounded mt-4  inline-block"
            >
              Create Project
            </Link>
          </div>

          {/* Manage Projects Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#2A4434] mb-4">
              Manage Projects
            </h2>
            <p className="text-[#2A4434]">View and manage your projects.</p>
            <Link
              to="/organizations/:id/projects"
              className="bg-[#A9BE93] hover:bg-[#2A4434] text-white px-4 py-2 rounded mt-4  inline-block"
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
