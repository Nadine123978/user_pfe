import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to fetch categories', err));
  }, []);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Manage Categories
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
  <TableHead>
  <TableRow>
    <TableCell>#</TableCell>
    <TableCell>Category</TableCell>
    <TableCell>Image</TableCell>
    <TableCell>Is Trending</TableCell>
    <TableCell>Status</TableCell> {/* ✅ عمود الحالة */}
    <TableCell>Creation Date</TableCell>
    <TableCell>Action</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {categories.map((cat, index) => (
    <TableRow key={cat.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{cat.name}</TableCell>
      <TableCell>
        {cat.imageUrl ? (
          <img
            src={`http://localhost:8081${cat.imageUrl}`}
            alt={cat.name}
            width="60"
            height="40"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          'No Image'
        )}
      </TableCell>
      <TableCell>{cat.isTrending ? 'Yes' : 'No'}</TableCell>
      <TableCell>{cat.status || 'Inactive'}</TableCell>
      <TableCell>
        {cat.createdAt
          ? new Date(cat.createdAt).toLocaleString()
          : 'N/A'}
      </TableCell>
      <TableCell>
        <IconButton
          color="primary"
          onClick={() => window.location.href = `/admin/category/edit/${cat.id}`}
        >
          <EditIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageCategories;
