import { useState, useEffect } from "react";
import axios from '../axiosInstance';
import { Link, useParams } from 'react-router-dom';

const DashboardOrg = () => {
    const { id } = useParams();
    const [projects, setProjects] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [projectVolunteers, setProjectVolunteers] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
    const [projectDecision, setProjectDecision] = useState("Pending");
    const [volunteerDecision, setVolunteerDecision] = useState("Pending");
    const [volunteerStatus, setVolunteerStatus] = useState("Applied");

    // Function to fetch the list of Projects from the server
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`/api/organizations/${id}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.log("Error fetching projects:", error);
        }
    }

    // Function to fetch the organization profile
    const fetchOrganizationProfile = async () => {
        try {
            const response = await axios.get(`/api/organizations/profile`);
            setOrganization(response.data);
        } catch (error) {
            console.log("Error fetching organization profile:", error);
        }
    }

    // Function to fetch the list of volunteers for a specific project
    const fetchVolunteersForProject = async () => {
        try {
            const response = await axios.get(`/api/projects/${id}/volunteers`);
            setProjectVolunteers(response.data);
        } catch (error) {
            console.log("Error fetching project volunteers:", error);
        }
    }

    // Function to handle selecting a project
    const handleProjectSelect = (projectId) => {
        setSelectedProjectId(projectId);
        setSelectedVolunteerId(null); // Reset selected volunteer when changing projects
        setVolunteerDecision("Pending");
        setVolunteerStatus("Applied");
    }

    // Function to update the decision for a specific project
    const handleUpdateProjectDecision = async () => {
        try {
            const response = await axios.post(`/api/projects/${selectedProjectId}/decision`, { decision: projectDecision });
            console.log("Project decision updated:", response);
            // Optionally, update the UI to reflect the updated decision
        } catch (error) {
            console.log("Error updating project decision:", error);
        }
    }

    // Function to update the decision and status for a specific volunteer within the project
    const handleUpdateVolunteer = async () => {
        try {
            const response = await axios.post(`/api/volunteers/${selectedVolunteerId}`, {
                decision: volunteerDecision,
                status: volunteerStatus,
            });
            console.log("Volunteer decision and status updated:", response);
            // Optionally, update the UI to reflect the updated decision and status
        } catch (error) {
            console.log("Error updating volunteer decision and status:", error);
        }
    }

    useEffect(() => {
        fetchProjects();
        fetchOrganizationProfile();
        fetchVolunteersForProject();
    }, []);

    return (
        <div className='max-w-full m-auto px-4 py-12'>
            <h2 className='text-black font-bold text-3xl text-center mb-4'>Dashboard</h2>
            <div>
                  {/* Organization Profile */}
                    <h3 className="text-3xl">MyProfile</h3>
                    {organization && (
                    <div>
                        <img src={organization.organization.image}
                        alt="image"
                        className="h-[150px]"
                        />
                        <p>Name: {organization.organization.organizationName}</p>
                        <p>Email: {organization.organization.email}</p>
                        <p>About Us: {organization.organization.description}</p>
                        <p>Contact Person: {organization.organization.contactInfo}</p>
                    </div>
                    )}
            </div> 
            

            {/* List of Projects */}
            <div>
                <h3 className="text-3xl">My Projects</h3>
                    <ul>
                        {projects && projects.map((project) => (
                            <li key={project._id}>
                                <Link to={`/projects/${project._id}`}>
                                    <span className='py-2 ' onClick={() => handleProjectSelect(project._id)}>{project.title}</span>
                                </Link>
                        
                                  {/* Decision Update Form for Projects */}
                                    {selectedProjectId === project._id && (
                                    <div>
                                        <label>Update Project Decision:</label>
                                        <select onChange={(e) => setProjectDecision(e.target.value)} value={projectDecision}>
                                              <option value="Pending">Pending</option>
                                              <option value="Accepted">Accepted</option>
                                              <option value="Denied">Denied</option>
                                        </select>
                                        <button onClick={handleUpdateProjectDecision}>Update</button>
                                  </div>
                                  )}
                            </li>
                            ))}
                    </ul>
            </div>
            

            {/* List of Volunteers for Selected Project */}
            {selectedProjectId && projectVolunteers && (
                <div>
                    <h3>List of Volunteers for Selected Project</h3>
                    <ul>
                        {projectVolunteers.map((volunteer) => (
                            <li key={volunteer._id}>
                                {/* Display volunteer information here */}
                                <div>
                                    <label>Update Volunteer Decision:</label>
                                    <select onChange={(e) => setVolunteerDecision(e.target.value)} value={volunteerDecision}>
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Denied">Denied</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Update Volunteer Status:</label>
                                    <select onChange={(e) => setVolunteerStatus(e.target.value)} value={volunteerStatus}>
                                        <option value="Applied">Applied</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Denied">Denied</option>
                                    </select>
                                </div>
                                <button onClick={handleUpdateVolunteer}>Update</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DashboardOrg;
