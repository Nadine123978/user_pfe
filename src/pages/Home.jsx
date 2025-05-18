import React, { useRef } from "react";
import Header from "../components/Header";
import HeroSection from "../components/hero";
import TrendingCategories from "../components/trending-categories";
import FeaturedEvents from "../components/featured-events";
import HowItWorks from "../components/how-works";
import Footer from "../components/footer";


const Home = () => {
  const homeRef = useRef(null);
  const eventsRef = useRef(null);
  const howItWorksRef = useRef(null);

  return (
    <>
      <Header scrollTargets={{ homeRef, eventsRef, howItWorksRef }} />
      <div ref={homeRef}>
        <HeroSection />
      </div>
      <div ref={eventsRef}>
        <FeaturedEvents />
          <TrendingCategories />
      </div>
      
     
    
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
      <Footer />
    </>
  );
};

export default Home;
