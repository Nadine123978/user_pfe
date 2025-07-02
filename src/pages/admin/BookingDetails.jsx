import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography, Divider, Box, CircularProgress, Alert, Button
} from '@mui/material';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';

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
            '&.MuiButton-containedSuccess': {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              },
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
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&.MuiAlert-standardError': {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          },
          '&.MuiAlert-standardInfo': {
            background: 'rgba(99, 102, 241, 0.1)',
            color: '#6366f1',
            border: '1px solid rgba(99, 102, 241, 0.3)',
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

// Styled components
const CosmicContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: '20px',
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
    animation: `${floatAnimation} 6s ease-in-out infinite`,
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
    animation: `${sparkleAnimation} 3s linear infinite`,
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
});

const GlassmorphismPaper = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '800px',
  margin: '24px auto',
  position: 'relative',
  zIndex: 1,
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

const PageTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '2.5rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '24px',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
    borderRadius: '2px',
  },
});

const SectionContainer = styled(Box)({
  background: 'rgba(99, 102, 241, 0.05)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '24px',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
});

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.3rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const InfoText = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '8px',
  fontSize: '1rem',
  '& strong': {
    color: '#6366f1',
    fontWeight: 600,
  },
});

const StatusChip = styled(Box)(({ status }) => ({
  display: 'inline-block',
  padding: '6px 16px',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  ...(status === 'PAID' && {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
  }),
  ...(status === 'PENDING' && {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
  }),
  ...(status === 'CANCELLED' && {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
  }),
}));

const ConfirmedBadge = styled(Box)(({ confirmed }) => ({
  display: 'inline-block',
  padding: '6px 16px',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  ...(confirmed && {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
  }),
  ...(!confirmed && {
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(107, 114, 128, 0.3)',
  }),
}));

const ActionButton = styled(Button)(({ variant }) => ({
  fontSize: '1rem',
  padding: '12px 32px',
  borderRadius: '12px',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200%',
    width: '200%',
    height: '100%',
    background: `
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      )
    `,
    transition: 'left 0.6s ease',
  },
  '&:hover::before': {
    left: '100%',
  },
  ...(variant === 'success' && {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    },
  }),
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  flexDirection: 'column',
  gap: '16px',
});

const StyledCircularProgress = styled(CircularProgress)({
  color: '#6366f1',
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
});

const CosmicDivider = styled(Divider)({
  background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
  height: '2px',
  border: 'none',
  margin: '24px 0',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '8px',
    height: '8px',
    background: '#6366f1',
    borderRadius: '50%',
    boxShadow: '0 0 16px rgba(99, 102, 241, 0.6)',
  },
});

const BookingDetails = () => {
  const { id } = useParams(); // bookingId from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8081/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Booking details fetched:", response.data);

        setBooking(response.data);
      } catch (err) {
        setError("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8081/api/bookings/${booking.id}/confirm`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooking(response.data); // حدث حالة الحجز بالبيانات الجديدة

      alert("Booking confirmed successfully by admin!");
    } catch (error) {
      alert(error.response?.data || "Error confirming booking by admin");
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={cosmicTheme}>
        <CosmicContainer>
          <FloatingParticles />
          <LoadingContainer>
            <StyledCircularProgress size={60} />
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
              Loading cosmic booking details...
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
          <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        </CosmicContainer>
      </ThemeProvider>
    );
  }

  if (!booking) {
    return (
      <ThemeProvider theme={cosmicTheme}>
        <CosmicContainer>
          <FloatingParticles />
          <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4 }}>
            <Alert severity="info">No booking found</Alert>
          </Box>
        </CosmicContainer>
      </ThemeProvider>
    );
  }

  const isPending = booking.status?.trim().toUpperCase() === "PENDING";
  const isPaid = booking.status?.trim().toUpperCase() === "PAID";
  const isConfirmed = booking.confirmed === true;

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        
        <GlassmorphismPaper>
          <PageTitle>
             Cosmic Booking Details 
          </PageTitle>

          <SectionContainer>
            <SectionTitle>
               Booking Information
            </SectionTitle>
            <InfoText><strong>Booking ID:</strong> #{booking.id}</InfoText>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
              <InfoText><strong>Status:</strong></InfoText>
              <StatusChip status={booking.status?.toUpperCase()}>
                {booking.status}
              </StatusChip>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
              <InfoText><strong>Confirmed:</strong></InfoText>
              <ConfirmedBadge confirmed={booking.confirmed}>
                {booking.confirmed ? "✅ Yes" : "❌ No"}
              </ConfirmedBadge>
            </Box>
            <InfoText><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</InfoText>
            <InfoText><strong>Expires At:</strong> {booking.expiresAt ? new Date(booking.expiresAt).toLocaleString() : 'N/A'}</InfoText>
          </SectionContainer>

          <CosmicDivider />

          <SectionContainer>
            <SectionTitle>
               Event Information
            </SectionTitle>
            <InfoText><strong>Title:</strong> {booking.event?.title}</InfoText>
            <InfoText><strong>Event ID:</strong> #{booking.event?.id}</InfoText>
          </SectionContainer>

          <CosmicDivider />

          <SectionContainer>
            <SectionTitle>
               User Information
            </SectionTitle>
            <InfoText><strong>Username:</strong> {booking.user?.username || 'N/A'}</InfoText>
            <InfoText><strong>Email:</strong> {booking.user?.email || 'N/A'}</InfoText>
          </SectionContainer>

          <CosmicDivider />

          <SectionContainer>
            <SectionTitle>
               Seat Information
            </SectionTitle>
            <InfoText>
              <strong>Seat Codes:</strong>{' '}
              {booking.seats && booking.seats.length > 0
                ? booking.seats.map(seat => seat.code).join(', ')
                : 'N/A'}
            </InfoText>
            <InfoText><strong>Total Price:</strong> {booking.price ? `$${booking.price}` : 'N/A'}</InfoText>
            <InfoText><strong>Payment Method:</strong> {booking.paymentMethod || 'N/A'}</InfoText>
          </SectionContainer>

          {/* زر تأكيد الحجز - مع تعطيل / تفعيل حسب الحالة */}
          {!isConfirmed && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <ActionButton
                variant="success"
                onClick={handleConfirmBooking}
                disabled={isPending} // معطل إذا الحالة PENDING
                size="large"
              >
                {isPending ? " Pending Payment" : " Confirm Booking"}
              </ActionButton>
            </Box>
          )}

          {/* زر تحميل التذكرة بعد التأكيد */}
          {isConfirmed && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <ActionButton
                variant="outlined"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`http://localhost:8081/api/bookings/${booking.id}/ticket`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      responseType: 'blob',
                    });

                    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `ticket_${booking.id}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  } catch (error) {
                    console.error("Error downloading ticket:", error);
                    alert("Unable to download ticket.");
                  }
                }}
                size="large"
              >
                📄 Download Ticket (PDF)
              </ActionButton>
            </Box>
          )}
        </GlassmorphismPaper>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default BookingDetails;

