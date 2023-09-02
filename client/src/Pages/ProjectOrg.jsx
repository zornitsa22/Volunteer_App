import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link, useParams } from 'react-router-dom';




const ProjectOrg = () => {
    const { id } = useParams();
    const [projects, setProjects] = useState(null);

    // Function to fetch the list of Projects from the server
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`/api/organizations/${id}/projects`)
            console.log("🚀 ~ file: ProjectOrg.jsx:18 ~ fetchProjects ~ response:", response)
            setProjects(response.data);
        }catch(error) {
        console.log("🚀 ~ file: projectsOrg.jsx:19 ~ fetchProjects ~ error:", error)
        }
    }

    // Fetch Projects when the component mounts
    useEffect(() => {
      fetchProjects()
    }, [])

  return (
    <div className='max-w-full m-auto px-4 py-12'>
      <h2 className='text-black font-bold text-3xl text-center mb-4'> List of MyProjects </h2>
      <ul >
        { projects && projects.map((project) => (
          <li key={project._id} className='text-lg text-center'>
            <Link to={`/projects/${project._id}`}>
            <span className='py-2 font-bold'>{project.title}</span> 
            </Link>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default ProjectOrg
