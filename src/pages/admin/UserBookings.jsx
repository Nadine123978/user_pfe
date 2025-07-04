import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  Alert, 
  CircularProgress, 
  Table, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell,
  Box,
  Typography,
  Chip,
  Avatar,
  TableContainer
} from "@mui/material";
import { styled, createTheme, ThemeProvider, keyframes } from "@mui/material/styles";

// Cosmic theme
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#06b6d4',
    },
    background: {
      default: '#0a0e27',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
});

// Keyframes for animations
const sparkleAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6), 0 0 40px rgba(6, 182, 212, 0.3); }
`;

// Styled components (same as your code, no change for brevity)
const CosmicContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4),
}));

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(6, 182, 212, 0.8), transparent),
    radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(16, 185, 129, 0.8), transparent)
  `,
  backgroundRepeat: 'repeat',
  backgroundSize: '200px 100px',
  animation: `${sparkleAnimation} 3s linear infinite`,
  pointerEvents: 'none',
});

const GlassmorphismPaper = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(4),
  position: 'relative',
  zIndex: 10,
  maxWidth: '1200px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: `linear-gradient(135deg, 
      rgba(139, 92, 246, 0.1) 0%, 
      rgba(6, 182, 212, 0.1) 50%, 
      rgba(16, 185, 129, 0.1) 100%)`,
    backgroundSize: '200% 200%',
    animation: `${shimmerAnimation} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const CosmicTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
}));

const CosmicSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
  fontWeight: '300',
}));

const CosmicTableContainer = styled(TableContainer)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  overflow: 'hidden',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    borderRadius: '10px',
    '&:hover': {
      background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
    },
  },
}));

const CosmicTable = styled(Table)(({ theme }) => ({
  '& .MuiTableHead-root': {
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(90deg, 
        rgba(139, 92, 246, 0.1) 0%, 
        rgba(6, 182, 212, 0.1) 50%, 
        rgba(16, 185, 129, 0.1) 100%)`,
      backgroundSize: '200% 100%',
      animation: `${shimmerAnimation} 3s ease-in-out infinite`,
      zIndex: -1,
    },
  },
}));

const CosmicTableHead = styled(TableHead)(({ theme }) => ({
  position: 'relative',
  '& .MuiTableCell-head': {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: theme.spacing(2, 3),
    border: 'none',
    background: 'transparent',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
    },
  },
}));

const CosmicTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(139, 92, 246, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2)',
    '& .MuiTableCell-root': {
      borderColor: 'rgba(139, 92, 246, 0.3)',
    },
  },
  '&:nth-of-type(even)': {
    background: 'rgba(255, 255, 255, 0.02)',
  },
}));

const CosmicTableCell = styled(TableCell)(({ theme }) => ({
  color: '#ffffff',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  padding: theme.spacing(2, 3),
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  '&:first-of-type': {
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
  },
  '&:last-of-type': {
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
  },
}));

const IndexCell = styled(CosmicTableCell)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
  fontWeight: '700',
  textAlign: 'center',
  width: '60px',
  animation: `${pulseGlow} 2s ease-in-out infinite`,
}));

const BookingIdCell = styled(CosmicTableCell)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.95rem',
  color: '#06b6d4',
  fontWeight: '600',
}));

const EventNameCell = styled(CosmicTableCell)(({ theme }) => ({
  fontWeight: '600',
  color: '#10b981',
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const StatusChip = styled(Chip)(({ status }) => {
  const getStatusColors = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return {
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'pending':
        return {
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#ffffff',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        };
      case 'cancelled':
        return {
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#ffffff',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #6b7280, #4b5563)',
          color: '#ffffff',
          border: '1px solid rgba(107, 114, 128, 0.3)',
        };
    }
  };

  const colors = getStatusColors(status);
  
  return {
    ...colors,
    fontWeight: '600',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    },
  };
});

const DateCell = styled(CosmicTableCell)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.9rem',
  fontFamily: 'monospace',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: theme.spacing(2),
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
  color: 'rgba(255, 255, 255, 0.6)',
}));

const CosmicAlert = styled(Alert)(({ theme }) => ({
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '16px',
  color: '#ffffff',
  '& .MuiAlert-icon': {
    color: '#ef4444',
  },
}));

const UserBookings = () => {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8081/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Raw bookings data:", response.data);
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) {
    return (
      <ThemeProvider theme={cosmicTheme}>
        <CosmicContainer>
          <FloatingParticles />
          <LoadingContainer>
            <CircularProgress 
              size={60} 
              sx={{ 
                color: '#8b5cf6',
                animation: `${pulseGlow} 2s ease-in-out infinite`
              }} 
            />
            <Typography variant="h6" color="white" sx={{ mt: 2 }}>
              Loading cosmic bookings...
            </Typography>
          </LoadingContainer>
        </CosmicContainer>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={cosmicTheme}>
        <CosmicContainer>
          <FloatingParticles />
          <GlassmorphismPaper>
            <CosmicAlert severity="error">
              ❌ {error}
            </CosmicAlert>
          </GlassmorphismPaper>
        </CosmicContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        
        <GlassmorphismPaper>
          <CosmicTitle> Cosmic User Bookings</CosmicTitle>
          <CosmicSubtitle>
            Explore the stellar journey of user reservations across the galaxy
          </CosmicSubtitle>

          {bookings.length === 0 ? (
            <EmptyStateContainer>
              <Typography variant="h4" sx={{ mb: 2, opacity: 0.7 }}>
                🌌
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                No Cosmic Bookings Found
              </Typography>
              <Typography variant="body1">
                This user hasn't embarked on any stellar adventures yet.
              </Typography>
            </EmptyStateContainer>
          ) : (
            <CosmicTableContainer>
              <CosmicTable>
                <CosmicTableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Booking Date</TableCell>
                  </TableRow>
                </CosmicTableHead>
                <TableBody>
{bookings
  .filter(booking => booking && booking.id)  // بتتأكد إن العنصر موجود وعنده id
  .map((booking, index) => {
    if (!booking.event) {
      console.warn(`Booking id ${booking.id} has no event info`);
    } else {
      console.log("Booking event:", booking.event);
    }

    return (
      <CosmicTableRow key={booking.id}>


                        <IndexCell>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                              margin: '0 auto',
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </IndexCell>
                        <BookingIdCell>#{booking.id}</BookingIdCell>
                        <EventNameCell title={booking.event?.title}>
                          {booking.event?.title || 'Unknown Event'}
                        </EventNameCell>
                        <CosmicTableCell>
                          <StatusChip 
                            label={booking.status || 'Unknown'} 
                            status={booking.status}
                            size="small"
                          />
                        </CosmicTableCell>
                        <DateCell>
                          {new Date(booking.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </DateCell>
                      </CosmicTableRow>
                    );
                  })}
                </TableBody>
              </CosmicTable>
            </CosmicTableContainer>
          )}
        </GlassmorphismPaper>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default UserBookings;
