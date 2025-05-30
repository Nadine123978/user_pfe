// booking.jsx
import React from "react";
import { useParams } from "react-router-dom";
import HeaderBooking from "../../components/user/Headerbooking";
import EventBanner from "../../components/user/EventBanner";
import EventDetails from "../../components/user/EventDetails";
import TicketSectionSelector from "../../components/user/TicketSectionSelector";
import SeatingMap from "../../components/user/SeatingMap";
import PriceLegend from "../../components/user/PriceLegend";
import OrganizerInfo from "../../components/user/OrganizerInfo";
import VenueMap from "../../components/user/VenueMap";
import PaymentFooter from "../../components/user/PaymentFooter";

const Booking = () => {
  const { id } = useParams(); // ← بتجيب 43 من /booking/43

  return (
    <>
      <HeaderBooking />
      <EventBanner />
      <EventDetails />
      <TicketSectionSelector />
      <SeatingMap eventId={id} /> {/* ← هون الحل */}
      <PriceLegend />
      <OrganizerInfo />
      <VenueMap />
      <PaymentFooter />
    </>
  );
};

export default Booking;
