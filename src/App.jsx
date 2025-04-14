import { useState } from 'react'
import Header from "./components/Header";
import HeroSection from './components/hero';
import FeaturedEvents from "./components/featured-events";
import EventCard from './components/EventCard';
import UpcomingEvents from './components/UpcomingEvent';


function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <UpcomingEvents />
     
    </div>
  );
}

export default App;
