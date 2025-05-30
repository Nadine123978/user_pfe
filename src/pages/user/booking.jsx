// booking.jsx
import React from "react";
import { useParams } from "react-router-dom";
import HeaderBooking from "../components/Headerbooking";
import EventBanner from "../components/EventBanner";
import EventDetails from "../components/EventDetails";
import TicketSectionSelector from "../components/TicketSectionSelector";
import SeatingMap from "../components/SeatingMap";
import PriceLegend from "../components/PriceLegend";
import OrganizerInfo from "../components/OrganizerInfo";
import VenueMap from "../components/VenueMap";
import PaymentFooter from "../components/PaymentFooter";

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
