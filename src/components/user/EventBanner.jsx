// EventBanner.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const EventBanner = ({ title, date, location }) => (
  <Box sx={{ p: 2, background: '#000', color: '#fff' }}>
    <Typography variant="h4">{title}</Typography>
    <Typography variant="body1">{new Date(date).toLocaleDateString()} at {location}</Typography>
    <Button variant="contained" sx={{ mt: 2 }}>Get Tickets</Button>
  </Box>
);

export default EventBanner;
