import axios from '../axiosInstance';
import { useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md'; // Import the email icon
import { FaUser } from 'react-icons/fa'; // Import a user/contact icon

const ProfileOrg = () => {
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/organizations/profile`)
      .then(res => setOrganization(res.data))
      .catch(e => console.log(e.response?.data?.message));
  }, []);

  const handleUpdateProfileClick = () => {
    // Handle the logic for updating the organization's profile here
    // You can navigate to an update profile page or show a modal for updating
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mx-auto w-96 mt-8 sm:w-full sm:max-w-md">
      

      {organization && (
        <div>
          <p className="text-2xl text-orange-500 font-semibold text-center mb-4">{organization.organization.organizationName}</p>
          <div className="flex justify-center">
            <img
              src={organization.organization.image}
              alt="Organization Image"
              className="w-40 h-40 rounded-full border-4 border-blue-500"
            />
          </div>

          <div className="mt-4">
            <p className="mt-4">
              <MdEmail className="inline text-gray-500 mr-2" /> <span className='font-semibold'>Email:</span> {organization.organization.email}
            </p>
            <p className="mt-4">
              <FaUser className="inline text-gray-500 mr-2" /> <span className='font-semibold'>Contact Person:</span> {organization.organization.contactInfo}
            </p>
            <p className="text-lg mt-4 font-semibold">Description:</p>
            <p className="mt-2 text-gray-700">{organization.organization.description}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpdateProfileClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOrg;
