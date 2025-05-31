import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import axios from 'axios';

const OrderTimer = ({ orderNumber, onCancel }) => {
  const [countdown, setCountdown] = useState(3600); // 1 ساعة
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  if (countdown === 0) {
    handleCancel();
  }
}, [countdown]);


  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8081/api/bookings/cancel/${orderNumber}`);
      onCancel(); // notify parent that it's cancelled
    } catch (error) {
      console.error('Cancel failed:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order #{orderNumber}
      </Typography>
      <Box
        sx={{
          mt: 1,
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
        <Button variant="contained" color="error" onClick={handleCancel} disabled={loading}>
          {loading ? "Cancelling..." : "Cancel Order"}
        </Button>
      </Box>
    </>
  );
};

export default OrderTimer;
