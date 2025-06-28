import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Popover,
  IconButton,
  TextField,
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
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {event?.title || "Untitled Event"}
      </Typography>

      <Typography variant="body2" fontWeight="bold" gutterBottom>
        Event Date:{" "}
        {event && event.startDate
          ? new Date(event.startDate).toLocaleDateString()
          : "Date not available"}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <TextField
          label="Travelers"
          value={`${totalTravelers} traveler${totalTravelers > 1 ? "s" : ""}`}
          InputProps={{
            readOnly: true,
            startAdornment: <People sx={{ mr: 1 }} />,
          }}
          onClick={handleOpenPopover}
          fullWidth
        />

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2, width: 200 }}>
            <Typography variant="subtitle2" gutterBottom>
              Select number of travelers (up to {maxTravelers})
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 1,
              }}
            >
              <IconButton
                onClick={() =>
                  setTotalTravelers((prev) => Math.max(1, prev - 1))
                }
                disabled={totalTravelers <= 1}
                size="small"
              >
                <Remove />
              </IconButton>
              <Typography>{totalTravelers}</Typography>
              <IconButton
                onClick={() =>
                  setTotalTravelers((prev) => Math.min(maxTravelers, prev + 1))
                }
                disabled={totalTravelers >= maxTravelers}
                size="small"
              >
                <Add />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
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
        sx={{ mt: 3 }}
        onClick={handleCheckAvailability}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Availability"}
      </Button>

      {availability && (
        <>
          {availability.available ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Seats are available! You requested {availability.requestedSeats}{" "}
              seats. Remaining seats after booking: {availability.remainingSeats}.
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mt: 2 }}>
              Not enough seats available! You requested{" "}
              {availability.requestedSeats} seats but only{" "}
              {availability.remainingSeats + availability.requestedSeats} are
              available.
            </Alert>
          )}
        </>
      )}

      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default BookingPanel;
