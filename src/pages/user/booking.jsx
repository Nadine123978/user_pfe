import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";

import HeaderBooking from "../../components/user/Headerbooking";
import EventBanner from "../../components/user/EventBanner";
import EventDetails from "../../components/user/EventDetails";
import TicketSectionSelector from "../../components/user/TicketSectionSelector";
import SeatingMap from "../../components/user/SeatingMap";
import PriceLegend from "../../components/user/PriceLegend";
import OrganizerInfo from "../../components/user/OrganizerInfo";
import VenueMap from "../../components/user/VenueMap";
import PaymentFooter from "../../components/user/PaymentFooter";
import BookingPanel from "../../components/user/BookingPanel";

import WhirlingDervishShow from "../../components/user/WhirlingDervishShow";
const Booking = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showSeatingMap, setShowSeatingMap] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  //if (!event) return <div>Loading event details...</div>;

  const handleAvailabilityConfirmed = () => {
    setShowSeatingMap(true);  // عرض خريطة المقاعد عند التأكد من التوفر
  };

  return (
    <Box sx={{ width: "100vw", overflowX: "hidden", m: 0, p: 0 }}>
      <HeaderBooking />
      <WhirlingDervishShow 
        eventId={id} 
        title={event.title} 
        date={event.startDate} 
        location={event.location?.name} 
      />

      <EventDetails event={event} />

      {/* مرر الدالة لـ BookingPanel */}
      <BookingPanel event={event} onAvailabilityConfirmed={handleAvailabilityConfirmed} />

      {!showSeatingMap && (
        <Button variant="contained" onClick={() => setShowSeatingMap(true)} sx={{ my: 3 }}>
          Show Seating Map & Book Seats
        </Button>
      )}

      {showSeatingMap && <SeatingMap eventId={id} />}

      <PriceLegend />
      <OrganizerInfo organizer={event.organizer} />
      <VenueMap venue={event.venue} />
      <PaymentFooter />
    </Box>
  );
};
export default Booking;