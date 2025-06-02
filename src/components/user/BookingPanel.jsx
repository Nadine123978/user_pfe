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

const BookingPanel = ({ event, onAvailabilityConfirmed }) => {
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const totalPeople = adultCount + childCount + infantCount;

  const handleCheckAvailability = async () => {
    if (totalPeople > 15) {
      setError("You can select up to 15 travelers in total.");
      return;
    }

    try {
      const response = await axios.post(
  `http://localhost:8081/api/events/${event.id}/check-availability`,
{
          adults: adultCount,
          children: childCount,
          infants: infantCount,
        }
      );

      setAvailability(response.data.available);
      setError("");
      if (response.data.available) {
        onAvailabilityConfirmed({
          adults: adultCount,
          children: childCount,
          infants: infantCount,
        });
      }
    } catch (err) {
      setError("Error checking availability. Please try again.");
      console.error(err);
    }
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderTravelerRow = (label, value, setValue, min, max) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
        mb: 1,
      }}
    >
      <Box>
        <Typography>{label}</Typography>
        <Typography variant="caption" color="text.secondary">
          Minimum: {min}, Maximum: {max}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() => setValue((prev) => Math.max(min, prev - 1))}
          disabled={value <= min}
          size="small"
        >
          <Remove />
        </IconButton>
        <Typography>{value}</Typography>
        <IconButton
          onClick={() => setValue((prev) => Math.min(max, prev + 1))}
          disabled={value >= max}
          size="small"
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        Event Date: {event.date}
      </Typography>

      {/* Traveler Selector */}
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Travelers"
      value={`${adultCount} Adults${childCount ? `, ${childCount} Children` : ""}${infantCount ? `, ${infantCount} Infants` : ""}`}

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
          <Box sx={{ p: 2, width: 300 }}>
            <Typography variant="subtitle2" gutterBottom>
              You can select up to 15 travelers in total.
            </Typography>

            {renderTravelerRow("Adult (Age 8–100)", adultCount, setAdultCount, 1, 15)}
            {renderTravelerRow("Child (Age 3–7)", childCount, setChildCount, 0, 15)}
            {renderTravelerRow("Infant (Age 0–2)", infantCount, setInfantCount, 0, 15)}

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

      {/* Check Availability Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleCheckAvailability}
      >
        Check Availability
      </Button>

      {/* Alerts */}
      {availability === true && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Seats are available! You can proceed to booking.
        </Alert>
      )}
      {availability === false && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Not enough seats available!
        </Alert>
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