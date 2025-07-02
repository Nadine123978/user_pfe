import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, TextField, Typography, Grid, Paper, InputLabel,
  MenuItem, FormControl, Select, Box
} from '@mui/material';
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
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: '16px',
            fontWeight: 500,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid #6366f1',
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1), 0 4px 20px rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-1px)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.5px',
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
            padding: '16px 20px',
            fontSize: '16px',
            fontWeight: 500,
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.4)',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: '16px',
            fontWeight: 500,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid #6366f1',
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1), 0 4px 20px rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-1px)',
            },
            '& fieldset': {
              border: 'none',
            },
            '& .MuiSelect-select': {
              padding: '16px 20px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 500,
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.5px',
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 23, 42, 0.95)',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '16px',
          fontWeight: 500,
          padding: '12px 20px',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.2)',
          },
          '&.Mui-selected': {
            background: 'rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'rgba(99, 102, 241, 0.4)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '16px',
          padding: '16px 32px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          letterSpacing: '0.5px',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
              boxShadow: '0 12px 48px rgba(99, 102, 241, 0.4)',
              transform: 'translateY(-3px)',
            },
            '&:active': {
              transform: 'translateY(-1px)',
            },
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
    animation: `${floatAnimation} 8s ease-in-out infinite`,
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 0,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 4s linear infinite`,
  },
  '&::before': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '60%',
    right: '15%',
    animationDelay: '2s',
    background: '#06b6d4',
  },
});

const GlassmorphismPaper = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '32px',
  padding: '48px',
  maxWidth: '900px',
  margin: 'auto',
  position: 'relative',
  boxShadow: `
    0 20px 80px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.06)
  `,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `
      0 32px 120px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
  },
});

const UploadZone = styled(Box)({
  border: '2px dashed rgba(99, 102, 241, 0.25)',
  borderRadius: '20px',
  padding: '48px 24px',
  textAlign: 'center',
  background: 'rgba(99, 102, 241, 0.03)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    border: '2px dashed rgba(99, 102, 241, 0.5)',
    background: 'rgba(99, 102, 241, 0.08)',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(99, 102, 241, 0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.08), transparent)',
    transform: 'rotate(45deg)',
    animation: `${shimmerAnimation} 4s linear infinite`,
  },
});

const Input = styled('input')({
  display: 'none',
});

const FormSection = styled(Box)({
  marginBottom: '32px',
  '& .MuiGrid-item': {
    marginBottom: '8px',
  },
});

const SectionTitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 700,
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '60px',
    height: '2px',
    background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  },
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
    formData.append("status", "draft");

    try {
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
        <Box sx={{ padding: '48px 24px', position: 'relative', zIndex: 1 }}>
          <GlassmorphismPaper>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '3.2rem', mb: 3 }}>
                 Create Cosmic Event
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.2rem', lineHeight: 1.6 }}>
                Bring your vision to life with our premium event creation studio
              </Typography>
            </Box>
            
            <form onSubmit={handleSubmit}>
              <FormSection>
                <SectionTitle> Event Details</SectionTitle>
                <Grid container spacing={4}>
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
                </Grid>
              </FormSection>

              <FormSection>
                <SectionTitle> Schedule & Location</SectionTitle>
                <Grid container spacing={4}>
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

                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Event Category</InputLabel>
                      <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Event Location</InputLabel>
                      <Select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                        {locations.map((loc) => (
                          <MenuItem key={loc.id} value={loc.id}>{loc.venueName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormSection>

              <FormSection>
                <SectionTitle> Event Media</SectionTitle>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <label htmlFor="upload-photo">
                      <Input accept="image/*" id="upload-photo" type="file" onChange={(e) => setFile(e.target.files[0])} />
                      <UploadZone component="div">
                        <Box sx={{ position: 'relative', zIndex: 2 }}>
                          <Typography variant="h6" sx={{ mb: 2, color: '#6366f1', fontWeight: 700, fontSize: '1.3rem' }}>
                             Upload Event Image
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, fontSize: '1.1rem' }}>
                            Drag and drop your image here, or click to browse
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                            Supported formats: JPG, PNG, GIF (Max 10MB)
                          </Typography>
                          {file && (
                            <Box sx={{ mt: 3, p: 2, background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                              <Typography variant="body1" sx={{ color: '#10b981', fontWeight: 600, fontSize: '1rem' }}>
                                ✅ Selected: {file.name}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </UploadZone>
                    </label>
                  </Grid>
                </Grid>
              </FormSection>

              <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    py: 3, 
                    px: 6,
                    fontSize: '1.2rem',
                    minWidth: '280px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
                    }
                  }}
                >
                   Create Cosmic Event
                </Button>
                <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                  Event will be saved as draft and can be published later
                </Typography>
              </Box>
            </form>
          </GlassmorphismPaper>
        </Box>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default AddEvent;

