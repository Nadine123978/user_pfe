import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography
} from '@mui/material';

const NewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchNewBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // فلترة الحجوزات الغير مؤكدة
        const newBookings = response.data.filter(
          booking => booking.status === "NEW" || booking.confirmed === false
        );

        setBookings(newBookings);
      } catch (error) {
        console.error('Error fetching new bookings:', error);
      }
    };

    fetchNewBookings();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Manage New Bookings</Typography>
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
                    {/* زر إجراء مستقبلي (مثلاً: تأكيد، إلغاء...) */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No data available in table</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NewBookings;
