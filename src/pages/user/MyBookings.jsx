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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

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

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status?.toLowerCase() === filterStatus.toLowerCase());

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        🎟️ My Bookings
      </Typography>

      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="filter-status-label">Filter by Status</InputLabel>
        <Select
          labelId="filter-status-label"
          id="filter-status"
          value={filterStatus}
          label="Filter by Status"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="unpaid">Unpaid</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" mt={3}>
          {error}
        </Typography>
      ) : filteredBookings.length === 0 ? (
        <Typography variant="body1" mt={3}>
          No bookings found for selected status.
        </Typography>
      ) : (
       <Grid container spacing={4}>
  {filteredBookings.map((booking) => {
    console.log("Booking Status:", booking.status);
    return (
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
            <Typography variant="body2" mt={1}>
              Status: <strong>{booking.status}</strong>
            </Typography>
            <Typography variant="body2">
              Payment: <strong>{booking.status}</strong>
            </Typography>

            {(booking.status?.toLowerCase() === "unpaid" ||
              booking.status?.toLowerCase() === "pending") && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate("/checkout", { state: { bookingId: booking.id } });
                }}
              >
                Continue Booking
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  })}
</Grid>

      )}
    </Container>
  );
};

export default MyBookings;
