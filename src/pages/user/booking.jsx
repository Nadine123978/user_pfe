import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Box, 
  Button, 
  Typography, 
  Container,
  Paper,
  Fade,
  Slide,
  Zoom,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  IconButton,
  Backdrop,
  useTheme,
  useMediaQuery,
  Skeleton
} from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';
import {
  CheckCircle,
  Error,
  Warning,
  Refresh,
  Home,
  ArrowBack,
  Star,
  Favorite,
  Share,
  BookmarkBorder,
  Bookmark,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';

import Header from "../../components/user/Header";
import SeatingMap from "../../components/user/SeatingMap";
import OrganizerInfo from "../../components/user/OrganizerInfo";
import VenueMap from "../../components/user/VenueMap";
import WhirlingDervishShow from "../../components/user/WhirlingDervishShow";

// Advanced keyframe animations
const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(1deg); }
  50% { transform: translateY(-10px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(233, 30, 99, 0.3), 0 0 40px rgba(156, 39, 176, 0.2);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(233, 30, 99, 0.6), 0 0 60px rgba(156, 39, 176, 0.4);
    transform: scale(1.02);
  }
`;

const shimmerEffect = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const particleFloat = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
  25% { transform: translateY(-30px) translateX(10px) rotate(90deg); opacity: 1; }
  50% { transform: translateY(-20px) translateX(-5px) rotate(180deg); opacity: 0.8; }
  75% { transform: translateY(-25px) translateX(8px) rotate(270deg); opacity: 0.9; }
`;

// Revolutionary styled components
const BookingContainer = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, #0a0015 0%, #1a0030 25%, #2d0045 50%, #1a0030 75%, #0a0015 100%),
    radial-gradient(circle at 20% 20%, rgba(233, 30, 99, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(103, 58, 183, 0.1) 0%, transparent 50%)
  `,
  backgroundSize: '400% 400%, 100% 100%, 100% 100%, 100% 100%',
  animation: `${gradientShift} 15s ease infinite`,
  minHeight: '100vh',
  width: '100vw',
  overflowX: 'hidden',
  position: 'relative',
  margin: 0,
  padding: 0,
  
  // Floating particles
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'rgba(233, 30, 99, 0.8)',
    animation: `${particleFloat} 20s ease-in-out infinite`,
    zIndex: 1,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '70%',
    right: '10%',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(156, 39, 176, 0.6)',
    animation: `${particleFloat} 25s ease-in-out infinite reverse`,
    zIndex: 1,
  },
  
  // Additional floating elements
  '& .particle-1': {
    position: 'absolute',
    top: '30%',
    left: '80%',
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    background: 'rgba(103, 58, 183, 0.7)',
    animation: `${particleFloat} 18s ease-in-out infinite`,
    zIndex: 1,
  },
  
  '& .particle-2': {
    position: 'absolute',
    top: '60%',
    left: '15%',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'rgba(233, 30, 99, 0.5)',
    animation: `${particleFloat} 22s ease-in-out infinite reverse`,
    zIndex: 1,
  },
  
  '& .particle-3': {
    position: 'absolute',
    top: '85%',
    right: '70%',
    width: '2px',
    height: '2px',
    borderRadius: '50%',
    background: 'rgba(156, 39, 176, 0.8)',
    animation: `${particleFloat} 16s ease-in-out infinite`,
    zIndex: 1,
  },
}));

const StatusCard = styled(Paper)(({ theme, status }) => ({
  background: 'linear-gradient(145deg, rgba(44, 62, 80, 0.98), rgba(74, 20, 140, 0.98))',
  backdropFilter: 'blur(20px)',
  borderRadius: 32,
  padding: theme.spacing(6),
  color: 'white',
  textAlign: 'center',
  maxWidth: 600,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  animation: `${pulseGlow} 3s ease-in-out infinite`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: status === 'error' 
      ? 'linear-gradient(90deg, #F44336, #E91E63, #9C27B0)'
      : status === 'success'
      ? 'linear-gradient(90deg, #4CAF50, #8BC34A, #CDDC39)'
      : status === 'warning'
      ? 'linear-gradient(90deg, #FF9800, #FFC107, #FFEB3B)'
      : 'linear-gradient(90deg, #E91E63, #9C27B0, #673AB7)',
    borderRadius: '32px 32px 0 0',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200%',
    height: '200%',
    background: `
      radial-gradient(circle, 
        ${status === 'error' ? 'rgba(244, 67, 54, 0.1)' :
          status === 'success' ? 'rgba(76, 175, 80, 0.1)' :
          status === 'warning' ? 'rgba(255, 152, 0, 0.1)' :
          'rgba(233, 30, 99, 0.1)'} 0%, 
        transparent 70%
      )
    `,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    animation: `${floatingAnimation} 8s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'glowing' })(({ theme, variant: buttonVariant, glowing }) => ({
  background: buttonVariant === 'outlined' 
    ? 'transparent' 
    : 'linear-gradient(45deg, #E91E63, #9C27B0, #673AB7)',
  backgroundSize: '200% 200%',
  border: buttonVariant === 'outlined' 
    ? '3px solid transparent' 
    : 'none',
  borderRadius: 30,
  color: 'white',
  padding: theme.spacing(2, 5),
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  minHeight: 56,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: buttonVariant === 'outlined' 
    ? 'none' 
    : '0 8px 32px rgba(233, 30, 99, 0.4)',
  
  ...(buttonVariant === 'outlined' && {
    backgroundImage: 'linear-gradient(45deg, #E91E63, #9C27B0, #673AB7)',
    backgroundClip: 'padding-box',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, #E91E63, #9C27B0, #673AB7)',
      borderRadius: 30,
      padding: '3px',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'exclude',
      zIndex: -1,
    },
  }),
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  
  '&:hover': {
    background: buttonVariant === 'outlined'
      ? 'rgba(233, 30, 99, 0.1)'
      : 'linear-gradient(45deg, #C2185B, #7B1FA2, #512DA8)',
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: buttonVariant === 'outlined'
      ? '0 12px 40px rgba(233, 30, 99, 0.3)'
      : '0 16px 48px rgba(233, 30, 99, 0.6)',
    animation: glowing ? `${pulseGlow} 1.5s ease-in-out infinite` : 'none',
    
    '&::after': {
      left: '100%',
    },
  },
  
  '&:active': {
    transform: 'translateY(-2px) scale(0.98)',
  },
  
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
    transform: 'none',
    boxShadow: 'none',
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  color: 'white',
  position: 'relative',
  
  '& .loading-text': {
    background: 'linear-gradient(45deg, #E91E63, #9C27B0, #673AB7)',
    backgroundSize: '200% 200%',
    animation: `${gradientShift} 3s ease infinite`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  marginBottom: theme.spacing(8),
  
  '&.fade-in': {
    animation: 'fadeInUp 0.8s ease-out forwards',
  },
  
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const FloatingActionButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  background: 'linear-gradient(45deg, #E91E63, #9C27B0)',
  color: 'white',
  width: 64,
  height: 64,
  zIndex: 1000,
  boxShadow: '0 8px 32px rgba(233, 30, 99, 0.4)',
  animation: `${floatingAnimation} 6s ease-in-out infinite`,
  
  '&:hover': {
    background: 'linear-gradient(45deg, #C2185B, #7B1FA2)',
    transform: 'scale(1.1)',
    boxShadow: '0 12px 40px rgba(233, 30, 99, 0.6)',
  },
}));

const ProgressIndicator = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '4px',
  background: 'rgba(255, 255, 255, 0.1)',
  zIndex: 9999,
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: 'linear-gradient(90deg, #E91E63, #9C27B0, #673AB7)',
    animation: `${shimmerEffect} 2s ease-in-out infinite`,
    width: '30%',
  },
}));

function Booking() {
  const { id } = useParams();
  console.log("Booking Page - Event ID from useParams:", id);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [event, setEvent] = useState(null);
  const [userBooking, setUserBooking] = useState(null);
  const [showSeatingMap, setShowSeatingMap] = useState(false);
  const [error, setError] = useState(null);
  const [requestedSeats, setRequestedSeats] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Refs for animations
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  // Sound effects (optional)
  const playSound = (type) => {
    if (!soundEnabled) return;
    console.log(`Playing ${type} sound`);
  };

  useEffect(() => {
    const loadEventData = async () => {
      setLoading(true);
      setError(null);
      setEvent(null);
      setUserBooking(null);
      setShowSeatingMap(false);

      try {
        // Simulate minimum loading time for smooth UX
        const [eventResponse] = await Promise.all([
          axios.get(`http://localhost:8081/api/events/${id}`),
          new Promise(resolve => setTimeout(resolve, 800)) // Minimum loading time
        ]);
        
        setEvent(eventResponse.data);
        playSound('success');

        // Check user booking if logged in
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const bookingResponse = await axios.get(
              `http://localhost:8081/api/bookings/check?eventId=${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("API Response for user booking:", bookingResponse.data);
            setUserBooking(bookingResponse.data);
          } catch (bookingError) {
            console.error("Error checking user booking:", bookingError);
            setUserBooking(null);
          }
        }
      } catch (err) {
        setError("Failed to load event information. Please try again.");
        playSound('error');
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEventData();
    }
  }, [id, soundEnabled]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [event]);

  const handleSeatSelected = (seat) => {
    playSound('click');
    navigate("/checkout", { state: { selectedSeats: [seat] } });
  };

  const handleAvailabilityConfirmed = ({ totalTravelers }) => {
    setRequestedSeats(totalTravelers);
    setShowSeatingMap(true);
    playSound('success');
  };

  const handleRetry = () => {
    playSound('click');
    window.location.reload();
  };

  const handleGoHome = () => {
    playSound('click');
    navigate('/');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    playSound('click');
    localStorage.setItem(`bookmark_${id}`, !isBookmarked);
  };

  const handleShare = async () => {
    playSound('click');
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title || 'Amazing Event',
          text: 'Check out this amazing event!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Loading state with advanced skeleton
  if (loading) {
    return (
      <BookingContainer ref={containerRef}>
        <div className="particle-1" />
        <div className="particle-2" />
        <div className="particle-3" />
        <ProgressIndicator />
        
        <Header />
        <Container maxWidth="lg">
          <LoadingContainer>
            <CircularProgress 
              size={80} 
              thickness={2}
              sx={{ 
                color: '#E91E63',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                  filter: 'drop-shadow(0 0 10px rgba(233, 30, 99, 0.5))',
                }
              }} 
            />
            <Typography variant="h4" className="loading-text">
              Loading Amazing Experience...
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 2 }}>
              Preparing something special for you
            </Typography>
            
            {/* Loading skeleton */}
            <Box sx={{ width: '100%', mt: 6 }}>
              <Skeleton 
                variant="text" 
                height={80} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, mb: 2 }} 
              />
              <Skeleton 
                variant="rectangular" 
                height={400} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 4, mb: 2 }} 
              />
              <Skeleton 
                variant="text" 
                height={60} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }} 
              />
            </Box>
          </LoadingContainer>
        </Container>
      </BookingContainer>
    );
  }

  // Error state
  if (error) {
    return (
      <BookingContainer>
        <div className="particle-1" />
        <div className="particle-2" />
        <div className="particle-3" />
        
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Fade in={true} timeout={1000}>
            <StatusCard status="error">
              <Error sx={{ fontSize: 80, color: '#F44336', mb: 3 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Oops! Something went wrong
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                {error}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <StyledButton onClick={handleRetry} glowing>
                  <Refresh sx={{ mr: 1 }} />
                  Try Again
                </StyledButton>
                <StyledButton variant="outlined" onClick={handleGoHome}>
                  <Home sx={{ mr: 1 }} />
                  Go Home
                </StyledButton>
              </Box>
            </StatusCard>
          </Fade>
        </Container>
      </BookingContainer>
    );
  }

  // No event found
  if (!event) {
    return (
      <BookingContainer>
        <div className="particle-1" />
        <div className="particle-2" />
        <div className="particle-3" />
        
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Fade in={true} timeout={1000}>
            <StatusCard status="warning">
              <Warning sx={{ fontSize: 80, color: '#FF9800', mb: 3 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Event Not Found
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                The event you're looking for doesn't exist or has been removed.
              </Typography>
              <StyledButton onClick={handleGoHome} glowing>
                <Home sx={{ mr: 1 }} />
                Back to Home
              </StyledButton>
            </StatusCard>
          </Fade>
        </Container>
      </BookingContainer>
    );
  }

  // Event cancelled
  if (event.cancelled) {
    return (
      <BookingContainer>
        <div className="particle-1" />
        <div className="particle-2" />
        <div className="particle-3" />
        
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Fade in={true} timeout={1000}>
            <StatusCard status="error">
              <Error sx={{ fontSize: 80, color: '#F44336', mb: 3 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Event Cancelled
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Unfortunately, this event has been cancelled.
              </Typography>
              {userBooking && (
                <>
                  <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                  <Chip 
                    label={`Booking Status: ${userBooking.bookingStatus}`}
                    sx={{ 
                      background: 'linear-gradient(45deg, #F44336, #E91E63)',
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  />
                  <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
                    You will be contacted regarding refund procedures.
                  </Typography>
                </>
              )}
              <StyledButton onClick={handleGoHome} glowing>
                <Home sx={{ mr: 1 }} />
                Browse Other Events
              </StyledButton>
            </StatusCard>
          </Fade>
        </Container>
      </BookingContainer>
    );
  }

  // User has existing booking
  if (userBooking) {
    const getBookingStatusInfo = (status) => {
      // Ensure status is not undefined or null before proceeding
      if (!status) {
        return {
          icon: <Warning sx={{ fontSize: 80, color: '#FF9800' }} />,
          title: 'Booking Status Unavailable',
          message: 'We could not retrieve your booking status. Please try refreshing.',
          action: 'Refresh',
          actionHandler: () => window.location.reload(),
          status: 'warning'
        };
      }

      switch (status) {
        case 'PENDING':
          return {
            icon: <Warning sx={{ fontSize: 80, color: '#FF9800' }} />,
            title: 'Payment Pending',
            message: 'Complete your payment to confirm your booking.',
            action: 'Continue Payment',
            actionHandler: () => window.location.href = `/payment/${userBooking.id}`,
            status: 'warning'
          };
        case 'PAID':
        case 'CONFIRMED':
          return {
            icon: <CheckCircle sx={{ fontSize: 80, color: '#4CAF50' }} />,
            title: 'Booking Confirmed!',
            message: 'Your booking is confirmed. We look forward to seeing you at the event!',
            action: 'View Details',
            actionHandler: () => navigate(`/booking-details/${userBooking.id}`),
            status: 'success'
          };
        case 'CANCELLED':
          return {
            icon: <Error sx={{ fontSize: 80, color: '#F44336' }} />,
            title: 'Booking Cancelled',
            message: 'Your booking was cancelled. You can book again if tickets are still available.',
            action: 'Book Again',
            actionHandler: () => {
              alert("Booking again flow...");
            },
            status: 'error'
          };
        default:
          return {
            icon: <Warning sx={{ fontSize: 80, color: '#FF9800' }} />,
            title: 'Booking Status',
            message: `Your booking status: ${status}`,
            action: 'Refresh',
            actionHandler: () => window.location.reload(),
            status: 'warning'
          };
      }
    };

    const bookingInfo = getBookingStatusInfo(userBooking.bookingStatus);

    return (
      <BookingContainer>
        <div className="particle-1" />
        <div className="particle-2" />
        <div className="particle-3" />
        
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Fade in={true} timeout={1000}>
            <StatusCard status={bookingInfo.status}>
              {bookingInfo.icon}
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                {bookingInfo.title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                {bookingInfo.message}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <StyledButton onClick={bookingInfo.actionHandler} glowing>
                  {bookingInfo.action}
                </StyledButton>
                <StyledButton variant="outlined" onClick={handleGoHome}>
                  <Home sx={{ mr: 1 }} />
                  Browse Events
                </StyledButton>
              </Box>
            </StatusCard>
          </Fade>
        </Container>
      </BookingContainer>
    );
  }

  // Main booking page
  return (
    <BookingContainer ref={containerRef}>
      <div className="particle-1" />
      <div className="particle-2" />
      <div className="particle-3" />
      
      <Header />
      
      {/* Hero Section */}
      <SectionContainer 
        ref={el => sectionsRef.current[0] = el}
        className="fade-in"
      >
        <Slide direction="up" in={true} timeout={1000}>
          <div>
            <WhirlingDervishShow
              eventId={id}
              title={event.title}
              date={event.startDate}
              location={event.location?.name}
              onAvailabilityConfirmed={handleAvailabilityConfirmed}
              eventData={event}
            />
          </div>
        </Slide>
      </SectionContainer>

      {/* Seating Map Section */}
      {showSeatingMap && (
        <SectionContainer 
          ref={el => sectionsRef.current[1] = el}
          className="fade-in"
        >
          <Zoom in={showSeatingMap} timeout={800}>
            <Container maxWidth="lg">
              <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    mb: 3,
                    background: 'linear-gradient(45deg, #E91E63, #9C27B0, #673AB7)',
                    backgroundSize: '200% 200%',
                    animation: `${gradientShift} 3s ease infinite`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Choose Your Perfect Seats
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.2rem'
                  }}
                >
                  Select the best seats for an unforgettable experience
                </Typography>
              </Box>
              <SeatingMap
                eventId={id}
                requestedSeats={requestedSeats}
                onSeatSelected={handleSeatSelected}
              />
            </Container>
          </Zoom>
        </SectionContainer>
      )}

      {/* Organizer Info Section */}
      <SectionContainer 
        ref={el => sectionsRef.current[2] = el}
        className="fade-in"
      >
        <Fade in={true} timeout={1200}>
          <div>
            <OrganizerInfo organizer={event.organizer} />
          </div>
        </Fade>
      </SectionContainer>

      {/* Venue Map Section */}
      <SectionContainer 
        ref={el => sectionsRef.current[3] = el}
        className="fade-in"
      >
        <Fade in={true} timeout={1400}>
          <div>
            <VenueMap venue={event.venue} />
          </div>
        </Fade>
      </SectionContainer>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 1000 }}>
        <FloatingActionButton onClick={handleBookmark} title="Bookmark">
          {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
        </FloatingActionButton>
        
        <FloatingActionButton onClick={handleShare} title="Share">
          <Share />
        </FloatingActionButton>
        
        <FloatingActionButton 
          onClick={() => setSoundEnabled(!soundEnabled)} 
          title={soundEnabled ? "Disable Sound" : "Enable Sound"}
        >
          {soundEnabled ? <VolumeUp /> : <VolumeOff />}
        </FloatingActionButton>
        
        <FloatingActionButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to Top">
          <ArrowBack sx={{ transform: 'rotate(90deg)' }} />
        </FloatingActionButton>
      </Box>

      {/* Footer Spacer */}
      <Box sx={{ height: 120 }} />
    </BookingContainer>
  );
}

export default Booking;

