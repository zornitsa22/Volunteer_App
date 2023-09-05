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
            <h2 className="text-4xl font-semibold mb-4 text-gray-800">
              Our Story
            </h2>
            <p className="text-lg mb-6 leading-relaxed text-gray-600">
              At VOL, we are driven by a simple yet powerful belief: that the
              collective efforts of passionate individuals can transform lives
              and inspire a brighter future. Our journey began as a vision to
              connect people with opportunities to make a positive impact on
              society.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Our Mission
            </h3>
            <p className="text-lg mb-6 leading-relaxed text-gray-600">
              Our mission is to create a thriving community of volunteers,
              dedicated to creating positive change in the world. We believe
              that volunteering is more than just an activity – it's a profound
              way to contribute to society, connect with diverse communities,
              and grow as individuals. Our platform serves as a bridge, linking
              those who want to give back with organizations and causes that
              align with their values and skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
