import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

const roles = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN', label: 'Admin' },
];

const EditModal = ({ open, onClose, adminData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (adminData) {
      setFormData({
        ...adminData,
        email: adminData.email || adminData.username,
        password: '', // دايمًا خليه فاضي
      });
    }
  }, [adminData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!adminData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: 'white', width: 350, mx: 'auto', my: '20vh', borderRadius: 2 }}>
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="email"
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="password"
          helperText="Leave blank to keep current password"
        />
        <TextField
          select
          label="Role"
          name="role"
          value={formData.role || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
