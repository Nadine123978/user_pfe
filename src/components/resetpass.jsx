import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export default function ResetPassword() {
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
            Check your email for instructions on how to regain access
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            defaultValue="example@gmail.com"
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
          >
            Send Reset Link
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            Remember password? <strong style={{ cursor: 'pointer' }}>Login now</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}