
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import BackgroundImage from "../assets/background.png";

const UpdateProfileVol = () => {
  const navigate = useNavigate();

  const [volunteer, setVolunteer] = useState({
    volunteername: "",
    email: "",
    skills: "",
    contactInfo: "",
    image: "",
    description: "",
  });

  const fetchVolunteer = async () => {
    try {
      const response = await axios.get(`/api/volunteers/profile`);
      console.log("response", response.data);
      setVolunteer(response.data);
    } catch (error) {
      console.log("Error fetching volunteer", error);
    }
  };

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const updateVolunteer = async () => {
    try {
      const { volunteername, email, skills, contactInfo, image, description } =
        volunteer;

      const formData = new FormData();
      formData.append("volunteer", volunteername);
      formData.append("skills", skills);
      formData.append("email", email);
      formData.append("contactInfo", contactInfo);
      formData.append("description", description);

      //formData.append('organizationId', organization?.organizationId);
      formData.append("image", image);

      const response = await axios.put(
        `/api/volunteers/profile/update`,
        formData
      );
      setVolunteer(response.data);
      navigate("/volunteers/dashboard/volunteer");
    } catch (error) {
      console.error("Error updating volunteer", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVolunteer();
  };

  // function to handle changes in the form input fields
  const handleChange = (e) => {
    if (e.target.name === "image") {
      // If the input is an image, set the selected image file
      setVolunteer({ ...volunteer, image: e.target.files[0] });
    } else {
      // If the input is not an image, update the state with the new value
      setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
    }
  };

  return (
    <div
      className="max-w-full mx-auto px-4 py-12 flex flex-col items-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-[#2A4434] font-bold py-12 text-4xl text-center">
        Please Update Your profile{" "}
      </h2>
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-[600px]"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="volunteername"
          className="block text-gray-600 font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="volunteername"
          defaultValue={volunteer?.volunteer?.volunteername || ""}
          onChange={handleChange}
        />

        <label
          htmlFor="skills"
          className="block text-gray-600 font-bold mb-2 mt-4"
        >
          Skills
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="skills"
          defaultValue={volunteer?.volunteer?.skills || ""}
          onChange={handleChange}
        />

        <label
          htmlFor="description"
          className="block text-gray-600 font-bold mb-2 mt-4"
        >
          About Me
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          defaultValue={volunteer?.volunteer?.description || ""}
          onChange={handleChange}
        />

        <label
          htmlFor="email"
          className="block text-gray-600 font-bold mb-2 mt-4"
        >
          Email
        </label>
        <input
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          defaultValue={volunteer?.volunteer?.email || ""}
          onChange={handleChange}
        />

        <label
          htmlFor="contactInfo"
          className="block text-gray-600 font-bold mb-2 mt-4"
        >
          Phone
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="contactInfo"
          defaultValue={volunteer?.volunteer?.contactInfo || ""}
          onChange={handleChange}
        />

        <label htmlFor="" className="block text-gray-600 font-bold mb-2 mt-4">
          Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#A9BE93] hover:bg-[#2A4434] text-white text-bold border-2 px-4 py-3 my-8 mx-auto flex items-center"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileVol;

