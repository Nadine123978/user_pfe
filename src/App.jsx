import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // دمج الاستيراد هنا
import Header from "./components/Header";
import HeroSection from './components/hero';
import FeaturedEvents from "./components/featured-events";
import EventCard from './components/EventCard';
import UpcomingEvents from './components/UpcomingEvent';
import HowItWorks from './components/how-works';
import Login from './components/login'; // تأكد من استيراد مكونات تسجيل الدخول والتسجيل
import SignUp from './components/signup';
import TrendingCategories from './components/trending-categories';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
        <HeroSection />
        <FeaturedEvents/>
        <TrendingCategories />
        <UpcomingEvents />
        <HowItWorks />
      </Router>
    </div>
  );
}

export default App;
