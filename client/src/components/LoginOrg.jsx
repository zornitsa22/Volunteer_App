import { useState, useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { Navigate, useNavigate } from "react-router-dom";

function LoginOrg() {
  const context = useContext(AuthContextOrg);
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({
    email: "",
    password: "",
  });


// function to handle changes in the form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(organization); // Call the login function from the context
    navigate("/projects")
  };

// Redirect to homepage if the organization is already authenticated
  if (!context.loading && context.organization) {
    return <Navigate to="/projects" />;
  }

  //Render the login form if not authenticated
  if (!context.loading && !context.organization) {
    return (
      <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
      <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please Login </h2>
        {context.errors?.message}
        <form className='flex flex-col max-w-[600px] w-full'onSubmit={handleSubmit}>

          <label>Email:</label>
          <input
            className='bg-[#ccd6f6] my-1 p-2'
            type="email"
            name="email"
            value={organization.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            className='bg-[#ccd6f6] my-1 p-2'
            type="password"
            name="password"
            value={organization.password}
            onChange={handleChange}
            required
          />
          <button className="text-black border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center">Login as Volunteer</button>
        </form>
      </div>
    );
  }
}

export default LoginOrg;
