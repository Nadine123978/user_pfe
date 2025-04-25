import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// باقي الصفحات مثلاً:
import SignUp from './components/signup';
import Login from './components/login';
import ExperienceDetails from './pages/ExperienceDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ExperienceDetails" element={<ExperienceDetails />} />

        {/* فيك تزيد باقي الصفحات هون */}
      </Routes>
    </Router>
  );
}

export default App;
