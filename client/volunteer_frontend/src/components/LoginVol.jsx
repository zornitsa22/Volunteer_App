import { useState, useContext } from "react";
import { AuthContextVol } from "../context/AuthVol";
import { Navigate } from "react-router-dom";

function LoginVol() {
  const context = useContext(AuthContextVol);

  const [volunteer, setVolunteer] = useState({
    email: "",
    password: "",
  });

// Handle form submission
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer({ ...volunteer, [name]: value });
  };

// function to handle changes in the form input fields
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer Login:", volunteer);
  };

 // Redirect to homepage if volunteer is already authenticated
  if (!context.loading && context.volunteer) {
    return <Navigate to="/" />;
  }

// Render the login form if not authenticated
  if (!context.loading && !context.volunteer) {
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
            value={volunteer.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            className='bg-[#ccd6f6] my-1 p-2'
            type="password"
            name="password"
            value={volunteer.password}
            onChange={handleChange}
            required
          />
          <button className="text-black border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center">Login as Volunteer</button>
        </form>
      </div>
    );
  }
}

export default LoginVol;
