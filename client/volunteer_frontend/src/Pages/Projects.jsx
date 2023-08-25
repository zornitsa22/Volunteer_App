import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosInstance";

const Projects = () => {
  const [projects, setProjects] = useState(null); // projects array from backend

  useEffect(() => {
    axios
      .get(`/api/projects`)
      .then((res) => setProjects(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h2>Volunteering Projects</h2>
      <ul>
        {projects &&
          projects.map((project) => (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>
                {project.title} by {project.organization}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Projects;
