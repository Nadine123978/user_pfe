import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const VenueMap = () => (
  <Box sx={{ p: 2 }}>
    <Paper 
      sx={{ 
        p: 2, 
        // Matching Header's menu background or similar dark blue-grey gradient
        background: 'linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)',
        color: 'white', // White text for readability
        borderRadius: 2, // Consistent border radius
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)', // Subtle shadow
      }}
    >
      <Typography variant="h6" sx={{ color: '#E91E63', mb: 1 }}> {/* Vibrant pink for heading */}
        Venue
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}> {/* Lighter white for body text */}
        Park Joseph Tohme Skaff, Zahle, Lebanon
      </Typography>
      <Box sx={{ mt: 2 }}>
        <iframe
          title="map"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: '8px' }} // Added border-radius to match theme
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Park+Joseph+Tohme+Skaff,Zahle"
        ></iframe>
      </Box>
    </Paper>
  </Box>
 );

export default VenueMap;
