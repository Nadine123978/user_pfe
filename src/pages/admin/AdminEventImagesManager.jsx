import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

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
            transform: 'translateY(-5px)',
            boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

// Styled components للستايل الجميل
const CosmicContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
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
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
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
    animation: 'sparkle 3s linear infinite',
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
  '@keyframes sparkle': {
    '0%, 100%': { opacity: 0, transform: 'scale(0)' },
    '50%': { opacity: 1, transform: 'scale(1)' },
  },
});

const GlassmorphismPaper = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '1400px',
  margin: 'auto',
  position: 'relative',
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
});

const EventCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  borderRadius: '20px',
  padding: '30px',
  marginBottom: '25px',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    borderColor: 'rgba(99, 102, 241, 0.6)',
    boxShadow: `
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(99, 102, 241, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
  },
});

const EventTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.8rem',
  color: '#F0F0F0',
  marginBottom: '15px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
});

const GalleryContainer = styled(Box)({
  background: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  borderRadius: '30px',
  padding: '40px',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  position: 'relative',
});

const GalleryTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '2.5rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

const FolderPath = styled(Typography)({
  color: 'rgba(240, 240, 240, 0.7)',
  fontSize: '0.9rem',
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid rgba(99, 102, 241, 0.2)',
});

const UploadButton = styled(Button)({
  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  border: 'none',
  borderRadius: '25px',
  padding: '15px 30px',
  fontWeight: 600,
  fontSize: '1rem',
  color: 'white',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 25px rgba(139, 92, 246, 0.4)',
    background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
  },
});

const ImageCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  aspectRatio: '1',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
    borderColor: 'rgba(99, 102, 241, 0.6)',
    boxShadow: `
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(99, 102, 241, 0.3)
    `,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'rgba(239, 68, 68, 0.8)',
  color: 'white',
  width: '35px',
  height: '35px',
  transition: 'all 0.3s ease',
  opacity: 0,
  transform: 'scale(0)',
  '&:hover': {
    background: 'rgba(239, 68, 68, 1)',
    transform: 'scale(1.1)',
  },
  '.image-card:hover &': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

const AddImageCard = styled(Box)({
  background: 'rgba(99, 102, 241, 0.05)',
  border: '2px dashed rgba(99, 102, 241, 0.3)',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  aspectRatio: '1',
  '&:hover': {
    background: 'rgba(99, 102, 241, 0.1)',
    borderColor: 'rgba(99, 102, 241, 0.6)',
    transform: 'scale(1.05)',
  },
});

const AddImageText = styled(Typography)({
  fontSize: '3rem',
  color: '#6366f1',
  fontWeight: 300,
});

export default function AdminEventImagesManager() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [images, setImages] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);

  // جلب الأحداث من backend مرة وحدة عند تحميل الصفحة
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
        alert("خطأ في تحميل الأحداث");
      }
    };
    fetchEvents();
  }, []);

  // تحميل الصور من backend حسب الـ eventId
  const loadImagesForEvent = async (eventId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/events/${eventId}/images`
      );
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      alert("خطأ في تحميل الصور");
    }
  };

  // لما تختار حدث
  const handleManageImages = (event) => {
    setSelectedEvent(event);
    loadImagesForEvent(event.id);
  };

  const handleCloseManage = () => {
    setSelectedEvent(null);
    setImages([]);
  };

  // حذف صورة عبر الـ backend
  const handleDeleteImage = async (imageId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/events/images/${imageId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      // بعد الحذف، اعادة تحميل الصور
      await loadImagesForEvent(selectedEvent.id);
    } catch (error) {
      console.error(error);
      alert("فشل حذف الصورة");
    }
  };

  // فتح نافذة رفع الصور
  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  // إغلاق نافذة رفع الصور
  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setUploadFiles([]);
  };

  // اختيار ملفات للرفع
  const handleFileChange = (e) => {
    setUploadFiles(Array.from(e.target.files));
  };

  // رفع الصور إلى backend
  const handleUploadImages = async () => {
    if (!uploadFiles.length) return;

    try {
      for (const file of uploadFiles) {
        const singleFormData = new FormData();
        singleFormData.append("file", file);

        const res = await fetch(
          `http://localhost:8081/api/events/${selectedEvent.id}/images`,
          {
            method: "POST",
            body: singleFormData,
          }
        );
        if (!res.ok) throw new Error("Upload failed");
      }

      // بعد الرفع، إعادة تحميل الصور
      await loadImagesForEvent(selectedEvent.id);
      handleCloseUploadDialog();
    } catch (error) {
      console.error(error);
      alert("فشل رفع الصور");
    }
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <Box sx={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
          <GlassmorphismPaper>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '3rem', mb: 2 }}>
                Event Images Manager ✨
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                Cosmic gallery management for your stellar events
              </Typography>
            </Box>

            {!selectedEvent ? (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#6366f1', fontWeight: 600 }}>
                  Select an Event to Manage Images
                </Typography>
                <Grid container spacing={3}>
                  {events.map((event) => (
                    <Grid item xs={12} md={6} lg={4} key={event.id}>
                      <EventCard>
                        <EventTitle>{event.title}</EventTitle>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                          {event.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Button
                            variant="contained"
                            onClick={() => handleManageImages(event)}
                            sx={{
                              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
                              }
                            }}
                          >
                            🖼️ Manage Images
                          </Button>
                        </Box>
                      </EventCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <GalleryContainer>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <GalleryTitle>
                      {selectedEvent.title} Gallery
                    </GalleryTitle>
                    <FolderPath>
                      Event ID: {selectedEvent.id}
                    </FolderPath>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <UploadButton
                      startIcon={<UploadIcon />}
                      onClick={handleOpenUploadDialog}
                    >
                      Upload Images
                    </UploadButton>
                    <Button
                      variant="outlined"
                      onClick={handleCloseManage}
                      sx={{
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        color: '#6366f1',
                        '&:hover': {
                          borderColor: '#6366f1',
                          background: 'rgba(99, 102, 241, 0.1)',
                        }
                      }}
                    >
                      ← Back to Events
                    </Button>
                  </Stack>
                </Box>

                <Grid container spacing={3}>
                  {images.map((image) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                      <ImageCard className="image-card">
                        <img
                          src={`http://localhost:8081${image.imagePath}`}
                          alt={`Event ${selectedEvent.title}`}
                        />
                        <DeleteButton
                          onClick={() => handleDeleteImage(image.id)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </DeleteButton>
                      </ImageCard>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AddImageCard onClick={handleOpenUploadDialog}>
                      <AddImageText>+</AddImageText>
                    </AddImageCard>
                  </Grid>
                </Grid>
              </GalleryContainer>
            )}

            {/* Upload Dialog */}
            <Dialog
              open={uploadDialogOpen}
              onClose={handleCloseUploadDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 700,
                fontSize: '1.8rem'
              }}>
                Upload Images to {selectedEvent?.title}
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '20px',
                    border: '2px dashed rgba(99, 102, 241, 0.3)',
                    borderRadius: '12px',
                    background: 'rgba(99, 102, 241, 0.05)',
                    color: '#ffffff',
                    fontSize: '16px',
                  }}
                />
                {uploadFiles.length > 0 && (
                  <Typography sx={{ mt: 2, color: '#10b981', fontWeight: 500 }}>
                    ✅ Selected {uploadFiles.length} file(s)
                  </Typography>
                )}
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button
                  onClick={handleCloseUploadDialog}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadImages}
                  variant="contained"
                  disabled={!uploadFiles.length}
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
                    }
                  }}
                >
                  🚀 Upload
                </Button>
              </DialogActions>
            </Dialog>
          </GlassmorphismPaper>
        </Box>
      </CosmicContainer>
    </ThemeProvider>
  );
}

