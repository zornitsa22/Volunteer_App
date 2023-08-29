import { useState, useContext } from "react";
import { AuthContextVol } from "../context/AuthVol";
import { Navigate } from "react-router-dom";

function RegVol() {
   // Access the authentication context
  const context = useContext(AuthContextVol);

  const [volunteer, setVolunteer] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
    description: "",
    image: "",
  });

  // destructuring values of the volunteer state
  const { name, email, password, confirmPassword, skills, description, image } = volunteer;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('confirmPassword', confirmPassword);
  formData.append('skills', skills);
  formData.append('description', description);
  formData.append('image', image);
  
 
 // Handle form submission
  const handleSubmit = e => {
  e.preventDefault();
  context.register(volunteer); // Call the register function from the context
  };
// function to handle changes in the form input fields
    const handleChange = (e) => {
      if (e.target.name === 'image') {
        // If the input is an image, set the selected image file
        setVolunteer({ ...volunteer, image: e.target.files[0] });
      } else {
        // If the input is not an image, update the state with the new value
        setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
      }
    };

  if (!context.loading && context.volunteer) {
    return <Navigate to="/" />;
  }

  if (!context.loading && !context.volunteer) {
    return (

      <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
        <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please Register </h2>
      <form className='flex flex-col max-w-[600px] w-full' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          className='bg-[#ccd6f6] my-1 p-2'
          type="text"
          name="name"
          value={volunteer.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          className='my-1 p-2 bg-[#ccd6f6]'
          type="email"
          name="email"
          value={volunteer.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          className='my-1 p-2 bg-[#ccd6f6]'
          type="password"
          name="password"
          value={volunteer.password}
          onChange={handleChange}
          required
        />
        <label>Confirm Password:</label>
        <input
          className='my-1 p-2 bg-[#ccd6f6]'
          type="password"
          name="confirmPassword"
          value={volunteer.confirmPassword}
          onChange={handleChange}
          required
        />
        <label>Skills:</label>
        <input
          className='my-1 p-2 bg-[#ccd6f6]'
          type="text"
          name="skills"
          value={volunteer.skills}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea
          rows="5"
          name="description"
          value={volunteer.description}
          onChange={handleChange}
          className='bg-[#ccd6f6]'
        />
        <label htmlFor="">Pofil Image</label>
        <input type="file"
        name='image' 
        accept="image/*"
        onChange={handleChange} />
        <button className="text-black border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center">Register</button>
      </form>
      </div>
      
    );
  }
}

export default RegVol;
