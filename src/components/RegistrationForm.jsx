import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';

const RegistrationForm = ({ event, onContinue }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Box>
      <Typography variant="h6">Ticket for: {event.title}</Typography>

      <TextField label="Email" fullWidth defaultValue={user.email} sx={{ mt: 2 }} />
      <TextField label="First Name" fullWidth defaultValue={user.firstName} sx={{ mt: 2 }} />
      <TextField label="Last Name" fullWidth defaultValue={user.lastName} sx={{ mt: 2 }} />

      <Button variant="contained" fullWidth sx={{ mt: 4 }} onClick={onContinue}>
        Continue to Payment
      </Button>
    </Box>
  );
};

export default RegistrationForm;
