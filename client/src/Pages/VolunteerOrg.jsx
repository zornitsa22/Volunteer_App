
/*import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams } from 'react-router-dom';

const VolunteerOrg = () => {
    const { id } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchVolunteers = async () => {
        try {
            const response = await axios.get(`/api/organizations/${id}/volunteers`);
            const fetchedVolunteers = response.data;
            setVolunteers(fetchedVolunteers);
            setLoading(false);
        } catch (error) {
        console.error('Error fetching volunteers by organization', error);
        setError(error);
        setLoading(false);
        }
    };

    fetchVolunteers();
    }, [id]);

    const handleDecision = async (volunteerId, projectId, decision) => {
    try {
      // Send a PUT request to update the decision
        await axios.put(`/api/volunteers/${volunteerId}/projects/${projectId}`, {
        decision, // 'Accepted' or 'Denied'
        });

      // Update the UI to reflect the new decision
        setVolunteers((prevVolunteers) => {
        return prevVolunteers.map((volunteer) => {
            if (volunteer._id === volunteerId) {
            const updatedProjects = volunteer.projects.map((project) => {
                if (project._id === projectId) {
                return {
                ...project,
                decision,
                };
              }
              return project;
            });

            return {
              ...volunteer,
              projects: updatedProjects,
            };
          }
          return volunteer;
        });
      });
    } catch (error) {
      console.error('Error updating decision:', error);
    }
  };

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
              <p>{volunteer.volunteername}</p>
              <img src={volunteer.image} alt="imageVolunteer" />
              <ul>
                {volunteer.projects.map((project) => (
                  <li key={project._id}>
                    <p>Project: {project.title}</p>
                    <p>Decision: {project.decision}</p>
                    {project.decision === 'Pending' && (
                      <div>
                        <button
                          onClick={() =>
                            handleDecision(
                              volunteer._id,
                              project._id,
                              'Accepted'
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleDecision(volunteer._id, project._id, 'Denied')
                          }
                        >
                          Deny
                        </button>
                      </div>
                    )}
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

export default VolunteerOrg;*/







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

export default VolunteerOrg;
