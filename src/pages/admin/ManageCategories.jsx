import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
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
  Star as StarIcon,
  AutoAwesome as AutoAwesomeIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
          },
          '&.MuiButton-outlined': {
            border: '1px solid rgba(99, 102, 241, 0.5)',
            color: '#6366f1',
            '&:hover': {
              border: '1px solid #6366f1',
              background: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#6366f1',
          fontWeight: 700,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 600,
          fontSize: '0.75rem',
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

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
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
  marginBottom: '24px',
  padding: '16px 32px',
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

const StatCard = styled(Card)(({ color }) => ({
  padding: '24px',
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
    background: `linear-gradient(90deg, ${color}, #6366f1)`,
  },
}));

const CategoryCard = styled(Card)({
  height: '320px',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
  },
});

const LoadingSkeleton = styled(Card)({
  height: '320px',
  animation: `${pulseAnimation} 2s ease-in-out infinite`,
});

const SearchContainer = styled(Box)({
  marginBottom: '32px',
  display: 'flex',
  justifyContent: 'center',
});

const MainContent = styled(Box)({
  maxWidth: '1400px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
});

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

  // Statistics
  const totalCategories = categories.length;
  const trendingCategories = categories.filter(cat => cat.isTrending).length;

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />

        <MainContent>
          {/* Hero Header */}
          <Fade in timeout={1000}>
            <HeroHeader>
              <HeroBadge>
                <HeroTitle variant="h3">
                  Cosmic Categories Manager
                </HeroTitle>
              </HeroBadge>

              {/* Statistics Cards */}
              <Grid container spacing={3} sx={{ maxWidth: 600, margin: '0 auto' }}>
                <Grid item xs={12} md={6}>
                  <Zoom in timeout={1200}>
                    <StatCard color="#6366f1">
                      <CategoryIcon sx={{ color: '#6366f1', fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                        {totalCategories}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Total Categories
                      </Typography>
                    </StatCard>
                  </Zoom>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Zoom in timeout={1400}>
                    <StatCard color="#f59e0b">
                      <TrendingUpIcon sx={{ color: '#f59e0b', fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                        {trendingCategories}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Trending Categories
                      </Typography>
                    </StatCard>
                  </Zoom>
                </Grid>
              </Grid>
            </HeroHeader>
          </Fade>

          {/* Search Bar */}
          <Slide in direction="up" timeout={1800}>
            <SearchContainer>
              <TextField
                placeholder="Search cosmic categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ maxWidth: 500, width: '100%', fontSize: '1.1rem' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </SearchContainer>
          </Slide>

          {/* Categories Grid */}
          <Fade in timeout={2000}>
            <Grid container spacing={3}>
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <LoadingSkeleton />
                  </Grid>
                ))
              ) : (
                filteredCategories.map((cat, index) => {
                  const imageUrl = getImageUrl(cat);
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
                      <Zoom in timeout={2200 + index * 100}>
                        <CategoryCard>
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
                                  transition: 'transform 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                  },
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  height: 160,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                                }}
                              >
                                <ImageIcon sx={{ fontSize: 60, color: 'rgba(255, 255, 255, 0.5)' }} />
                              </Box>
                            )}

                            {/* Trending Badge */}
                            {cat.isTrending && (
                              <Chip
                                label="Trending"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                  color: 'white',
                                  fontWeight: 600,
                                  '& .MuiChip-icon': {
                                    color: 'white',
                                  },
                                }}
                                icon={<StarIcon />}
                              />
                            )}
                          </Box>

                          {/* Category Content */}
                          <CardContent sx={{ flexGrow: 1, p: 2 }}>
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

                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                mb: 2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {cat.description || 'No description available'}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <CalendarIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)' }} />
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                {new Date(cat.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </CardContent>

                          {/* Category Actions */}
                          <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="Edit Category">
                                <IconButton
                                  size="small"
                                  onClick={() => navigate(`/admin/categories/edit/${cat.id}`)}
                                  sx={{
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    color: '#6366f1',
                                    '&:hover': {
                                      background: 'rgba(99, 102, 241, 0.3)',
                                      transform: 'scale(1.1)',
                                    },
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
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    color: '#ef4444',
                                    '&:hover': {
                                      background: 'rgba(239, 68, 68, 0.3)',
                                      transform: 'scale(1.1)',
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </CardActions>
                        </CategoryCard>
                      </Zoom>
                    </Grid>
                  );
                })
              )}

              {/* Empty State */}
              {!loading && filteredCategories.length === 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      px: 4,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <CategoryIcon sx={{ fontSize: 80, color: 'rgba(255, 255, 255, 0.3)', mb: 2 }} />
                    <Typography variant="h5" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                      No Categories Found
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                      {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first category'}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/admin/categories/add')}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Create Category
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Fade>
        </MainContent>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openConfirm}
          onClose={handleCancelDelete}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
              Are you sure you want to delete this category? This action cannot be undone and will permanently remove the category from your system.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button onClick={handleCancelDelete} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} variant="contained" color="error">
              Delete Category
            </Button>
          </DialogActions>
        </Dialog>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default ManageCategories;

