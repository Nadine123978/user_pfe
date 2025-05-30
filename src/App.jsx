import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import SignUp from './components/user/signup';
import Login from './components/user/login';
import Booking from './pages/user/booking';
import SeatMap from './pages/user/SeatMap';
import ContactPage from "./pages/user/Contact";
import Forgetpage from "./pages/user/Forgetpage";
import ResetPassPage from './pages/user/ResetPassPage';

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
<Route path="/booking/:id" element={<Booking />} />
        <Route path="/contact" element={<ContactPage />} />
         <Route path="/resetpass" element={<Forgetpage />} />
         <Route path="/reset-password" element={<ResetPassPage />} />
      </Routes>
    </Router>
  );
}

export default App;
