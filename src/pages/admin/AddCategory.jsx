import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import axios from 'axios';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

      // ✅ تحقق من النوع
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Only image files are allowed (jpg, jpeg, png, gif).');
        setImage(null);
        return;
      }

      // ✅ تحقق من الحجم
      const maxSizeKB = 250;
      if (file.size > maxSizeKB * 1024) {
        setErrorMessage(`Image size must be less than ${maxSizeKB} KB.`);
        setImage(null);
        return;
      }

      // ✅ إذا كلشي تمام
      setErrorMessage('');
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      return;
    }

    const formData = new FormData();
    formData.append("name", category);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8081/api/categories/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ إضافة التوكن هنا
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
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
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
            onChange={handleImageChange}
          />

          {image && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ maxWidth: '200px', borderRadius: 5 }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!category || !image}
          >
            Add
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCategory;
