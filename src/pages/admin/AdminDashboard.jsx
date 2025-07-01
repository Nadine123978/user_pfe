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
      p: 4,
      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 180,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0, 0.04)',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
      backdropFilter: 'blur(10px)',
      '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 12px 40px ${color}25`,
        borderLeft: `4px solid ${color}`,
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        '& .stat-icon': {
          transform: 'scale(1.15) rotate(8deg)',
          color: color,
        },
        '& .view-button': {
          backgroundColor: color,
          color: '#fff',
          transform: 'translateY(-2px)',
          boxShadow: `0 6px 20px ${color}40`,
        },
        '& .stat-value': {
          transform: 'scale(1.05)',
        }
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -50,
        right: -50,
        width: '120px',
        height: '120px',
        background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
        borderRadius: '50%',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: '80px',
        height: '80px',
        background: `radial-gradient(circle, ${color}05 0%, transparent 70%)`,
        borderRadius: '50%',
      }
    }}
  >
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={3}>
      <Box flex={1}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#64748b',
            mb: 2,
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </Typography>
        <Typography 
          className="stat-value"
          variant="h3" 
          sx={{ 
            fontWeight: 800,
            fontSize: '2.75rem',
            lineHeight: 1.1,
            color: '#1e293b',
            transition: 'all 0.3s ease',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box 
        className="stat-icon"
        sx={{ 
          fontSize: 56,
          color: `${color}80`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
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
        backgroundColor: '#f8fafc',
        color: color,
        fontWeight: 700,
        borderRadius: 3,
        fontSize: '0.8rem',
        textTransform: 'none',
        py: 1.5,
        px: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${color}20`,
        '&:hover': {
          backgroundColor: color,
          color: '#fff',
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

  // Beautiful lighter color scheme inspired by the reference image
  const colors = {
    categories: '#6366f1',    // Soft indigo - Professional, organized
    sponsors: '#10b981',      // Fresh emerald - Growth, partnership
    events: '#f59e0b',        // Warm amber - Energy, activity
    users: '#06b6d4',         // Bright cyan - Community, engagement
    bookings: '#3b82f6',      // Vibrant blue - Information, data
    newBookings: '#8b5cf6',   // Soft purple - New, special attention
    confirmedBookings: '#10b981', // Success emerald - Success, completion
    cancelledBookings: '#ef4444', // Alert red - Issues, attention needed
    subscribers: '#6366f1'    // Primary indigo - Important
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
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
          minHeight: '100vh',
          p: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(16, 185, 129, 0.02) 100%)',
            zIndex: 0,
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 5 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                color: '#0f172a',
                fontSize: '3rem',
                mb: 2,
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              Dashboard
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#64748b',
                fontSize: '1.2rem',
                fontWeight: 500,
                maxWidth: '600px'
              }}
            >
              Welcome back! Here's a comprehensive overview of your event management platform's performance and key metrics.
            </Typography>
          </Box>
          
          <Grid container spacing={4} alignItems="stretch">
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
                title="Active Sponsors" 
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
                title="Registered Users" 
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
                title="New Bookings" 
                value={stats.newBookings} 
                color={colors.newBookings} 
                icon={<BookOnline fontSize="inherit" />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCard 
                title="Confirmed Bookings" 
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
                title="Newsletter Subscribers" 
                value={stats.subscribers} 
                color={colors.subscribers} 
                icon={<Group fontSize="inherit" />} 
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

