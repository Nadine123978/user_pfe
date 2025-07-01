import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Fade,
  Zoom,
  Slide,
  Avatar,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  Image as ImageIcon,
  CalendarToday as CalendarIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  AutoAwesome as AutoAwesomeIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    const filtered = categories.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get('http://localhost:8081/api/categories')
      .then(res => {
        setCategories(res.data);
        setFilteredCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch categories', err);
        setLoading(false);
      });
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

  const getImageUrl = (cat) => {
    if (cat.imageUrl && typeof cat.imageUrl === 'string') {
      return `http://localhost:8081${cat.imageUrl.startsWith('/') ? '' : '/'}${cat.imageUrl.replace('/images/', '/uploads/')}`;
    }
    return null;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      default: return '#f59e0b';
    }
  };

  const getStatusLabel = (status) => {
    return status || 'Inactive';
  };

  // Statistics
  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.status?.toLowerCase() === 'active').length;
  const trendingCategories = categories.filter(cat => cat.isTrending).length;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Floating particles background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '120px',
            height: '120px',
            background: 'rgba(139, 92, 246, 0.05)',
            borderRadius: '50%',
            top: '15%',
            left: '10%',
            animation: 'float 8s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '80px',
            height: '80px',
            background: 'rgba(6, 182, 212, 0.05)',
            borderRadius: '50%',
            top: '60%',
            right: '15%',
            animation: 'float 10s ease-in-out infinite reverse',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-30px) rotate(180deg)' }
          }
        }}
      />

      <Box
        sx={{
          maxWidth: 1400,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Hero Header */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#ffd700', fontSize: 32 }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #ffffff 30%, #8b5cf6 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Manage Categories
              </Typography>
              <CategoryIcon sx={{ color: '#06b6d4', fontSize: 32 }} />
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ maxWidth: 800, margin: '0 auto' }}>
              <Grid item xs={12} md={4}>
                <Zoom in timeout={1200}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                      }
                    }}
                  >
                    <CategoryIcon sx={{ color: '#8b5cf6', fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {totalCategories}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Total Categories
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
              <Grid item xs={12} md={4}>
                <Zoom in timeout={1400}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                      }
                    }}
                  >
                    <VisibilityIcon sx={{ color: '#10b981', fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {activeCategories}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Active Categories
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
              <Grid item xs={12} md={4}>
                <Zoom in timeout={1600}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #f59e0b, #f43f5e)',
                      }
                    }}
                  >
                    <TrendingUpIcon sx={{ color: '#f59e0b', fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {trendingCategories}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Trending Categories
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Search Bar */}
        <Slide in direction="up" timeout={1800}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <TextField
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                maxWidth: 500,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  fontSize: '1.1rem',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: '#8b5cf6',
                    boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
                  },
                  '& fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)',
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Slide>

        {/* Categories Grid */}
        <Fade in timeout={2000}>
          <Grid container spacing={3}>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      height: 320,
                      animation: 'pulse 2s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 0.5 },
                        '50%': { opacity: 0.8 }
                      }
                    }}
                  />
                </Grid>
              ))
            ) : (
              filteredCategories.map((cat, index) => {
                const imageUrl = getImageUrl(cat);
                
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
                    <Zoom in timeout={2200 + index * 100}>
                      <Card
                        sx={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: 3,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          height: 320,
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderColor: 'rgba(139, 92, 246, 0.3)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: `linear-gradient(90deg, ${getStatusColor(cat.status)}, #8b5cf6)`,
                          }
                        }}
                      >
                        {/* Category Image */}
                        <Box sx={{ position: 'relative', height: 160 }}>
                          {imageUrl ? (
                            <CardMedia
                              component="img"
                              height="160"
                              image={imageUrl}
                              alt={cat.name}
                              sx={{
                                objectFit: 'cover',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                }
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                height: 160,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'rgba(255, 255, 255, 0.6)',
                              }}
                            >
                              <ImageIcon sx={{ fontSize: 48 }} />
                            </Box>
                          )}
                          
                          {/* Trending Badge */}
                          {cat.isTrending && (
                            <Chip
                              icon={<StarIcon />}
                              label="Trending"
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                background: 'linear-gradient(45deg, #f59e0b, #f43f5e)',
                                color: 'white',
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: 'white' }
                              }}
                            />
                          )}

                          {/* Status Badge */}
                          <Chip
                            label={getStatusLabel(cat.status)}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              background: getStatusColor(cat.status),
                              color: 'white',
                              fontWeight: 600,
                            }}
                          />
                        </Box>

                        {/* Card Content */}
                        <CardContent sx={{ p: 2, pb: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              fontWeight: 600,
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {cat.name}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CalendarIcon sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 16 }} />
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '0.75rem',
                              }}
                            >
                              {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : 'N/A'}
                            </Typography>
                          </Box>
                        </CardContent>

                        {/* Card Actions */}
                        <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '0.75rem',
                            }}
                          >
                            #{index + 1}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Edit Category">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/admin/category/edit/${cat.id}`)}
                                sx={{
                                  background: 'rgba(6, 182, 212, 0.1)',
                                  color: '#06b6d4',
                                  border: '1px solid rgba(6, 182, 212, 0.2)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: 'rgba(6, 182, 212, 0.2)',
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
                                  }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Delete Category">
                              <IconButton
                                size="small"
                                onClick={() => handleClickDelete(cat.id)}
                                sx={{
                                  background: 'rgba(244, 63, 94, 0.1)',
                                  color: '#f43f5e',
                                  border: '1px solid rgba(244, 63, 94, 0.2)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: 'rgba(244, 63, 94, 0.2)',
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)',
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </CardActions>
                      </Card>
                    </Zoom>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Fade>

        {/* Empty State */}
        {!loading && filteredCategories.length === 0 && (
          <Fade in timeout={2000}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <CategoryIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                {searchTerm ? 'No categories found' : 'No categories yet'}
              </Typography>
              <Typography variant="body1">
                {searchTerm 
                  ? `No categories match "${searchTerm}"`
                  : 'Start by adding your first category'
                }
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog 
        open={openConfirm} 
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 600 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon sx={{ color: '#f43f5e' }} />
            Confirm Delete
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleCancelDelete}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
                background: 'rgba(255, 255, 255, 0.05)',
              }
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            sx={{
              background: 'linear-gradient(45deg, #f43f5e, #dc2626)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)',
              }
            }}
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCategories;

