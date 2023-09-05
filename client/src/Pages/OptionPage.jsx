import patrick from "../assets/patrick.png";
import cars from "../assets/cars.png";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import backgroundImage from "../assets/OptionPageBg.png";
import volunteerImage from "../assets/volunteerLogIn.png";
import organizationImage from "../assets/organizationLogIn.png";

const OptionPage = () => {
  //accessing context values from AuthContextVol and AuthContextOrg
  const { volunteer, loading: volLoading } = useContext(AuthContextVol);
  const { organization, loading: orgLoading } = useContext(AuthContextOrg);
  // Determine if a user is logged in by checking either volunteer or organization
  const isLoggedIn = volunteer || organization;

  // // Combining loading states from both contexts
  const isLoading = volLoading || orgLoading;
  if (!isLoading && isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div
      className="max-w-full mx-auto px-4 py-12 flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <div className="max-w-[1000px] mx-auto px-4 py-12  flex flex-col justify-center w-full h-full">
          <h1 className="px-4 text-4xl Sm:text-2xl text-center font-bold">
            {" "}
            Welcome to the Volunteer & Organization Portal
          </h1>
          <h2 className="font-bold text-2xl text-center py-2 mb-8">
            Register or Log in to Get Involved!
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div
              style={{ backgroundImage: `url(${volunteerImage})` }}
              className="shadow-lg shadow-[#040c16] bg-black-80 group container rounded-md flex justify-center items-center mx-auto content-div"
            >
              {/**Hover effects */}
              <div className="opacity-0 group-hover:opacity-100 ">
                <div className="pt-8 text-center">
                  <a href="/register/volunteer">
                    <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#A9BE93] hover:bg-[#2A4434] text-white font-bold text-lg">
                      Register
                    </button>
                  </a>
                  <a href="/login/volunteer">
                    <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#A9BE93] hover:bg-[#2A4434] text-white marker:font-bold text-lg">
                      Login
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: `url(${organizationImage})` }}
              className="shadow-lg shadow-[#040c16] bg-black/80 group container rounded-md flex justify-center items-center mx-auto content-div"
            >
              {/**Hover effects */}
              <div className="opacity-0 group-hover:opacity-100 ">
                <div className="pt-8 text-center">
                  <a href="/register/organization">
                    <button className="text-center text-white rounded-lg px-4 py-3 m-2 bg-[#A9BE93] hover:bg-[#2A4434] text-gray-700 font-bold text-lg">
                      Register
                    </button>
                  </a>
                  <a href="/login/organization">
                    <button className="text-center  text-white rounded-lg px-4 py-3 m-2 bg-[#A9BE93] hover:bg-[#2A4434] selection: text-gray-700 font-bold text-lg">
                      Login
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPage;
