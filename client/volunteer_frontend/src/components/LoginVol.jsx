import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";

function LoginVol() {
  const context = useContext(AuthContext);

  const [volunteer, setVolunteer] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer({ ...volunteer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer Login:", volunteer);
    // Using context to perform login logic for volunteers
  };

  if (!context.loading && context.volunteer) {
    return <Navigate to="/" />;
  }

  if (!context.loading && !context.volunteer) {
    return (
      <>
        {context.errors?.message}
        <form onSubmit={handleSubmit}>
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
          <button>Login as Volunteer</button>
        </form>
      </>
    );
  }
}

export default LoginVol;
