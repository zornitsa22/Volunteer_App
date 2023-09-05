import { useState, useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { Navigate, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.png";

function RegOrg() {
  const context = useContext(AuthContextOrg);
  const navigate = useNavigate();

  const [organization, setOrganization] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    description: "",
    contactInfo: "",
    website: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    context.register(organization); // Call the register function from the context
    navigate("/login/organization");
  };

  // Function to handle changes in the form input fields
  const handleChange = (e) => {
    // If the input is an image, set the selected image file
    if (e.target.name === "image") {
      setOrganization({ ...organization, image: e.target.files[0] });
    } else {
      // If the input is not an image, update the state with the new value
      setOrganization({ ...organization, [e.target.name]: e.target.value });
    }
  };

  // Redirect to projects page if organization is already authenticated
  if (!context.loading && context.organization) {
    return <Navigate to="/project" />;
  }

  // Render the registration form if not authenticated
  if (!context.loading && !context.organization) {
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
                name="organizationName"
                value={organization.organizationName}
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
                value={organization.email}
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
                value={organization.password}
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
                value={organization.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Info:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="contactInfo"
                value={organization.contactInfo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Website:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="website"
                value={organization.website}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                rows="5"
                name="description"
                value={organization.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Logo:
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

export default RegOrg;
