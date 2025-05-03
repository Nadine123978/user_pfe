import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Password has been reset successfully.');
      } else {
        alert(result.message || 'Failed to reset password.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
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
          <Typography variant="h4" align="center" fontWeight="bold" mb={1}>
            Reset Password
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Enter your new password below
          </Typography>

          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            Reset Password
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
