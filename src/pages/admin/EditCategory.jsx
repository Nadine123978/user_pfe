import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import axios from 'axios';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('Active');
  const [isTrending, setIsTrending] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/categories/${id}`)
      .then(res => {
        setCategory(res.data.name || '');
        setStatus(res.data.status || 'Inactive'); // fallback if null
        setIsTrending(res.data.is_trending || false);
      })
      .catch(err => console.error('Failed to load category', err));
  }, [id]);

 const handleUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', category);
  formData.append('status', status);
  formData.append('isTrending', isTrending ? 'true' : 'false'); // تأكد من تمريره كـ string
  if (imageFile) formData.append('image', imageFile);

  const token = localStorage.getItem('token');

  try {
    await axios.put(`http://localhost:8081/api/categories/${id}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    alert("Category updated!");
    navigate('/admin/category/manage');
  } catch (err) {
    console.error(err);
    alert("Error updating category");
  }
};

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>Edit Category</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

       <FormControlLabel
  control={
    <Checkbox
      checked={isTrending}
      onChange={(e) => setIsTrending(e.target.checked)}
    />
  }
  label="Is Trending"
/>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ marginTop: '1rem' }}
          />

          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Update
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditCategory;
