import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Toolbar, CssBaseline } from '@mui/material';
import { Dashboard, Category, Event, Group, Bookmark, BookOnline, Cancel } from '@mui/icons-material';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import axios from 'axios';

const drawerWidth = 240;

const StatCard = ({ title, value, color, icon, onClick }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      color: '#fff',
      borderRadius: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 160,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        '& .stat-icon': {
          transform: 'scale(1.1) rotate(5deg)',
        },
        '& .view-button': {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          transform: 'translateY(-2px)',
        }
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        transform: 'translate(30px, -30px)',
      }
    }}
  >
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
      <Box flex={1}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '0.875rem',
            fontWeight: 500,
            opacity: 0.9,
            mb: 1,
            letterSpacing: '0.5px'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.2,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box 
        className="stat-icon"
        sx={{ 
          fontSize: 48,
          opacity: 0.8,
          transition: 'all 0.3s ease',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
        }}
      >
        {icon}
      </Box>
    </Box>
    <Button
      onClick={onClick}
      className="view-button"
      sx={{ 
        mt: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: color,
        fontWeight: 600,
        borderRadius: 2,
        fontSize: '0.75rem',
        textTransform: 'none',
        py: 1,
        px: 2,
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }
      }}
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

  // Professional color scheme
  const colors = {
    categories: '#6366f1',    // Indigo - Professional, organized
    sponsors: '#10b981',      // Success Green - Growth, partnership
    events: '#f97316',        // Orange - Energy, activity
    users: '#14b8a6',         // Teal - Community, engagement
    bookings: '#3b82f6',      // Info Blue - Information, data
    newBookings: '#8b5cf6',   // Purple - New, special attention
    confirmedBookings: '#10b981', // Success Green - Success, completion
    cancelledBookings: '#ef4444', // Danger Red - Issues, attention needed
    subscribers: '#4f46e5'    // Slate Blue - Primary, important
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#1f2937',
              fontSize: '2.5rem',
              mb: 1,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
          >
            Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6b7280',
              fontSize: '1.1rem',
              fontWeight: 400
            }}
          >
            Welcome back! Here's what's happening with your events today.
          </Typography>
        </Box>
        
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Listed Categories" 
              value={stats.categories} 
              color={colors.categories} 
              icon={<Category fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Sponsors" 
              value={stats.sponsors} 
              color={colors.sponsors} 
              icon={<Dashboard fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Total Events" 
              value={stats.events} 
              color={colors.events} 
              icon={<Event fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Total Reg. Users" 
              value={stats.users} 
              color={colors.users} 
              icon={<Group fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Total Bookings" 
              value={stats.bookings} 
              color={colors.bookings} 
              icon={<Bookmark fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="New Booking" 
              value={stats.newBookings} 
              color={colors.newBookings} 
              icon={<BookOnline fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Confirmed Booking" 
              value={stats.confirmedBookings} 
              color={colors.confirmedBookings} 
              icon={<BookOnline fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Cancelled Bookings" 
              value={stats.cancelledBookings} 
              color={colors.cancelledBookings} 
              icon={<Cancel fontSize="inherit" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard 
              title="Total Reg. Subscriber" 
              value={stats.subscribers} 
              color={colors.subscribers} 
              icon={<Group fontSize="inherit" />} 
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

