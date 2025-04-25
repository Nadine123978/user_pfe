import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/hero";
import TrendingCategories from "../components/trending-categories";
import FeaturedEvents from "../components/featured-events";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedEvents />
      <TrendingCategories />

    </>
  );
};

export default Home;
