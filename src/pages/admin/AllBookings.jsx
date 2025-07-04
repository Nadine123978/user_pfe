import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip, MenuItem, Select, FormControl, InputLabel, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

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
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #6366f1',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), 0 8px 32px rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-2px)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
        },
        head: {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
          color: '#6366f1',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '0.9rem',
          textShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
            animation: 'headerShimmer 3s ease-in-out infinite',
          },
          '@keyframes headerShimmer': {
            '0%': { transform: 'translateX(-100%)', opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { transform: 'translateX(100%)', opacity: 0 },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
            transform: 'translateX(8px) scale(1.01)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#6366f1',
          transition: 'all 0.3s ease',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.1)',
          '&:hover': {
            color: '#06b6d4',
            background: 'rgba(99, 102, 241, 0.2)',
            transform: 'scale(1.1)',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
          },
        },
      },
    },
  },
});

// Styled components للستايل الجميل
const CosmicContainer = styled(Box)({
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
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: 'sparkle 3s linear infinite',
  },
  '&::before': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '60%',
    right: '15%',
    animationDelay: '1.5s',
    background: '#06b6d4',
  },
  '@keyframes sparkle': {
    '0%, 100%': { opacity: 0, transform: 'scale(0)' },
    '50%': { opacity: 1, transform: 'scale(1)' },
  },
});

const GlassmorphismPaper = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '1400px',
  margin: 'auto',
  position: 'relative',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `
      0 16px 64px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
});

const IndexCell = styled(TableCell)({
  color: 'rgba(99, 102, 241, 0.8) !important',
  fontWeight: '600 !important',
  textAlign: 'center !important',
});

const BookingIdCell = styled(TableCell)({
  color: '#6366f1 !important',
  fontWeight: '600 !important',
  textShadow: '0 0 8px rgba(99, 102, 241, 0.3) !important',
  fontFamily: '"Inter", sans-serif !important',
});

const EventCell = styled(TableCell)({
  color: '#6366f1 !important',
  fontWeight: '600 !important',
  textShadow: '0 0 8px rgba(99, 102, 241, 0.3) !important',
});

const UserCell = styled(TableCell)({
  color: '#F0F0F0 !important',
  fontWeight: '500 !important',
});

const StatusCell = styled(TableCell)(({ status }) => ({
  fontWeight: '600 !important',
  textTransform: 'uppercase !important',
  letterSpacing: '1px !important',
  position: 'relative !important',
  color: status === 'PAID' || status === 'CONFIRMED' 
    ? '#10b981 !important' 
    : status === 'PENDING' 
    ? '#f59e0b !important' 
    : '#ef4444 !important',
  textShadow: status === 'PAID' || status === 'CONFIRMED'
    ? '0 0 8px rgba(16, 185, 129, 0.5) !important'
    : status === 'PENDING'
    ? '0 0 8px rgba(245, 158, 11, 0.5) !important'
    : '0 0 8px rgba(239, 68, 68, 0.5) !important',
  '&::before': {
    content: '"●"',
    marginRight: '8px',
    animation: 'statusPulse 2s ease-in-out infinite',
  },
  '@keyframes statusPulse': {
    '0%, 100%': { 
      opacity: 0.6,
      transform: 'scale(1)',
    },
    '50%': { 
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
}));

const SeatsCell = styled(TableCell)({
  color: 'rgba(240, 240, 240, 0.9) !important',
  fontWeight: '500 !important',
  fontSize: '0.85rem !important',
});

const PriceCell = styled(TableCell)({
  color: '#6366f1 !important',
  fontWeight: '600 !important',
  textShadow: '0 0 8px rgba(99, 102, 241, 0.3) !important',
});

const DateCell = styled(TableCell)({
  color: 'rgba(240, 240, 240, 0.7) !important',
  fontStyle: 'italic !important',
  fontSize: '0.85rem !important',
});

const NoBookingsMessage = styled(Box)({
  textAlign: 'center',
  padding: '60px',
  color: 'rgba(240, 240, 240, 0.7)',
  fontSize: '1.1rem',
});

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
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

  const filteredBookings = filterStatus === 'ALL'
    ? bookings
    : bookings.filter(b => b.status?.toUpperCase() === filterStatus);

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <Box sx={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
          <GlassmorphismPaper>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '3rem', mb: 2 }}>
                Cosmic Booking Ledger 
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                Manage your galactic event reservations with stellar precision
              </Typography>
            </Box>

            <Box sx={{ maxWidth: 250, mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="filter-status-label">
                  Filter by Status
                </InputLabel>
                <Select
                  labelId="filter-status-label"
                  value={filterStatus}
                  label="Filter by Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '12px',
                        '& .MuiMenuItem-root': {
                          color: '#F0F0F0',
                          '&:hover': {
                            background: 'rgba(99, 102, 241, 0.2)',
                          },
                          '&.Mui-selected': {
                            background: 'rgba(99, 102, 241, 0.3)',
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="ALL">All Statuses</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="PAID">Paid</MenuItem>
                  <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                  <MenuItem value="CANCELLED">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer sx={{ 
              background: 'transparent',
              borderRadius: '15px',
              overflow: 'hidden',
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Seats</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Booking Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9}>
                        <NoBookingsMessage>
                          <Typography>No bookings found in the cosmic registry</Typography>
                        </NoBookingsMessage>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking, index) => (
                      <TableRow key={booking.id}>
                        <IndexCell>
                          {String(index + 1).padStart(2, '0')}
                        </IndexCell>
                        <BookingIdCell>
                          #{booking.id}
                        </BookingIdCell>
                        <EventCell>
                          {booking.event?.title || 'Unknown Event'}
                        </EventCell>
                        <UserCell>
                          {booking.user?.username || 'Unknown User'}
                        </UserCell>
                        <StatusCell status={booking.status?.toUpperCase()}>
                          {booking.status || 'Unknown'}
                        </StatusCell>
                        
<SeatsCell>
  {booking.numberOfSeats > 0 ? `${booking.numberOfSeats} seats` : 'No seats'}
</SeatsCell>
                        <PriceCell>
                          ${booking.price || '0.00'}
                        </PriceCell>
                        <DateCell>
                          {booking.createdAt 
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : 'Unknown'
                          }
                        </DateCell>
                        <TableCell>
                          <Tooltip title="View Details">
                            <IconButton
                              onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                              size="small"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </GlassmorphismPaper>
        </Box>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default AllBookings;

