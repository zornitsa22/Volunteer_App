import { Link } from "react-router-dom";
import Logo from "../Logo.png";

const Header = () => {
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
              <Link to="/" className="text-gray-800 hover:text-gray-400 mr-4">
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
            <li>
              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-400 mr-4"
              >
                Log In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
