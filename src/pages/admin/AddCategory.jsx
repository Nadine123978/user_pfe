import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Paper } from '@mui/material';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // يمكنك هنا إرسال البيانات إلى الـ backend
    console.log({ category, description });
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Category
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" fontWeight="medium" mb={2}>
            Add Category
          </Typography>

          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCategory;
