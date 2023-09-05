import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import axios from "../axiosInstance";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FaMapMarkerAlt, FaTasks, FaCalendarAlt, FaHandsHelping, FaUser, FaTrash, FaEdit, FaEnvelope, FaBullseye, FaUsers } from "react-icons/fa";

import "leaflet/dist/leaflet.css";

// Create a custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

// Create a custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new L.divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};

const ProjectDetails = () => {
  const { volunteer } = useContext(AuthContextVol);
  const { organization } = useContext(AuthContextOrg);

  const isLoggedInVol = volunteer;
  const isLoggedInOrg = organization;

  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((e) => setError(e.response?.data?.message));
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/projects/${id}`);
      console.log(response.data);
      navigate("/projects");
    } catch (error) {
      console.error("Error Deleting Post", error);
    }
  };

  return (
    <div className="bg-blue-100 text-gray-800 min-h-screen">
      <div className="bg-gradient-to-b from-blue-400 via-pink-400 to-red-400 py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Explore and Volunteer <FaHandsHelping className="inline-block ml-2 text-3xl" />
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Join us in making a difference.
          </p>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {project && (
        <div className="max-w-screen-xl mx-auto px-4 py-12 relative">
          <img
            src={project.image}
            alt="image"
            className="w-full max-h-96 object-cover rounded-lg"
          />
          <h2 className="text-orange-600 font-bold pt-6 text-4xl text-center">
            {project.title}
          </h2>
          <p className="text-2xl font-bold py-4 text-center">
            {project.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold">
                <span className="text-orange-600 mr-2">
                  <FaTasks className="inline-block" />
                </span>
                Tasks:
                <span className="text-gray-700 ml-2">{project.tasks}</span>
              </p>
              <p className="text-lg font-semibold">
                <span className="text-orange-600 mr-2">
                  <FaMapMarkerAlt className="inline-block" />
                </span>
                Location:
                <span className="text-gray-700 ml-2">{project.location}</span>
              </p>
              <p className="text-lg font-semibold">
                <span className="text-orange-600 mr-2">
                  <FaCalendarAlt className="inline-block" />
                </span>
                When:
                <span className="text-gray-700 ml-2">{project.ocurrence}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                <span className="text-orange-600 mr-2">
                  <FaBullseye className="inline-block" />
                </span>
                Cause:
                <span className="text-gray-700 ml-2">{project.cause}</span>
              </p>
              <p className="text-lg font-semibold">
                <span className="text-orange-600 mr-2">
                  <FaUsers className="inline-block" />
                </span>
                Capacity:
                <span className="text-gray-700 ml-2">{project.capacity}</span>
              </p>
              <p className="text-lg font-semibold">
                <span className="text-orange-600 mr-2">
                  <FaEnvelope className="inline-block" />
                </span>
                Contact:
                <span className="text-gray-700 ml-2">
                  {project.contactEmail}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-center py-6">
            <div className="w-full md:w-2/3">
              <MapContainer
                center={[project.latitude, project.longitude]}
                zoom={5}
                style={{ height: "400px", width: "100%", borderRadius: "1rem" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                  chunkedLoading
                  iconCreateFunction={createClusterCustomIcon}
                >
                  <Marker
                    position={[project.latitude, project.longitude]}
                    icon={customIcon}
                  ></Marker>
                </MarkerClusterGroup>
              </MapContainer>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {isLoggedInVol && (
              <Link
                to={`/projects/${id}/apply`}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded"
              >
                Apply
              </Link>
            )}
            {isLoggedInOrg && (
              <>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded"
                >
                  Delete <FaTrash className="inline-block ml-2" />
                </button>
                <Link
                  to={`/projects/${id}/update`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg py-2 px-4 rounded"
                >
                  Update <FaEdit className="inline-block ml-2" />
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
