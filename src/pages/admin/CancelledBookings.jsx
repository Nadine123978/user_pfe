import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography
} from '@mui/material';

const CancelledBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchCancelledBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // فلترة الحجوزات الملغاة
        const cancelled = response.data.filter(
          booking => booking.status === "CANCELLED"
        );

        setBookings(cancelled);
      } catch (error) {
        console.error('Error fetching cancelled bookings:', error);
      }
    };

    fetchCancelledBookings();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Cancelled Bookings</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Booking ID</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <TableRow key={booking.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.event?.title}</TableCell>
                  <TableCell>{booking.user?.fullName || booking.user?.email}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {/* Actions مثل استرجاع الحجز أو حذف نهائي */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No cancelled bookings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CancelledBookings;
