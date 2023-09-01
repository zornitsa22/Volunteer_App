import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo1 from "../assets/Logo1.png";

const Footer = () => {
  return (
    <footer className="bg-white font-montserrat mt-10 py-6">
      <div className="container mx-auto md:flex md:justify-between md:items-center">
        <div className="md:w-1/3 text-center md:text-left py-4 md:py-0 md:pl-8">
          <img
            src={Logo1}
            alt="Logo"
            className="mx-auto md:mx-0 mb-4 h-12 text-center"
          />
          <p className="text-sm">Berliner Str. 1, Berlin 1000, Germany</p>
          <p className="text-sm">Email: info@volplatform.com</p>
          <p className="text-sm">Phone: +49 123 456789</p>
        </div>
        <div className="md:w-1/3 text-center py-4 md:py-0">
          <FaFacebook
            className="text-gray-800 hover:text-gray-400 inline-block mx-2"
            size={28}
          />
          <FaInstagram
            className="text-gray-800 hover:text-gray-400 inline-block mx-2"
            size={28}
          />
          <FaLinkedin
            className="text-gray-800 hover:text-gray-400 inline-block mx-2"
            size={28}
          />
        </div>
        <div className="md:w-1/3 text-center md:text-right py-4 md:py-0 md:pr-8">
          <Link to="/about" className="text-gray-800 hover:text-gray-400 mx-2">
            About Us
          </Link>
          <Link to="/blog" className="text-gray-800 hover:text-gray-400 mx-2">
            Blog
          </Link>

          <Link
            to="/contact"
            className="text-gray-800 hover:text-gray-400 mx-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="text-center text-xs mt-4">
        <p className="mt-2">Thank you for being a part of our story.</p>
        <p>&copy; 2023 VOL</p>
        <p className="text-sm">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
