// src/pages/admin/seating/SelectEventPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled, keyframes } from '@mui/material/styles';

// Cosmic background animation
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const CosmicContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  background: `
    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)
  `,
  position: 'relative',
  overflow: 'hidden',
  padding: '40px 20px',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    animation: `${floatAnimation} 6s ease-in-out infinite`,
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '4px',
    height: '4px',
    background: '#fbbf24',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 3s linear infinite`,
    pointerEvents: 'none',
  }
}));

const LuxuryHeader = styled('div')({
  textAlign: 'center',
  marginBottom: '60px',
  position: 'relative',
  zIndex: 1,
});

const CosmicTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '16px',
  textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
  animation: `${fadeInUp} 1s ease-out`,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  }
}));

const SubTitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1.2rem',
  fontWeight: 300,
  animation: `${fadeInUp} 1s ease-out 0.2s both`,
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
  animation: `${fadeInUp} 0.8s ease-out ${index * 0.1}s both`,
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(251, 191, 36, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    border: '1px solid rgba(251, 191, 36, 0.4)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.8), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover::before': {
    opacity: 1,
  }
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
      rgba(251, 191, 36, 0.1) 0%,
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
  background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

const LuxuryButton = styled(Button)({
  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  color: '#000000',
  fontWeight: 700,
  fontSize: '1rem',
  padding: '14px 32px',
  borderRadius: '16px',
  textTransform: 'none',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3)',
  
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
    boxShadow: '0 12px 40px rgba(251, 191, 36, 0.4)',
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    
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
  animation: `${fadeInUp} 0.8s ease-out`,
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
  border: '3px solid rgba(251, 191, 36, 0.3)',
  borderTop: '3px solid #fbbf24',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '40px auto',
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
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
    width: '6px',
    height: '6px',
    background: '#fbbf24',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 4s linear infinite`,
  },
  
  '&::before': {
    top: '30%',
    right: '20%',
    animationDelay: '0s',
  },
  
  '&::after': {
    bottom: '40%',
    left: '15%',
    animationDelay: '2s',
    background: '#8b5cf6',
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
    <CosmicContainer maxWidth={false}>
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
            Loading luxury events...
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
                    fullWidth
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
  );
};

export default SelectEventPage;

