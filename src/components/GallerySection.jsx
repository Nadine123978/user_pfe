import React from 'react';
import { Box, Button } from '@mui/material';

const images = [
  "https://cdn.getyourguide.com/img/location/5ffeb8f21795d.jpeg/88.jpg", // الرئيسية
  "https://cdn.getyourguide.com/img/tour/5ffeb8f21795d.jpeg/88.jpg",
  "https://cdn.getyourguide.com/img/tour/5ffe9fa7f08dd.jpeg/88.jpg",
  "https://cdn.getyourguide.com/img/tour/5ffe9d2149089.jpeg/88.jpg",
  "https://cdn.getyourguide.com/img/tour/5ffe9c2ff325d.jpeg/88.jpg",
  "https://cdn.getyourguide.com/img/tour/5ffe9c2b7ac6e.jpeg/88.jpg"
];

const GallerySection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 1,
        borderRadius: 2,
        overflow: 'hidden',
        maxHeight: 400,
        marginBottom: 2
      }}
    >
      {/* الصورة الكبيرة */}
      <Box
        component="img"
        src={images[0]}
        alt="main"
        sx={{
          width: { xs: '100%', md: '65%' },
          height: 400,
          objectFit: 'cover',
          borderRadius: 2
        }}
      />

      {/* الصور الصغيرة داخل نفس الـ box */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 1,
          width: '35%',
          height: 400
        }}
      >
        {images.slice(1, 6).map((img, i) => (
          <Box
            key={i}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`thumb-${i}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            {i === 4 && (
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: '#000',
                  fontSize: 12,
                  borderRadius: 10,
                  padding: '6px 12px',
                  textTransform: 'none'
                }}
              >
                📷 Gallery
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GallerySection;
