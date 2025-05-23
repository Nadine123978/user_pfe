// EventBanner.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const EventBanner = () => (
  <Box sx={{ p: 2, background: '#000', color: '#fff' }}>
    <Typography variant="h4">A night with Marwan Khoury</Typography>
    <Typography variant="body1">July 26, 2025 at Park Joseph Tohme Skaff, Zahle</Typography>
    <Button variant="contained" sx={{ mt: 2 }}>Get Tickets</Button>
  </Box>
);

export default EventBanner;
