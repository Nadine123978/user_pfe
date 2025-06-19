import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8081/api/bookings/mybookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(errorMsg || "Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        🎟️ My Bookings
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" mt={3}>
          {error}
        </Typography>
      ) : bookings.length === 0 ? (
        <Typography variant="body1" mt={3}>
          You have no bookings yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={booking.event?.imageUrl || "/images/default.jpg"}
                  alt={booking.event?.title || "Event Image"}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {booking.event?.title || "Untitled Event"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅{" "}
                    {booking.event?.startDate
                      ? new Date(booking.event.startDate).toLocaleDateString()
                      : "Date not available"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    📍 {booking.event?.location || "Location not specified"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyBookings;
