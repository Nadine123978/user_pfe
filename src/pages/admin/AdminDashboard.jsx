import React from 'react';
import { Box, Grid, Paper, Typography, Button, Toolbar, CssBaseline, AppBar } from '@mui/material';
import { Dashboard, Category, Event, Group, Bookmark, BookOnline, Cancel } from '@mui/icons-material';
import Sidebar from '../../components/admin/Sidebar';

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
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2c3e50' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Event Management System | Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f6fa',
          minHeight: '100vh',
          py: 4,
          pr: 4,
          pl: 2,
          mt: '64px'
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: '#333' }}>
          Dashboard
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Listed Categories" value={6} color="#2980b9" icon={<Category fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Sponsors" value={4} color="#27ae60" icon={<Dashboard fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Events" value={2} color="#f39c12" icon={<Event fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Reg. Users" value={1} color="#c0392b" icon={<Group fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Bookings" value={1} color="#e67e22" icon={<Bookmark fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="New Booking" value={1} color="#2980b9" icon={<BookOnline fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Confirmed Booking" value={0} color="#27ae60" icon={<BookOnline fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Cancelled Bookings" value={0} color="#c0392b" icon={<Cancel fontSize="inherit" />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Reg. Subscriber" value={1} color="#2980b9" icon={<Group fontSize="inherit" />} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
