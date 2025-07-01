import React, { useEffect, useState } from "react";
import TicketCheckout from "../../components/user/TicketCheckout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderTimer from "../../components/user/OrderTimer";
import { Box, Typography, Button, CircularProgress } from "@mui/material"; // Import Material-UI components
import { Home as HomeIcon } from "@mui/icons-material"; // Import Home icon
import { styled } from "@mui/material/styles"; // Import styled for custom button

// Re-using the GradientButton styled component for consistency
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 30, // Very rounded button
  color: disabled ? '#999999' : 'white',
  height: 50, // Taller button
  padding: '0 30px', // More padding
  textTransform: 'uppercase', // Uppercase text
  fontWeight: 'bold',
  fontSize: '1rem', // Larger font size
  transition: 'all 0.3s ease',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)', // Darker pink on hover
    transform: disabled ? 'none' : 'translateY(-3px)', // Lift effect on hover
    boxShadow: disabled ? 'none' : '0 12px 25px rgba(0, 0, 0, 0.6)', // More intense shadow on hover
  },
}));

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!bookingId) {
      navigate("/");
      return;
    }
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } );
        const booking = response.data;
        console.log("🔍 Booking Response:", booking);

        if (!booking.seats || booking.seats.length === 0) {
          console.error("❌ Booking seats is null or empty");
          return;
        }

        const tickets = booking.seats.map((seat) => ({
          id: seat.id,
          code: seat.code,
          price: seat.price,
          section: seat.code,
          zone: booking.event?.location,
        }));

        setSelectedSeats(tickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking:", error);
        navigate("/");
      }
    };

    fetchBookingDetails();
  }, [bookingId, navigate, token]);

  const handleCancelBooking = async () => {
    if (!bookingId) return;

    try {
      setLoading(true);
      const seatIds = selectedSeats.map((seat) => seat.id);
      await axios.post(
        "http://localhost:8081/api/seats/unlock",
        seatIds,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
       );
      setSelectedSeats([]);
      navigate("/");
    } catch (error) {
      console.error("Error cancelling booking", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#200245', color: 'white' }}>
      <CircularProgress color="inherit" sx={{ mr: 2 }} />
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
  if (!selectedSeats || selectedSeats.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#200245', color: 'white' }}>
      <Typography variant="h6">No tickets found.</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 }, // Responsive padding
        backgroundColor: '#200245', // Overall page background
        minHeight: '100vh', // Ensure it takes full height
        color: 'white', // Default text color
      }}
    >
      {/* Return to Home Button */}
      <GradientButton
        onClick={() => navigate("/Home")}
        startIcon={<HomeIcon />}
        sx={{ mb: 4 }} // Margin bottom for spacing
      >
        Return to Home
      </GradientButton>

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: '#E0E0E0', textAlign: 'center' }}>
        Checkout Page
      </Typography>

      <OrderTimer orderNumber={bookingId} onCancel={handleCancelBooking} />

<TicketCheckout
  tickets={selectedSeats}        // هنا نمرر selectedSeats بدل tickets
  orderNumber={bookingId}        // إذا ما عندك orderNumber حقيقي، ممكن تستخدم bookingId مؤقتاً
  bookingId={bookingId}
  paymentSuccess={paymentSuccess}
  setPaymentSuccess={setPaymentSuccess}
  onPaymentDone={() => {
    // مثلا تعيد تحميل أو تحديث
    console.log('Payment done');
  }}
/>


    </Box>
  );
};

export default CheckoutPage;
