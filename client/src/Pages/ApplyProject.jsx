import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import { AuthContextVol } from "../context/AuthVol";

const ApplyProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { volunteer } = useContext(AuthContextVol);

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

    const fetchProject = async () => {
        try {
            const response = await axios.get(`/api/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            console.log('Error fetching Project', error);
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);


  const handleApply = async () => {
    try {
        const response = await axios.post(`/api/projects/${id}/apply`)
        console.log(response.data)
        navigate("/volunteers/dashboard/volunteer")

    } catch (error) {
        console.error("Error applying for the project", error);
        
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    handleApply();
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
    <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please <span className="text-cyan-300">{volunteer.volunteername}</span> send us your application  </h2>
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
          <input type="text"
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

          <label htmlFor="">CV</label>
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

export default ApplyProject;
