import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo2 from "../assets/Logo2.png";
import backgroundImage from "../assets/FooterBg.png";
import namePic from "../assets/nameVol.png";

const Footer = () => {
  return (
    <div
      className="bg-cover bg-bottom bg-no-repeat bg-opacity-50 py-16"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "300px",
      }}
    >
      <footer className="bg-white font-montserrat mt-10 py-6 border-t border-gray-300">
        <div className="container mx-auto md:flex md:justify-between md:items-center">
          <div className="md:w-1/3 text-center md:text-left py-4 md:py-0 md:pl-8">
            <div className="flex items-center ">
              <img
                src={Logo2}
                alt="Logo"
                className="mx-auto md:mx-3 mb-4 h-12 text-center"
              />
              <img
                src={namePic}
                alt="Name"
                className="mx-auto md:mx-3 mb-4 h-12 text-center"
                style={{ height: "auto", width: "75px", marginLeft: "10px" }}
              />
            </div>

            <p className="text-sm">Berliner Str. 1, Berlin 1000, Germany</p>
            <p className="text-sm">Email: info@volplatform.com</p>
            <p className="text-sm">Phone: +49 123 456789</p>
          </div>
          <div className="md:w-1/3 text-center py-4 md:py-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-400 inline-block mx-2"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-400 inline-block mx-2"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-400 inline-block mx-2"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
          <div className="md:w-1/3 text-center md:text-right py-4 md:py-0 md:pr-8">
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-400 mx-2"
            >
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
    </div>
  );
};

export default Footer;
