// VenueMap.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const VenueMap = () => (
  <Box sx={{ p: 2 }}>
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Venue</Typography>
      <Typography variant="body2">Park Joseph Tohme Skaff, Zahle, Lebanon</Typography>
      <Box sx={{ mt: 2 }}>
        <iframe
          title="map"
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Park+Joseph+Tohme+Skaff,Zahle"
        ></iframe>
      </Box>
    </Paper>
  </Box>
);

export default VenueMap;