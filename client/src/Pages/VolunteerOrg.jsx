

/*
import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams } from 'react-router-dom';

const VolunteerOrg = () => {
    const { id } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchVol = async () => {
        try {
            const response = await axios.get(`/api/organizations/${id}/volunteers`);
            const fetchedVolunteers = response.data;
            console.log('check', response.data)
            setVolunteers(fetchedVolunteers);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching volunteers by organization', error);
            setError(error); 
            setLoading(false); 
        }
    };

    fetchVol();
    }, [id]);

    return (
    <div>
        <h2>List of Volunteers</h2>
        {loading ? (
        <p>Loading...</p>
        ) : error ? (
        <p>Error: {error.message}</p>
        ) : (
        <ul>
            {volunteers.map((volunteer) => (
            <li key={volunteer._id}>
                <p> {volunteer.volunteername}</p>
                <img src={volunteer.image} alt="imageVolunteer" />
                <ul>
                {volunteer.projects.map((project) => (
                    <li key={project._id}> Project: {project.title}</li>
                ))}
                </ul>
            </li>
            ))}
        </ul>
        )}
    </div>
    );
};

export default VolunteerOrg;*/

import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VolunteerOrg = () => {
    const { id } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetching the list of volunteers 
    useEffect(() => {
        const fetchVol = async () => {
            try {
                const response = await axios.get(`/api/organizations/${id}/volunteers`);
                const fetchedVolunteers = response.data;
                console.log('check', response.data);
                setVolunteers(fetchedVolunteers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching volunteers by organization', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchVol();
    }, [id]);

    // implementing the Project decision

    const handleDecision = async (volunteerId, projectId, decision) => {
        try {
            // Request to update the decision for the volunteer and project
            const response = await axios.put(`/api/organizations/${id}/projects/${projectId}/decision`, { decision });
            setVolunteers(response.data)
            
            // Update the UI to reflect the new decision
            setVolunteers((prevVolunteers) =>
                prevVolunteers.map((volunteer) => {
                    if (volunteer._id === volunteerId) {
                        // Update the decision for the specific project
                        const updatedProjects = volunteer.projects.map((project) => {
                            if (project._id === projectId) {
                                return { ...project, decision };
                            }
                            return project;
                        });
                        return { ...volunteer, projects: updatedProjects };
                    }
                    return volunteer;
                })
            );
        } catch (error) {
            console.error('Error updating decision:', error);
        }
    };

    return (
        <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
            <h2 className='text-orange-600 font-bold py-12 text-4xl text-center'>My Volunteers</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <ul>
                    {volunteers.map((volunteer) => (
                        <li key={volunteer._id}>
                            <p className='text-xl font-bold' >{volunteer.volunteername}</p>
                            <Link to={`/volunteer/${volunteer._id}`}>View Profile</Link>
                            <ul>
                                {volunteer.projects.map((project) => (
                                    <li key={project._id}>
                                        <p> Project:{project.title}</p>
                                        <p> Status: {volunteer.status}</p>
                                        <p> Decision Status: {project.decision}</p>
                                        {/* Dropdown menu for decision */}
                                        <select
                                            value={project.decision}
                                            onChange={(e) =>
                                                handleDecision(
                                                    volunteer._id,
                                                    project._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Denied">Denied</option>
                                        </select>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VolunteerOrg;

