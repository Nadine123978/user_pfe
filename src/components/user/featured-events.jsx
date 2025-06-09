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
    <Box sx={{ backgroundColor: '#052641', py: 6, px: 4, borderRadius: '24px', mt: 8 }}>
      <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
        Featured Events
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        Be sure not to miss these Events today.
      </Typography>

      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card sx={{ backgroundColor: '#0B2A4A', color: 'white', border: '1px solid #2e3c4f' }}>
              <CardMedia
                component="img"
                height="180"
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
              />
              <CardContent>
                <Typography variant="body2" color="gray">{event.price}</Typography>
                <Typography variant="h6" fontWeight="bold" mt={1} mb={1}>
                  {event.title}
                </Typography>
<Typography variant="body2" color="gray" mb={2}>
  {event.startDate ? new Date(event.startDate).toLocaleDateString() : "Date N/A"} | {event.location?.fullAddress || "Location N/A"}
</Typography>


                <Button
                  onClick={() => handleButtonClick(event)}
                  variant={isButtonDisabled(event) ? "outlined" : "contained"}
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    color: isButtonDisabled(event) ? '#999' : 'black',
                    backgroundColor: isButtonDisabled(event) ? 'transparent' : 'white',
                    borderColor: isButtonDisabled(event) ? '#444' : 'white',
                    fontWeight: 'bold',
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
