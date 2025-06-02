import React from "react";
import { Box } from "@mui/material";
import ImageGallery from "./ImageGallery";
import BookingPanel from "./BookingPanel";

const EventPage = ({ eventId, eventData, onAvailabilityConfirmed }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        maxWidth: "1000px",
        margin: "auto",
        mt: 4,
      }}
    >
      {/* معرض الصور */}
      <Box sx={{ flex: 1 }}>
        <ImageGallery eventId={eventId} />
      </Box>

      {/* لوحة الحجز */}
      <Box sx={{ width: 300 }}>
        <BookingPanel event={eventData} onAvailabilityConfirmed={onAvailabilityConfirmed} />
      </Box>
    </Box>
  );
};

export default EventPage;
