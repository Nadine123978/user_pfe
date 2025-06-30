import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';

const AllUpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      // إذا showAll مفعل، نستخدم رابط يعرض كل الأحداث upcoming & active
      // غير ذلك نعرض upcoming events مع الحجز الخاص بالمستخدم فقط
      const url = showAll
        ? `http://localhost:8081/api/events/by-status?status=upcoming&status=active`
        : `http://localhost:8081/api/events/upcoming-with-booking?userId=${userId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
      setLoading(false);
    }
  };

  // كل مرة showAll تتغير، يعيد جلب الأحداث
  useEffect(() => {
    fetchEvents();
  }, [showAll]);

  // الفلترة حسب العنوان أو العنوان الكامل للموقع
  const filteredEvents = events.filter((event) => {
    const title = event.title || "";
    const location = event.location?.fullAddress || "";
    const search = searchTerm.toLowerCase();

    const matchesTitle = title.toLowerCase().includes(search);
    const matchesLocation = location.toLowerCase().includes(search);

    return matchesTitle || matchesLocation;
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#200245',
          color: 'white',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 'bold', color: '#200245' }}
      >
        {showAll ? "All Events (Upcoming & Active)" : "Upcoming Events"}
      </Typography>

      {/* زر التبديل بين عرض الكل والأحداث القادمة فقط */}
      <FormControlLabel
        control={
          <Switch
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
            color="primary"
          />
        }
        label="Show All Events"
        sx={{ mb: 4 }}
      />

      {/* خانة البحث */}
      <TextField
        fullWidth
        placeholder="Search events by title or location..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 4,
          '& .MuiInputBase-root': {
            backgroundColor: '#3A0060',
            borderRadius: '30px',
            color: 'white',
            height: 55,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)',
            opacity: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', mr: 1 }} />
            </InputAdornment>
          ),
        }}
      />

      {filteredEvents.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h5" sx={{ color: '#E0E0E0', mb: 2 }}>
            No events found.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Try adjusting your search or check back later!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    event.imageUrl?.startsWith("http")
                      ? event.imageUrl
                      : `http://localhost:8081${event.imageUrl}`
                  }
                  alt={event.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 'bold', color: '#200245' }}
                  >
                    {event.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(45deg, #D81B60, #E91E63)',
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #C2185B, #D81B60)',
                      },
                    }}
                    onClick={() => navigate(`/booking/${event.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllUpcomingEvent;
