import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";

import Header from "../../components/user/Header";

// Re-using the GradientButton styled component for consistency
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 30,
  color: disabled ? '#999999' : 'white',
  height: 50,
  padding: '0 30px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)',
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)',
    transform: 'translateY(-3px)',
    boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.6)',
  },
}));


const CategoryEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/categories/${id}/events` );
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  const handleBook = (eventId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please log in first.");
      navigate("/login");
      return;
    }

    navigate(`/booking/${eventId}`);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#200245', color: 'white' }}>
      <CircularProgress color="inherit" />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#200245', minHeight: '100vh', color: 'white' }}> {/* Main page background */}
      <Header />
      <Box sx={{ pt: { xs: '64px', md: '80px' } }}> {/* Padding to account for fixed Header */}

        {/* Hero Section/Category Banner - Adjusted background color to match main page background */}
        <Box
          sx={{
            background: '#200245', // Set to main page background color to blend seamlessly
            py: { xs: 6, md: 8 },
            textAlign: 'center',
            mb: 4,
            // Removed boxShadow as it blends with the main background
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#FFFFFF', mb: 1 }}>
            Explore <Typography component="span" sx={{ color: '#E91E63' }}>{id}</Typography> Events
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Discover amazing experiences in the {id} category.
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 4, md: 6 } }}>
          {/* Search Bar - Adjusted background color and border */}
          <TextField
            fullWidth
            placeholder="Search events by title or location..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 4,
              '& .MuiInputBase-root': {
                backgroundColor: '#3A0060', // Adjusted to match image's search bar background
                borderRadius: '30px',
                color: 'white',
                height: 55,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // No visible border for search bar
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
                No events found in this category.
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
                      backgroundColor: 'linear-gradient(135deg, #2C0050, #3A0060)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.6)',
                      },
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          event.imageUrl
                            ? event.imageUrl.startsWith("http" )
                              ? event.imageUrl
                              : `http://localhost:8081${event.imageUrl}`
                            : "/default-event.jpg"
                        }
                        alt={event.title}
                        onError={(e ) => {
                          e.target.onerror = null;
                          e.target.src = "/default-event.jpg";
                        }}
                        sx={{
                          objectFit: 'cover',
                          filter: 'brightness(0.8)',
                          transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
                          '&:hover': {
                            filter: 'brightness(1)',
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                      {event.status === 'Sold Out' && (
                        <Chip
                          label="Sold Out"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#D32F2F',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                       {event.status === 'Upcoming' && (
                        <Chip
                          label="Upcoming"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#FFC107',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#E91E63', fontSize: '1.2rem', mr: 0.5 }} />
                        <Typography variant="body1" fontWeight="bold" sx={{ color: '#E91E63' }}>
                          {event.price > 0 ? `$${event.price}` : 'Free'}
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#FFFFFF', mb: 1 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EventIcon sx={{ color: '#B0B0B0', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                          {new Date(event.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ color: '#B0B0B0', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                          {event.location?.fullAddress}
                        </Typography>
                      </Box>

                      <GradientButton
                        onClick={() => handleBook(event.id)}
                        disabled={event.disabled || event.status === 'Sold Out'}
                        fullWidth
                        endIcon={<OpenInNewIcon />}
                        sx={{ mt: 2 }}
                      >
                        {event.status === 'Sold Out' ? 'Sold Out' : 'View Tickets'}
                      </GradientButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {filteredEvents.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <GradientButton variant="outlined" sx={{
                background: 'transparent',
                border: '2px solid #E91E63',
                color: '#E91E63',
                '&:hover': {
                  background: 'rgba(233, 30, 99, 0.1)',
                  borderColor: '#E91E63',
                }
              }}>
                Load More Events
              </GradientButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryEventsPage;
