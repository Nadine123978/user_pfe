import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Fade,
  Slide,
  Zoom,
  Skeleton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled, keyframes } from "@mui/material/styles"; // ✅ استخدمنا keyframes
import ImageGallery from './ImageGallery';
import BookingPanel from './BookingPanel';
import EventDetails from './EventDetails';
import ErrorBoundary from '../../components/ErrorBoundary';

// 🎞️ Animation keyframes
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const MainContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, #200245 0%, #1a0235 30%, #140028 70%, #0f001d 100%)',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '8%',
    left: '3%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(233, 30, 99, 0.15) 0%, rgba(233, 30, 99, 0.05) 50%, transparent 100%)',
    filter: 'blur(60px)',
    zIndex: 0,
    animation: 'float1 12s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '12%',
    right: '8%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156, 39, 176, 0.2) 0%, rgba(103, 58, 183, 0.1) 50%, transparent 100%)',
    filter: 'blur(50px)',
    zIndex: 0,
    animation: 'float2 15s ease-in-out infinite reverse',
  },

  '& .floating-accent-1': {
    position: 'absolute',
    top: '60%',
    left: '80%',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(233, 30, 99, 0.08)',
    filter: 'blur(30px)',
    animation: 'float3 18s ease-in-out infinite',
  },
  '& .floating-accent-2': {
    position: 'absolute',
    top: '25%',
    right: '75%',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(103, 58, 183, 0.06)',
    filter: 'blur(40px)',
    animation: 'float4 20s ease-in-out infinite reverse',
  },

  '@keyframes float1': {
    '0%, 100%': {
      transform: 'translateY(0px) translateX(0px) scale(1)',
      opacity: 0.6
    },
    '33%': {
      transform: 'translateY(-25px) translateX(15px) scale(1.1)',
      opacity: 0.8
    },
    '66%': {
      transform: 'translateY(10px) translateX(-10px) scale(0.9)',
      opacity: 0.7
    },
  },
  '@keyframes float2': {
    '0%, 100%': {
      transform: 'translateY(0px) translateX(0px) rotate(0deg)',
      opacity: 0.5
    },
    '50%': {
      transform: 'translateY(20px) translateX(-15px) rotate(180deg)',
      opacity: 0.8
    },
  },
  '@keyframes float3': {
    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
    '50%': { transform: 'translateY(-15px) translateX(8px)' },
  },
  '@keyframes float4': {
    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
    '50%': { transform: 'translateY(12px) translateX(-6px)' },
  },
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(44, 62, 80, 0.95), rgba(74, 20, 140, 0.95))',
  backdropFilter: 'blur(15px)',
  borderRadius: 24,
  padding: theme.spacing(4),
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #E91E63, #9C27B0, #673AB7, #3F51B5)',
    borderRadius: '24px 24px 0 0',
    opacity: 0.8,
    transition: 'opacity 0.3s ease',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '60%',
    height: '60%',
    background: 'radial-gradient(circle, rgba(233, 30, 99, 0.05) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  position: 'relative',
  zIndex: 2,

  '& .hero-title': {
    animation: `${gradientShift} 4s ease infinite`,
  },
}));

const ContentGrid = styled(Grid)(() => ({
  position: 'relative',
  zIndex: 1,

  '& .grid-item': {
    opacity: 0,
    transform: 'translateY(30px)',
    animation: 'slideInUp 0.8s ease-out forwards',
  },
  '& .grid-item:nth-of-type(1)': { animationDelay: '0.1s' },
  '& .grid-item:nth-of-type(2)': { animationDelay: '0.3s' },
  '& .grid-item:nth-of-type(3)': { animationDelay: '0.5s' },

  '@keyframes slideInUp': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const LoadingSkeleton = styled(Box)(() => ({
  '& .skeleton-item': {
    background: 'linear-gradient(90deg, rgba(44, 62, 80, 0.3) 25%, rgba(74, 20, 140, 0.5) 50%, rgba(44, 62, 80, 0.3) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
}));

const WhirlingDervishShow = ({
  eventId,
  title,
  date,
  location,
  onAvailabilityConfirmed,
  eventData
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const event = eventData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimationComplete(true), 500);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date TBA';
    }
  };

  if (isLoading) {
    return (
      <MainContainer>
        <div className="floating-accent-1" />
        <div className="floating-accent-2" />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
          <LoadingSkeleton>
            {/* Loading Skeleton UI */}
          </LoadingSkeleton>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className="floating-accent-1" />
      <div className="floating-accent-2" />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Fade in timeout={1000}>
            <HeroSection>
              <Typography
                variant="h1"
                className="hero-title"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.5rem', lg: '5rem' },
                  background: 'linear-gradient(45deg, #ffffff, #E91E63, #9C27B0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  mb: 3
                }}
              >
                {title || 'Event Title'}
              </Typography>

              <Slide direction="up" in timeout={1200}>
                <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                  {date && location ? `${formatDate(date)} at ${location}` : 'Event Details Coming Soon'}
                </Typography>
              </Slide>
            </HeroSection>
          </Fade>

          {/* ✅ Content Grid */}
          <ContentGrid container spacing={4}>
            <Grid item xs={12} md={8} className="grid-item">
              <Zoom in={animationComplete} timeout={600}>
                <StyledContentBox sx={{ p: 0, overflow: 'hidden' }}>
                  <ErrorBoundary>
                    <ImageGallery eventId={eventId} />
                  </ErrorBoundary>
                </StyledContentBox>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4} className="grid-item">
              <Slide direction={isMobile ? "up" : "left"} in={animationComplete} timeout={800}>
                <StyledContentBox>
                  <ErrorBoundary>
                    <BookingPanel event={event} onAvailabilityConfirmed={onAvailabilityConfirmed} />
                  </ErrorBoundary>
                </StyledContentBox>
              </Slide>
            </Grid>

            <Grid item xs={12} md={8} className="grid-item">
              <Fade in={animationComplete} timeout={1000}>
                <StyledContentBox>
                  <ErrorBoundary>
                    <EventDetails event={event} />
                  </ErrorBoundary>
                </StyledContentBox>
              </Fade>
            </Grid>

            {/* Right Panel */}
            <Grid item xs={12} md={4} className="grid-item">
              <Slide direction={isMobile ? "up" : "right"} in={animationComplete} timeout={1200}>
                <StyledContentBox sx={{
                  background: 'linear-gradient(145deg, rgba(233, 30, 99, 0.1), rgba(156, 39, 176, 0.1))',
                  textAlign: 'center',
                  py: 6
                }}>
                  <Typography variant="h6" sx={{ color: '#E91E63', mb: 2, fontWeight: 'bold' }}>
                    Event Highlights
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', mb: 3 }}>
                    Experience an unforgettable evening of culture and entertainment
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    {['Premium Seating', 'Live Performance', 'Cultural Experience', 'Memorable Evening'].map((highlight, index) => (
                      <Box key={highlight} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        opacity: 0,
                        animation: `${fadeInLeft} 0.5s ease-out ${0.5 + index * 0.1}s forwards`
                      }}>
                        <Box sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#E91E63'
                        }} />
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {highlight}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </StyledContentBox>
              </Slide>
            </Grid>
          </ContentGrid>
        </Box>
      </Container>
    </MainContainer>
  );
};

export default WhirlingDervishShow;
