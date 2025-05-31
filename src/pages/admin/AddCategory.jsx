import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import axios from 'axios';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8081/api/categories/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Category created successfully.");
      setCategory('');
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error adding category");
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Category
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* معاينة الصورة إذا محطوطة */}
          {image && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ maxWidth: '200px', borderRadius: 5 }}
              />
            </Box>
          )}

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCategory;
