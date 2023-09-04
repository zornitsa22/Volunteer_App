import { useEffect, useContext, useState } from 'react';
import axios from '../axiosInstance';
import { AuthContextVol } from "../context/AuthVol";

const ProjectVol = () => {
    const { volunteer } = useContext(AuthContextVol);
    const [projects, setProjects] = useState([]); // Initialize as an empty array

    useEffect(() => {
        // Fetch the projects applied for by the volunteer
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`/api/volunteers/${volunteer._id}/projects`);
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects applied by volunteer:", error);
            }
        };

        if (volunteer) {
            fetchProjects(); // Fetch projects only when volunteer data is available
        }
    }, [volunteer]);

    return (
        <div className='max-w-full m-auto px-4 py-12'>
            <h2 className='text-black font-bold text-3xl text-center mb-4'> MyProjects </h2>
            {projects.length > 0 ? (
                <ul>
                    {projects.map((project) => (
                        <li key={project._id} className='text-lg text-center'>
                            <span className='py-2 font-bold'>{project.title}</span>
                            <p>Decision: {project.volunteers[0].decision}</p>
                            <p>Status: {project.volunteers[0].status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-xl font-bold"> {volunteer.volunteername} has not applied for any projects.</p>
            )}
        </div>
    );
};

export default ProjectVol;
