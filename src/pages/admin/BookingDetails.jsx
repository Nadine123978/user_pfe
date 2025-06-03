import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Paper, Typography, Divider, Box, CircularProgress, Alert, Button
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

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8081/api/bookings/confirm`,
        null,
        {
          params: {
            bookingId: booking.id,
            paymentMethod: "CASH", // يمكنك تغييره لاحقًا
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Booking confirmed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      alert("Error confirming booking");
    }
  };

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
        <Typography>
          <strong>Full Name:</strong> {booking.user?.fullName ?? booking.user?.username ?? "N/A"}
        </Typography>
        <Typography><strong>Email:</strong> {booking.user?.email}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Seat</Typography>
        <Typography><strong>Code:</strong> {booking.seat?.code ?? "N/A"}</Typography>
        <Typography><strong>Price:</strong> {booking.price ? `${booking.price} $` : "N/A"}</Typography>
        <Typography><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</Typography>
      </Box>

      {/* ✅ زر تأكيد الحجز */}
      {!booking.confirmed && booking.status === "PENDING" && (
        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Button variant="contained" color="success" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Box>
      )}

      {/* ✅ زر تحميل التذكرة بعد التأكيد */}
      {booking.confirmed && (
        <Box sx={{ textAlign: 'right', mt: 2 }}>
       <Button
  variant="outlined"
  color="primary"
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8081/api/bookings/${booking.id}/ticket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // مهم لتحميل PDF
      });

      // إنشاء رابط لتحميل الملف
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket_${booking.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Unable to download ticket.");
    }
  }}
>
  Download Ticket (PDF)
</Button>

        </Box>
      )}
    </Paper>
  );
};

export default BookingDetails;
