import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";

import HeaderBooking from "../../components/user/Headerbooking";
import SeatingMap from "../../components/user/SeatingMap";
import PriceLegend from "../../components/user/PriceLegend";
import OrganizerInfo from "../../components/user/OrganizerInfo";
import VenueMap from "../../components/user/VenueMap";
import PaymentFooter from "../../components/user/PaymentFooter";

import WhirlingDervishShow from "../../components/user/WhirlingDervishShow";

function Booking() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showSeatingMap, setShowSeatingMap] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setEvent(null); // مهم حتى يرجع null لما يتغير id، لتجنب عرض بيانات حدث قديمة
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        setError("Failed to load event.");
        console.error(err);
      });
  }, [id]);

  // لو في خطأ، عرض رسالة الخطأ فورًا
  if (error) return <div>{error}</div>;

  // لو event ما جاهز (null)، لا تعرض Loading أو غيرها، ممكن ترجع null حتى لا يظهر شيء
  if (!event) return null;

  const handleAvailabilityConfirmed = () => {
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
      />
      {showSeatingMap && <SeatingMap eventId={id} />}
      <PriceLegend />
      <OrganizerInfo organizer={event.organizer} />
      <VenueMap venue={event.venue} />
      <PaymentFooter />
    </Box>
  );
}

export default Booking;
