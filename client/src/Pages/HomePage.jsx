import React from 'react'

// import Header from "../components/Header";
// import Footer from "../components/Footer";
import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturedProjects";
import Causes from "./Causes";
import AboutUs from "./AboutUs";

const HomePage = () => {



  return (
    <div>
        <HeroSection />
        <FeaturedProjects/>
        <Causes />
        <AboutUs />
        
       
    </div>
  );
};

export default HomePage