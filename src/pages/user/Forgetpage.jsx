import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled, keyframes } from '@mui/material/styles';

// Enhanced keyframes for sophisticated background animation
const gradientShift = keyframes`
  0% { 
    background-position: 0% 50%; 
    transform: scale(1);
  }
  25% { 
    background-position: 100% 50%; 
    transform: scale(1.02);
  }
  50% { 
    background-position: 100% 100%; 
    transform: scale(1);
  }
  75% { 
    background-position: 0% 100%; 
    transform: scale(1.01);
  }
  100% { 
    background-position: 0% 50%; 
    transform: scale(1);
  }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// Modern gradient button with website color scheme
const ModernButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(135deg, #6B7280, #9CA3AF)'
    : 'linear-gradient(135deg, #E91E63 0%, #D81B60 100%)',
  border: 0,
  borderRadius: 16,
  color: 'white',
  height: 56,
  padding: '0 32px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  boxShadow: disabled 
    ? 'none' 
    : '0 8px 32px rgba(233, 30, 99, 0.4)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    background: disabled
      ? 'linear-gradient(135deg, #6B7280, #9CA3AF)'
      : 'linear-gradient(135deg, #C2185B 0%, #AD1457 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(233, 30, 99, 0.6)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
}));

// Enhanced TextField with website color scheme
const ModernTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiInputBase-input': {
    color: 'white',
    fontSize: '1.1rem',
    padding: '16px 20px',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '1rem',
    '&.Mui-focused': {
      color: '#E91E63',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: '16px',
    borderWidth: '2px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(233, 30, 99, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E91E63',
    borderWidth: '2px',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      boxShadow: '0 0 0 4px rgba(233, 30, 99, 0.1)',
    },
  },
  // Enhanced error state styling
  ...(error && {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FF1744 !important',
      borderWidth: '2px !important',
    },
    '& .MuiInputLabel-root': {
      color: '#FF1744 !important',
    },
    '& .MuiInputBase-input': {
      color: '#FEF2F2',
    },
    '& .MuiFormHelperText-root': {
      color: '#FF1744',
      fontSize: '0.9rem',
      marginTop: '8px',
    },
    '& .MuiInputBase-root': {
      backgroundColor: 'rgba(255, 23, 68, 0.1)',
      '&.Mui-focused': {
        boxShadow: '0 0 0 4px rgba(255, 23, 68, 0.2)',
      },
    },
  }),
}));

// Styled Alert component
const StyledAlert = styled(Alert)(({ severity }) => ({
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiAlert-icon': {
    fontSize: '1.5rem',
  },
  ...(severity === 'success' && {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    color: '#A5D6A7',
    borderColor: 'rgba(76, 175, 80, 0.3)',
    '& .MuiAlert-icon': {
      color: '#4CAF50',
    },
  }),
  ...(severity === 'error' && {
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    color: '#FFCDD2',
    borderColor: 'rgba(255, 23, 68, 0.3)',
    '& .MuiAlert-icon': {
      color: '#FF1744',
    },
  }),
  ...(severity === 'info' && {
    backgroundColor: 'rgba(233, 30, 99, 0.15)',
    color: '#F8BBD9',
    borderColor: 'rgba(233, 30, 99, 0.3)',
    '& .MuiAlert-icon': {
      color: '#E91E63',
    },
  }),
}));

export default function Forgetpage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8081/auth/request-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage('Check your email for the reset password link.');
        setMessageType('success');
      } else {
        setMessage(data || 'Failed to send reset email.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A0D2E 0%, #2D1B3D 25%, #3B1A5C 50%, #4A2C5A 75%, #2D1B3D 100%)',
      backgroundSize: '400% 400%',
      animation: `${gradientShift} 20s ease infinite`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(216, 27, 96, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 23, 68, 0.1) 0%, transparent 50%)
        `,
        opacity: 0.8,
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(45deg, rgba(233, 30, 99, 0.3), rgba(216, 27, 96, 0.3))',
        borderRadius: '50%',
        animation: `${floatingAnimation} 6s ease-in-out infinite`,
        zIndex: 0,
      },
    }}>
      {/* Floating decorative elements with website colors */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, rgba(255, 23, 68, 0.2), rgba(233, 30, 99, 0.2))',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        animation: `${floatingAnimation} 8s ease-in-out infinite reverse`,
        zIndex: 0,
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '25%',
        left: '20%',
        width: '40px',
        height: '40px',
        background: 'linear-gradient(45deg, rgba(216, 27, 96, 0.2), rgba(194, 24, 91, 0.2))',
        borderRadius: '50%',
        animation: `${floatingAnimation} 10s ease-in-out infinite`,
        zIndex: 0,
      }} />

      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Box sx={{
          backgroundColor: 'rgba(26, 13, 46, 0.85)',
          padding: { xs: 4, md: 6 },
          borderRadius: '24px',
          boxShadow: `
            0 32px 64px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(233, 30, 99, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          border: '1px solid rgba(233, 30, 99, 0.2)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #E91E63, #D81B60, #FF1744)',
            borderRadius: '24px 24px 0 0',
          },
        }}>
          {/* Enhanced Brand Section with website colors */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
            }}>
              <LockResetIcon sx={{
                fontSize: '3rem',
                color: '#E91E63',
                animation: messageType === 'success' ? `${pulseAnimation} 2s ease infinite` : 'none',
                mr: 1,
              }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: 2,
                fontWeight: 300,
                mb: 1,
                textTransform: 'uppercase',
              }}
            >
              SOCIETHY{' '}
              <Typography component="span" sx={{ 
                color: '#E91E63', 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #E91E63, #D81B60)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                EVENTS
              </Typography>
            </Typography>

            <Typography
              variant="h3"
              sx={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E91E63 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 2,
                textShadow: '0 0 30px rgba(233, 30, 99, 0.5)',
              }}
            >
              Forgot Password?
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '1.1rem',
                lineHeight: 1.6,
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              Enter your email address and we'll send you a link to reset your password
            </Typography>
          </Box>

          {/* Message Alert */}
          {message && (
            <Box sx={{ mb: 3 }}>
              <StyledAlert 
                severity={messageType} 
                icon={messageType === 'success' ? <CheckCircleIcon /> : <EmailIcon />}
                sx={{
                  animation: messageType === 'success' ? `${pulseAnimation} 1s ease` : 'none',
                }}
              >
                {message}
              </StyledAlert>
            </Box>
          )}

          {/* Form Section */}
          <Box sx={{ mt: 4 }}>
            <ModernTextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 4 }}
            />

            <ModernButton
              fullWidth
              disabled={isLoading || !email}
              onClick={handleSubmit}
              sx={{ mb: 4 }}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </ModernButton>

            <Typography 
              variant="body2" 
              align="center" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.95rem',
              }}
            >
              Remember your password?{' '}
              <Typography
                component="span"
                onClick={() => window.history.back()}
                sx={{
                  cursor: 'pointer',
                  color: '#E91E63',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#C2185B',
                    textDecoration: 'underline',
                  },
                }}
              >
                Back to Login
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

