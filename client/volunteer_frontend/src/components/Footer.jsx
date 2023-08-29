import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white font-montserrat mt-10 py-6" style={{backgroundColor:"green"}}>
      <div className="container mx-auto md:flex md:justify-between md:items-center">
        <div className="text-center md:text-left py-4 md:py-0 md:pl-8">
          <p>&copy; 2023 VOL Volunteering Platform</p>
          <p>All rights reserved.</p>
        </div>
        <div className="text-center md:text-right py-4 md:py-0 md:pr-8">
          <Link to="/about" className="text-gray-800 hover:text-gray-400 mr-4">
            About Us
          </Link>
          <Link to="/blog" className="text-gray-800 hover:text-gray-400 mr-4">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-800 hover:text-gray-400">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
