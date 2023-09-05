import axios from "../axiosInstance";
import { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

const ProfileVol = () => {
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/volunteers/profile`)
      .then((res) => setVolunteer(res.data))
      .catch((e) => console.log(e.response?.data?.message));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mx-auto w-96 mt-8 sm:w-full sm:max-w-md">
      {volunteer && (
        <div>
          <p className="text-4xl font-semibold text-center text-[#2A4434] mb-4">
            {volunteer.volunteer.volunteername}
          </p>

          <div className="flex justify-center">
            <img
              src={volunteer.volunteer.image}
              alt="Profile Image"
              className="w-40 h-40 rounded-full border-4 border-[#A9BE93] object-cover"
            />
          </div>

          <div className="mt-4">
            <p className="">
              <MdEmail className="inline text-gray-500 mr-2" />{" "}
              <span className="font-semibold"> Email:</span>
              <span className=" text-gray-700 ml-2">
                {volunteer.volunteer.email}
              </span>
            </p>
            <p className=" mt-4 ">
              <FaPhone className="inline text-gray-500 mr-2" />{" "}
              <span className="font-semibold"> Phone:</span>
              <span className=" text-gray-700 ml-2">
                {volunteer.volunteer.contactInfo}
              </span>
            </p>

            <p className=" mt-4 ">
              <FaTools className="inline text-gray-500 mr-2" />{" "}
              <span className="font-semibold"> Skills:</span>
              <span className=" text-gray-700 ml-2">
                {volunteer.volunteer.skills}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold"> About Me:</p>
            <p className="mt-2 text-gray-700">
              {volunteer.volunteer.description}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/volunteers/profile/update"
              className="bg-[#A9BE93] text-white px-4 py-2 rounded hover:bg-[#2A4434] focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Update Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileVol;
