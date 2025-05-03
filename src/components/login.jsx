import React from 'react';
import { Button, TextField, Container, Typography, Box, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';


export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }
  
    const data = { email, password };
    console.log('🚀 Sending login data:', JSON.stringify(data));
  
    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('✅ Raw Response:', response);
      console.log('Status:', response.status);
      console.log('CORS header:', response.headers.get('Access-Control-Allow-Origin'));
  
      let result = {};
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch (e) {
        console.warn("⚠️ Couldn't parse JSON:", e);
      }
  
      if (response.ok) {
        console.log("👤 Logged in as:", result.group);
        const group = result.group;
  
        if (group === "admin") {
          window.location.href = "http://localhost:5174/";
        } else {
          window.location.href = "http://localhost:5173/";
        }
      } else {
        const errorMessage = result.message || 'Login failed. Please check your credentials.';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      alert('Network Error: ' + error.message);
    }
  };
  
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fce3f1, #dcdde1)', 
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
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
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
  <FormControlLabel control={<Checkbox />} label="Remember me" />
  <Link to="/resetpass" style={{ textDecoration: 'none' }}>
    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
      Forgot your password?
    </Typography>
  </Link>
</Box>

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

          <Typography variant="body2" align="center" mt={2}>
            Don’t have an account?{' '}
            <strong style={{ cursor: 'pointer' }}>Create an account</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}