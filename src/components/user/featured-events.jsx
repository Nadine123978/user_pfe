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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%', // ✅ Ensure all cards have same height
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(233, 30, 99, 0.2)',
  },
}));

const SeeAllButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  borderRadius: 25,
  padding: '12px 30px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
  },
}));

const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled 
    ? 'linear-gradient(45deg, #444444, #555555)' 
    : 'linear-gradient(45deg, #D81B60, #E91E63)',
  border: 0,
  borderRadius: 25,
  color: disabled ? '#999999' : 'white',
  height: 48,
  padding: '0 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: disabled 
      ? 'linear-gradient(45deg, #444444, #555555)' 
      : 'linear-gradient(45deg, #C2185B, #D81B60)',
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'none' : '0 8px 25px rgba(233, 30, 99, 0.3)',
  },
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #E91E63, #D81B60)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
  height: 28,
  '& .MuiChip-label': {
    padding: '0 12px',
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  background: '#200245',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23E91E63\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" )',
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

      const url = userId 
        ? `http://localhost:8081/api/events/upcoming-with-booking?userId=${userId}`
        : `http://localhost:8081/api/events/upcoming`;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(url, { headers });
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
  const userId = localStorage.getItem("userId");

  if (userId && event.alreadyBooked) {
    switch (status) {
      case 'PENDING':
        navigate("/checkout", { state: { bookingId: event.bookingId } });
        break;
      case 'CANCELLED':
        navigate(`/booking/${event.id}`);
        break;
      case 'PAID':
      case 'CONFIRMED':
        navigate(`/user/detail/${event.bookingId}`);
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
  return false; // أو فقط تعطل في حالات معينة غير "PAID" و "CONFIRMED"
};


  const visibleEvents = events.slice(0, 4);

  return (
    <SectionContainer sx={{ py: 12, px: { xs: 2, md: 6 } }}>
      <ContentWrapper>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              background: 'linear-gradient(45deg, #ffffff, #E91E63, #D81B60)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Upcoming Events
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 300,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover extraordinary experiences handpicked just for you
          </Typography>        
          <SeeAllButton
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/all-upcoming-event")}
          >
            Explore All Events
          </SeeAllButton>
        </Box>

        <Grid container spacing={4} sx={{ maxWidth: 1400, mx: 'auto' }}>
          {visibleEvents.map((event) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id} sx={{ display: 'flex' }}>
              <StyledCard>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={event.imageUrl ? (event.imageUrl.startsWith("http") ? event.imageUrl : `http://localhost:8081${event.imageUrl}`) : "/default-event-image.jpg"}
                    alt={event.title}
                    sx={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 240,
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
                      zIndex: 3,
                    }}
                  >
                    <PriceChip 
                      label={event.priceRange || "Free"} 
                      size="small"
                    />
                  </Box>
                </Box>
                
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: ' #200245',
                        mb: 2,
                        lineHeight: 1.3,
                        fontFamily: "'Inter', sans-serif",
                        display: '-webkit-box',
                        WebkitLineClamp: 2,      // تحديد عدد الأسطر (2 هنا)
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {event.title}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarTodayIcon sx={{ fontSize: 18, color: '#E91E63' }} />
                        <Typography
                          variant="body2"
                          sx={{ color:'  #200245', fontWeight: 500 }}
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
                        <LocationOnIcon sx={{ fontSize: 18, color: '#E91E63' }} />
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: ' #200245',
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {event.location
                            ? (event.location.length > 25
                                ? event.location.substring(0, 25) + "..."
                                : event.location)
                            : "Location N/A"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

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
