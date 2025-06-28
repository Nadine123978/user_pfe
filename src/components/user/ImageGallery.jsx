import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Fade,
  Zoom,
  Skeleton,
  Backdrop
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FavoriteBorder,
  Favorite,
  Share,
  Close,
  Fullscreen,
  NavigateBefore,
  NavigateNext,
  PhotoLibrary
} from '@mui/icons-material';

// Enhanced styled components
const GalleryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  height: 400,
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minWidth: 100,
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    overflowX: 'auto',
    minWidth: 'auto',
    paddingBottom: theme.spacing(1),
    '&::-webkit-scrollbar': {
      height: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(90deg, #E91E63, #9C27B0)',
      borderRadius: 2,
    },
  },
}));

const ThumbnailCard = styled(Card)(({ theme, isActive }) => ({
  width: 80,
  height: 60,
  cursor: 'pointer',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: isActive ? '3px solid #E91E63' : '2px solid transparent',
  boxShadow: isActive 
    ? '0 8px 25px rgba(233, 30, 99, 0.4)' 
    : '0 4px 15px rgba(0, 0, 0, 0.2)',
  
  '&:hover': {
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 12px 30px rgba(233, 30, 99, 0.3)',
    border: '2px solid #E91E63',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isActive 
      ? 'linear-gradient(45deg, rgba(233, 30, 99, 0.2), rgba(156, 39, 176, 0.2))'
      : 'transparent',
    zIndex: 1,
    transition: 'background 0.3s ease',
  },
  
  [theme.breakpoints.down('md')]: {
    minWidth: 80,
  },
}));

const MainImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  borderRadius: 16,
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #2C3E50, #4A148C)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,0,0,0.1), transparent)',
    zIndex: 1,
    pointerEvents: 'none',
  },
}));

const ActionButton = styled(IconButton)(({ theme, variant }) => ({
  background: variant === 'favorite' && theme.isFavorite
    ? 'linear-gradient(135deg, #E91E63, #C2185B)'
    : 'rgba(255, 255, 255, 0.9)',
  color: variant === 'favorite' && theme.isFavorite ? 'white' : '#333',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: variant === 'favorite'
      ? 'linear-gradient(135deg, #E91E63, #C2185B)'
      : 'rgba(255, 255, 255, 1)',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const SeeMoreButton = styled(Button)(({ theme }) => ({
  width: 80,
  height: 40,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderRadius: 12,
  background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
  color: 'white',
  border: 'none',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  
  '&:hover': {
    background: 'linear-gradient(135deg, #C2185B, #7B1FA2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(233, 30, 99, 0.4)',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'linear-gradient(145deg, rgba(32, 2, 69, 0.98), rgba(26, 2, 53, 0.98))',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  zIndex: 10,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
    transform: 'translateY(-50%) scale(1.1)',
  },
  
  '&.prev': {
    left: 16,
  },
  
  '&.next': {
    right: 16,
  },
}));

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `http://localhost:8081${url}`;
};

const ImageGallery = ({ eventId }) => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      console.warn('No eventId provided!');
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/events/${eventId}/images`);
        if (!res.ok) {
          const text = await res.text();
          console.error('Fetch error:', res.status, text);
          throw new Error(`Failed to fetch images: ${res.status}`);
        }
        const data = await res.json();
        setImages(data);
        if (data.length > 0) {
          setMainImage(getFullImageUrl(data[0].imageUrl));
          setActivePhotoIndex(0);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        // Don't show alert, just log the error
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [eventId]);

  const handleThumbnailClick = (url, index) => {
    setImageLoading(true);
    setMainImage(getFullImageUrl(url));
    setActivePhotoIndex(index);
  };

  const handleSeeMore = () => {
    setOpen(true);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Event Gallery',
        text: 'Check out this amazing event!',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically save to backend or localStorage
  };

  const handlePrevImage = () => {
    const prevIndex = activePhotoIndex > 0 ? activePhotoIndex - 1 : images.length - 1;
    handleThumbnailClick(images[prevIndex].imageUrl, prevIndex);
  };

  const handleNextImage = () => {
    const nextIndex = activePhotoIndex < images.length - 1 ? activePhotoIndex + 1 : 0;
    handleThumbnailClick(images[nextIndex].imageUrl, nextIndex);
  };

  if (loading) {
    return (
      <GalleryContainer>
        <ThumbnailContainer>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={80}
              height={60}
              sx={{ borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            />
          ))}
          <Skeleton
            variant="rectangular"
            width={80}
            height={40}
            sx={{ borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }}
          />
        </ThumbnailContainer>
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }}
          />
        </Box>
      </GalleryContainer>
    );
  }

  if (!images.length) {
    return (
      <MainImageContainer>
        <Box
          sx={{
            width: '100%',
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <PhotoLibrary sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No Images Available
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 300 }}>
            Images for this event will be available soon
          </Typography>
        </Box>
      </MainImageContainer>
    );
  }

  return (
    <>
      <GalleryContainer>
        <ThumbnailContainer>
          {images.slice(0, 4).map((img, i) => (
            <Fade in={true} timeout={300 + i * 100} key={img.id}>
              <ThumbnailCard isActive={mainImage === getFullImageUrl(img.imageUrl)}>
                <CardMedia
                  component="img"
                  image={getFullImageUrl(img.imageUrl)}
                  alt={`Thumbnail ${i + 1}`}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 2,
                  }}
                  onClick={() => handleThumbnailClick(img.imageUrl, i)}
                />
              </ThumbnailCard>
            </Fade>
          ))}

          {images.length > 4 && (
            <Zoom in={true} timeout={800}>
              <SeeMoreButton onClick={handleSeeMore}>
                +{images.length - 4} More
              </SeeMoreButton>
            </Zoom>
          )}
        </ThumbnailContainer>

        <MainImageContainer>
          {mainImage ? (
            <>
              <CardMedia
                component="img"
                image={mainImage}
                alt="Main Image"
                sx={{ 
                  objectFit: 'cover', 
                  width: '100%', 
                  height: '100%',
                  transition: 'opacity 0.3s ease',
                  opacity: imageLoading ? 0 : 1,
                }}
                onLoad={() => setImageLoading(false)}
              />
              
              {imageLoading && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              )}

              {/* Navigation arrows for main image */}
              {images.length > 1 && (
                <>
                  <NavigationButton className="prev" onClick={handlePrevImage}>
                    <NavigateBefore />
                  </NavigationButton>
                  <NavigationButton className="next" onClick={handleNextImage}>
                    <NavigateNext />
                  </NavigationButton>
                </>
              )}

              {/* Action buttons */}
              <Box sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                display: 'flex', 
                gap: 1,
                zIndex: 5,
              }}>
                <ActionButton 
                  size="small" 
                  onClick={handleShareClick}
                  title="Share"
                >
                  <Share fontSize="small" />
                </ActionButton>
                <ActionButton 
                  size="small" 
                  variant="favorite"
                  onClick={handleFavoriteClick}
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  theme={{ isFavorite }}
                >
                  {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                </ActionButton>
                <ActionButton 
                  size="small" 
                  onClick={handleSeeMore}
                  title="View fullscreen"
                >
                  <Fullscreen fontSize="small" />
                </ActionButton>
              </Box>

              {/* Image counter */}
              <Box sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                zIndex: 5,
              }}>
                <Typography variant="caption" fontWeight="bold">
                  {activePhotoIndex + 1} / {images.length}
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <PhotoLibrary sx={{ fontSize: 48, opacity: 0.5 }} />
            </Box>
          )}
        </MainImageContainer>
      </GalleryContainer>

      {/* Enhanced Modal for full image viewer */}
      <StyledDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth={false}
        fullWidth
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#E91E63' }}>
            Event Gallery
          </Typography>
          <IconButton 
            onClick={() => setOpen(false)}
            sx={{ 
              color: 'white',
              '&:hover': { 
                background: 'rgba(233, 30, 99, 0.2)',
                transform: 'scale(1.1)',
              }
            }}
          >
            <Close />
          </IconButton>
        </Box>
        
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 3,
            position: 'relative',
          }}>
            <Card sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              maxHeight: '60vh',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}>
              <CardMedia
                component="img"
                image={getFullImageUrl(images[activePhotoIndex]?.imageUrl)}
                alt="Preview"
                sx={{ 
                  maxHeight: '60vh', 
                  objectFit: 'contain',
                  width: 'auto',
                }}
              />
            </Card>
          </Box>
          
          <Grid container spacing={2} justifyContent="center">
            {images.map((img, i) => (
              <Grid item key={img.id}>
                <Card sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: i === activePhotoIndex ? '3px solid #E91E63' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    border: '2px solid #E91E63',
                  }
                }}>
                  <CardMedia
                    component="img"
                    image={getFullImageUrl(img.imageUrl)}
                    onClick={() => handleThumbnailClick(img.imageUrl, i)}
                    sx={{ width: 80, height: 60, objectFit: 'cover' }}
                    alt={`Image ${i + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default ImageGallery;

