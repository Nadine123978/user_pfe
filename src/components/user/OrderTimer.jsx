import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import axios from "axios";
import { styled } from "@mui/material/styles"; // Import styled for custom button

// Styled Button for consistency with Header/HeroSection
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)' // Darker disabled state
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 25,
  color: disabled ? '#999999' : 'white',
  height: 48, // Consistent height
  padding: '0 24px', // Consistent padding
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)', // Darker pink gradient on hover
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'none' : '0 8px 25px rgba(233, 30, 99, 0.3)', // Vibrant pink shadow
  },
}));

const OrderTimer = ({ orderNumber, onCancel }) => {
  const [countdown, setCountdown] = useState(3600); // 1 ساعة
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
    if (loading) return; // تمنع تنفيذ العملية إذا هي قيد التنفيذ
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmed) return;

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8081/api/bookings/cancel/${orderNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
       );
      onCancel(); // notify parent that it's cancelled
    } catch (error) {
      console.error("Cancel failed:", error.response?.data || error.message);
      alert("Failed to cancel order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}> {/* White text */}
        Order #{orderNumber}
      </Typography>
      <Box
        sx={{
          mt: 1,
          p: 2,
          // Background matching Header's menu background or similar dark blue-grey
          background: 'linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)',
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', // Subtle shadow
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HourglassEmptyIcon sx={{ mr: 1, color: '#E91E63' }} /> {/* Vibrant pink icon */}
          <Typography sx={{ color: 'white' }}> {/* White text */}
            This order will expire in {formatTime(countdown)}
          </Typography>
        </Box>
        <GradientButton onClick={handleCancel} disabled={loading}> {/* Use GradientButton */}
          {loading ? "Cancelling..." : "Cancel Order"}
        </GradientButton>
      </Box>
    </>
  );
};

export default OrderTimer;
