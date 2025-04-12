import { useState } from 'react'
import Header from "./components/Header";

import FeaturedEvents from "./components/featured-events";


function App() {
  return (
    <div>
      <Header />
      <FeaturedEvents />
    </div>
  );
}

export default App;
