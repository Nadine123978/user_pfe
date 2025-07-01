import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

import Header from "../../components/user/Header"; // Assuming Header is in ../../components/Header
import SeatingMap from "../../components/user/SeatingMap";
import OrganizerInfo from "../../components/user/OrganizerInfo";
import VenueMap from "../../components/user/VenueMap";
import WhirlingDervishShow from "../../components/user/WhirlingDervishShow";

function Booking() {
  const { id } = useParams();
  console.log("Booking Page - Event ID from useParams:", id);

  const navigate = useNavigate();
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
      .get(`http://localhost:8081/api/events/${id}` )
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
        } )
        .then((res) => {
          setUserBooking(res.data);
        })
        .catch(() => {
          setUserBooking(null);
        });
    }
  }, [id]);

  if (error) return <Box sx={{ p: 3, color: 'white', background: '#200245', minHeight: '100vh' }}>{error}</Box>;

  if (!event) return null;

  // Styled Button for consistency
  const StyledButton = ({ children, ...props }) => (
    <Button
      variant="contained"
      sx={{
        background: 'linear-gradient(45deg, #D81B60, #E91E63)',
        color: 'white',
        borderRadius: '25px',
        px: 3,
        textTransform: 'none',
        fontWeight: 'bold',
        '&:hover': {
          background: 'linear-gradient(45deg, #C2185B, #D81B60)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );

  if (event.cancelled) {
    return (
      <Box sx={{ background: '#200245', minHeight: '100vh', color: 'white', p: 3 }}>
        <Header />
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
        <Box sx={{ background: '#200245', minHeight: '100vh', color: 'white', p: 3 }}>
          <Header />
          <Typography mb={2}>
            You have a pending booking. Please complete your payment.
          </Typography>
          <StyledButton
            onClick={() => {
              window.location.href = `/payment/${userBooking.id}`;
            }}
          >
            Continue Booking
          </StyledButton>
        </Box>
      );
    } else if (
      userBooking.bookingStatus === "PAID" ||
      userBooking.bookingStatus === "CONFIRMED"
    ) {
      return (
        <Box sx={{ background: '#200245', minHeight: '100vh', color: 'white', p: 3 }}>
          <Header />
          <Typography variant="h6" color="success.main" mb={2}>
            Your booking is confirmed! See you at the event.
          </Typography>
        </Box>
      );
    } else if (userBooking.bookingStatus === "CANCELLED") {
      return (
        <Box sx={{ background: '#200245', minHeight: '100vh', color: 'white', p: 3 }}>
          <Header />
          <Typography color="warning.main" mb={2}>
            Your booking was cancelled.
          </Typography>
          <StyledButton
            onClick={() => {
              alert("Booking again flow...");
            }}
          >
            Book Again
          </StyledButton>
        </Box>
      );
    }
  }

  const handleSeatSelected = (seat) => {
    navigate("/checkout", { state: { selectedSeats: [seat] } });
  };

  const handleAvailabilityConfirmed = ({ totalTravelers }) => {
    setRequestedSeats(totalTravelers);
    setShowSeatingMap(true);
  };

  return (
    <Box sx={{ width: "100vw", overflowX: "hidden", m: 0, p: 0, background: '#200245', minHeight: '100vh' }}>
      <Header /> {/* Add the Header component here */}
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
          requestedSeats={requestedSeats}
          onSeatSelected={handleSeatSelected}
        />
      )}
   {/*
<OrganizerInfo organizer={event.organizer} />
*/}

<VenueMap 
  latitude={event.location?.latitude}
  longitude={event.location?.longitude}
  venueName={event.location?.venueName}
/>

    </Box>
  );
}

export default Booking;
