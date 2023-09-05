import React from "react";
import BannerImage from "../assets/Banner.png";

const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20"
      style={{
        backgroundImage: `url(${BannerImage})`, // Set the background image
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-6 text-white">
          Compassion. Impact. Community.
        </h1>
        <p className="text-lg mb-8 text-white">
          Discover meaningful volunteering opportunities and make a positive
          impact.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
