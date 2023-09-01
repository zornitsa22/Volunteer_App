import TeamPic from "../assets/TeamPic.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <img
              src={TeamPic}
              alt="Team"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-lg mb-6">
              Welcome to VOL, a thriving community-driven volunteering platform
              dedicated to creating positive change in the world. Our journey
              began with a simple yet powerful belief: that the collective
              efforts of passionate individuals can transform lives and inspire
              a brighter future.
            </p>
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-lg mb-6">
              At VOL, our mission is to connect individuals who are eager to
              make a difference with meaningful volunteering opportunities. We
              believe that volunteering is more than just an activity – it's a
              profound way to contribute to society, connect with diverse
              communities, and grow as individuals. Our platform serves as a
              bridge, linking those who want to give back with organizations and
              causes that align with their values and skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
