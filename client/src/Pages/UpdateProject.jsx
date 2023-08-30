import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';

const UpdateProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        name: '',
        description: '',
        location: '',
        skills: '',
        ocurrence: '',
        cause: '',
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

    const updateProject = async () => {
        try {
            /*const {
                name,
                description,
                location,
                Skills,
                ocurrence,
                cause,
                capacity,
                contactEmail,
                Tasks,
                latitude,
                longitude,
                organizationId,
                image
            } = project;

            const formData = new FormData();
            formData.append('name', name);
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
            formData.append('organizationId', organizationId);
            formData.append('image', image);*/

            const response = await axios.put(`/api/projects/${id}`, project);
            setProject(response.data);
            navigate('/projects');
        } catch (error) {
            console.error('Error updating Project', error);
        }
    };

    /*const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        setProject(prevProject => ({
            ...prevProject,
            [name]: name === 'image' ? files[0] : value
        }));
    };*/

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProject({ ...project, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProject();
    };

    return (
      <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
      <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'> Please Register </h2>
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

            {/*<label htmlFor="">CV</label>
            <input type="file"
            name='image' 
            accept="image/*"
            onChange={handleChange} />*/}

           <button 
            type="submit"
            className="text-black border-2 bg-green-300 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center"
            >Update Project</button>
        </form>
    </div>
    )
}

export default UpdateProject;

