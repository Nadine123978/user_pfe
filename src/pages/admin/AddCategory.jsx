import React, { useState, useRef } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Button, 
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
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';

// ثيم بنفسجي-أزرق مخصص (cosmic design)
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',  // بنفسجي أزرق
    },
    secondary: {
      main: '#06b6d4',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #6366f1',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), 0 8px 32px rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-2px)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.6)',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&.MuiAlert-standardSuccess': {
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            '& .MuiAlert-icon': { color: '#10b981' },
          },
          '&.MuiAlert-standardError': {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            '& .MuiAlert-icon': { color: '#ef4444' },
          },
        },
      },
    },
  },
});

// Keyframe animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components
const CosmicContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    animation: `${floatAnimation} 6s ease-in-out infinite`,
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 3s linear infinite`,
  },
  '&::before': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '60%',
    right: '15%',
    animationDelay: '1.5s',
    background: '#06b6d4',
  },
});

const HeroHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: '48px',
  position: 'relative',
  zIndex: 1,
});

const HeroBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  padding: '12px 24px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '50px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
});

const HeroTitle = styled(Typography)({
  fontWeight: 800,
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '3rem',
  letterSpacing: '-0.02em',
  '@media (max-width: 768px)': {
    fontSize: '2rem',
  },
});

const HeroSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontWeight: 400,
  maxWidth: '600px',
  margin: '0 auto',
  fontSize: '1.25rem',
  '@media (max-width: 768px)': {
    fontSize: '1rem',
  },
});

const MainContent = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
});

const FormPaper = styled(Box)({
  padding: '40px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `
      0 16px 64px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
  },
});

const SectionTitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '16px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '1.2rem',
});

const DropZone = styled(Box)(({ isDragOver }) => ({
  border: `2px dashed ${isDragOver ? '#06b6d4' : 'rgba(255, 255, 255, 0.3)'}`,
  borderRadius: '16px',
  padding: '32px',
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
  },
}));

const ImagePreview = styled(Box)({
  marginTop: '16px',
  position: 'relative',
  display: 'inline-block',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '2px solid rgba(99, 102, 241, 0.3)',
  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
});

const RemoveButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  background: 'rgba(239, 68, 68, 0.8)',
  color: 'white',
  width: '32px',
  height: '32px',
  '&:hover': {
    background: 'rgba(239, 68, 68, 0.9)',
    transform: 'scale(1.1)',
  },
});

const SubmitButton = styled(Button)(({ disabled }) => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '12px',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  background: disabled
    ? 'rgba(255, 255, 255, 0.1)'
    : 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200%',
    width: '200%',
    height: '100%',
    background: `
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      )
    `,
    transition: 'left 0.6s ease',
  },
  '&:hover::before': {
    left: disabled ? '-200%' : '100%',
  },
}));

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
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />

        <MainContent>
          {/* Hero Header */}
          <Fade in timeout={1000}>
            <HeroHeader>
              <HeroBadge>
                <AutoAwesome sx={{ color: '#ffd700', fontSize: 28 }} />
                <HeroTitle variant="h3">
                  Add Cosmic Category
                </HeroTitle>
                <CategoryIcon sx={{ color: '#06b6d4', fontSize: 28 }} />
              </HeroBadge>
              <HeroSubtitle variant="h6">
                Create beautiful categories with stunning visuals in the cosmic realm
              </HeroSubtitle>
            </HeroHeader>
          </Fade>

          {/* Main Content */}
          <Slide in direction="up" timeout={1200}>
            <FormPaper>
              {/* Success/Error Messages */}
              <Zoom in={!!successMessage || !!errorMessage}>
                <Box sx={{ mb: 3 }}>
                  {successMessage && (
                    <Alert 
                      severity="success" 
                      icon={<Celebration />}
                      sx={{ mb: 2 }}
                    >
                      {successMessage}
                    </Alert>
                  )}
                  {errorMessage && (
                    <Alert 
                      severity="error" 
                      sx={{ mb: 2 }}
                    >
                      {errorMessage}
                    </Alert>
                  )}
                </Box>
              </Zoom>

              <form onSubmit={handleSubmit}>
                {/* Category Name Input */}
                <Box sx={{ mb: 4 }}>
                  <SectionTitle>
                    <CategoryIcon sx={{ color: '#06b6d4' }} />
                    Category Name
                  </SectionTitle>
                  <TextField
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category name..."
                    sx={{ fontSize: '1.1rem' }}
                  />
                </Box>

                {/* File Upload Section */}
                <Box sx={{ mb: 4 }}>
                  <SectionTitle>
                    <PhotoCamera sx={{ color: '#f59e0b' }} />
                    Category Image
                  </SectionTitle>

                  {/* Drag & Drop Zone */}
                  <DropZone
                    isDragOver={isDragOver}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
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
                      {isDragOver ? 'Drop your cosmic image here!' : 'Drag & drop your cosmic image'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      or click to browse • Max 250KB • JPG, PNG, GIF
                    </Typography>
                  </DropZone>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />

                  {/* Image Preview */}
                  {image && (
                    <Zoom in timeout={300}>
                      <ImagePreview>
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          style={{
                            width: '200px',
                            height: '150px',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                        <RemoveButton
                          onClick={removeImage}
                          size="small"
                        >
                          <Close fontSize="small" />
                        </RemoveButton>
                      </ImagePreview>
                    </Zoom>
                  )}
                </Box>

                {/* Submit Button */}
                <SubmitButton
                  type="submit"
                  disabled={!category || !image || isLoading}
                >
                  {isLoading ? (
                    <>
                      <AutoAwesome sx={{ mr: 1, animation: `${sparkleAnimation} 1s linear infinite` }} />
                      Creating Cosmic Category...
                    </>
                  ) : (
                    <>
                      <Celebration sx={{ mr: 1 }} />
                      Create Cosmic Category
                    </>
                  )}
                </SubmitButton>
              </form>
            </FormPaper>
          </Slide>
        </MainContent>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default AddCategory;

