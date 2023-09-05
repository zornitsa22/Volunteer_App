import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import axios from "../axiosInstance";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  FaMapMarkerAlt,
  FaTasks,
  FaCalendarAlt,
  FaHandsHelping,
  FaUser,
  FaTrash,
  FaEdit,
  FaEnvelope,
  FaBullseye,
  FaUsers,
} from "react-icons/fa";
import HeroPicture from "../assets/projectsdetailsHero.png";
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
    <div className="bg-white text-gray-800 min-h-screen">
      <div
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: `url(${HeroPicture})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Explore and Volunteer
          </h1>
          <p className="text-white mt-4 text-lg md:text-2xl">
            Join us in making a difference.
          </p>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {project && (
        <div className="max-w-screen-xl mx-auto px-4 py-12">
          <div className="text-center md:text-left">
            <h2 className="text-[#2A4434] text-center font-bold text-4xl">
              {project.title}
            </h2>
            <p className="text-2xl font-bold py-2">{project.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <img
                src={project.image}
                alt="Project"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaTasks className="text-[#2A4434] text-xl inline-block mr-2 w-8 h-8" />
                  <p className="text-lg font-semibold">
                    Tasks:{" "}
                    <span className="text-gray-700">{project.tasks}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-[#2A4434] text-xl inline-block mr-2" />
                  <p className="text-lg font-semibold">
                    Location:{" "}
                    <span className="text-gray-700">{project.location}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-[#2A4434] text-xl inline-block mr-2" />
                  <p className="text-lg font-semibold">
                    When:{" "}
                    <span className="text-gray-700">{project.ocurrence}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <FaBullseye className="text-[#2A4434] text-xl inline-block mr-2" />
                  <p className="text-lg font-semibold">
                    Cause:{" "}
                    <span className="text-gray-700">{project.cause}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-[#2A4434] text-xl inline-block mr-2" />
                  <p className="text-lg font-semibold">
                    Capacity:{" "}
                    <span className="text-gray-700">{project.capacity}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-[#2A4434] text-xl inline-block mr-2" />
                  <p className="text-lg font-semibold">
                    Contact:{" "}
                    <span className="text-gray-700">
                      {project.contactEmail}
                    </span>
                  </p>
                </div>
              </div>
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
                className="bg-[#A9BE93] hover:bg-[#2A4434] text-white font-semibold text-lg py-2 px-4 rounded"
              >
                Apply
              </Link>
            )}
            {isLoggedInOrg && (
              <>
                <button
                  onClick={handleDelete}
                  className="bg-red-700 hover:bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded"
                >
                  Delete <FaTrash className="inline-block ml-2" />
                </button>
                <Link
                  to={`/projects/${id}/update`}
                  className="bg-[#A9BE93] hover:bg-[#2A4434] text-white font-semibold text-lg py-2 px-4 rounded"
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
