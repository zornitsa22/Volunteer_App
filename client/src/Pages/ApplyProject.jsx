import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../axiosInstance";
import { AuthContextVol } from "../context/AuthVol";
import BackgroundImage from "../assets/background.png";

const ApplyProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { volunteer } = useContext(AuthContextVol);

  const [project, setProject] = useState({
    title: "",
    description: "",
    location: "",
    skills: "",
    ocurrence: "",
    cause: "",
    image: "",
    capacity: "",
    contactEmail: "",
    tasks: "",
    latitude: "",
    longitude: "",
  });

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.log("Error fetching Project", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleApply = async () => {
    try {
      const response = await axios.post(`/api/projects/${id}/apply`);
      console.log(response.data);
      navigate("/volunteers/dashboard/volunteer");
    } catch (error) {
      console.error("Error applying for the project", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApply();
  };

  // function to handle changes in the form input fields
  const handleChange = (e) => {
    if (e.target.name === "image") {
      // If the input is an image, set the selected image file
      setProject({ ...project, image: e.target.files[0] });
    } else {
      // If the input is not an image, update the state with the new value
      setProject({ ...project, [e.target.name]: e.target.value });
    }
  };

  return (
    <div
      className="max-w-full mx-auto px-4 py-12 flex flex-col items-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-[#2A4434] font-bold py-12 text-4xl text-center">
        Please <span className="text-[#2A4434]">{volunteer.volunteername}</span>{" "}
        send us your application{" "}
      </h2>
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-[600px]"
        onSubmit={handleSubmit}
      >
        <label className="text-[#2A4434]" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="title"
          value={project?.title}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="location"
          value={project.location}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="skills">
          Skills
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="skills"
          value={project.skills}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="ocurrence">
          Time required
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="ocurrence"
          value={project.ocurrence}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="cause">
          Cause
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="cause"
          value={project.cause}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="capacity">
          Capacity
        </label>
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="capacity"
          value={project.capacity}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="contactEmail">
          Contact
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="contactEmail"
          value={project.contactEmail}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="latitude">
          Latitude
        </label>
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="latitude"
          value={project.latitude}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="longitude">
          Longitude
        </label>
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="longitude"
          value={project.longitude}
          onChange={handleChange}
        />

        <label className="text-[#2A4434]" htmlFor="description">
          Description:
        </label>
        <textarea
          rows="5"
          name="description"
          value={project.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label className="text-[#2A4434]" htmlFor="image">
          CV
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#A9BE93] hover:bg-[#2A4434] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:shadow-md mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplyProject;
