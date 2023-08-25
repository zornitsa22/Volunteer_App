import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";

function LoginOrg() {
  const context = useContext(AuthContext);

  const [organization, setOrganization] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Organization Login:", organization);
    // Using context to perform login logic for organizations
  };

  if (!context.loading && context.organization) {
    return <Navigate to="/" />;
  }

  if (!context.loading && !context.organization) {
    return (
      <>
        {context.errors?.message}
        <form onSubmit={handleSubmit}>
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
          <button>Login as Organization</button>
        </form>
      </>
    );
  }
}

export default LoginOrg;
