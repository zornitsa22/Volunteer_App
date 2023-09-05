
import axios from '../axiosInstance';
import { Link, useParams } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import { AuthContextOrg } from "../context/AuthOrg";
import { useContext, useState, useEffect } from "react";


const ProjectOrg = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState(null);
  const { organization } = useContext(AuthContextOrg);
  
  // Function to fetch the list of Projects from the server
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/api/organizations/${id}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Fetch Projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-16 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome, <span className='text-blue-500'> {organization.organizationName}!</span>
          </h1>
          <p className="text-lg mb-8">
            Explore and manage your projects.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects &&
            projects.map((project) => (
              <div key={project._id} className="bg-white rounded-md overflow-hidden shadow-md">
                <Link to={`/projects/${project._id}`}>
                  <img
                    src={project.image}
                    alt="Project Image"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold text-blue-600">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-600 text-lg">
                        <GrLocation size={20} className="mr-1 text-green-500" />
                        {project.location}
                      </div>
                    </div>
                    <Link
                      to={`/projects/${project._id}`}
                      className="block text-center text-blue-500 hover:underline mt-2"
                    >
                      More
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOrg;