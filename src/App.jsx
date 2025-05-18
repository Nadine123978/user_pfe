import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/signup';
import Login from './components/login';
import Bookings from './pages/booking';
import SeatMap from './pages/SeatMap';
import ContactPage from "./pages/Contact";
import Forgetpage from "./pages/Forgetpage";
import ResetPassPage from './pages/ResetPassPage';
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
        <Route path="/contact" element={<ContactPage />} />

         <Route path="/resetpass" element={<Forgetpage />} />
   

         <Route path="/reset-password" element={<ResetPassPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
