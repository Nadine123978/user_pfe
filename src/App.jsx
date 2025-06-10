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
import AdminEventImagesManager from './/pages/admin/AdminEventImagesManager';


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
            <ToastContainer />
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
        <Route path="/events/:eventId" element={<WhirlingDervishShow />} />
          
        <Route path="/category/:id/events" element={<CategoryEventsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
         


          <Route
    path="/secure1234"  // نفس الرابط اللي وضعته في Login عند التنقل
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
          element={
            role === "ROLE_USER" ? <Home /> : <Navigate to="/login" replace />
          }
        />

        {/* مجموعة صفحات الأدمن داخل AdminLayout */}
        <Route
          path="/admin"
          element={
            role === "ROLE_ADMIN" ? <AdminLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="category/manage" element={<ManageCategories />} />
          <Route path="/admin/category/edit/:id" element={<EditCategory />} />
          <Route path="/admin/gallery" element={<AdminEventImagesManager />} />
          <Route path="/admin/bookings/all" element={<AllBookings />} />
<Route path="/admin/bookings/new" element={<NewBookings />} />
<Route path="/admin/bookings/cancelled" element={<CancelledBookings />} />
<Route path="/admin/bookings/confirmed" element={<ConfirmedBookings />} />
<Route path="/admin/bookings/:id" element={<BookingDetails />} />
<Route path="/admin/events/add" element={<AddEvent />} />
<Route path="/admin/events/manage" element={<ManageEvents />} />
<Route path="/admin/seating" element={<SelectEventPage />} />
<Route path="/admin/seating/:eventId" element={<ManageSeatingPage />} />
<Route path="/admin/manage-seats" element={<EditSeatsPage />} />
<Route path="/admin/users" element={<ManageUsers />} />
<Route path="/admin/users/:userId/bookings" element={<UserBookings />} />




          {/* هون ضيف باقي الصفحات لاحقًا */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
