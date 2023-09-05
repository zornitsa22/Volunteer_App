import ProfileVol from "./ProfileVol";
import ProjectVol from "./ProjectVol";
import { AuthContextVol } from "../context/AuthVol";
import { useContext } from "react";
import DashboardHero from "../assets/dashboardHero.png";

const Dashboard = () => {
  const { volunteer } = useContext(AuthContextVol);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: `url(${DashboardHero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-4xl font-semibold text-center">
          Welcome,
          <span className="text-white font-bold text-center">
            {" "}
            {volunteer.volunteername}!
          </span>
        </h1>
        <p className="text-white text-lg mt-4 text-center">
          This is your dashboard.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-[#d3e7cb] container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Profile Section */}
          <div className=" lg:col-span-1 bg-white shadow-md rounded-lg p-4">
            <ProfileVol />
          </div>

          {/* Projects Section */}
          <div className="lg:col-span-1">
            <div className="lg:flex lg:flex-col lg:justify-between lg:h-full">
              {/* Discover Projects Section */}
              <div className="bg-white p-4 rounded-lg mb-4">
                <h2 className="text-2xl font-semibold">Discover Projects</h2>
                <p className="mt-2 text-gray-700">
                  Explore volunteering opportunities in our app.
                </p>
                <a
                  href="/projects"
                  className="bg-[#A9BE93] text-white px-6 py-2 rounded-full mt-4 hover:bg-[#2A4434] inline-block transition-all duration-300 transform hover:scale-105"
                >
                  Visit Projects
                </a>
              </div>

              {/* My Projects Section */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <ProjectVol />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
