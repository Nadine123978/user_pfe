import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";

const getFullImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `http://localhost:8081${url}`;
};

const ImageGallery = ({ eventId, onThumbnailClick }) => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (!eventId) {
      console.warn("No eventId provided!");
      return;
    }

    const fetchImages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/api/events/${eventId}/images`
        );
        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch error:", res.status, text);
          throw new Error(`Failed to fetch images: ${res.status}`);
        }
        const data = await res.json();
        setImages(data);
        if (data.length > 0) {
          setMainImage(getFullImageUrl(data[0].imageUrl));
          setActivePhotoIndex(0);
          if(onThumbnailClick) onThumbnailClick(data[0]); // يقدر يعمل شيء عند اختيار الصورة
        }
      } catch (error) {
        console.error("Error loading images:", error);
        alert("Error loading images");
      }
    };

    fetchImages();
  }, [eventId]);

  const handleThumbnailClick = (url, index) => {
    setMainImage(getFullImageUrl(url));
    setActivePhotoIndex(index);
    if(onThumbnailClick) onThumbnailClick(images[index]);
  };

  const handleSeeMore = () => {
    setOpen(true);
  };

  const handleShareClick = () => {
    alert("Share feature coming soon!");
  };

  const handleFavoriteClick = () => {
    alert("Added to favorites!");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          height: 450,
        }}
      >
        {/* الصور المصغرة على اليسار */}
        <Box
          sx={{
            width: 100,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowY: "auto",
          }}
        >
          {images.slice(0, 10).map((img, i) => (
            <Card
              key={img.id}
              sx={{
                width: 80,
                height: 60,
                cursor: "pointer",
                border:
                  mainImage === getFullImageUrl(img.imageUrl)
                    ? "2px solid blue"
                    : "none",
              }}
              onClick={() => handleThumbnailClick(img.imageUrl, i)}
            >
              <CardMedia
                component="img"
                image={getFullImageUrl(img.imageUrl)}
                alt={`Thumbnail ${i + 1}`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Card>
          ))}
          <Button
            variant="outlined"
            size="small"
            sx={{ width: "100%", fontSize: 10 }}
            onClick={handleSeeMore}
          >
            See More
          </Button>
        </Box>

        {/* الصورة الكبيرة تأخذ باقي العرض */}
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            {mainImage ? (
             <CardMedia
  component="img"
  image={mainImage}
  alt="Main Image"
  sx={{ objectFit: 'contain', width: 700, maxHeight: 450, mx: 'auto' }}
/>

            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  bgcolor: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Image Available
              </Box>
            )}
          </Card>

          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton size="small" sx={{ bgcolor: "white" }} onClick={handleShareClick}>
              <ShareIcon />
            </IconButton>
            <IconButton size="small" sx={{ bgcolor: "white" }} onClick={handleFavoriteClick}>
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Modal for full image viewer */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography fontWeight="bold">
            Istanbul Hodjapasha Whirling Dervishes Show & Exhibition
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card>
              <CardMedia
                component="img"
                image={getFullImageUrl(images[activePhotoIndex]?.imageUrl)}
                alt="Preview"
                sx={{ maxHeight: 450, objectFit: "contain" }}
              />
            </Card>
          </Box>
          <Grid container spacing={1} justifyContent="center" mt={2}>
            {images.map((img, i) => (
              <Grid item key={img.id} xs={2}>
                <CardMedia
                  component="img"
                  image={getFullImageUrl(img.imageUrl)}
                  onClick={() => handleThumbnailClick(img.imageUrl, i)}
                  sx={{
                    cursor: "pointer",
                    border: i === activePhotoIndex ? "2px solid black" : "none",
                  }}
                  height="60"
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
