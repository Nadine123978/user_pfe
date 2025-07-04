import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserBookingDetails = () => {
  const { id } = useParams(); // bookingId from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8081/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooking(response.data);
      } catch (err) {
        setError("Failed to load your booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!booking) return <Alert severity="info">Booking not found.</Alert>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, background: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Booking Details
      </Typography>

      <Typography><strong>Event:</strong> {booking.event?.title}</Typography>
      <Typography><strong>Date:</strong> {new Date(booking.event?.startDate).toLocaleDateString()}</Typography>
      <Typography><strong>Seats:</strong> {booking.seats?.map(s => s.code).join(", ") || "N/A"}</Typography>
      <Typography><strong>Status:</strong> {booking.status}</Typography>

      {booking.confirmed && (
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await axios.get(`http://localhost:8081/api/bookings/${booking.id}/ticket`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
              });

              const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `ticket_${booking.id}.pdf`);
              document.body.appendChild(link);
              link.click();
              link.remove();
            } catch {
              alert("Unable to download ticket.");
            }
          }}
        >
          Download Ticket
        </Button>
      )}
    </Box>
  );
};

export default UserBookingDetails;
