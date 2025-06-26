import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardMedia,
  Typography, Button, Grid, Chip, Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styled components for enhanced visual appeal
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(106, 27, 154, 0.2)',
  },
}));

const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled 
    ? 'linear-gradient(45deg, #e0e0e0, #bdbdbd)' 
    : 'linear-gradient(45deg, #6a1b9a, #8e24aa)',
  border: 0,
  borderRadius: 25,
  color: disabled ? '#757575' : 'white',
  height: 48,
  padding: '0 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: disabled 
      ? 'linear-gradient(45deg, #e0e0e0, #bdbdbd)' 
      : 'linear-gradient(45deg, #4a148c, #6a1b9a)',
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'none' : '0 8px 25px rgba(106, 27, 154, 0.3)',
  },
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
  height: 28,
  '& .MuiChip-label': {
    padding: '0 12px',
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236a1b9a" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingEventsWithBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!userId) {
          toast.error("User ID not found. Please login again.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8081/api/events/upcoming-with-booking?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
        toast.error("Failed to load events.");
      }
    };

    fetchUpcomingEventsWithBooking();
  }, []);

  const handleButtonClick = (event) => {
    const status = event.bookingStatus?.toUpperCase();
    if (event.alreadyBooked) {
      switch (status) {
        case 'PENDING':
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
    if (event.alreadyBooked) {
      switch (event.bookingStatus?.toUpperCase()) {
        case 'PENDING':
          return "Continue Booking";
        case 'CANCELLED':
          return "Book Again";
        case 'PAID':
        case 'CONFIRMED':
          return "View Tickets";
        default:
          return "Book Now";
      }
    }
    return "Book Now";
  };

  const isButtonDisabled = (event) => {
    const status = event.bookingStatus?.toUpperCase();
    return event.alreadyBooked && (status === 'PAID' || status === 'CONFIRMED');
  };

  return (
    <SectionContainer sx={{ py: 12, px: { xs: 2, md: 6 } }}>
      <ContentWrapper>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              background: 'linear-gradient(45deg, #6a1b9a, #8e24aa)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Featured Events
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: '#555', 
              fontWeight: 300,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover extraordinary experiences handpicked just for you
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ maxWidth: 1400, mx: 'auto' }}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id}>
              <StyledCard>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={event.imageUrl?.startsWith("http") ? event.imageUrl : `http://localhost:8081${event.imageUrl}`}
                    alt={event.title}
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                    }}
                  >
                    <PriceChip 
                      label={event.priceRange || "Free"} 
                      size="small"
                    />
                  </Box>
                </Box>
                
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                      mb: 2,
                      lineHeight: 1.3,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {event.title}
                  </Typography>
                  
                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CalendarTodayIcon sx={{ fontSize: 18, color: '#6a1b9a' }} />
                      <Typography
                        variant="body2"
                        sx={{ color: '#666', fontWeight: 500 }}
                      >
                        {event.startDate ? new Date(event.startDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : "Date N/A"}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOnIcon sx={{ fontSize: 18, color: '#6a1b9a' }} />
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: '#666', 
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {event.location || "Location N/A"}
                      </Typography>
                    </Stack>
                  </Stack>
                  
                  <GradientButton
                    onClick={() => handleButtonClick(event)}
                    fullWidth
                    endIcon={<OpenInNewIcon />}
                    disabled={isButtonDisabled(event)}
                  >
                    {getButtonLabel(event)}
                  </GradientButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FeaturedEvents;

