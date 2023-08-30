import { useState, useContext } from "react";
import { AuthContextVol } from "../context/AuthVol";
import { Navigate, useNavigate } from "react-router-dom";

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
    const { volunteername, 
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
   // function to handle changes in the form input fields
   const handleChange = e => {
    if (e.target.name === 'image') {
      setVolunteer({ ...volunteer, image: e.target.files[0] });
    } else {
      setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
    }
  };

    // Redirect to projects page if organization is already authenticated
  if (!context.loading && context.volunteer) {
    return <Navigate to="/project"/>;
  }
  //Render the registration form if not authenticated
  if (!context.loading && !context.volunteer) {
    return (
      <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
        <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please Register </h2>
      <form className='flex flex-col max-w-[600px] w-full' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          className='bg-[#ccd6f6] my-1 p-2'
          type="text"
          name="volunteername"
          value={volunteer.volunteername}
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

        <label>Contact Info:</label>
        <input
          name="contactInfo"
          value={volunteer.contactInfo}
          onChange={handleChange}
          className='bg-[#ccd6f6]'
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
