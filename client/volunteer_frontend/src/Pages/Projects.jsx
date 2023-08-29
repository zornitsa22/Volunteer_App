import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from 'react-router-dom';


const Projects = () => {
    const [projects, setProjects] = useState(null);

    // Function to fetch the list of Projects from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`/api/projects`)
        console.log('check..', projects)
        setProjects(response.data);
      }catch(error) {
          console.error({Error: 'Error fetching projects'})
          }
    }
    
    // Fetch Projects when the component mounts
    useEffect(() => {
        fetchProjects();
    }, []);

  return (
    <div className='max-w-full m-auto px-4 py-12'>
    <h2 className='text-orange-600 font-bold text-4xl text-center'>Volunteering Projects</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {projects && 
          projects.map((project) => (
        <div key={project.id}  className='text-lg text-center mb-4'>
        <Link className='block bg-stone-300 px-4 py-2 mt-4 rounded-md' to={`/projects/${project._id}`}> 
        <span className=' text-orange-800 font-bold uppercase'>{project.title}</span> 
        <br /> 
        <span className='text-cyan-700 text-[20px]'>-{project.image}-</span>
        </Link>
        </div>
        ))}
      </div> 
</div>
  )
}

export default Projects
