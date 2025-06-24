import React, { useEffect, useState } from "react";
import TicketCheckout from "../../components/user/TicketCheckout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderTimer from "../../components/user/OrderTimer";

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
        });
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

  if (loading) return <p>Loading...</p>;
  if (!selectedSeats || selectedSeats.length === 0) return <p>No tickets found.</p>;

  return (
    <div style={{ padding: 24 }}>
      {/* زر العودة للصفحة الرئيسية */}
      <button
        onClick={() => navigate("/Home")}
        style={{ marginBottom: 20, padding: "8px 16px", cursor: "pointer" }}
      >
       Retun to Home 
      </button>

      <h2>Checkout Page</h2>

      <OrderTimer orderNumber={bookingId} onCancel={handleCancelBooking} />

      <TicketCheckout
        tickets={selectedSeats}
        orderNumber={bookingId}
        paymentSuccess={paymentSuccess}
        setPaymentSuccess={setPaymentSuccess}
      />
    </div>
  );
};

export default CheckoutPage;
