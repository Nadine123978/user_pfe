import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import axios from "axios";
import { styled } from "@mui/material/styles"; // Import styled

// Styled Button for the Cancel action
const StyledCancelButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)' // Darker grey for disabled
    : 'linear-gradient(45deg, #D32F2F, #F44336)', // Red gradient for error/cancel
  border: 0,
  borderRadius: 25, // Rounded button
  color: disabled ? '#999999' : 'white',
  height: 45, // Slightly taller button
  padding: '0 25px', // More padding
  textTransform: 'uppercase', // Uppercase text
  fontWeight: 'bold',
  fontSize: '0.95rem', // Slightly larger font
  transition: 'all 0.3s ease',
  boxShadow: disabled ? 'none' : '0 6px 15px rgba(0, 0, 0, 0.4)', // Subtle shadow
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C62828, #D32F2F)', // Darker red on hover
    transform: disabled ? 'none' : 'translateY(-2px)', // Lift effect on hover
    boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)', // More intense shadow on hover
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
    return `${min}m ${sec < 10 ? '0' : ''}${sec}s`; // Add leading zero for seconds
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
    <Box sx={{ mt: 3, mb: 4 }}> {/* Added margin top and bottom for spacing */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#E0E0E0' }}>
        Order #{orderNumber}
      </Typography>
      <Box
        sx={{
          mt: 1,
          p: 3, // Increased padding
          background: 'linear-gradient(135deg, #3A0060, #4A0070)', // Dark purple gradient
          borderRadius: '12px', // More rounded corners
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', // Subtle shadow
          border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HourglassEmptyIcon sx={{ mr: 1.5, color: '#E91E63', fontSize: '2rem' }} /> {/* Vibrant pink icon, larger */}
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
            This order will expire in{" "}
            <Typography component="span" variant="h6" fontWeight="bold" sx={{ color: '#FFCC80' }}> {/* Light orange for countdown */}
              {formatTime(countdown)}
            </Typography>
          </Typography>
        </Box>
        <StyledCancelButton onClick={handleCancel} disabled={loading}>
          {loading ? "Cancelling..." : "Cancel Order"}
        </StyledCancelButton>
      </Box>
    </Box>
  );
};

export default OrderTimer;
