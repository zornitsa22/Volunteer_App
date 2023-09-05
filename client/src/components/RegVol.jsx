import { useState, useContext } from "react";
import { AuthContextVol } from "../context/AuthVol";
import { Navigate, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.png";

function RegVol() {
  // Access the authentication context
  const context = useContext(AuthContextVol);
  const navigate = useNavigate();

  const [volunteer, setVolunteer] = useState({
    volunteername: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: [],
    description: "",
    image: "",
    contactInfo: [],
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      volunteername,
      email,
      password,
      confirmPassword,
      skills,
      description,
      image,
      contactInfo,
    } = volunteer;

    const formData = new FormData();
    formData.append("volunteername", volunteername);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("skills", skills);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("contactInfo", contactInfo);

    await context.register(formData);
    navigate("/login/volunteer");
  };

  // Function to handle changes in the form input fields
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setVolunteer({ ...volunteer, image: e.target.files[0] });
    } else {
      setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
    }
  };

  // Redirect to projects page if organization is already authenticated
  if (!context.loading && context.volunteer) {
    return <Navigate to="/project" />;
  }

  // Render the registration form if not authenticated
  if (!context.loading && !context.volunteer) {
    return (
      <div
        className="max-w-full mx-auto px-4 py-12 flex flex-col items-center"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-full mx-auto px-4 py-12 flex flex-col items-center">
          <h2 className="text-[#2A4434]  font-bold py-12 text-4xl text-center">
            Please Register
          </h2>
          <form
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-[600px]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="volunteername"
                value={volunteer.volunteername}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={volunteer.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={volunteer.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="confirmPassword"
                value={volunteer.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Skills:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="skills"
                value={volunteer.skills}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Info:
              </label>
              <input
                name="contactInfo"
                value={volunteer.contactInfo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                rows="5"
                name="description"
                value={volunteer.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Profile Image:
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-[#A9BE93] hover:bg-[#2A4434] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:shadow-md"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegVol;
