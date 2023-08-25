import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";

function RegOrg() {
  const context = useContext(AuthContext);

  const [organization, setOrganization] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    logo: "",
    description: "",
    contact: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Organization Registration:", organization);
    // Using context to perform registration logic for organizations
  };

  if (!context.loading && context.user) {
    return <Navigate to="/" />;
  }

  if (!context.loading && !context.user) {
    return (
      <form className="form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={organization.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={organization.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={organization.password}
          onChange={handleChange}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={organization.confirmPassword}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={organization.description}
          onChange={handleChange}
        />
        <label>Contact Info:</label>
        <input
          type="text"
          name="contact"
          value={organization.contact}
          onChange={handleChange}
        />
        <label>Website:</label>
        <input
          type="text"
          name="website"
          value={organization.website}
          onChange={handleChange}
        />
        <label>Logo:</label>
        <button>Register</button>
      </form>
    );
  }
}

export default RegOrg;
