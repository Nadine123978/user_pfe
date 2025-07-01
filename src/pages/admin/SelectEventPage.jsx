// src/pages/admin/seating/SelectEventPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        },
      },
    },
  },
});

// Styled components للستايل الجميل
const CosmicContainer = styled(Container)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: '40px 20px',
  maxWidth: 'none !important',
  
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
    pointerEvents: 'none',
  },
  
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
});

const FloatingParticles = styled('div')({
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

const LuxuryHeader = styled('div')({
  textAlign: 'center',
  marginBottom: '60px',
  position: 'relative',
  zIndex: 1,
});

const CosmicTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '16px',
  textShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
  animation: 'fadeInUp 1s ease-out',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const SubTitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1.2rem',
  fontWeight: 300,
  animation: 'fadeInUp 1s ease-out 0.2s both',
  
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
});

const EventGallery = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '32px',
  position: 'relative',
  zIndex: 1,
  
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '24px',
  }
});

const LuxuryEventCard = styled('div')(({ index }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(99, 102, 241, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    border: '1px solid rgba(99, 102, 241, 0.4)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover::before': {
    opacity: 1,
  },
  
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const EventImageContainer = styled('div')({
  position: 'relative',
  height: '220px',
  overflow: 'hidden',
});

const EventImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  
  [`${LuxuryEventCard}:hover &`]: {
    transform: 'scale(1.1)',
  }
});

const ImageOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.1) 0%,
      rgba(139, 92, 246, 0.1) 50%,
      rgba(6, 182, 212, 0.1) 100%
    )
  `,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  
  [`${LuxuryEventCard}:hover &`]: {
    opacity: 1,
  }
});

const EventContent = styled('div')({
  padding: '32px',
  position: 'relative',
});

const EventTitle = styled(Typography)({
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '1.4rem',
  marginBottom: '16px',
  background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

const LuxuryButton = styled(Button)({
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1rem',
  padding: '14px 32px',
  borderRadius: '16px',
  textTransform: 'none',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
  width: '100%',
  
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
  
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
    background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
    
    '&::before': {
      left: '100%',
    }
  },
  
  '&:active': {
    transform: 'translateY(-1px)',
  }
});

const EmptyState = styled('div')({
  textAlign: 'center',
  padding: '80px 32px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  gridColumn: '1 / -1',
  animation: 'fadeInUp 0.8s ease-out',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
});

const EmptyStateTitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: '16px',
});

const EmptyStateText = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '1rem',
});

const LoadingSpinner = styled('div')({
  width: '50px',
  height: '50px',
  border: '3px solid rgba(99, 102, 241, 0.3)',
  borderTop: '3px solid #6366f1',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '40px auto',
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
});

const SelectEventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8081/api/events");
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSelect = (eventId) => {
    navigate(`/admin/seating/${eventId}`);
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        
        <LuxuryHeader>
          <CosmicTitle variant="h1">
            ✨ Select Event for Seating Management ✨
          </CosmicTitle>
          <SubTitle variant="h6">
            Choose an event to configure its premium seating arrangements
          </SubTitle>
        </LuxuryHeader>

        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <LoadingSpinner />
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                mt: 2 
              }}
            >
              Loading cosmic events...
            </Typography>
          </div>
        ) : (
          <EventGallery>
            {events.length === 0 ? (
              <EmptyState>
                <EmptyStateTitle>
                  🌌 No Events Available
                </EmptyStateTitle>
                <EmptyStateText>
                  Create some amazing events to manage their seating arrangements
                </EmptyStateText>
              </EmptyState>
            ) : (
              events.map((event, index) => (
                <LuxuryEventCard key={event.id} index={index}>
                  <EventImageContainer>
                    <EventImage 
                      src={event.imageUrl || '/placeholder.png'} 
                      alt={event.title}
                      onError={(e) => {
                        e.target.src = '/placeholder.png';
                      }}
                    />
                    <ImageOverlay />
                  </EventImageContainer>
                  
                  <EventContent>
                    <EventTitle variant="h5">
                      {event.title}
                    </EventTitle>
                    
                    <LuxuryButton
                      variant="contained"
                      onClick={() => handleSelect(event.id)}
                    >
                      💎 Manage Premium Seating
                    </LuxuryButton>
                  </EventContent>
                </LuxuryEventCard>
              ))
            )}
          </EventGallery>
        )}
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default SelectEventPage;

