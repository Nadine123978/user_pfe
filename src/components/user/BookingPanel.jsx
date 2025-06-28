import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Popover,
  IconButton,
  TextField,
  Card,
  Divider,
  Chip,
  CircularProgress,
  Fade,
  Slide,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { 
  Add, 
  Remove, 
  People, 
  CalendarToday, 
  AccessTime,
  LocationOn,
  CheckCircle,
  Error,
  Warning
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Enhanced styled components
const BookingCard = styled(Card)(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  color: 'white',
}));

const InfoSection = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const GradientButton = styled(Button)(({ theme, variant: buttonVariant, loading }) => ({
  background: loading 
    ? 'rgba(255, 255, 255, 0.1)'
    : buttonVariant === 'outlined' 
      ? 'transparent' 
      : 'linear-gradient(45deg, #E91E63, #9C27B0)',
  border: buttonVariant === 'outlined' 
    ? '2px solid #E91E63' 
    : 'none',
  borderRadius: 25,
  color: 'white',
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  minHeight: 48,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: buttonVariant === 'outlined' 
    ? 'none' 
    : '0 4px 15px rgba(233, 30, 99, 0.3)',
  
  '&:hover': {
    background: loading
      ? 'rgba(255, 255, 255, 0.1)'
      : buttonVariant === 'outlined'
        ? 'rgba(233, 30, 99, 0.1)'
        : 'linear-gradient(45deg, #C2185B, #7B1FA2)',
    transform: loading ? 'none' : 'translateY(-2px)',
    boxShadow: loading 
      ? 'none'
      : buttonVariant === 'outlined'
        ? '0 4px 15px rgba(233, 30, 99, 0.2)'
        : '0 8px 25px rgba(233, 30, 99, 0.4)',
  },
  
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  
  '&:hover::before': {
    left: '100%',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    color: 'white',
    transition: 'all 0.3s ease',
    
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2,
    },
    
    '&:hover fieldset': {
      borderColor: 'rgba(233, 30, 99, 0.5)',
    },
    
    '&.Mui-focused fieldset': {
      borderColor: '#E91E63',
      borderWidth: 2,
    },
    
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
    },
  },
  
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    
    '&.Mui-focused': {
      color: '#E91E63',
    },
  },
  
  '& .MuiInputAdornment-root': {
    color: '#E91E63',
  },
}));

const CounterButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(233, 30, 99, 0.1)',
  color: '#E91E63',
  border: '1px solid rgba(233, 30, 99, 0.3)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(233, 30, 99, 0.2)',
    transform: 'scale(1.1)',
  },
  
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
}));

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(145deg, rgba(44, 62, 80, 0.95), rgba(74, 20, 140, 0.95))',
    backdropFilter: 'blur(15px)',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
  },
}));

const StatusAlert = styled(Alert)(({ theme, severity }) => ({
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  
  '&.MuiAlert-standardSuccess': {
    background: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50',
    '& .MuiAlert-icon': {
      color: '#4CAF50',
    },
  },
  
  '&.MuiAlert-standardError': {
    background: 'rgba(244, 67, 54, 0.1)',
    color: '#F44336',
    '& .MuiAlert-icon': {
      color: '#F44336',
    },
  },
  
  '&.MuiAlert-standardWarning': {
    background: 'rgba(255, 152, 0, 0.1)',
    color: '#FF9800',
    '& .MuiAlert-icon': {
      color: '#FF9800',
    },
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1),
  borderRadius: 12,
  background: 'rgba(255, 255, 255, 0.03)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.06)',
    transform: 'translateX(4px)',
  },
}));

const BookingPanel = ({ event, onAvailabilityConfirmed }) => {
  const [totalTravelers, setTotalTravelers] = useState(2);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const maxTravelers = 15;

  const handleCheckAvailability = async () => {
    if (loading) return;

    if (totalTravelers > maxTravelers) {
      setError(`You can select up to ${maxTravelers} travelers in total.`);
      return;
    }

    setLoading(true);
    setError("");
    setAvailability(null);

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
    setError("");
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  const formatTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Time TBA';
    }
  };

  const open = Boolean(anchorEl);

  return (
    <BookingCard>
      {/* Event Info Section */}
      <Fade in={true} timeout={600}>
        <InfoSection>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: '#E91E63', 
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center',
            }}
          >
            {event?.title || "Event Booking"}
          </Typography>

          {/* Event Details */}
          <Box sx={{ mb: 3 }}>
            {event?.startDate && (
              <InfoItem>
                <CalendarToday sx={{ color: '#E91E63', fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Date
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatDate(event.startDate)}
                  </Typography>
                </Box>
              </InfoItem>
            )}

            {event?.startDate && (
              <InfoItem>
                <AccessTime sx={{ color: '#E91E63', fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Time
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatTime(event.startDate)}
                  </Typography>
                </Box>
              </InfoItem>
            )}

            {event?.location?.name && (
              <InfoItem>
                <LocationOn sx={{ color: '#E91E63', fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Location
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {event.location.name}
                  </Typography>
                </Box>
              </InfoItem>
            )}
          </Box>

          <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Traveler Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}>
              Select Travelers
            </Typography>
            
            <StyledTextField
              label="Number of Travelers"
              value={`${totalTravelers} traveler${totalTravelers > 1 ? "s" : ""}`}
              InputProps={{
                readOnly: true,
                startAdornment: <People sx={{ mr: 1, color: '#E91E63' }} />,
              }}
              onClick={handleOpenPopover}
              fullWidth
              sx={{ cursor: 'pointer' }}
            />

            <StyledPopover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Box sx={{ p: 3, minWidth: 250 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#E91E63', fontWeight: 'bold' }}>
                  Select Travelers
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.7)' }}>
                  Choose up to {maxTravelers} travelers
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                  }}
                >
                  <CounterButton
                    onClick={() =>
                      setTotalTravelers((prev) => Math.max(1, prev - 1))
                    }
                    disabled={totalTravelers <= 1}
                    size="small"
                  >
                    <Remove />
                  </CounterButton>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#E91E63' }}>
                      {totalTravelers}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {totalTravelers === 1 ? 'traveler' : 'travelers'}
                    </Typography>
                  </Box>
                  
                  <CounterButton
                    onClick={() =>
                      setTotalTravelers((prev) => Math.min(maxTravelers, prev + 1))
                    }
                    disabled={totalTravelers >= maxTravelers}
                    size="small"
                  >
                    <Add />
                  </CounterButton>
                </Box>

                <GradientButton
                  fullWidth
                  onClick={handleClosePopover}
                >
                  Apply Selection
                </GradientButton>
              </Box>
            </StyledPopover>
          </Box>

          {/* Check Availability Button */}
          <GradientButton
            fullWidth
            onClick={handleCheckAvailability}
            disabled={loading}
            loading={loading}
            sx={{ mb: 2 }}
          >
            {loading && (
              <CircularProgress 
                size={20} 
                sx={{ 
                  color: 'white', 
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-10px',
                }} 
              />
            )}
            {loading ? "Checking Availability..." : "Check Availability & Continue"}
          </GradientButton>

          {/* Results Section */}
          {availability && (
            <Slide direction="up" in={Boolean(availability)} timeout={500}>
              <Box>
                {availability.available ? (
                  <StatusAlert 
                    severity="success" 
                    icon={<CheckCircle />}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                      Great! Seats are available!
                    </Typography>
                    <Typography variant="caption">
                      {availability.requestedSeats} seat{availability.requestedSeats > 1 ? 's' : ''} reserved. 
                      {availability.remainingSeats} remaining after your booking.
                    </Typography>
                  </StatusAlert>
                ) : (
                  <StatusAlert 
                    severity="error" 
                    icon={<Error />}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                      Not enough seats available
                    </Typography>
                    <Typography variant="caption">
                      You requested {availability.requestedSeats} seats but only{" "}
                      {availability.remainingSeats + availability.requestedSeats} are available.
                    </Typography>
                  </StatusAlert>
                )}
              </Box>
            </Slide>
          )}

          {error && (
            <Fade in={Boolean(error)} timeout={300}>
              <StatusAlert 
                severity="warning" 
                icon={<Warning />}
                sx={{ mb: 2 }}
              >
                <Typography variant="body2">
                  {error}
                </Typography>
              </StatusAlert>
            </Fade>
          )}

          {/* Additional Info */}
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            background: 'rgba(233, 30, 99, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(233, 30, 99, 0.2)',
          }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              💡 <strong>Tip:</strong> Seats are held for 15 minutes during the booking process. 
              Complete your booking quickly to secure your preferred seats.
            </Typography>
          </Box>
        </InfoSection>
      </Fade>
    </BookingCard>
  );
};

export default BookingPanel;

