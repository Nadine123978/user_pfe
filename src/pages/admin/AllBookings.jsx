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
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

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
              <TableCell>Seat Code</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell> {/* ✅ عمود جديد */}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={booking.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.event?.title}</TableCell>
                <TableCell>{booking.user?.fullName}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.seat?.code}</TableCell>
                <TableCell>{booking.price} $</TableCell>
                <TableCell>{new Date(booking.createdAt).toLocaleString()}</TableCell>

                {/* ✅ زر Action */}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AllBookings;
