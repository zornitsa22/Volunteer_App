import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { MdEmail } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";

const VolProfileFromList = () => {
  const [volunteer, setVolunteer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/volunteers/${id}`)
      .then((res) => setVolunteer(res.data))
      .catch((e) => console.log(e.response?.data?.message));
  }, [id]);

  return (
    <div className="bg-[#D3E7CB] shadow-md rounded-lg p-4 mx-auto w-96 mt-8 sm:w-full sm:max-w-md">
      {volunteer && (
        <div>
          <p className="text-4xl font-semibold text-center text-black mb-4">
            {volunteer.volunteername}
          </p>

          <div className="flex justify-center">
            <img
              src={volunteer.image}
              alt="Profile Image"
              className="w-40 h-40 rounded-full border-4 border-[#A9BE93] object-cover"
            />
          </div>

          <div className="mt-4">
            <p className="">
              <MdContactPhone className="inline text-gray-500 mr-2" />{" "}
              <span className="font-semibold"> Contact:</span>
              <span className=" text-gray-700 ml-2">
                {volunteer.contactInfo}
              </span>
            </p>
            <p className="">
              <MdEmail className="inline text-gray-500 mr-2" />{" "}
              <span className="font-semibold"> Email:</span>
              <span className=" text-gray-700 ml-2">{volunteer.email}</span>
            </p>
            <p className=" mt-4 ">
              <FaTools className="inline text-gray-500 mr-2" />{" "}
              <span className="font-semibold"> Skills:</span>
              <span className=" text-gray-700 ml-2">{volunteer.skills}</span>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold"> About Me:</p>
            <p className="mt-2 text-gray-700">{volunteer.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolProfileFromList;
