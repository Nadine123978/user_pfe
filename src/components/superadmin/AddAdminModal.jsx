import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button, Alert, MenuItem,
  Stack, CircularProgress, IconButton
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

// Enhanced styling for a more professional look
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: '12px', // Softer corners
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Deeper shadow
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const AddAdminModal = ({ open, onClose, onAdminAdded }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('2'); // Default to Admin
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset state when the modal is closed
  useEffect(() => {
    if (!open) {
      setFullName('');
      setEmail('');
      setRole('2');
      setPassword('');
      setSuccessMessage('');
      setErrorMessage('');
      setLoading(false);
    }
  }, [open]);

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const adminData = {
      email,
      username: fullName,
      password,
      groupId: parseInt(role),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8081/secure1234/super-admin/create-admin',
        adminData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
       );
      console.log('Admin added:', response.data);
      setSuccessMessage('Admin added successfully!');
      if (onAdminAdded) {
        onAdminAdded(response.data);
      }
      // Close modal automatically after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to add admin', error);
      const errorMsg = error.response?.data?.message || 'Failed to add admin. Please try again.';
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h2" fontWeight="600">
            Create New Admin
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Alerts */}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        {/* Form Fields */}
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
          <TextField
            fullWidth
            required
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <TextField
            fullWidth
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="1">Super Admin</MenuItem>
            <MenuItem value="2">Admin</MenuItem>
          </TextField>
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button variant="text" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || !fullName || !email || !password}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          >
            {loading ? 'Saving...' : 'Save Admin'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddAdminModal;
