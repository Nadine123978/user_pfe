import React, { useEffect, useState } from "react";
import TicketCheckout from "../../components/user/TicketCheckout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
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

if (!booking.seat) {
  console.error("❌ Booking seat is null");
  return;
}


const ticket = {
  id: booking.seat.id,
  code: booking.seat.code,
  price: booking.price,
  section: booking.seat.code,
  zone: booking.event.location,
};
      setSelectedSeats([ticket]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking:", error);
      navigate("/");
    }
  };

  fetchBookingDetails();
}, [bookingId, navigate, token]);


  if (loading) return <p>Loading...</p>;
  if (!selectedSeats || selectedSeats.length === 0) return <p>No tickets found.</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Checkout Page</h2>
      <TicketCheckout
        tickets={selectedSeats}
        onPaymentDone={() => navigate("/success")}
      />
    </div>
  );
};

export default CheckoutPage;
