import { Link } from "react-router-dom";
import Logo1 from "../assets/Logo1.png";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaHome, FaHandHoldingHeart, FaInfoCircle, FaPhone } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { HiMenuAlt1 } from "react-icons/hi";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { volunteer, logout, loading: volLoading } = useContext(AuthContextVol);
  const { organization, Logout, loading: orgLoading } = useContext(
    AuthContextOrg
  );

  const handleLogout = () => {
    if (volunteer) {
      logout();
    } else if (organization) {
      Logout();
    }
  };

  const isLoggedIn = volunteer || organization;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuIconSize = 28;

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="flex items-center justify-between py-4 px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-gray-800">
            <img src={Logo1} alt="Logo" className="h-12 w-12 mr-3" />
            <p className="text-xl font-bold font-montserrat">VOL</p>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 hover:text-gray-400 focus:outline-none"
          >
            <HiMenuAlt1 size={menuIconSize} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/home"
                className="text-gray-800 hover:text-gray-400 mr-4 flex items-center"
              >
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/causes"
                className="text-gray-800 hover:text-gray-400 mr-4 flex items-center"
              >
                <FaHandHoldingHeart className="mr-2" /> Causes
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-gray-400 mr-4 flex items-center"
              >
                <FaInfoCircle className="mr-2" /> About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-gray-400 mr-4 flex items-center"
              >
                <FaPhone className="mr-2" /> Contact Us
              </Link>
            </li>

            {!isLoggedIn && (
              <li>
                <Link to="/login" className="text-gray-800 hover:text-gray-400 mr-4 flex items-center">
                  <FaUser className="mr-2" /> Log In
                </Link>
              </li>
            )}
            <li>
              {/* Toggle Dropdown */}
              {!isLoggedIn ? (
                <button className="text-gray-800 hover:text-gray-400 focus:outline-none">
                  <FaUser size={menuIconSize} />
                </button>
              ) : (
                <button onClick={toggleDropdown} className="text-orange-400 font-bold">
                  {volunteer?.volunteername || organization?.organizationName}
                </button>
              )}

              {showDropdown && (
                <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-md z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to={volunteer ? "/dashboard/volunteer" : "/organizations/dashboard/organization"}
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <FaUser className="mr-2" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <MdExitToApp className="mr-2" /> Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-md">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/home"
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/causes"
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaHandHoldingHeart className="mr-2" /> Causes
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaInfoCircle className="mr-2" /> About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaPhone className="mr-2" /> Contact Us
                </Link>
              </li>

              {!isLoggedIn && (
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <FaUser className="mr-2" /> Log In
                  </Link>
                </li>
              )}
              <li>
                {/* Toggle Dropdown */}
                {!isLoggedIn ? (
                  <button className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                    <FaUser className="mr-2" />
                    Sign In
                  </button>
                ) : (
                  <button onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                    {volunteer?.volunteername || organization?.organizationName}
                  </button>
                )}

                {showDropdown && (
                  <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-md z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to={volunteer ? "/dashboard/volunteer" : "/organizations/dashboard/organization"}
                          className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                          <FaUser className="mr-2" /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          onClick={handleLogout}
                          className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                          <MdExitToApp className="mr-2" /> Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
