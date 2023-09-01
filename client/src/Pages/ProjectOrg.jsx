import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link, useParams } from 'react-router-dom';
import { GrLocation} from "react-icons/gr";



const ProjectOrg = () => {
    const { id } = useParams();
    console.log("Component id:", id); 
    const [projects, setProjects] = useState(null);

    // Function to fetch the list of Posts from the server
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-6 pt-4">
        { projects && projects.map((project) => (
          <div key={project._id} className='text-lg text-center border-2 rounded-md '>
            <Link to={`/projects/${project._id}`}>
            <img src={project.image} alt="image" className="shadow-lg shadow-[#040c16] bg-black-80 group container rounded-md flex justify-center items-center mx-auto content-div" /> 
            <p className='py-2 font-bold'>{project.title}</p>
            <p className='flex justify-center text-orange-600 text-lg'> <GrLocation size={25}/> {project.location}</p>
            </Link>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default ProjectOrg
