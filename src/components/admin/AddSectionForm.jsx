import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip, MenuItem, Select, FormControl, InputLabel, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL'); // الحالة المختارة للفلتر
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cleanData = response.data.map(booking => {
          const { event, ...rest } = booking;
          return {
            ...rest,
            event: event ? { ...event, bookings: undefined } : null,
          };
        });

        setBookings(cleanData);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  // فلترة الحجوزات حسب الحالة المختارة
  const filteredBookings = filterStatus === 'ALL'
    ? bookings
    : bookings.filter(b => b.status?.toUpperCase() === filterStatus);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>All Bookings</Typography>

      <Box sx={{ mb: 2, maxWidth: 200 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="filter-status-label">Filter by Status</InputLabel>
          <Select
            labelId="filter-status-label"
            value={filterStatus}
            label="Filter by Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="CONFIRMED">Confirmed</MenuItem>
            {/* زيد حسب الحالات المتوفرة عندك */}
          </Select>
        </FormControl>
      </Box>

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
            {filteredBookings.map((booking, index) => (
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
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AllBookings;
