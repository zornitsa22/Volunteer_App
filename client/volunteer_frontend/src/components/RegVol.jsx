import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";

function RegVol() {
  const context = useContext(AuthContext);

  const [volunteer, setVolunteer] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
    description: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer({ ...volunteer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer Registration:", volunteer);
    // Using context to perform registration logic for volunteers
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
          value={volunteer.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={volunteer.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={volunteer.password}
          onChange={handleChange}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={volunteer.confirmPassword}
          onChange={handleChange}
          required
        />
        <label>Skills:</label>
        <input
          type="text"
          name="skills"
          value={volunteer.skills}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={volunteer.description}
          onChange={handleChange}
        />
        <label>Profile Image:</label>
        <button>Register</button>
      </form>
    );
  }
}

export default RegVol;
