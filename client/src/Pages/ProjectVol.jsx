import { useState, useEffect, useContext } from 'react';
import axios from '../axiosInstance';
import { Link, useParams } from 'react-router-dom';
import { AuthContextVol } from "../context/AuthVol";

const ProjectVol = () => {
    const { id } = useParams();
    const { volunteer} = useContext(AuthContextVol);
    const [projects, setProjects] = useState(null);

    // Function to fetch the list of Projects from the server
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`/api/volunteers/${id}/projects`);
            console.log("🚀 ~ file: ProjectOrg.jsx:18 ~ fetchProjects ~ response:", response);
            setProjects(response.data);
        } catch (error) {
            console.log("🚀 ~ file: projectsOrg.jsx:19 ~ fetchProjects ~ error:", error);
        }
    }

    // Fetch Projects when the component mounts
    useEffect(() => {
        fetchProjects();
    }, [id]);

    return (
        <div className='max-w-full m-auto px-4 py-12'>
            <h2 className='text-black font-bold text-3xl text-center mb-4'> List of My Projects </h2>
            {projects && projects.length > 0 ? (
                <ul>
                    {projects.map((project) => (
                        <li key={project._id} className='text-lg text-center'>
                            <Link to={`/projects/${project._id}`}>
                                <span className='py-2 font-bold'>{project.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-xl font-bold"> {volunteer.volunteername} you have not applied for any projects.</p>
            )}
        </div>
    )
}

export default ProjectVol;
