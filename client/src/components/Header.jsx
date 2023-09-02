import { Link } from "react-router-dom";
import Logo1 from "../assets/Logo1.png";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  //accessing context values from AuthContextVol and AuthContextOrg
  const { volunteer, logout, loading: volLoading } = useContext(AuthContextVol);
  const {
    organization,
    Logout,
    loading: orgLoading,
  } = useContext(AuthContextOrg);

  const handleLogout = () => {
    if (volunteer) {
      logout();
    } else if (organization) {
      Logout();
    }
  };
  // Determine if a user is logged in by checking either volunteer or organization
  const isLoggedIn = volunteer || organization;
  const isLoggedInOrg = organization 

  // // Combining loading states from both contexts
  const isLoading = volLoading || orgLoading;
  useEffect(() => {}, [isLoading, isLoggedIn]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <header className="bg-white border-b border-gray-300">
      <div className="flex items-center justify-between py-4 px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-gray-800">
            <img src={Logo1} alt="Logo" className="h-12 w-12 mr-3" />
            <p className="text-xl font-bold font-montserrat">VOL</p>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/home"
                className="text-gray-800 hover:text-gray-400 mr-4"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/causes"
                className="text-gray-800 hover:text-gray-400 mr-4"
              >
                Causes
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-gray-400 mr-4"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-gray-400 mr-4"
              >
                Contact Us
              </Link>
            </li>


            {!isLoading && isLoggedIn ? (
              <li>
              <img src={volunteer?.image || organization?.image} alt="image" />
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-gray-400 mr-4"
                  >
                    Log In
                  </Link>
                </li>
              </>
            )}
            <li>

              {/**toggleDropdown Button */}

              {!isLoggedIn ? (
              <button
                className="text-gray-800 hover:text-gray-400 focus:outline-none"
              >
                <FaUser size={24} />
              </button>
              ):(
                <button
                onClick={toggleDropdown}
                className="text-orange-400 font-bold"
              >
                {volunteer?.volunteername || organization?.organizationName}
              </button>

              )}

               {/**toggleDropdown function */}

              {showDropdown && (
                <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-md z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to={volunteer ? ("/dashboard/volunteer") : ("/organizations/dashboard/organization")}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={volunteer ? ("/profile/volunteer") : ("/organizations/profile/organization")}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My ProfileS
                      </Link>
                    </li>
                      
                    <li>
                      <Link
                        to={volunteer ? ("/projects") : ("/projects/new")}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Projects
                      </Link>
                    </li>

                    <li>
                      {isLoggedInOrg && (
                      <Link
                        to={"/projects/id:/update"}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Update Project
                      </Link>
                      )}
                    </li>

                    <li>
                      <Link
                        to={volunteer ? ("/volunteers/id:/projects") : ("/organizations/id:/projects")
                        }
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Projects
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/"
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
