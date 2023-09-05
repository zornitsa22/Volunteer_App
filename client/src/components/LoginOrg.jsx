import React, { useState, useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { Navigate, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.png";

function LoginOrg() {
  const context = useContext(AuthContextOrg);
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({
    email: "",
    password: "",
  });

  // Function to handle changes in the form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(organization);
    navigate("/organizations/:id/projects");
  };

  // Redirect to homepage if the organization is already authenticated
  if (!context.loading && context.organization) {
    return <Navigate to="/organizations/:id/projects" />;
  }

  // Render the login form if not authenticated
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
        <h2 className="text-[#2A4434] font-bold py-12 text-4xl text-center">
          Please Login
        </h2>
        {context.errors?.message}
        <form
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-[600px]"
          onSubmit={handleSubmit}
        >
          <label>Email:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={organization.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={organization.password}
            onChange={handleChange}
            required
          />
          <button
            className="bg-[#A9BE93] hover:bg-[#2A4434] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:shadow-md mt-4" // Added mt-4 for margin-top
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginOrg;
