import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import BackgroundImage from "../assets/background.png";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const updateProject = async () => {
    try {
      const {
        title,
        description,
        location,
        skills,
        ocurrence,
        cause,
        capacity,
        contactEmail,
        tasks,
        latitude,
        longitude,
        image,
      } = project;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("skills", skills);
      formData.append("ocurrence", ocurrence);
      formData.append("cause", cause);
      formData.append("capacity", capacity);
      formData.append("contactEmail", contactEmail);
      formData.append("tasks", tasks);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("image", image);

      const response = await axios.put(`/api/projects/${id}/update`, formData);
      setProject(response.data);
      navigate("/projects/:id");
    } catch (error) {
      console.error("Error updating Project", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject();
  };

  // Function to handle changes in the form input fields
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
        Please Update Your Project
      </h2>
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-[600px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            value={project?.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-600 font-bold mb-2"
          >
            Location:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="location"
            value={project.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="skills"
            className="block text-gray-600 font-bold mb-2"
          >
            Skills:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="skills"
            value={project.skills}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ocurrence"
            className="block text-gray-600 font-bold mb-2"
          >
            Time required:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="ocurrence"
            value={project.ocurrence}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cause" className="block text-gray-600 font-bold mb-2">
            Cause:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="cause"
            value={project.cause}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="capacity"
            className="block text-gray-600 font-bold mb-2"
          >
            Capacity:
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="capacity"
            value={project.capacity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactEmail"
            className="block text-gray-600 font-bold mb-2"
          >
            Contact:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="contactEmail"
            value={project.contactEmail}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="latitude"
            className="block text-gray-600 font-bold mb-2"
          >
            Latitude:
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="latitude"
            value={project.latitude}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="longitude"
            className="block text-gray-600 font-bold mb-2"
          >
            Longitude:
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="longitude"
            value={project.longitude}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            rows="5"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600 font-bold mb-2">
            CV:
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-[#A9BE93] hover:bg-[#2A4434] text-white text-bold border-2 px-4 py-3 my-8 mx-auto flex items-center"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
