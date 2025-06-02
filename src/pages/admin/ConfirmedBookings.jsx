import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography
} from '@mui/material';

const ConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // فلترة الحجوزات المؤكدة
        const confirmed = response.data.filter(
          booking => booking.status === "CONFIRMED" || booking.confirmed === true
        );

        setBookings(confirmed);
      } catch (error) {
        console.error('Error fetching confirmed bookings:', error);
      }
    };

    fetchConfirmedBookings();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Confirmed Bookings</Typography>
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
                    {/* Action buttons (ex: print ticket, download, etc.) */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No confirmed bookings available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ConfirmedBookings;
