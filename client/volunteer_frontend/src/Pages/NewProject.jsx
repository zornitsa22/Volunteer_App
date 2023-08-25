import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

const NewProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [occurrence, setOccurrence] = useState("");
  const [cause, setCause] = useState("");
  const [capacity, setCapacity] = useState("");
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/projects", {
        title,
        description,
        organization,
        location,
        occurrence,
        cause,
        capacity,
        contact,
        skills,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/projects");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="">Organization</label>
        <input
          type="text"
          name="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <label htmlFor="">Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="">Occurrence</label>
        <input
          type="text"
          name="occurrence"
          value={occurrence}
          onChange={(e) => setOccurrence(e.target.value)}
        />
        <label htmlFor="">Cause</label>
        <input
          type="text"
          name="cause"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
        />
        <label htmlFor="">Capacity</label>
        <input
          type="text"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <label htmlFor="">Contact</label>
        <input
          type="text"
          name="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <label htmlFor="">Skills</label>
        <input
          type="text"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button>Add Project</button>
      </form>
    </div>
  );
};

export default NewProject;
