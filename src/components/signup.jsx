import React from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';

export default function SignUp() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #fce3f1, #dcdde1)', // تقريب لألوان الغيوم
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
            Sign Up
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Enter the information below to create your account
          </Typography>

          <TextField
            fullWidth
            label="Your name"
            defaultValue="Adam Smith"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Address"
            defaultValue="example@gmail.com"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="body2">
                I agree to the <strong>Terms</strong> and <strong>Conditions of Privacy</strong>
              </Typography>
            }
            sx={{ mt: 1 }}
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
            Create Account
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account? <strong style={{ cursor: 'pointer' }}>Login now</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}