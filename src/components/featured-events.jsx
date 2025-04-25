// src/components/FeaturedEvents.jsx
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const events = [
  {
    title: 'Digital thinkers meetup',
    date: '29 Jan',
    location: 'Grand Chapiteau',
    price: '$200 - $300',
    image: 'https://images.unsplash.com/photo-1581091012184-5c46a46b2a7d', // استبدل بالصور يلي بدك ياها
    disabled: true,
  },
  {
    title: 'Web design conference 2023',
    date: '29 Jan',
    location: 'Grand Chapiteau',
    price: '$100 - $200',
    image: 'https://images.unsplash.com/photo-1515162305285-1f0a5cfc2d4e',
    disabled: true,
  },
  {
    title: 'Digital Economy Conference 2023',
    date: '29 Jan',
    location: 'Grand Chapiteau',
    price: '$250 - $300',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0',
    disabled: false,
  }
];

const FeaturedEvents = () => {
  const navigate = useNavigate(); // 👈 ضيفها هون

  const handleBook = async (eventIndex) => {
    try {
      const userId = localStorage.getItem("userId"); // لازم تكون خزنتها بعد الـ login
      const eventId = eventIndex + 1; // حسب ترتيب الأحداث أو عدّله حسب ID الحقيقي من الـ DB

      await axios.post("http://localhost:8081/api/bookings/create", null, {
        params: { userId, eventId },
      });

      navigate("/booking-success"); // أو أي صفحة بدك تنتقل إلها
    } catch (error) {
      console.error("❌ Booking error:", error);
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
        {events.map((event, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: '#0B2A4A', color: 'white', border: '1px solid #2e3c4f' }}>
              <CardMedia
                component="img"
                height="180"
                image={event.image}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="body2" color="gray">{event.price}</Typography>
                <Typography variant="h6" fontWeight="bold" mt={1} mb={1}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="gray" mb={2}>
                  {event.date} | {event.location}
                </Typography>
                <Button
                  variant={event.disabled ? 'outlined' : 'contained'}
                  disabled={event.disabled}
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    color: event.disabled ? '#999' : 'black',
                    backgroundColor: event.disabled ? 'transparent' : 'white',
                    borderColor: event.disabled ? '#444' : 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Get Tickets
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
