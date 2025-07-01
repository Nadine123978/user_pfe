import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Bookings data:', response.data);

        // افصل فقط بيانات الـ bookings بدون إعادة الـ event.bookings داخل كل event
        const cleanData = response.data.map(booking => {

          const { event, ...rest } = booking;
          return {
            ...rest,
            event: event ? { ...event, bookings: undefined } : null,
          };
        });
          console.log('Cleaned bookings:', cleanData);

        setBookings(cleanData);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);  // <-- إغلاق الـ useEffect

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>All Bookings</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Booking ID</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Seat Codes</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {bookings.map((booking, index) => {
    console.log(booking.seats);  // هون تحط اللوج لتشوف بيانات المقاعد
 console.log(`Booking ID: ${booking.id}, Seats:`, booking.seats);
    return (
      <TableRow key={booking.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{booking.id}</TableCell>
        <TableCell>{booking.event?.title || 'No Event'}</TableCell>
        <TableCell>{booking.user?.username || 'No User'}</TableCell>
        <TableCell>{booking.status}</TableCell>
       <TableCell>
  {booking.seats && booking.seats.length > 0
    ? booking.seats.map(seat => seat.code).join(', ')
    : <em>No seats for this booking</em>}
</TableCell>

        <TableCell>{booking.price ? `${booking.price} $` : 'N/A'}</TableCell>
        <TableCell>
          {booking.createdAt
            ? new Date(booking.createdAt).toLocaleString()
            : 'N/A'}
        </TableCell>
        <TableCell>
          <Tooltip title="View Details">
            <IconButton
              color="primary"
              onClick={() => navigate(`/admin/bookings/${booking.id}`)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AllBookings;
