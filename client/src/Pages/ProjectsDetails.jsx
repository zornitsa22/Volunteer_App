import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "../axiosInstance";

const ProjectDetails = () => {

  const { volunteer } = useContext(AuthContextVol);  
  const { organization} = useContext(AuthContextOrg);

  const isLoggedInVol = volunteer; 
  const isLoggedInOrg = organization;

  const navigate = useNavigate()
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null); // project object from backend

  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((e) => setError(e.response?.data?.message));
  }, [id]);

  // Function to handle a project deletion
const handleDelete = async () => {
  try {
    const response = await axios.delete (`/api/projects/${id}`)
    console.log(response.data)
    navigate('/projects')
  }catch (error) {
  console.error('Error Deleting Post', error)
  }
};

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {project && (
        <div className='max-w-full mx-auto px-4 py-12 flex flex-col items-center'>
          <img src={project.image} alt="image" style={{ height: "450px"}} />
          <h2 className='text-orange-600 font-bold py-6 text-4xl text-center'> {project.title} </h2>
          <p className="text-2xl font-bold"> {project.description}</p>
          <p>Tasks: {project.tasks}</p>
          <p>Location: {project.location}</p>
          <p>When: {project.ocurrence}</p>
          <p>Cause: {project.cause}</p>
          <p>Capacity: {project.capacity}</p>
          <p>Contact: {project.contactEmail}</p>
          <p>Skills: {project.skills}</p>
          <div className='flex items-center gap-6 py-6'>

          <div className='flex gap-6 justify-center items-center' style={{ width: "100%", height: "200px" }}>
            <MapContainer
                center={[project.latitude, project.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                >
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                <Marker position={[project.latitude, project.longitude]}>
                  <Popup>
                    {project.location}
                  </Popup>
                </Marker>
            </MapContainer>
          </div>
          

          {/* Render the Apply button for logged-in volunteers */}
          {isLoggedInVol && (
            <Link
              to={`/projects/${id}/apply`}
              className='text-green-500 hover:text-lime-200 flex flex-col border-2 items-center font-bold py-2 px-4 rounded'
            >
              Apply
            </Link>
          )}
          
          {/* Render the Delete and Update buttons for logged-in organizations */}
          {isLoggedInOrg && (
            <>
              <button
                className='text-yellow-700 hover:text-red-600 border-2 flex items-center flex-col font-bold py-2 px-4 rounded'
                onClick={handleDelete}
              >
                Delete
              </button>
              
              <Link
                to={`/projects/${id}/update`}
                className='text-green-500 hover:text-lime-200 border-2 flex flex-col items-center font-bold py-2 px-4 rounded'
              >
                Update
              </Link>
            </>
          )}
        </div>
      </div>
    )}
  </div>
);
};

export default ProjectDetails;
