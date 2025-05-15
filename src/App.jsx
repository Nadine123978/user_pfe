import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/signup';
import Login from './components/login';
import Bookings from './pages/booking';
import SeatMap from './pages/SeatMap';
 // صفحة التفاصيل - صفحة الحجز
function App() {
  
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />

        {/* صفحة إنشاء حساب */}
        <Route path="/signup" element={<SignUp />} />

        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<Login />} />
        <Route path="/event/:id/tickets" element={<SeatMap />} />

        {/* صفحة حجز التذاكر، فيها ID الحدث */}
        <Route path="/booking/:id" element={<Bookings />} />
      </Routes>
    </Router>
  );
}

export default App;
