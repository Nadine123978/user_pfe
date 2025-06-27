import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const OrganizerInfo = () => (
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
        Wave Production
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}> {/* Lighter white for body text */}
        Wave Production is a dynamic company that operates as both a production house and a marketing agency...
      </Typography>
    </Paper>
  </Box>
);

export default OrganizerInfo;
