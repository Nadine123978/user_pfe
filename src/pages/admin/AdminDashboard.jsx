import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Toolbar, CssBaseline } from '@mui/material';
import { Dashboard, Category, Event, Group, Bookmark, BookOnline, Cancel } from '@mui/icons-material';
import Header from '../../components/admin/Header';
import axios from 'axios';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // لازم إذا تستخدم React Router


// ثيم بنفسجي-أزرق مخصص (cosmic design)
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',  // بنفسجي أزرق
    },
    secondary: {
      main: '#06b6d4',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 800,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
          '&.MuiButton-outlined': {
            border: '1px solid rgba(99, 102, 241, 0.5)',
            color: '#6366f1',
            '&:hover': {
              border: '1px solid #6366f1',
              background: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  },
});

// Keyframe animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
`;

// Styled components
const CosmicContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    animation: `${floatAnimation} 8s ease-in-out infinite`,
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 0,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 4s linear infinite`,
  },
  '&::before': {
    top: '20%',
    left: '15%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '70%',
    right: '20%',
    animationDelay: '2s',
    background: '#06b6d4',
  },
});

const MainContent = styled(Box)({
  flexGrow: 1,
  marginLeft: '100px', // This is the line to adjust
  padding: '32px',
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
  background: 'transparent',
});

const HeroSection = styled(Box)({
  marginBottom: '48px',
  textAlign: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1,
  },
});

const HeroTitle = styled(Typography)({
  fontWeight: 800,
  fontSize: '3.5rem',
  marginBottom: '16px',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  '@media (max-width: 768px)': {
    fontSize: '2.5rem',
  },
});

const HeroSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1.2rem',
  fontWeight: 500,
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
});

const StatCard = styled(Box)(({ color }) => ({
  padding: '32px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '200px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 20px 60px ${color}40`,
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: `${color}50`,
    '& .stat-icon': {
      transform: 'scale(1.2) rotate(10deg)',
      color: color,
      animation: `${pulseGlow} 2s ease-in-out infinite`,
    },
    '& .view-button': {
      background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
      color: '#fff',
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 32px ${color}60`,
    },
    '& .stat-value': {
      transform: 'scale(1.1)',
      textShadow: `0 0 20px ${color}80`,
    },
    '&::after': {
      opacity: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${color}, #6366f1)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
    transition: 'all 0.6s ease',
    opacity: 0,
  },
}));

const StatIcon = styled(Box)({
  fontSize: '56px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
  color: 'rgba(255, 255, 255, 0.7)',
});

const StatValue = styled(Typography)({
  fontWeight: 800,
  fontSize: '3rem',
  lineHeight: 1.1,
  color: '#ffffff',
  transition: 'all 0.3s ease',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
});

const StatTitle = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: '16px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
});

const ViewButton = styled(Button)({
  marginTop: 'auto',
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 700,
  borderRadius: '12px',
  fontSize: '0.85rem',
  textTransform: 'none',
  padding: '12px 24px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
    color: '#fff',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
  },
});

const StatsGrid = styled(Grid)({
  '& .MuiGrid-item': {
    display: 'flex',
  },
});

const StatCardComponent = ({ title, value, color, icon, onClick }) => (
  <StatCard color={color}>
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={3}>
      <Box flex={1}>
        <StatTitle>{title}</StatTitle>
        <StatValue className="stat-value">{value}</StatValue>
      </Box>
      <StatIcon className="stat-icon">
        {icon}
      </StatIcon>
    </Box>
    <ViewButton
      className="view-button"
      variant="contained"
      onClick={onClick}  // ربط الحدث بالزر
    >
      View Details
    </ViewButton>
  </StatCard>
);


export default function AdminDashboard() {
   const navigate = useNavigate();
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

  // Cosmic color scheme
  const colors = {
    categories: '#6366f1',    // Primary cosmic purple
    sponsors: '#10b981',      // Emerald green
    events: '#f59e0b',        // Amber yellow
    users: '#06b6d4',         // Cyan blue
    bookings: '#3b82f6',      // Blue
    newBookings: '#8b5cf6',   // Purple
    confirmedBookings: '#10b981', // Green
    cancelledBookings: '#ef4444', // Red
    subscribers: '#6366f1'    // Primary purple
  };

   const handleViewEventsDetails = () => {
    navigate('/admin/events-bookings'); // عنوان الصفحة التي تعرض الرسم البياني أو تفاصيل الأحداث
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <CssBaseline />
        <FloatingParticles />
        <Header />
      
        
        <MainContent>
          <HeroSection>
            <HeroTitle variant="h2">
               Admin Dashboard
            </HeroTitle>
          
          </HeroSection>
          
          <StatsGrid container spacing={4} alignItems="stretch">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" Listed Categories" 
                value={stats.categories} 
                color={colors.categories} 
                icon={<Category fontSize="inherit" />} 
              />
            </Grid>
           
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" Total Events" 
                value={stats.events} 
                color={colors.events} 
                icon={<Event fontSize="inherit" />} 
                onClick={handleViewEventsDetails}  // تمرير دالة التنقل للزر

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" Registered Users" 
                value={stats.users} 
                color={colors.users} 
                icon={<Group fontSize="inherit" />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" Total Bookings" 
                value={stats.bookings} 
                color={colors.bookings} 
                icon={<Bookmark fontSize="inherit" />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" New Bookings" 
                value={stats.newBookings} 
                color={colors.newBookings} 
                icon={<BookOnline fontSize="inherit" />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" Confirmed Bookings" 
                value={stats.confirmedBookings} 
                color={colors.confirmedBookings} 
                icon={<BookOnline fontSize="inherit" />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <StatCardComponent 
                title=" Cancelled Bookings" 
                value={stats.cancelledBookings} 
                color={colors.cancelledBookings} 
                icon={<Cancel fontSize="inherit" />} 
              />
            </Grid>
          
          </StatsGrid>
        </MainContent>
      </CosmicContainer>
    </ThemeProvider>
  );
}

