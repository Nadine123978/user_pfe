import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// باقي الصفحات مثلاً:
import SignUp from './components/signup';
import Login from './components/login';
import ExperienceDetails from './pages/booking';
import ResetPassword from './components/resetpass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/booking/:eventId" element={<ExperienceDetails />} />


        {/* فيك تزيد باقي الصفحات هون */}
      </Routes>
    </Router>
  );
}

export default App;
