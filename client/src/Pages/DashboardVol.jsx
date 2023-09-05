
import ProfileVol from './ProfileVol';
import ProjectVol from './ProjectVol';
import { AuthContextVol } from "../context/AuthVol";
import { useContext } from "react";


const Dashboard = () => {
    const { volunteer } = useContext(AuthContextVol);

  return (
    <div className='bg-gradient-to-r from-emerald-400 to-cyan-400'>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white py-10  text-center">
        <h1 className="text-4xl font-semibold">Welcome,<span className='text-orange-500'> {volunteer.volunteername}!</span></h1>
        <p className="text-lg mt-4">This is your dashboard.</p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Profile Section */}
          <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-4">
            <ProfileVol />
          </div>

          {/* Projects Section */}
          <div className="lg:col-span-1">
            <div className="lg:flex lg:flex-col lg:justify-between lg:h-full">
              {/* Discover Projects Section */}
              <div className="bg-gradient-to-b mt-6 from-gray-200 to-gray-300 p-4 rounded-lg mb-4">
                <h2 className="text-2xl font-semibold">Discover Projects</h2>
                <p className="mt-2 text-gray-700">Explore volunteering opportunities in our app.</p>
                <a
                  href="/projects"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-blue-600 inline-block transition-all duration-300 transform hover:scale-105"
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
