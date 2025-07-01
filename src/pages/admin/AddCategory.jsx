import React, { useState, useRef } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  IconButton,
  Fade,
  Zoom,
  Slide
} from '@mui/material';
import {
  CloudUpload,
  PhotoCamera,
  CheckCircle,
  Error,
  Close,
  Celebration,
  AutoAwesome,
  Category as CategoryIcon
} from '@mui/icons-material';
import axios from 'axios';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Only image files are allowed (jpg, jpeg, png, gif).');
        setImage(null);
        return;
      }

      const maxSizeKB = 250;
      if (file.size > maxSizeKB * 1024) {
        setErrorMessage(`Image size must be less than ${maxSizeKB} KB.`);
        setImage(null);
        return;
      }

      setErrorMessage('');
      setImage(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", category);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8081/api/categories/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      
      setSuccessMessage("Category created successfully! 🎉");
      setShowSuccess(true);
      setCategory('');
      setImage(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage('');
      }, 3000);
      
    } catch (err) {
      console.error(err);
      setErrorMessage("Error adding category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
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
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            top: '10%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            top: '70%',
            right: '15%',
            animation: 'float 8s ease-in-out infinite reverse',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
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
                mb: 2,
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <AutoAwesome sx={{ color: '#ffd700', fontSize: 28 }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #ffffff 30%, #f093fb 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Add Category
              </Typography>
              <CategoryIcon sx={{ color: '#06b6d4', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
                maxWidth: 600,
                margin: '0 auto',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Create beautiful categories with stunning visuals
            </Typography>
          </Box>
        </Fade>

        {/* Main Content */}
        <Slide in direction="up" timeout={1200}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 4,
              alignItems: 'start',
            }}
          >
            {/* Form Section */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
                }
              }}
            >
              {/* Success/Error Messages */}
              <Zoom in={!!successMessage || !!errorMessage}>
                <Box sx={{ mb: 3 }}>
                  {successMessage && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 2,
                        background: 'rgba(16, 185, 129, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#10b981',
                        '& .MuiAlert-icon': { color: '#10b981' }
                      }}
                      icon={<Celebration />}
                    >
                      {successMessage}
                    </Alert>
                  )}
                  {errorMessage && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 2,
                        background: 'rgba(239, 68, 68, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        '& .MuiAlert-icon': { color: '#ef4444' }
                      }}
                    >
                      {errorMessage}
                    </Alert>
                  )}
                </Box>
              </Zoom>

              <form onSubmit={handleSubmit}>
                {/* Category Name Input */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 2,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <CategoryIcon sx={{ color: '#06b6d4' }} />
                    Category Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category name..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          borderColor: '#06b6d4',
                          boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1)',
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
                  />
                </Box>

                {/* File Upload Section */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 2,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <PhotoCamera sx={{ color: '#f59e0b' }} />
                    Category Image
                  </Typography>

                  {/* Drag & Drop Zone */}
                  <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      border: `2px dashed ${isDragOver ? '#06b6d4' : 'rgba(255, 255, 255, 0.3)'}`,
                      borderRadius: 3,
                      p: 4,
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: isDragOver 
                        ? 'rgba(6, 182, 212, 0.1)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        background: 'rgba(6, 182, 212, 0.1)',
                        borderColor: '#06b6d4',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover::before': {
                        left: '100%',
                      }
                    }}
                  >
                    <CloudUpload
                      sx={{
                        fontSize: 48,
                        color: isDragOver ? '#06b6d4' : 'rgba(255, 255, 255, 0.6)',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        mb: 1,
                        fontWeight: 600,
                      }}
                    >
                      {isDragOver ? 'Drop your image here!' : 'Drag & drop your image'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      or click to browse • Max 250KB • JPG, PNG, GIF
                    </Typography>
                  </Box>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  disabled={!category || !image || isLoading}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    background: !category || !image || isLoading
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    color: 'white',
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: !category || !image || isLoading
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                      transform: !category || !image || isLoading ? 'none' : 'translateY(-2px)',
                      boxShadow: !category || !image || isLoading 
                        ? 'none' 
                        : '0 8px 32px rgba(102, 126, 234, 0.4)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.5s ease',
                    },
                    '&:hover::before': {
                      left: '100%',
                    }
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' }
                          }
                        }}
                      />
                      Creating Category...
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AutoAwesome />
                      Create Category
                    </Box>
                  )}
                </Button>
              </form>
            </Paper>

            {/* Preview Section */}
            <Fade in timeout={1500}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 3,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Live Preview
                </Typography>

                {image ? (
                  <Zoom in timeout={500}>
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3)',
                        }
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          borderRadius: '12px',
                          display: 'block',
                        }}
                      />
                      <IconButton
                        onClick={removeImage}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          background: 'rgba(239, 68, 68, 0.8)',
                          color: 'white',
                          '&:hover': {
                            background: 'rgba(239, 68, 68, 1)',
                            transform: 'scale(1.1)',
                          }
                        }}
                        size="small"
                      >
                        <Close />
                      </IconButton>
                    </Box>
                  </Zoom>
                ) : (
                  <Box
                    sx={{
                      textAlign: 'center',
                      color: 'rgba(255, 255, 255, 0.6)',
                      py: 4,
                    }}
                  >
                    <PhotoCamera sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body1">
                      Upload an image to see preview
                    </Typography>
                  </Box>
                )}

                {category && (
                  <Fade in timeout={300}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        mt: 2,
                        fontWeight: 600,
                        textAlign: 'center',
                        background: 'linear-gradient(45deg, #06b6d4, #f59e0b)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {category}
                    </Typography>
                  </Fade>
                )}
              </Paper>
            </Fade>
          </Box>
        </Slide>

        {/* Success Celebration */}
        {showSuccess && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(16, 185, 129, 0.1)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              animation: 'celebration 3s ease-in-out',
              '@keyframes celebration': {
                '0%': { opacity: 0, transform: 'scale(0.8)' },
                '20%': { opacity: 1, transform: 'scale(1.1)' },
                '80%': { opacity: 1, transform: 'scale(1)' },
                '100%': { opacity: 0, transform: 'scale(0.9)' }
              }
            }}
          >
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                background: 'rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(20px)',
                p: 4,
                borderRadius: 4,
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <Celebration sx={{ fontSize: 64, mb: 2, color: '#10b981' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Success!
              </Typography>
              <Typography variant="h6">
                Category created successfully! 🎉
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddCategory;

