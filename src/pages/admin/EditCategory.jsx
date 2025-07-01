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
  Checkbox,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Fade,
  Zoom,
  Slide,
  Switch,
  Avatar,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit as EditIcon,
  Category as CategoryIcon,
  Image as ImageIcon,
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  AutoAwesome as AutoAwesomeIcon,
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import axios from 'axios';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('Active');
  const [isTrending, setIsTrending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8081/api/categories/${id}`)
      .then(res => {
        setCategory(res.data.name || '');
        setStatus(res.data.status || 'Inactive');
        setIsTrending(res.data.is_trending || false);
        
        // Set existing image preview if available
        if (res.data.imageUrl) {
          const imageUrl = `http://localhost:8081${res.data.imageUrl.startsWith('/') ? '' : '/'}${res.data.imageUrl.replace('/images/', '/uploads/')}`;
          setImagePreview(imageUrl);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load category', err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('name', category);
    formData.append('status', status);
    formData.append('is_trending', isTrending ? 'true' : 'false');
    if (imageFile) formData.append('image', imageFile);

    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:8081/api/categories/${id}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setSaving(false);
      setShowSuccess(true);
      
      // Navigate after success animation
      setTimeout(() => {
        navigate('/admin/category/manage');
      }, 2000);
    } catch (err) {
      console.error(err);
      setSaving(false);
      alert("Error updating category");
    }
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#6b7280';
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#8b5cf6' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
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
            width: '100px',
            height: '100px',
            background: 'rgba(139, 92, 246, 0.05)',
            borderRadius: '50%',
            top: '20%',
            left: '15%',
            animation: 'float 8s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: 'rgba(6, 182, 212, 0.05)',
            borderRadius: '50%',
            top: '70%',
            right: '20%',
            animation: 'float 10s ease-in-out infinite reverse',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
          }
        }}
      />

      <Box
        sx={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header with Breadcrumbs */}
        <Fade in timeout={1000}>
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              sx={{ mb: 2 }}
            >
              <Link
                color="inherit"
                href="#"
                onClick={() => navigate('/admin')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  '&:hover': { color: '#8b5cf6' }
                }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Admin
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => navigate('/admin/category/manage')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  '&:hover': { color: '#8b5cf6' }
                }}
              >
                <CategoryIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Categories
              </Link>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8b5cf6',
                  fontWeight: 600,
                }}
              >
                <EditIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Edit Category
              </Typography>
            </Breadcrumbs>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/category/manage')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#8b5cf6',
                  }
                }}
              >
                Back to Categories
              </Button>
            </Box>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
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
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Edit Category
              </Typography>
              <EditIcon sx={{ color: '#06b6d4', fontSize: 32 }} />
            </Box>
          </Box>
        </Fade>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} lg={6}>
            <Slide in direction="right" timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 4,
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
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CategoryIcon sx={{ color: '#8b5cf6' }} />
                  Category Details
                </Typography>

                <form onSubmit={handleUpdate}>
                  {/* Category Name */}
                  <TextField
                    fullWidth
                    label="Category Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    margin="normal"
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#8b5cf6',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        '& fieldset': { border: 'none' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': { color: '#8b5cf6' },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                        fontSize: '1.1rem',
                      },
                    }}
                  />

                  {/* Status Select */}
                  <FormControl 
                    fullWidth 
                    margin="normal"
                    sx={{ mb: 3 }}
                  >
                    <InputLabel
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': { color: '#8b5cf6' },
                      }}
                    >
                      Status
                    </InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      label="Status"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#8b5cf6',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
                        },
                        '& fieldset': { border: 'none' },
                        '& .MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            background: 'rgba(30, 41, 59, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            '& .MuiMenuItem-root': {
                              color: 'white',
                              '&:hover': {
                                background: 'rgba(139, 92, 246, 0.2)',
                              },
                              '&.Mui-selected': {
                                background: 'rgba(139, 92, 246, 0.3)',
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value="Active">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: '#10b981',
                            }}
                          />
                          Active
                        </Box>
                      </MenuItem>
                      <MenuItem value="Inactive">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: '#6b7280',
                            }}
                          />
                          Inactive
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  {/* Trending Toggle */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      mb: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.08)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUpIcon sx={{ color: '#f59e0b' }} />
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>
                        Is Trending
                      </Typography>
                    </Box>
                    <Switch
                      checked={isTrending}
                      onChange={(e) => setIsTrending(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#f59e0b',
                          '&:hover': {
                            backgroundColor: 'rgba(245, 158, 11, 0.08)',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#f59e0b',
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    />
                  </Box>

                  {/* Image Upload */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 500,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <ImageIcon sx={{ color: '#06b6d4' }} />
                      Category Image
                    </Typography>
                    
                    <Box
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      sx={{
                        border: `2px dashed ${dragActive ? '#8b5cf6' : 'rgba(255, 255, 255, 0.3)'}`,
                        borderRadius: 3,
                        p: 4,
                        textAlign: 'center',
                        background: dragActive 
                          ? 'rgba(139, 92, 246, 0.1)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: '#8b5cf6',
                          background: 'rgba(139, 92, 246, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      <CloudUploadIcon
                        sx={{
                          fontSize: 48,
                          color: dragActive ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
                          mb: 2,
                        }}
                      />
                      <Typography
                        sx={{
                          color: 'white',
                          mb: 1,
                          fontSize: '1.1rem',
                          fontWeight: 500,
                        }}
                      >
                        Drag & drop your image here
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.9rem',
                        }}
                      >
                        or click to browse • Max 250KB • JPG, PNG, GIF
                      </Typography>
                      
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{
                      width: '100%',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
                      borderRadius: 3,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #7c3aed, #0891b2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
                      },
                      '&:disabled': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    {saving ? 'Updating Category...' : 'Update Category'}
                  </Button>
                </form>
              </Paper>
            </Slide>
          </Grid>

          {/* Preview Section */}
          <Grid item xs={12} lg={6}>
            <Slide in direction="left" timeout={1400}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <VisibilityIcon sx={{ color: '#06b6d4' }} />
                  Live Preview
                </Typography>

                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, ${getStatusColor(status)}, #8b5cf6)`,
                    }
                  }}
                >
                  {/* Category Image */}
                  <Box sx={{ position: 'relative', height: 200 }}>
                    {imagePreview ? (
                      <CardMedia
                        component="img"
                        height="200"
                        image={imagePreview}
                        alt={category || 'Category'}
                        sx={{
                          objectFit: 'cover',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 64 }} />
                      </Box>
                    )}
                    
                    {/* Status Badge */}
                    <Chip
                      label={status}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: getStatusColor(status),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />

                    {/* Trending Badge */}
                    {isTrending && (
                      <Chip
                        icon={<TrendingUpIcon />}
                        label="Trending"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'linear-gradient(45deg, #f59e0b, #f43f5e)',
                          color: 'white',
                          fontWeight: 600,
                          '& .MuiChip-icon': { color: 'white' }
                        }}
                      />
                    )}
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mb: 2,
                        background: category 
                          ? 'linear-gradient(45deg, #ffffff, #8b5cf6)'
                          : 'rgba(255, 255, 255, 0.5)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {category || 'Category Name'}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`Status: ${status}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        }}
                      />
                      {isTrending && (
                        <Chip
                          label="Trending"
                          size="small"
                          variant="outlined"
                          sx={{
                            color: '#f59e0b',
                            borderColor: '#f59e0b',
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            background: 'linear-gradient(45deg, #10b981, #06b6d4)',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' },
          }}
          icon={<CheckCircleIcon />}
        >
          Category updated successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditCategory;

