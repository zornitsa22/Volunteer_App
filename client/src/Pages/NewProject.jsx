
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../axiosInstance'
import { AuthContextOrg } from "../context/AuthOrg";
import { useContext } from "react";

const NewProject = () => {
  const navigate = useNavigate();
  const { organization } = useContext(AuthContextOrg);

// initialization of the state for the input fields
const [project, setProject] = useState({
  title: '',
  description: '',
  location: '',
  skills: '',
  ocurrence: '',
  cause: '',
  image: '',
  capacity: '',
  contactEmail: '',
  tasks: '',
  latitude: '',
  longitude: '',
});

// function to handle the form submission
const handleSubmit = (e) => {
e.preventDefault();
// destructuring values of the post state
const {
  title,
  description,
  location,
  skills,
  ocurrence,
  cause,
  capacity,
  contactEmail,
  tasks,
  latitude,
  longitude,
  image
} = project;

const formData = new FormData();
formData.append('title', title);
formData.append('description', description);
formData.append('location', location);
formData.append('skills', skills);
formData.append('ocurrence', ocurrence);
formData.append('cause', cause);
formData.append('capacity', capacity);
formData.append('contactEmail', contactEmail);
formData.append('tasks', tasks);
formData.append('latitude', latitude);
formData.append('longitude', longitude);
formData.append('organizationId', organization?.organizationId);
formData.append('image', image);

axios
.post(`/api/projects`, formData)
.then(res => navigate('/projects'))
.catch(e => console.log(e));
};


// function to handle changes in the form input fields
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // If the input is an image, set the selected image file
      setProject({ ...project, image: e.target.files[0] });
    } else {
      // If the input is not an image, update the state with the new value
      setProject({ ...project, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
    <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please Add Your project </h2>
        <form className='flex flex-col max-w-[600px] w-full' onSubmit={handleSubmit}>
      
          <label htmlFor="title">Title</label>
          <input type="text"
          className='bg-[#ccd6f6] my-1 p-2' 
          name="title" 
          value={project?.title}
          onChange={handleChange} />

          <label htmlFor="location">Location</label>
          <input type="text"
          className='bg-[#ccd6f6] my-1 p-2'
          name="location" 
          value={project.location}
          onChange={handleChange} />

          <label htmlFor="skills">Skills</label>
          <input type="text"
          className='bg-[#ccd6f6] my-1 p-2'
          name="skills"
          value={project.skills}
          onChange={handleChange} />

          <label htmlFor="tasks">Tasks</label>
          <input type="text"
          className='bg-[#ccd6f6] my-1 p-2'
          name="tasks"
          value={project.tasks}
          onChange={handleChange} />

          <label htmlFor="ocurrence">Time required</label>
          <input type="text"
          className='bg-[#ccd6f6] my-1 p-2'
          name="ocurrence" 
          value={project.ocurrence} 
          onChange={handleChange} />

          <label htmlFor="cause">Cause</label>
          <input type="text"
          className='bg-[#ccd6f6] my-1 p-2'
          name="cause" 
          value={project.cause}
          onChange={handleChange} />

          <label htmlFor="capacity">Capacity</label>
          <input type="number"
          className='bg-[#ccd6f6] my-1 p-2'
          name="capacity"
          value={project.capacity}
          onChange={handleChange} />

          <label htmlFor="contactEmail">Contact</label>
          <input type="email"
          className='bg-[#ccd6f6] my-1 p-2'
          name="contactEmail" 
          value={project.contactEmail} 
          onChange={handleChange} />

          <label htmlFor="latitude">Latitude</label>
          <input type="number"
          className='bg-[#ccd6f6] my-1 p-2'
          name="latitude" 
          value={project.latitude} 
          onChange={handleChange} />

          <label htmlFor="longitude">Longitude</label>
          <input type="number"
          className='bg-[#ccd6f6] my-1 p-2'
          name="longitude" 
          value={project.longitude} 
          onChange={handleChange} />

        <label>Description:</label>
        <textarea
        rows="5"
        name="description"
        value={project.description}
        onChange={handleChange}
        className='bg-[#ccd6f6]'
        />

          <label htmlFor="">Image</label>
          <input type="file"
          name='image' 
          accept="image/*"
          onChange={handleChange} />

         <button 
          type="submit"
          className="text-black border-2 bg-green-300 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center"
          >Submit</button>
      </form>
  </div>
  )
}

export default NewProject;
