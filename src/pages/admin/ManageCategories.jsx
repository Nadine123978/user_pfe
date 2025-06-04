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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('http://localhost:8081/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to fetch categories', err));
  };

  const handleClickDelete = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first');
      setOpenConfirm(false);
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/api/categories/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(prev => prev.filter(cat => cat.id !== selectedId));
      setOpenConfirm(false);
      setSelectedId(null);
    } catch (err) {
      console.error('Error deleting category:', err.response || err);
      alert('Failed to delete category');
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

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
              <TableCell>Status</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {categories.map((cat, index) => {
  console.log('Category:', cat);
  console.log('Raw imageUrl from backend:', cat.imageUrl);
   
     const imageUrl =
  cat.imageUrl && typeof cat.imageUrl === 'string'
    ? `http://localhost:8081${cat.imageUrl.startsWith('/') ? '' : '/'}${cat.imageUrl.replace('/images/', '/uploads/')}`
    : null;



  console.log('Constructed full imageUrl:', imageUrl);

  return (
    <TableRow key={cat.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
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
                    {cat.createdAt ? new Date(cat.createdAt).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/admin/category/edit/${cat.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleClickDelete(cat.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCategories;
