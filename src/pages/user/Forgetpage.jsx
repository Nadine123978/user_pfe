import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

export default function Forgetpage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/request-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.text();  // ✅ لأن السيرفر يرجع String


      if (response.ok) {
        setMessage('Check your email for the reset password link.');
      } else {
       setMessage(data || 'Failed to send reset email.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #fce3f1, #dcdde1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" mb={2} color="text.secondary">
            Forgot your password?
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={1}>
            Enter your email to receive a reset link
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
          />

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
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {message && (
            <Typography mt={2} color="primary" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
