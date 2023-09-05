
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo1 from "../assets/Logo1.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white font-montserrat py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Contact Information */}
        <div className="md:w-1/3 text-center md:text-left py-4 md:py-0 md:pl-8">
          <img
            src={Logo1}
            alt="Logo"
            className="mx-auto md:mx-0 mb-4 h-12"
          />
          <p className="text-sm mb-2">Berliner Str. 1, Berlin 1000, Germany</p>
          <p className="text-sm mb-2">Email: info@volplatform.com</p>
          <p className="text-sm">Phone: +49 123 456789</p>
        </div>

        {/* Social Icons */}
        <div className="md:w-1/3 text-center py-4 md:py-0">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 inline-block mx-2"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 inline-block mx-2"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 inline-block mx-2"
          >
            <FaLinkedin size={28} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3 text-center md:text-right py-4 md:py-0 md:pr-8">
          <Link
            to="/about"
            className="text-gray-400 hover:text-gray-200 mx-2"
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className="text-gray-400 hover:text-gray-200 mx-2"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-gray-200 mx-2"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Copyright and Message */}
      <div className="text-center text-xs mt-6">
        <p>Thank you for being a part of our story.</p>
        <p>&copy; {new Date().getFullYear()} VOL</p>
        <p className="text-sm">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
