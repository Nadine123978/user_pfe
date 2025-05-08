import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/events/featured");
        console.log("✅ Events:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("❌ Error fetching featured events:", error);
      }
    };
  
    fetchFeaturedEvents();
  }, []);
  
  const handleBook = async (eventId) => {
    const userId = localStorage.getItem("userId");
console.log("Retrieved userId:", userId);  // تحقق من أن الـ userId موجود
if (!userId) {
  alert("Please log in first.");
  navigate("/login");  // توجيه المستخدم إلى صفحة تسجيل الدخول
  return;
}

    try {
      // هنا userId سيكون رقم (Long) وليس string
      const response = await axios.post(`http://localhost:8081/api/bookings/create?userId=${userId}&eventId=${eventId}`, null, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
  
      if (response.status === 200) {
        alert("Booking successful!");
        navigate(`/booking/${eventId}`);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Booking error:", error.response ? error.response.data : error.message);
      alert("Booking failed. Try again.");
    }
  };
  
  
  
  return (
    <Box sx={{ backgroundColor: '#052641', py: 6, px: 4, borderRadius: '24px', mt: 8 }}>
      <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
        Featured Events
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        Be sure not to miss these Event today.
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
  {event.date} | {event.location?.fullAddress}
</Typography>

                <Button
                  onClick={() => handleBook(event.id)}
                  disabled={event.disabled}
                  variant={event.disabled ? "outlined" : "contained"}
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    color: event.disabled ? '#999' : 'black',
                    backgroundColor: event.disabled ? 'transparent' : 'white',
                    borderColor: event.disabled ? '#444' : 'white',
                    fontWeight: 'bold',
                  }}
                >
                  View Tickets
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