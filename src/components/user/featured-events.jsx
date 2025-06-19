import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardMedia,
  Typography, Button, Grid
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/events/featured", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Events:", response.data);

        setEvents(response.data);
      } catch (error) {
        console.error("❌ Error fetching featured events:", error);
        toast.error("Failed to load events.");
      }
    };

    fetchFeaturedEvents();
  }, []);

const handleBook = (eventId) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    toast.warn("Please log in first.");
    navigate("/login");
    return;
  }

  // توجيه فقط إلى صفحة الحجز
  navigate(`/booking/${eventId}`);
};

const handleButtonClick = (event) => {
  if (event.alreadyBooked) {
    switch (event.bookingStatus) {
      case 'PENDING':
        if (!event.bookingId) {
          console.error("Missing booking ID for pending booking.");
          return;
        }
        navigate("/checkout", { state: { bookingId: event.bookingId } });
        break;
      case 'CANCELLED':
        navigate(`/booking/${event.id}`);
        break;
      case 'PAID':
      case 'CONFIRMED':
        toast.info("You cannot book this event again.");
        break;
      default:
        navigate(`/booking/${event.id}`);
    }
  } else {
    navigate(`/booking/${event.id}`);
  }
};

const getButtonLabel = (event) => {
  if (!event) return "Book Now";

  if (event.alreadyBooked) {
    switch (event.bookingStatus?.toUpperCase()) {
      case 'PENDING': return "Continue Booking";
      case 'CANCELLED': return "Book Now";
      case 'PAID':
      case 'CONFIRMED': return "View Tickets";
      default: return "Book Now";
    }
  }

  return "Book Now";
};

  const isButtonDisabled = (event) => {
    return event.alreadyBooked && (event.bookingStatus === 'PAID' || event.bookingStatus === 'CONFIRMED');
  };

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        py: 8, 
        px: 6, 
        borderRadius: '0px', // Removed border radius to match hero section
        mt: 0, // Removed margin to create seamless flow
        minHeight: '100vh', // Full viewport height like hero section
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Header Section with improved typography hierarchy */}
      <Box sx={{ mb: 6, textAlign: 'left', maxWidth: '800px' }}>
        <Typography 
          variant="h2" 
          sx={{
            color: 'white', 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.2
          }}
        >
          Featured Events
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            color: '#B0BEC5', 
            mb: 4,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            fontWeight: 400
          }}
        >
          Be sure not to miss these Events today.
        </Typography>
      </Box>

      {/* Events Grid with improved spacing */}
      <Grid container spacing={4} sx={{ maxWidth: '1400px', mx: 'auto' }}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} lg={4} key={event.id}>
            <Card 
              sx={{ 
                background: 'linear-gradient(145deg, #0B2A4A 0%, #1a3a5c 100%)',
                color: 'white', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={
                  event.imageUrl
                    ? event.imageUrl.startsWith("http")
                      ? event.imageUrl
                      : `http://localhost:8081${event.imageUrl}`
                    : "/default-event.jpg"
                }
                alt={event.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-event.jpg";
                }}
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#81C784', 
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: '0.9rem'
                  }}
                >
                  {event.price}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 'bold', 
                    mt: 1, 
                    mb: 2,
                    fontSize: '1.3rem',
                    lineHeight: 1.3
                  }}
                >
                  {event.title}
                </Typography>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#B0BEC5', 
                    mb: 3,
                    fontSize: '0.95rem'
                  }}
                >
                  {event.startDate ? new Date(event.startDate).toLocaleDateString() : "Date N/A"} | {event.location?.fullAddress || "Location N/A"}
                </Typography>

                <Button
                  onClick={() => handleButtonClick(event)}
                  variant={isButtonDisabled(event) ? "outlined" : "contained"}
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    color: isButtonDisabled(event) ? '#999' : '#1a1a2e',
                    backgroundColor: isButtonDisabled(event) ? 'transparent' : 'white',
                    borderColor: isButtonDisabled(event) ? '#444' : 'white',
                    fontWeight: 'bold',
                    py: 1.5,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    textTransform: 'none',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: isButtonDisabled(event) ? 'transparent' : '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                    },
                    '&:disabled': {
                      opacity: 0.6
                    }
                  }}
                  disabled={isButtonDisabled(event)}
                >
                  {getButtonLabel(event)}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedEvents;

