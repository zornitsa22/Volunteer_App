import { useEffect, useContext, useState } from "react";
import axios from "../axiosInstance";
import { AuthContextVol } from "../context/AuthVol";

const ProjectVol = () => {
  const { volunteer } = useContext(AuthContextVol);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `/api/volunteers/${volunteer._id}/projects`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects applied by volunteer:", error);
      }
    };

    if (volunteer) {
      fetchProjects();
    }
  }, [volunteer]);

  return (
    <div className="bg-white  max-w-full m-auto px-4 py-12">
      {projects.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#A9BE93] text-white">
              <th className="px-4 py-2">Projects</th>
              <th className="px-4 py-2">Decision</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2 font-bold">{project.title}</td>
                <td className="border px-4 py-2">
                  {project.volunteers[0].decision}
                </td>
                <td className="border px-4 py-2">
                  {project.volunteers[0].status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-xl font-bold">
          {volunteer.volunteername} has not applied for any projects.
        </p>
      )}
    </div>
  );
};

export default ProjectVol;
