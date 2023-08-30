import { Link } from "react-router-dom";
import Logo from "../Logo.png";
import { AuthContextOrg } from "../context/AuthOrg";
import { AuthContextVol } from "../context/AuthVol";
import { useContext,useEffect } from "react";

const Header = () => {
    //accessing context values from AuthContextVol and AuthContextOrg
    const { volunteer, logout,  loading: volLoading } = useContext(AuthContextVol);  
    const { organization, Logout,  loading: orgLoading } = useContext(AuthContextOrg);
  
    const handleLogout = () => {
      if (volunteer) {
          logout(); 
      } else if (organization) {
          Logout(); 
      }
  };
    // Determine if a user is logged in by checking either volunteer or organization
     const isLoggedIn = volunteer || organization;
  
    // // Combining loading states from both contexts
     const isLoading = volLoading || orgLoading;
     useEffect(() => {
     }, [isLoading,isLoggedIn])
  return (
    <header className="bg-white border-b border-gray-300">
      <div className="flex items-center justify-between py-4 px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-gray-800">
            <img src={Logo} alt="Logo" className="h-10 w-10 mr-3" />
            <p className="text-xl font-bold font-montserrat">VOL</p>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/home"  className="text-gray-800 hover:text-gray-400 mr-4">
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
                to="/projects"
                className="text-gray-800 hover:text-gray-400 mr-4"
              >
                Projects
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
            {
              !isLoading  && isLoggedIn ?  (
              <li> 
                <p>{volunteer?.volunteername || organization?.organizationName} </p> 
                <button onClick={handleLogout}>Logout</button></li>

              ):(<li>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-gray-400 mr-4"
                >
                  Log In
                </Link>
              </li>)
            }
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
