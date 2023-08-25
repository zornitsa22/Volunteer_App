import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInstance";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((e) => console.log(e));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/projects/${id}`, project)
      .then((res) => {
        console.log(res.data);
        navigate(`/projects/${id}`);
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <div>
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={project?.title || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          value={project?.description || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="">Organization</label>
        <input
          type="text"
          name="organization"
          value={project?.organization || ""}
          onChange={handleChange}
        />
        <button>Update Project</button>
      </form>
    </div>
  );
};

export default UpdateProject;
