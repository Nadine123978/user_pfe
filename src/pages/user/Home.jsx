import React, { useRef } from "react";
import Header from "../../components/user/Header";
import HeroSection from "../../components/user/hero";
import TrendingCategories from "../../components/user/trending-categories";
import FeaturedEvents from "../../components/user/featured-events";
import HowItWorks from "../../components/user/how-works";
import Footer from "../../components/user/footer";
import { Box } from "@mui/material";

const Home = () => {
  const homeRef = useRef(null);
  const eventsRef = useRef(null);
  const howItWorksRef = useRef(null);

  return (
    <Box sx={{ margin: 0, padding: 0, backgroundColor: 'transparent' }}>
      <Header scrollTargets={{ homeRef, eventsRef, howItWorksRef }} />

      <Box 
        component="main"
        sx={{ 
          width: '100%',
          overflowX: 'hidden',
          backgroundColor: 'transparent',
          margin: 0,
          padding: 0,
          '& > *': {
            margin: 0,
            padding: 0,
          }
        }}
      >
        <Box ref={homeRef}>
          <HeroSection />
        </Box>

        <Box ref={eventsRef}>
          <FeaturedEvents />
          <TrendingCategories />
        </Box>

        <Box ref={howItWorksRef}>
          <HowItWorks />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;

