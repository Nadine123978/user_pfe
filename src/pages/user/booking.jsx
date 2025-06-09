import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // استورد useNavigate
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

import HeaderBooking from "../../components/user/Headerbooking";
import SeatingMap from "../../components/user/SeatingMap";
import OrganizerInfo from "../../components/user/OrganizerInfo";
import VenueMap from "../../components/user/VenueMap";
import WhirlingDervishShow from "../../components/user/WhirlingDervishShow";



function Booking() {
  const { id } = useParams();
 

  console.log("Booking Page - Event ID from useParams:", id);  // <== هذا مهم جداً

  const navigate = useNavigate(); // استخدم useNavigate
  const [event, setEvent] = useState(null);
  const [userBooking, setUserBooking] = useState(null);
  const [showSeatingMap, setShowSeatingMap] = useState(false);
  const [error, setError] = useState(null);
  const [requestedSeats, setRequestedSeats] = useState(0);


 useEffect(() => {
  setError(null);
  setEvent(null);
  setUserBooking(null);
  setShowSeatingMap(false);

  const token = localStorage.getItem("token");

  axios
    .get(`http://localhost:8081/api/events/${id}`)
    .then((res) => {
      setEvent(res.data);
    })
    .catch((err) => {
      setError("Failed to load event.");
      console.error(err);
    });

  if (token) {
    axios
      .get(`http://localhost:8081/api/bookings/check?eventId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserBooking(res.data);
      })
      .catch(() => {
        setUserBooking(null);
      });
  }
}, [id]);

  if (error) return <div>{error}</div>;

  if (!event) return null;

  if (event.cancelled) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" mb={2}>
          This event has been cancelled.
        </Typography>
        {userBooking ? (
          <Typography>
            Your booking status: {userBooking.bookingStatus}. You cannot proceed.
          </Typography>
        ) : (
          <Typography>You cannot book this event as it is cancelled.</Typography>
        )}
      </Box>
    );
  }

  if (userBooking) {
    if (userBooking.bookingStatus === "PENDING") {
      return (
        <Box sx={{ p: 3 }}>
          <Typography mb={2}>
            You have a pending booking. Please complete your payment.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = `/payment/${userBooking.id}`;
            }}
          >
            Continue Booking
          </Button>
        </Box>
      );
    } else if (
      userBooking.bookingStatus === "PAID" ||
      userBooking.bookingStatus === "CONFIRMED"
    ) {
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" color="success.main" mb={2}>
            Your booking is confirmed! See you at the event.
          </Typography>
        </Box>
      );
    } else if (userBooking.bookingStatus === "CANCELLED") {
      return (
        <Box sx={{ p: 3 }}>
          <Typography color="warning.main" mb={2}>
            Your booking was cancelled.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              alert("Booking again flow...");
            }}
          >
            Book Again
          </Button>
        </Box>
      );
    }
  }

  // لما المستخدم يختار مقعد
  const handleSeatSelected = (seat) => {
    // بدل عرض الدفع داخل نفس الصفحة، انقل المستخدم لصفحة الدفع مع إرسال بيانات المقعد
    navigate("/checkout", { state: { selectedSeats: [seat] } });
  };

 const handleAvailabilityConfirmed = ({ totalTravelers }) => {
  setRequestedSeats(totalTravelers);
  setShowSeatingMap(true);
};


  return (
    <Box sx={{ width: "100vw", overflowX: "hidden", m: 0, p: 0 }}>
      <HeaderBooking />
      <WhirlingDervishShow
        eventId={id}
        title={event.title}
        date={event.startDate}
        location={event.location?.name}
        onAvailabilityConfirmed={handleAvailabilityConfirmed}
        eventData={event}
      />
    {showSeatingMap && (
  <SeatingMap
    eventId={id}
    requestedSeats={requestedSeats}   // قيمة من state أو متغير
    onSeatSelected={handleSeatSelected}
  />
)}

      <OrganizerInfo organizer={event.organizer} />
      <VenueMap venue={event.venue} />
    </Box>
  );
}

export default Booking;
