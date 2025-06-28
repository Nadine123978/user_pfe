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
  Typography
} from '@mui/material';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://' ) || url.startsWith('https://' )) {
    return url;
  }
  return `http://localhost:8081${url}`;
};

const ImageGallery = ({ eventId } ) => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (!eventId) {
      console.warn('No eventId provided!');
      return;
    }

    const fetchImages = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/events/${eventId}/images` );
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
        alert('Error loading images');
      }
    };

    fetchImages();
  }, [eventId]);

  const handleThumbnailClick = (url, index) => {
    setMainImage(getFullImageUrl(url));
    setActivePhotoIndex(index);
  };

  const handleSeeMore = () => {
    setOpen(true);
  };

  const handleShareClick = () => {
    alert('Share feature coming soon!');
  };

  const handleFavoriteClick = () => {
    alert('Added to favorites!');
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '450px',
          backgroundColor: '#2C0050', // Dark background for the image gallery block
          borderRadius: '16px', // Rounded corners
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow
          border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle light border
          p: 2, // Padding inside the image gallery block
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Main Image Display */}
        <Card
          sx={{
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)', // Subtle shadow for the image itself
            border: '1px solid rgba(255, 255, 255, 0.05)', // Very subtle border
            width: '100%',
            height: 400, // Fixed height for main image
            backgroundColor: '#333', // Fallback background for card
          }}
        >
          {mainImage ? (
            <CardMedia
              component="img"
              image={mainImage}
              alt="Main Event Image"
              sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FFF',
                borderRadius: '15px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              No Image Available
            </Box>
          )}
        </Card>

        {/* Horizontal Thumbnails below the main image */}
        <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          {images.slice(0, 5).map((img, i) => ( // Display up to 5 thumbnails horizontally
            <Grid item key={img.id}>
              <Card
                sx={{
                  width: 80, // Thumbnail width
                  height: 60, // Thumbnail height
                  cursor: 'pointer',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                  border: i === activePhotoIndex ? '2px solid #FF4081' : '2px solid transparent',
                  transition: 'border 0.3s ease-in-out, transform 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: '#E91E63',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={getFullImageUrl(img.imageUrl)}
                  alt={`Thumbnail ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                  onClick={() => handleThumbnailClick(img.imageUrl, i)}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Floating "See More" Button (positioned relative to the ImageGallery block) */}
        <Button
          variant="contained"
          size="small"
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px', // Position inside the block, but floating
            background: 'linear-gradient(45deg, #D81B60 30%, #E91E63 90%)',
            color: 'white',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
            px: 2,
            py: 1,
            minWidth: '80px',
            zIndex: 1,
            '&:hover': {
              background: 'linear-gradient(45deg, #C2185B 30%, #D81B60 90%)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',
              transform: 'translateY(-1px)',
            },
          }}
          onClick={handleSeeMore}
        >
          See More
        </Button>

        {/* Floating Share/Favorite Icons (positioned relative to the ImageGallery block) */}
        <Box
          sx={{
            position: 'absolute',
            top: '80px', // Adjust position below "See More"
            left: '20px', // Align with "See More" button
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            zIndex: 1,
          }}
        >
          <IconButton
            size="medium"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              borderRadius: '50%',
              width: 48,
              height: 48,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={handleShareClick}
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            size="medium"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              borderRadius: '50%',
              width: 48,
              height: 48,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={handleFavoriteClick}
          >
            <FavoriteBorder />
          </IconButton>
        </Box>
      </Box>

      {/* Modal for full image viewer (remains unchanged in functionality) */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1A0033',
            color: 'white',
            borderRadius: '20px',
            boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.8)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#E0E0E0' }}>
            Istanbul Hodjapasha Whirling Dervishes Show & Exhibition
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.25)',
              },
              borderRadius: '50%',
              p: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)' }}>
              <CardMedia
                component="img"
                image={getFullImageUrl(images[activePhotoIndex]?.imageUrl)}
                alt="Preview"
                sx={{ maxHeight: 500, objectFit: 'contain', width: '100%' }}
              />
            </Card>
          </Box>
          <Grid container spacing={1.5} justifyContent="center" mt={2}>
            {images.map((img, i) => (
              <Grid item key={img.id} xs={2}>
                <CardMedia
                  component="img"
                  image={getFullImageUrl(img.imageUrl)}
                  onClick={() => handleThumbnailClick(img.imageUrl, i)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: i === activePhotoIndex ? '3px solid #FF4081' : '3px solid transparent',
                    transition: 'border 0.3s ease-in-out, transform 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: '#E91E63',
                      transform: 'scale(1.05)',
                    }
                  }}
                  height="70"
                  alt={`Image ${i + 1}`}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
