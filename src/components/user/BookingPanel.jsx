import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Popover,
  IconButton,
  TextField,
  InputAdornment, // Import InputAdornment for styling TextField
} from "@mui/material";
import { Add, Remove, People } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingPanel = ({ event, onAvailabilityConfirmed }) => {
  const [totalTravelers, setTotalTravelers] = useState(2);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const maxTravelers = 15;

  const handleCheckAvailability = async () => {
    if (loading) return; // منع الضغط المتكرر

    if (totalTravelers > maxTravelers) {
      setError(`You can select up to ${maxTravelers} travelers in total.`);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8081/api/events/${event.id}/check-availability`,
        {
          totalRequestedSeats: totalTravelers,
        }
        );

      setAvailability({
        available: response.data.available,
        requestedSeats: response.data.requestedSeats,
        remainingSeats: response.data.remainingSeats,
      });

      setError("");

      if (response.data.available) {
        onAvailabilityConfirmed({ totalTravelers });
      }
    } catch (err) {
      console.error("Error checking availability:", err);
      const message =
        err.response?.data?.message ||
        "Error checking availability. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopover = (event) => {
    setError(""); // تنظيف الأخطاء عند فتح الـ popover
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        p: 4, // Increased padding
        backgroundColor: '#2C0050', // Dark purple background for the card
        color: '#FFFFFF', // White text color
        borderRadius: '16px', // More rounded corners
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)', // Stronger shadow for a lifted effect
        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle light border
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#E0E0E0' }}>
        Book Your Experience
      </Typography>

      <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#B0B0B0' }}>
        Event Date:{" "}
        {event && event.startDate
          ? new Date(event.startDate).toLocaleDateString()
          : "Date not available"}
      </Typography>

      <Box sx={{ mt: 3 }}> {/* Increased margin top */}
        <TextField
          label="Travelers"
          value={`${totalTravelers} traveler${totalTravelers > 1 ? "s" : ""}`}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <People sx={{ mr: 1, color: '#FFFFFF' }} /> {/* White icon */}
              </InputAdornment>
            ),
            sx: {
              color: '#FFFFFF', // White input text
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)', // Lighter border for input
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.6)', // Lighter border on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E91E63', // Pink border on focus
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: '#B0B0B0', // Lighter label color
              '&.Mui-focused': {
                color: '#E91E63', // Pink label on focus
              },
            },
          }}
          onClick={handleOpenPopover}
          fullWidth
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly transparent dark background for input
            borderRadius: '8px',
          }}
        />

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          PaperProps={{
            sx: {
              backgroundColor: '#3A0060', // Darker background for popover
              color: '#FFFFFF', // White text
              borderRadius: '12px', // Rounded corners for popover
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
            }
          }}
        >
          <Box sx={{ p: 3, width: 220 }}> {/* Increased padding and width */}
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#E0E0E0' }}>
              Select number of travelers (up to {maxTravelers})
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2, // Increased margin top
                mb: 2, // Increased margin bottom
              }}
            >
              <IconButton
                onClick={() =>
                  setTotalTravelers((prev) => Math.max(1, prev - 1))
                }
                disabled={totalTravelers <= 1}
                size="medium" // Slightly larger buttons
                sx={{
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: '#D81B60', // Vibrant pink on hover
                  },
                }}
              >
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>{totalTravelers}</Typography>
              <IconButton
                onClick={() =>
                  setTotalTravelers((prev) => Math.min(maxTravelers, prev + 1))
                }
                disabled={totalTravelers >= maxTravelers}
                size="medium"
                sx={{
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: '#D81B60', // Vibrant pink on hover
                  },
                }}
              >
                <Add />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #D81B60, #E91E63)', // Gradient background
                color: 'white',
                borderRadius: '25px', // More rounded button
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #C2185B, #D81B60)',
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',
                },
              }}
              onClick={handleClosePopover}
            >
              Apply
            </Button>
          </Box>
        </Popover>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 4, // Increased margin top for the main button
          background: 'linear-gradient(45deg, #D81B60 30%, #E91E63 90%)', // Stronger gradient
          color: 'white',
          borderRadius: '30px', // Very rounded button
          px: 3,
          py: 1.5, // More vertical padding
          textTransform: 'uppercase', // Uppercase text
          fontWeight: 'bold',
          fontSize: '1.1rem', // Larger font size
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            background: 'linear-gradient(45deg, #C2185B 30%, #D81B60 90%)',
            boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.6)',
            transform: 'translateY(-3px)', // Lift effect on hover
          },
          '&:disabled': {
            background: 'linear-gradient(45deg, #555, #777)', // Disabled state styling
            color: '#CCC',
            boxShadow: 'none',
            transform: 'none',
          }
        }}
        onClick={handleCheckAvailability}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Availability"}
      </Button>

      {availability && (
        <>
          {availability.available ? (
            <Alert severity="success" sx={{ mt: 3, borderRadius: '8px', backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#A5D6A7' }}> {/* Subtle background for alerts */}
              Seats are available! You requested {availability.requestedSeats}{" "}
              seats. Remaining seats after booking: {availability.remainingSeats}.
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mt: 3, borderRadius: '8px', backgroundColor: 'rgba(244, 67, 54, 0.2)', color: '#EF9A9A' }}>
              Not enough seats available! You requested{" "}
              {availability.requestedSeats} seats but only{" "}
              {availability.remainingSeats + availability.requestedSeats} are
              available.
            </Alert>
          )}
        </>
      )}

      {error && (
        <Alert severity="warning" sx={{ mt: 3, borderRadius: '8px', backgroundColor: 'rgba(255, 152, 0, 0.2)', color: '#FFCC80' }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default BookingPanel;
