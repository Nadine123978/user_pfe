import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, MenuItem } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddAdminModal = ({ open, onClose, onAdminAdded }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('2'); // افتراضي admin (groupId = 2)
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleSave = async () => {
  const adminData = {
    email,
    username: fullName, // أو أي اسم حابب تعتمده
    password,
    groupId: parseInt(role)  // عدّل حسب نوع الرول إذا عندك mapping
  };

  try {
    const response = await axios.post(
      'http://localhost:8081/secure1234/super-admin/create-admin',
      adminData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('Admin added:', response.data);
    setSuccessMessage('Admin added successfully!');
    setErrorMessage('');
    setFullName('');
    setEmail('');
    setRole('');
    setPassword('');
    
  } catch (error) {
    console.error('Failed to add admin', error);
    setErrorMessage('Failed to add admin. Please try again.');
    setSuccessMessage('');
  }
};


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Add New Admin</Typography>

        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <TextField
          fullWidth
          label="Full Name"
          margin="dense"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="dense"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="dense"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
       <TextField
  fullWidth
  select
  label="Role"
  margin="dense"
  value={role}
  onChange={e => setRole(e.target.value)}
>
  <MenuItem value="1">Super Admin</MenuItem>
  <MenuItem value="2">Admin</MenuItem>
</TextField>


        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAdminModal;
