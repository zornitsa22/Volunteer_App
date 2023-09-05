import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useParams, Link } from "react-router-dom";

const VolunteerOrg = () => {
  const { id } = useParams();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the list of volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`/api/organizations/${id}/volunteers`);
        const fetchedVolunteers = response.data;
        setVolunteers(fetchedVolunteers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching volunteers by organization", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [id]);

  return (
    <div className="container mx-auto py-12">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center">Error: {error.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Profile
                </th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr
                  key={volunteer._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {volunteer.volunteername}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <img
                      src={volunteer.image}
                      alt="Volunteer Image"
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {volunteer.projects.map((project) => (
                      <div key={project._id}>
                        <p className="text-gray-900">{project.title}</p>
                      </div>
                    ))}
                  </td>
                  {/* move perticular volunteer profile page */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/volunteers/${volunteer._id}`}
                      className="text-green-800 hover:underline"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VolunteerOrg;
