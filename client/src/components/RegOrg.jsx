import { useState, useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { Navigate, useNavigate } from "react-router-dom";

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

  // destructuring values of the organization state
  const { organizationName,
    email,
    password, 
    confirmPassword, 
    image, 
    description, 
    contactInfo, 
    website 
  } = organization;

  const formData = new FormData();
  formData.append('organizationName', organizationName);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('confirmPassword', confirmPassword);
  formData.append('skills', image);
  formData.append('description', description);
  formData.append('image', contactInfo);
  formData.append('website', website);
  
   // Handle form submission
   const handleSubmit = e => {
    e.preventDefault();
    context.RegOrg(organization); // Call the register function from the context
    navigate("/login/organization")
    };

  // function to handle changes in the form input fields
      const handleChange = (e) => {
        // If the input is an image, set the selected image file
        if (e.target.name === 'image') {
          setOrganization({ ...organization, image: e.target.files[0] });
        } else {
          // If the input is not an image, update the state with the new value
          setOrganization({ ...organization, [e.target.name]: e.target.value });
        }
      };

  // Redirect to projects pageif organization is already authenticated
  if (!context.loading && context.organization) {
    return <Navigate to="/project" />;
  }
 // Render the registration form if not authenticated
  if (!context.loading && !context.organization) {
    return (
      <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
      <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please Register </h2>
      <form className='flex flex-col max-w-[600px] w-full' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
        className='bg-[#ccd6f6] my-1 p-2'
          type="text"
          name="organizationName"
          value={organization.organizationName}
          onChange={handleChange}
          required
        />
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
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={organization.confirmPassword}
          onChange={handleChange}
          required
        />
        <label>Contact Info:</label>
        <input
        className='bg-[#ccd6f6] my-1 p-2'
          type="text"
          name="contactInfo"
          value={organization.contactInfo}
          onChange={handleChange}
        />
        <label>Website:</label>
        <input
        className='bg-[#ccd6f6] my-1 p-2'
          type="text"
          name="website"
          value={organization.website}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea
          rows="5"
          name="description"
          value={organization.description}
          onChange={handleChange}
          className='bg-[#ccd6f6]'
        />
        <label htmlFor="">Logo</label>
        <input type="file"
        className='bg-[#ccd6f6] my-1 p-2'
        name='image' 
        accept="image/*"
        onChange={handleChange} />
      
      <button className="text-black border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center">Register</button>
      </form>
      </div>
    );
  }
}

export default RegOrg;
