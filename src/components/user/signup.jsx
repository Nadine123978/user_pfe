
import React, { useState } from 'react';
import {
  Button, TextField, Container, Typography, Box, InputAdornment,
  IconButton, Checkbox, FormControlLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import axios from 'axios';
import { styled, keyframes } from '@mui/material/styles';
import TermsExample from './TermsExample';

// (الكود الخاص بالأنيميشن والأزرار والـ TextField كما في كودك الأصلي...)

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

// Elegant secondary button for Google signup with website colors
const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  border: '2px solid rgba(233, 30, 99, 0.3)',
  borderRadius: 16,
  color: 'white',
  height: 56,
  padding: '0 32px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(216, 27, 96, 0.1))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    borderColor: 'rgba(233, 30, 99, 0.6)',
    background: 'rgba(255, 255, 255, 0.12)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
    '&::before': {
      opacity: 1,
    },
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


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};

    if (!username) newErrors.username = 'Username is required.';
    if (!email) newErrors.email = 'Email is required.';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Enter a valid email.';
    }

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!agree) newErrors.agree = 'You must agree to terms and conditions.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8081/api/users/create', {
        username,
        email,
        password,
        role: "USER"
      });

      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", "user");

      navigate("/");
    } catch (error) {
      console.error('❌ Error creating user:', error);
      setErrors({ submit: 'Error creating account. Please try again.' });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Google user:", user);

      localStorage.setItem("userId", user.uid);
      localStorage.setItem("role", "user");

      navigate("/");
    } catch (error) {
      console.error("❌ Google Sign-in error:", error);
      setErrors({ submit: 'Failed to sign in with Google' });
    }
  };

  const [openTerms, setOpenTerms] = useState(false);
const [openPrivacy, setOpenPrivacy] = useState(false);


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
      {/* Floating decorative elements */}
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
          {/* Brand Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
            }}>
              <PersonAddIcon sx={{
                fontSize: '3rem',
                color: '#E91E63',
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
                fontSize: { xs: '2.5rem', md: '3.2rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 2,
                textShadow: '0 0 30px rgba(233, 30, 99, 0.5)',
              }}
            >
              Join Us
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
              Create your account to discover amazing events and connect with your community
            </Typography>
          </Box>

          {/* Form Section */}
          <Box component="form" sx={{ mt: 4 }}>
            <ModernTextField
              fullWidth
              label="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              error={!!errors.username}
              helperText={errors.username}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            <ModernTextField
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            <ModernTextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleTogglePassword} 
                      edge="end" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        '&:hover': {
                          color: '#E91E63',
                          backgroundColor: 'rgba(233, 30, 99, 0.1)',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            {/* Terms and Conditions with links */}
          <FormControlLabel
  control={
    <Checkbox
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
      sx={{ 
        color: errors.agree ? '#FF1744' : 'rgba(255,255,255,0.7)', 
        '&.Mui-checked': { 
          color: '#E91E63',
        },
        '&:hover': {
          backgroundColor: 'rgba(233, 30, 99, 0.1)',
        },
      }}
    />
  }
  label={
    <TermsExample />  // هنا استدعي الكومبوننت اللي فيه اللينكات مع الـ Dialogs
  }
  sx={{ mt: 1, mb: 2 }}
/>

            <ModernButton
              fullWidth
              sx={{ mb: 3 }}
              onClick={handleSignUp}
            >
              Create Account
            </ModernButton>

            <SecondaryButton
              fullWidth
              sx={{ mb: 4 }}
              onClick={handleGoogleSignUp}
            >
              Sign Up with Google
            </SecondaryButton>

            <Typography 
              variant="body2" 
              align="center" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
              }}
            >
              Already have an account?{' '}
              <Typography
                component={Link}
                to="/login"
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
                Login now
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}