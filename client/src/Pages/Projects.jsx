import { useContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { AuthContextVol } from "../context/AuthVol";
import ProjectsBanner from "../assets/projectsBanner.png";

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const { volunteer } = useContext(AuthContextVol);

  // Function to fetch the list of Projects from the server
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch Projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: `url(${ProjectsBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-3xl mt-4 text-center">
          {" "}
          <span className="text-white font-bold">
            {" "}
            {volunteer.volunteername},
          </span>{" "}
          Explore Our Exciting Projects
        </h1>
        <p className="text-white text-lg mt-4 text-center">
          Find opportunities to make a difference in your community.
        </p>
      </div>

      {/* Project List */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects &&
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <Link to={`/projects/${project._id}`}>
                  <img
                    src={project.image}
                    alt="Project"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xl font-semibold text-green-800 mb-2">
                      {project.title}
                    </p>
                    <div className="flex items-center text-green-600">
                      <GrLocation size={20} className="mr-2" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
