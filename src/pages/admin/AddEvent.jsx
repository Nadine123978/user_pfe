import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, TextField, Typography, Grid, Paper, InputLabel,
  MenuItem, FormControl, Select, Box
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// Create custom theme for the cosmic design
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
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
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
      },
    },
    MuiFormControl: {
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
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '16px',
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
  },
});

// Styled components for enhanced visual effects
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

const GlassmorphismPaper = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '900px',
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

const UploadZone = styled(Box)({
  border: '2px dashed rgba(99, 102, 241, 0.3)',
  borderRadius: '16px',
  padding: '40px 20px',
  textAlign: 'center',
  background: 'rgba(99, 102, 241, 0.05)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    border: '2px dashed rgba(99, 102, 241, 0.6)',
    background: 'rgba(99, 102, 241, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
    transform: 'rotate(45deg)',
    animation: 'shimmer 3s linear infinite',
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
    '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
  },
});

const Input = styled('input')({
  display: 'none',
});

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [catRes, locRes] = await Promise.all([
          axios.get("http://localhost:8081/api/categories", { headers }),
          axios.get("http://localhost:8081/api/locations", { headers }),
        ]);
        setCategories(catRes.data);
        setLocations(locRes.data);
      } catch (error) {
        console.error("Error fetching categories or locations:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) >= new Date(endDate)) {
      alert("Start date must be before end date.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("locationId", locationId);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("file", file);
    formData.append("status", "draft");  // مهم: نحدد الحالة draft

    try {
      console.log("startDate:", startDate);
      console.log("endDate:", endDate);
      console.log("categoryId:", categoryId);
      console.log("locationId:", locationId);
      console.log("file:", file ? file.name : "No file");
      await axios.post('http://localhost:8081/api/events/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Event added successfully as a draft. You can publish it later.");

      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setCategoryId('');
      setLocationId('');
      setFile(null);
    } catch (err) {
      console.error("Error uploading event:", err);
      alert("Failed to add event");
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
                ✨ Create Amazing Event ✨
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                Bring your vision to life with our premium event creation studio
              </Typography>
            </Box>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid item xs={12}>
                  <TextField 
                    label="Event Title" 
                    fullWidth 
                    required 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter an amazing event title..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    label="Event Description" 
                    fullWidth 
                    multiline 
                    rows={4} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your event in detail..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Start Date & Time"
                    type="datetime-local"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="End Date & Time"
                    type="datetime-local"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Event Category</InputLabel>
                    <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Event Location</InputLabel>
                    <Select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                      {locations.map((loc) => (
                        <MenuItem key={loc.id} value={loc.id}>{loc.venueName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <label htmlFor="upload-photo">
                    <Input accept="image/*" id="upload-photo" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <UploadZone component="div">
                      <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: '#6366f1', fontWeight: 600 }}>
                          📸 Upload Event Image
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Drag and drop your image here, or click to browse
                        </Typography>
                        {file && (
                          <Typography variant="body2" sx={{ mt: 2, color: '#10b981', fontWeight: 500 }}>
                            ✅ Selected: {file.name}
                          </Typography>
                        )}
                      </Box>
                    </UploadZone>
                  </label>
                </Grid>

                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      py: 2, 
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
                      }
                    }}
                  >
                    🚀 Create Event (Save as Draft)
                  </Button>
                </Grid>

              </Grid>
            </form>
          </GlassmorphismPaper>
        </Box>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default AddEvent;

