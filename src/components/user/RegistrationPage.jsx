import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Typography, Alert } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function RegistrationPage() {
  const [tabIndex, setTabIndex] = useState(1); // Registration tab active
  const [countdown, setCountdown] = useState(3600); // 1 hour = 3600 seconds
  const orderNumber = '250000868103';

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
return `${min}m ${sec}s`;
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      {/* Tabs */}
      <Tabs value={tabIndex} centered>
        <Tab label="Tickets" disabled />
        <Tab label="Registration" />
        <Tab label="Payment" disabled />
      </Tabs>

      {/* Order Info */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Order {orderNumber}
      </Typography>

      {/* Alert with timer and Cancel button */}
      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: '#fbc02d',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HourglassEmptyIcon sx={{ mr: 1 }} />
          <Typography>
            This order will expire in {formatTime(countdown)}
          </Typography>
        </Box>
        <Button variant="contained" color="error">
          Cancel Order
        </Button>
      </Box>

      {/* Ticket Placeholder */}
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        Ticket #1
      </Typography>
      <Box sx={{ height: 100, backgroundColor: '#eee', borderRadius: 1 }} />
    </Box>
  );
}