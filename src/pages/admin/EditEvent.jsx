import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled, createTheme, ThemeProvider, keyframes } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

// Cosmic theme
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
      default: '#0a0e27',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
});

// Keyframes for animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components
const CosmicContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4),
}));

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(6, 182, 212, 0.8), transparent),
    radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(16, 185, 129, 0.8), transparent)
  `,
  backgroundRepeat: 'repeat',
  backgroundSize: '200px 100px',
  animation: `${sparkleAnimation} 3s linear infinite`,
  pointerEvents: 'none',
});

const GlassmorphismPaper = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(5),
  position: 'relative',
  zIndex: 10,
  maxWidth: '900px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: `linear-gradient(135deg, 
      rgba(139, 92, 246, 0.1) 0%, 
      rgba(6, 182, 212, 0.1) 50%, 
      rgba(16, 185, 129, 0.1) 100%)`,
    backgroundSize: '200% 200%',
    animation: `${shimmerAnimation} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const CosmicTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
}));

const CosmicSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
  fontWeight: '300',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#8b5cf6',
  fontWeight: '700',
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(4),
  fontSize: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&::after': {
    content: '""',
    flex: 1,
    height: '2px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, transparent 100%)',
    marginLeft: theme.spacing(2),
  },
  '&:first-of-type': {
    marginTop: 0,
  },
}));

const CosmicTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '16px',
    fontWeight: '500',
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.5)',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1), 0 8px 25px rgba(139, 92, 246, 0.15)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    '&.Mui-focused': {
      color: '#8b5cf6',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#ffffff',
    padding: '16px 20px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  },
}));

const CosmicFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '16px',
    fontWeight: '500',
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.5)',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1), 0 8px 25px rgba(139, 92, 246, 0.15)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    '&.Mui-focused': {
      color: '#8b5cf6',
    },
  },
  '& .MuiSelect-select': {
    color: '#ffffff',
    padding: '16px 20px',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '16px',
  border: '2px dashed rgba(139, 92, 246, 0.3)',
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '2px dashed rgba(139, 92, 246, 0.5)',
    background: 'rgba(139, 92, 246, 0.05)',
  },
}));

const CosmicButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: '700',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  border: 'none',
  color: '#ffffff',
  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(139, 92, 246, 0.6)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: '600',
  textTransform: 'none',
  background: 'rgba(6, 182, 212, 0.1)',
  border: '2px solid rgba(6, 182, 212, 0.3)',
  color: '#06b6d4',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(6, 182, 212, 0.2)',
    border: '2px solid rgba(6, 182, 212, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3)',
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: '600',
  textTransform: 'none',
  background: 'rgba(16, 185, 129, 0.1)',
  border: '2px solid rgba(16, 185, 129, 0.3)',
  color: '#10b981',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  marginRight: theme.spacing(2),
  '&:hover': {
    background: 'rgba(16, 185, 129, 0.2)',
    border: '2px solid rgba(16, 185, 129, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
  },
}));

const Input = styled("input")({
  display: "none",
});

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [file, setFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [catRes, locRes] = await Promise.all([
        axios.get("http://localhost:8081/api/categories", { headers }),
        axios.get("http://localhost:8081/api/locations", { headers }),
      ]);
      setCategories(catRes.data);
      setLocations(locRes.data);

      const eventRes = await axios.get(`http://localhost:8081/api/events/${id}`, { headers });
      const event = eventRes.data;
      setTitle(event.title);
      setDescription(event.description);
      setStartDate(event.startDate?.slice(0, 16));
      setEndDate(event.endDate?.slice(0, 16));
      setExistingImageUrl(event.imageUrl || "");

      const eventCategoryId = event.category?.id ? event.category.id.toString() : "";
      const eventLocationId = event.location?.id ? event.location.id.toString() : "";

      setCategoryId(eventCategoryId);
      setLocationId(eventLocationId);

      // ✅✅✅ console logs to debug
      console.log("✅ Categories loaded:", catRes.data);
      console.log("✅ Event loaded:", event);
      console.log("✅ Event category id set to:", eventCategoryId);
      console.log("✅ Event location id set to:", eventLocationId);

    } catch (error) {
      console.error("Error loading event or lists:", error);
      setError("Failed to load event data.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (new Date(startDate) >= new Date(endDate)) {
    setError("Start date must be before end date.");
    return;
  }

  setSubmitting(true);
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("categoryId", categoryId);
  formData.append("locationId", locationId);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  if (file) formData.append("file", file);

  try {
    await axios.put(`http://localhost:8081/api/events/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,  // فقط التوكين بدون Content-Type
      },
    });
    setSuccess("Event updated successfully!");
    setTimeout(() => {
      navigate("/admin/events/manage");
    }, 2000);
  } catch (err) {
    console.error("Error updating event:", err);
    setError("Failed to update event. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return (
      <ThemeProvider theme={cosmicTheme}>
        <CosmicContainer>
          <FloatingParticles />
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Box textAlign="center">
              <CircularProgress size={60} sx={{ color: '#8b5cf6', mb: 2 }} />
              <Typography variant="h6" color="white">
                Loading event data...
              </Typography>
            </Box>
          </Box>
        </CosmicContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <GlassmorphismPaper component="form" onSubmit={handleSubmit} noValidate>
          <CosmicTitle>Edit Event</CosmicTitle>
          <CosmicSubtitle>Modify your event details with cosmic style ✨</CosmicSubtitle>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          <SectionTitle>Event Information</SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <CosmicTextField
                label="Event Title"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                inputProps={{ maxLength: 120 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CosmicFormControl fullWidth required>
                <InputLabel id="category-label">Event Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  label="Event Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </CosmicFormControl>
            </Grid>


            <Grid item xs={12} sm={6}>
              <CosmicFormControl fullWidth required>
                <InputLabel id="location-label">Event Location</InputLabel>
                <Select
                  labelId="location-label"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  label="Event Location"
                >
                  {locations.map((loc) => (
                    <MenuItem key={loc.id} value={String(loc.id)}>
                      {loc.venueName}
                    </MenuItem>
                  ))}
                </Select>
              </CosmicFormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CosmicTextField
                label="Start Date and Time"
                type="datetime-local"
                required
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CosmicTextField
                label="End Date and Time"
                type="datetime-local"
                required
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <CosmicTextField
                label="Event Description"
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event..."
              />
            </Grid>

            <Grid item xs={12}>
              <SectionTitle>Event Image</SectionTitle>
              <ImagePreviewContainer>
                <img
                  src={file ? URL.createObjectURL(file) : existingImageUrl || "/placeholder.png"}
                  alt="Event Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                  <label htmlFor="file-upload">
                    <Input
                      accept="image/*"
                      id="file-upload"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <UploadButton component="span">Upload New Image</UploadButton>
                  </label>
                  {file && (
                    <SecondaryButton onClick={() => setFile(null)}>Remove</SecondaryButton>
                  )}
                </Box>
              </ImagePreviewContainer>
            </Grid>
          </Grid>

          <Box mt={5} textAlign="center">
            <CosmicButton type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Event"}
            </CosmicButton>
          </Box>
        </GlassmorphismPaper>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default EditEvent;
