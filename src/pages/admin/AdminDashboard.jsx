import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Toolbar, CssBaseline } from '@mui/material';
import { Dashboard, Category, Event, Group, Bookmark, BookOnline, Cancel } from '@mui/icons-material';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import axios from 'axios';

const drawerWidth = 240;

const StatCard = ({ title, value, color, icon, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      backgroundColor: color,
      color: '#fff',
      borderRadius: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 140,
    }}
  >
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h5" fontWeight="bold">{value}</Typography>
      </Box>
      <Box fontSize={45}>{icon}</Box>
    </Box>
    <Button
      onClick={onClick}
      sx={{ mt: 2, backgroundColor: '#fff', color: color, fontWeight: 500, borderRadius: 10, fontSize: '0.7rem' }}
      variant="contained"
    >
      View Details
    </Button>
  </Paper>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    sponsors: 0,
    events: 0,
    users: 0,
    bookings: 0,
    newBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    subscribers: 0
  });

  useEffect(() => {
    axios.get('http://localhost:8081/api/admin/stats')
      .then(res => {
        const data = res.data;
        setStats({
          categories: data.categoryCount,
          sponsors: data.sponsorCount,
          events: data.eventCount,
          users: data.userCount,
          bookings: data.totalBookingCount,
          newBookings: data.newBookingCount,
          confirmedBookings: data.confirmedBookingCount,
          cancelledBookings: data.cancelledBookingCount,
          subscribers: data.subscriberCount
        });
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f6fa',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: '#333' }}>
          Dashboard
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Listed Categories" value={stats.categories} color="#2980b9" icon={<Category fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Sponsors" value={stats.sponsors} color="#27ae60" icon={<Dashboard fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Events" value={stats.events} color="#f39c12" icon={<Event fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Reg. Users" value={stats.users} color="#c0392b" icon={<Group fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Bookings" value={stats.bookings} color="#e67e22" icon={<Bookmark fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="New Booking" value={stats.newBookings} color="#2980b9" icon={<BookOnline fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Confirmed Booking" value={stats.confirmedBookings} color="#27ae60" icon={<BookOnline fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Cancelled Bookings" value={stats.cancelledBookings} color="#c0392b" icon={<Cancel fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Reg. Subscriber" value={stats.subscribers} color="#2980b9" icon={<Group fontSize="inherit" />} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
