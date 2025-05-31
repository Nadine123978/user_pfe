import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// User pages
import Home from './pages/user/Home';
import SignUp from './components/user/signup';
import Login from './components/user/login';
import Booking from './pages/user/booking';
import SeatMap from './pages/user/SeatMap';
import ContactPage from './pages/user/Contact';
import Forgetpage from './pages/user/Forgetpage';
import ResetPassPage from './pages/user/ResetPassPage';

import UserDashboard from './pages/user/UserDashboard';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddCategory from './pages/admin/AddCategory';


function App() {
 const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateRoleFromStorage = () => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setRole(storedRole);
    } else {
      setRole(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateRoleFromStorage();
    window.addEventListener("storage", updateRoleFromStorage);
    return () => window.removeEventListener("storage", updateRoleFromStorage);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
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

        {/* صفحة الأدمن محمية */}
        <Route
          path="/admin"
          element={
            role === "ROLE_ADMIN" ? <AdminDashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* صفحة داشبورد المستخدم */}
        <Route
          path="/dashboard"
          element={
            role === "ROLE_USER" ? <Home /> : <Navigate to="/login" replace />
          }
        />

        {/* صفحة إضافة التصنيف */}
        <Route
          path="/admin/category/add"
          element={
            role === "admin" ? <AddCategory /> : <Navigate to="/dashboard" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
