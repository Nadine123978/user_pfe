import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Paper, Typography, Divider, Box, CircularProgress, Alert
} from '@mui/material';

const BookingDetails = () => {
  const { id } = useParams(); // bookingId from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8081/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(response.data);
      } catch (err) {
        setError("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!booking) return <Alert severity="info">No booking found</Alert>;

  return (
    <Paper sx={{ padding: 3, maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Booking Details</Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography><strong>Booking ID:</strong> {booking.id}</Typography>
        <Typography><strong>Status:</strong> {booking.status}</Typography>
        <Typography><strong>Confirmed:</strong> {booking.confirmed ? "Yes" : "No"}</Typography>
        <Typography><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</Typography>
        <Typography><strong>Expires At:</strong> {booking.expiresAt ? new Date(booking.expiresAt).toLocaleString() : 'N/A'}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Event</Typography>
        <Typography><strong>Title:</strong> {booking.event?.title}</Typography>
        <Typography><strong>Event ID:</strong> {booking.event?.id}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">User</Typography>
        <Typography><strong>Full Name:</strong> {booking.user?.fullName || "N/A"}</Typography>
        <Typography><strong>Email:</strong> {booking.user?.email}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Seat</Typography>
        <Typography><strong>Code:</strong> {booking.seat?.code}</Typography>
        <Typography><strong>Price:</strong> {booking.price} $</Typography>
        <Typography><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</Typography>
      </Box>
    </Paper>
  );
};

export default BookingDetails;
