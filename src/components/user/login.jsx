import React from 'react';
import {
  Button, TextField, Container, Typography, Box, InputAdornment,
  IconButton, Checkbox, FormControlLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import {jwtDecode} from "jwt-decode";  // صححت الاستيراد

const ADMIN_ROLE = "ROLE_ADMIN";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // حالات الخطأ
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [generalError, setGeneralError] = React.useState('');

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    const data = { email, password };

    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Login failed');

      const resData = await response.json();
      const token = resData.token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      const decoded = jwtDecode(token);
      const group = decoded.group || decoded.role || "user";
      const normalizedRole = "ROLE_" + group.toUpperCase();

      localStorage.setItem("role", normalizedRole);
      localStorage.setItem("userId", decoded.sub);
      localStorage.setItem("token", token);

      if (normalizedRole === ADMIN_ROLE) {
        navigate("/admin");
        window.location.reload();
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error('❌ Error:', error);
      setGeneralError(error.message || 'An error occurred while logging in');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const name = result.user.displayName;

      const response = await fetch("http://localhost:8082/api/users/google-login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: name }),
      });

      const resData = await response.json();
      const userId = resData.userId;
      const group = resData.group;

      if (userId) {
        localStorage.setItem("userId", userId);
      }

      if (group && group === "admin") {
        navigate("/secure1234");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google login failed.");
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fce3f1, #dcdde1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
    }}>
      <Container maxWidth="xs">
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" fontWeight="bold" mb={1} color='black'>Log In</Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Enter your account details below to log in
          </Typography>

      <TextField
  fullWidth
  label="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  variant="outlined"
  margin="normal"
  error={!!emailError}
  helperText={emailError}
  sx={{
    '& .MuiOutlinedInput-root.Mui-error': {
      backgroundColor: '#fdecea', // خلفية وردية خفيفة للخطأ
    },
  }}
/>

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <FormControlLabel
  control={<Checkbox />}
  label="Remember me"
  sx={{ 
    '& .MuiFormControlLabel-label': { color: 'black' }
  }}
/>

            <Link to="/resetpass" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                Forgot your password?
              </Typography>
            </Link>
          </Box>

          {generalError && (
            <Typography color="error" align="center" mt={2}>
              {generalError}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
         
            sx={{
              mt: 2,
              borderRadius: '20px',
              backgroundColor: '#1c1c3b',
              '&:hover': {
                backgroundColor: '#33335c',
               
              },
            }}
            onClick={handleLogin}
          >
            Login Now
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderRadius: '20px',
              borderColor: '#1c1c3b',
              color: '#1c1c3b',
              '&:hover': {
                borderColor: '#33335c',
                color: '#33335c',
              },
            }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>

          <Typography variant="body2" align="center"  color= "primary" mt={2}>
            Don’t have an account?{' '}
           <strong
              style={{ cursor: 'pointer', color: '#1976d2' }}
              onClick={() => navigate('/signup')}
            >
              Create an account
            </strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
