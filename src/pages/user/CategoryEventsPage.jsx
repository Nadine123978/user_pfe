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
  Button
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { toast } from "react-toastify";


const CategoryEventsPage = () => {
const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/categories/${id}/events`);
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

  // توجيه فقط إلى صفحة الحجز
  navigate(`/booking/${eventId}`);
};

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
        Events in this Category
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card
              sx={{
                backgroundColor: '#0B2A4A',
                color: 'white',
                border: '1px solid #2e3c4f',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
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
                <Typography variant="body2" color="gray">
                  {event.price}
                </Typography>
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

export default CategoryEventsPage;
