import TeamPic from "../assets/TeamPic.jpg";
import PatrickImage from "../assets/patrickImage.jpeg";
import RashmiImage from "../assets/rashmi1.jpg";
import SheltonImage from "../assets/sheltonImage.jpeg";
import ZornitsaImage from "../assets/zori.jpeg";
import BackgroundImage from "../assets/background.png";

const AboutUs = () => {
  return (
    <div
      className="max-w-full mx-auto px-4 py-12 flex flex-col items-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
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
                that volunteering is more than just an activity – it's a
                profound way to contribute to society, connect with diverse
                communities, and grow as individuals. Our platform serves as a
                bridge, linking those who want to give back with organizations
                and causes that align with their values and skills.
              </p>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 text-center lg:text-left">
                Our Team
              </h1>
              <p className="text-lg mb-6 leading-relaxed text-gray-600 text-center lg:text-left">
                Meet the people behind VOL who are united by a passion for
                helping the most vulnerable. Our team is dedicated to creating
                meaningful connections.
              </p>
            </div>
            <div className="w-full lg:w-8/12 lg:pt-8">
              <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                {/* Update image sizes for small screens */}
                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  <img
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full"
                    src={PatrickImage}
                    alt="Patrick"
                  />
                  <p className="font-medium text-lg md:text-xl leading-5 text-gray-800 mt-4">
                    Patrick
                  </p>
                </div>
                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  <img
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full"
                    src={RashmiImage}
                    alt="Rashmi"
                  />
                  <p className="font-medium text-lg md:text-xl leading-5 text-gray-800 mt-4">
                    Rashmi
                  </p>
                </div>
                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  <img
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full"
                    src={SheltonImage}
                    alt="Shelton"
                  />
                  <p className="font-medium text-lg md:text-xl leading-5 text-gray-800 mt-4">
                    Shelton
                  </p>
                </div>
                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  <img
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full"
                    src={ZornitsaImage}
                    alt="Zornitsa"
                  />
                  <p className="font-medium text-lg md:text-xl leading-5 text-gray-800 mt-4">
                    Zornitsa
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4 pt-8">
            The Power of Community
          </h3>
          <div className="lg:mb-0">
            <p className="text-lg mb-6 leading-relaxed text-gray-600">
              We recognize that a united community can achieve remarkable feats.
              VOL is built on the foundation of collaboration, inclusivity, and
              empowerment. We provide a space where volunteers can find
              opportunities that resonate with their interests, skills, and
              schedules. Moreover, we offer organizations a platform to showcase
              their missions and connect with dedicated individuals who can help
              bring their visions to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;