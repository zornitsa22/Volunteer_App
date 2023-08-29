import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null); // project object from backend

  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((e) => setError(e.response?.data?.message));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`/api/projects/${id}`)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {project && (
        <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
        <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> {project.title}r </h2>
          <img src={project.image} alt="image" />
          <p>Description: {project.description}</p>
          <p>Organization: {project.organization}</p>
          <p>Location: {project.location}</p>
          <p>Occurrence: {project.occurence}</p>
          <p>Cause: {project.cause}</p>
          <p>Capacity: {project.capacity}</p>
          <p>ContactInfo: {project.contactInfo}</p>
          <p>Skills: {project.Skills}</p>
          <Link to={`/projects/${id}/update`}>Update Project</Link>
          <button onClick={handleDelete}>Delete Project</button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
