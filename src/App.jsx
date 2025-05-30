import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User pages
import Home from './pages/user/Home';
import SignUp from './components/user/signup';
import Login from './components/user/login';
import Booking from './pages/user/booking';
import SeatMap from './pages/user/SeatMap';
import ContactPage from './pages/user/Contact';
import Forgetpage from './pages/user/Forgetpage';
import ResetPassPage from './pages/user/ResetPassPage';
import UserDashboard from './pages/user/UserDashboard'; // ⬅️ Create this if not exists

// Admin page
import AdminDashboard from './pages/admin/AdminDashboard'; // ⬅️ Create this if not exists

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* صفحات عامة */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resetpass" element={<Forgetpage />} />
        <Route path="/reset-password" element={<ResetPassPage />} />

        {/* صفحات المستخدم */}
        <Route path="/event/:id/tickets" element={<SeatMap />} />
        <Route path="/booking/:id" element={<Booking />} />

        <Route
          path="/dashboard"
          element={
            role === "admin" ? <Navigate to="/admin" /> : <Home />
          }
        />

        {/* صفحة المشرف */}
        <Route
          path="/admin"
          element={
            role === "admin" ? <AdminDashboard /> : <Navigate to="/dashboard" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
