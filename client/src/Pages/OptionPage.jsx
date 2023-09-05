import patrick from "../assets/patrick.png";
import cars from "../assets/cars.png";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const OptionPage = () => {
  // Accessing context values from AuthContextVol and AuthContextOrg
  const { volunteer, loading: volLoading } = useContext(AuthContextVol);
  const { organization, loading: orgLoading } = useContext(AuthContextOrg);
  // Determine if a user is logged in by checking either volunteer or organization
  const isLoggedIn = volunteer || organization;

  // Combining loading states from both contexts
  const isLoading = volLoading || orgLoading;

  if (!isLoading && isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <h1 className="text-4xl sm:text-2xl text-center font-bold">
          Welcome to the Volunteer & Organization Portal
        </h1>
        <h2 className="font-bold text-2xl text-center py-2 mb-8">
          Register & Log in to Get Involved!
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div
            style={{ backgroundImage: `url(${patrick})` }}
            className="relative bg-black bg-opacity-80 group container rounded-md flex justify-center items-center mx-auto content-div overflow-hidden hover:opacity-90 transition-opacity duration-300"
          >
            {/**Hover effects */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
              <a href="/register/volunteer">
                <button className="rounded-lg px-4 py-3 m-2 bg-blue-500 hover:bg-pink-600 text-white font-bold text-lg">
                  Register
                </button>
              </a>
              <a href="/login/volunteer">
                <button className="rounded-lg px-4 py-3 m-2 bg-green-300 hover:bg-pink-600 text-white font-bold text-lg">
                  Login
                </button>
              </a>
            </div>
          </div>

          <div
            style={{ backgroundImage: `url(${cars})` }}
            className="relative bg-black bg-opacity-80 group container rounded-md flex justify-center items-center mx-auto content-div overflow-hidden hover:opacity-90 transition-opacity duration-300"
          >
            {/**Hover effects */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
              <a href="/register/organization">
                <button className="rounded-lg px-4 py-3 m-2 bg-white hover:bg-pink-600 text-gray-700 font-bold text-lg">
                  Register
                </button>
              </a>
              <a href="/login/organization">
                <button className="rounded-lg px-4 py-3 m-2 bg-white hover:bg-pink-600 text-gray-700 font-bold text-lg">
                  Login
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPage;
