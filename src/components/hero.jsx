import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EventCard from './EventCard';

const HeroSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fdf5e6',
        padding: 5,
        minHeight: '80vh',
        width:'100%',
      }}
    >
      {/* Left Text */}
      <Box sx={{ flex: 1, pr: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Easy to Buy & <br />
          Sale your <span style={{ color: '#f7a600' }}>Event Ticket</span>
        </Typography>
        <Typography sx={{ mb: 3 }}>
          It is a long established fact that a reader content of a page <br />
          when Ipsum is that it has a more-or-less normal.
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#f7a600', color: '#000', fontWeight: 'bold' }}
        >
          Get Started
        </Button>
      </Box>

      {/* Right Card */}
      <Box sx={{ flex: 1 }}>
    
       <EventCard />
      </Box>
    </Box>
  );
};

export default HeroSection;
