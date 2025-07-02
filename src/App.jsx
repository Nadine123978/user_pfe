import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// User pages
import Home from './pages/user/Home';
import SignUp from './components/user/signup';
import Login from './components/user/login';
import Booking from './pages/user/booking';
import SeatMap from './pages/user/SeatMap';
import ContactPage from './pages/user/Contact';
import Forgetpage from './pages/user/Forgetpage';
import ResetPassPage from './pages/user/ResetPassPage';
import WhirlingDervishShow from './components/user/WhirlingDervishShow';

// Admin layout and pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddCategory from './pages/admin/AddCategory';
import AdminEventImagesManager from './pages/admin/AdminEventImagesManager';

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import MainLayout from './components/superadmin/layout/MainLayout';

import ManageCategories from './pages/admin/ManageCategories';
import EditCategory from './pages/admin/EditCategory';
import AllBookings from './pages/admin/AllBookings';
import NewBookings from './pages/admin/NewBookings';
import ConfirmedBookings from './pages/admin/ConfirmedBookings';
import CancelledBookings from './pages/admin/CancelledBookings';
import BookingDetails from './pages/admin/BookingDetails';
import SelectEventPage from './pages/admin/SelectEventPage';
import ManageSeatingPage from './pages/admin/ManageSeatingPage';
import EditSeatsPage from './pages/admin/EditSeatsPage';
import AddEvent from './pages/admin/AddEvent';
import ManageEvents from './pages/admin/ManageEvents';
import ManageUsers from './pages/admin/ManageUsers';
import UserBookings from './pages/admin/UserBookings';
import CategoryEventsPage from './pages/user/CategoryEventsPage';
import CheckoutPage from './pages/user/CheckoutPage';
import BlogPage from './pages/user/Blogs';
import AllTrendingCategories from './pages/user/AllTrendingCategories';
import MyBookings from './pages/user/MyBookings';
import AddLocation from './pages/admin/AddLocation';
import EditEvent from './pages/admin/EditEvent';
import AllUpcomingEvent from './pages/user/AllUpcomingEvent';
import EmailInterface from './pages/admin/EmailInterface';
import ManageLocations from './pages/admin/ManageLocation';

import { useNavigate } from "react-router-dom";

function SessionChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const token = localStorage.getItem("token");

    const maxSessionTime = 60 * 60 * 1000; // ساعة

    if (loginTime && token) {
      const timePassed = Date.now() - parseInt(loginTime, 10);
      if (timePassed > maxSessionTime) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  return null;
}

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

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <SessionChecker />
      <ToastContainer />
      <Routes>
        {/* صفحات عامة */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resetpass" element={<Forgetpage />} />
        <Route path="/reset-password" element={<ResetPassPage />} />
        <Route path="/categories" element={<AllTrendingCategories />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/event/:id/tickets" element={<SeatMap />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/events/:eventId" element={<WhirlingDervishShow />} />
        <Route path="/category/:id/events" element={<CategoryEventsPage />} />
        <Route path="/all-trending-categories" element={<AllTrendingCategories />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/all-upcoming-event" element={<AllUpcomingEvent />} />

        {/* صفحة السوبر أدمن */}
        <Route
          path="/secure1234"
          element={
            role === "ROLE_SUPER_ADMIN" ? (
              <MainLayout>
                <SuperAdminDashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

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
          element={role === "ROLE_USER" ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* مجموعة صفحات الأدمن داخل AdminLayout */}
   <Route path="/admin" element={role === "ROLE_ADMIN" ? <AdminLayout /> : <Navigate to="/login" replace />}>
  <Route index element={<AdminDashboard />} />
  <Route path="category/add" element={<AddCategory />} />
  <Route path="category/manage" element={<ManageCategories />} />
    <Route path="location/manage" element={<ManageLocations />} />
  <Route path="categories/edit/:id" element={<EditCategory />} />
  <Route path="gallery" element={<AdminEventImagesManager />} />
  <Route path="bookings/all" element={<AllBookings />} />
  <Route path="bookings/new" element={<NewBookings />} />
  <Route path="bookings/cancelled" element={<CancelledBookings />} />
  <Route path="bookings/confirmed" element={<ConfirmedBookings />} />
  <Route path="bookings/:id" element={<BookingDetails />} />
  <Route path="events/add" element={<AddEvent />} />
  <Route path="location/add" element={<AddLocation />} />
  <Route path="/admin/events/manage" element={<ManageEvents />} />
  <Route path="edit-event/:id" element={<EditEvent />} />
  <Route path="seating" element={<SelectEventPage />} />
  <Route path="seating/:eventId" element={<ManageSeatingPage />} />
  <Route path="manage-seats" element={<EditSeatsPage />} />
  <Route path="users" element={<ManageUsers />} />
  <Route path="users/:userId/bookings" element={<UserBookings />} />
  <Route path="inbox" element={<EmailInterface />} />
</Route>


      </Routes>
    </Router>
  );
}

export default App;
