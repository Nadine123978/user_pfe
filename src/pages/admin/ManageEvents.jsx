import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '8px 16px',
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
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              border: '1px solid rgba(99, 102, 241, 0.5)',
              background: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
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

const GlassmorphismCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
});

const StatusBadge = styled(Box)(({ status }) => {
  const getStatusColors = (status) => {
    switch (status) {
      case 'draft':
        return {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          glow: 'rgba(245, 158, 11, 0.3)',
        };
      case 'active':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          glow: 'rgba(16, 185, 129, 0.3)',
        };
      case 'upcoming':
        return {
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          glow: 'rgba(59, 130, 246, 0.3)',
        };
      case 'past':
        return {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          glow: 'rgba(139, 92, 246, 0.3)',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          glow: 'rgba(107, 114, 128, 0.3)',
        };
    }
  };

  const colors = getStatusColors(status);
  
  return {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '4px 12px',
    borderRadius: '20px',
    background: colors.background,
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    boxShadow: `0 4px 12px ${colors.glow}`,
    zIndex: 2,
  };
});

const TabContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginBottom: '32px',
  padding: '8px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  width: 'fit-content',
});

const TabButton = styled(Button)(({ active }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '14px',
  padding: '12px 24px',
  transition: 'all 0.3s ease',
  background: active ? 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)' : 'transparent',
  color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
  border: 'none',
  boxShadow: active ? '0 4px 20px rgba(99, 102, 241, 0.3)' : 'none',
  '&:hover': {
    background: active 
      ? 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)'
      : 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: active 
      ? '0 8px 32px rgba(99, 102, 241, 0.4)'
      : '0 4px 20px rgba(255, 255, 255, 0.1)',
  },
}));

const SearchContainer = styled(Box)({
  marginBottom: '32px',
  position: 'relative',
  '&::before': {
    content: '"🔍"',
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    zIndex: 2,
  },
});

const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    paddingLeft: '48px',
  },
});

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState("draft");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["draft", "active", "upcoming", "past","cancelled"];

 
const fetchEvents = async (status) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:8081/api/events/by-status?status=${status}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
const eventsWithDetails = await Promise.all(
  response.data.map(async (event) => {
    let gallery = [];
    let section = null;
    let seats = [];

    try {
      const galleryResponse = await axios.get(
        `http://localhost:8081/api/events/${event.id}/images`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      gallery = galleryResponse.data;
    } catch (e) {
      console.error(`Failed to fetch gallery for event ${event.id}`, e);
    }

    try {
      const sectionResponse = await axios.get(
        `http://localhost:8081/api/sections/event/${event.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      section = sectionResponse.data;
    } catch (e) {
      console.error(`Failed to fetch section for event ${event.id}`, e);
    }

    try {
     if (section && section.id) {
  const seatsResponse = await axios.get(
    `http://localhost:8081/api/seats/section/${section.id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  seats = seatsResponse.data;
}

    } catch (e) {
      console.error(`Failed to fetch seats for section ${section?.id}`, e);
    }

    const missingFields = [];
    if (!event.title || event.title.trim() === "") missingFields.push("title");
    if (!event.startDate) missingFields.push("startDate");
    if (!event.endDate) missingFields.push("endDate");
    if (!event.imageUrl || event.imageUrl.trim() === "") missingFields.push("main image");
if (Array.isArray(section) && section.length > 0) {
  const seatPromises = section.map(async (sec) => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/seats/section/${sec.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (e) {
      console.error(`Failed to fetch seats for section ${sec.id}`, e);
      return [];
    }
  });

  const allSeatsArrays = await Promise.all(seatPromises);
  seats = allSeatsArrays.flat(); // دمج المقاعد من كل السكاشن
}
    if (!gallery || gallery.length === 0) missingFields.push("gallery (images)");
    if (!seats || seats.length === 0) missingFields.push("seats");
console.log(`Event ID: ${event.id}`, {
  title: event.title,
  startDate: event.startDate,
  endDate: event.endDate,
  imageUrl: event.imageUrl,
  section, // بدل ما تقول event.section
  gallery,
  seats,
  missingFields,
});



    return { ...event, gallery, section, seats, missingFields };
  })
);

setEvents(
  eventsWithDetails.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  )
);

  } catch (error) {
    console.error("Error fetching events:", error);
  }
};


  useEffect(() => {
    fetchEvents(selectedTab);
  }, [selectedTab]);

  const handlePublish = async (eventId) => {
  const eventToPublish = events.find(e => e.id === eventId);

  if (!eventToPublish) {
    toast.error("Event data not found.");
    return;
  }

  // تحقق من الحقول النصية الأساسية
  if (
    !eventToPublish.title || eventToPublish.title.trim() === "" ||
    !eventToPublish.startDate || !eventToPublish.endDate ||
    !eventToPublish.imageUrl || eventToPublish.imageUrl.trim() === "" ||
!Array.isArray(eventToPublish.section) || 
eventToPublish.section.length === 0 || 
!eventToPublish.section[0].name || 
eventToPublish.section[0].name.trim() === ""
  ) {
    toast.error("Please fill in all required fields (title, dates, main image, section).");
    return;
  }

  // تحقق من التواريخ
  if (new Date(eventToPublish.startDate) > new Date(eventToPublish.endDate)) {
    toast.error("Start date must be before end date.");
    return;
  }

  // تحقق من gallery (مصفوفة الصور)
  if (!Array.isArray(eventToPublish.gallery) || eventToPublish.gallery.length === 0) {
    toast.error("Please add at least one image to the gallery.");
    return;
  }

  // تحقق من seats (مثلاً مصفوفة أو رقم)
  // لنفترض seats عبارة عن عدد المقاعد المتوفرة (رقم)
 if (
  !Array.isArray(eventToPublish.seats) ||
  eventToPublish.seats.length === 0
) {
  toast.error("Please add seats information.");
  return;
}

// (اختياري) تحقق إذا في مقاعد متاحة
const hasAvailableSeats = eventToPublish.seats.some(seat => seat.available === true);
if (!hasAvailableSeats) {
  toast.error("At least one seat must be available.");
  return;
}

try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:8081/api/events/${eventId}/publish`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Event published successfully");
    fetchEvents(selectedTab);
  } catch (error) {
    console.error("Error publishing event:", error.response?.data || error.message);
    toast.error("Failed to publish event");
  }
};


 
 const handleCancel = async (eventId) => {
  try {
    const token = localStorage.getItem("token");

    // Step 1: Check booking count
    const countResponse = await axios.get(
      `http://localhost:8081/api/events/${eventId}/booking-count`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const bookingCount = countResponse.data;

    // Step 2: Show appropriate confirmation
    let confirmMessage = "";
    if (bookingCount > 0) {
      confirmMessage = `This event has ${bookingCount} active bookings. Are you sure you want to cancel it and notify all users?`;
    } else {
      confirmMessage = "Are you sure you want to cancel this event? No bookings exist for this event.";
    }

    if (!window.confirm(confirmMessage)) return;

    // Step 3: Perform cancellation
    await axios.put(
      `http://localhost:8081/api/events/${eventId}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Event cancelled successfully");
    fetchEvents(selectedTab);
  } catch (error) {
    console.error("Error cancelling event:", error);
    toast.error("Failed to cancel event");
  }
};


const handleArchive = async (eventId) => {
  if (!window.confirm("Are you sure you want to archive this past event?")) return;
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:8081/api/events/${eventId}/archive`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Event archived successfully");
    fetchEvents(selectedTab);
  } catch (error) {
    console.error("Error archiving event:", error);
    toast.error("Failed to archive event");
  }
};



  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event deleted successfully!");
      fetchEvents(selectedTab);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <Box sx={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
          
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: '3rem', mb: 2 }}>
               Cosmic Event Command Center 
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Events - {filteredEvents.length} found
            </Typography>
          </Box>

          {/* Tab Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <TabContainer>
              {tabs.map((tab) => (
                <TabButton
                  key={tab}
                  active={selectedTab === tab}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTab(tab);
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabButton>
              ))}
            </TabContainer>
          </Box>

          {/* Search Section */}
          <SearchContainer>
            <SearchField
              label="Search by title"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for amazing events..."
            />
          </SearchContainer>

          {/* Events Grid */}
          <Grid container spacing={3}>
            {filteredEvents.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                    🌌 No events found in the cosmic void
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Try adjusting your search or check a different status tab
                  </Typography>
                </Box>
              </Grid>
            ) : (
              filteredEvents.map((event, index) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <GlassmorphismCard
                    sx={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes fadeInUp': {
                        '0%': { opacity: 0, transform: 'translateY(30px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    <StatusBadge status={event.status}>
                      {event.status.toUpperCase()}
                    </StatusBadge>
                    
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.imageUrl || "/placeholder.png"}
                      alt={event.title}
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#ffffff', 
                          fontWeight: 600, 
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {event.title}
                      </Typography>
                        <Typography 
    variant="body2" 
    sx={{ 
      color: 'rgba(255, 255, 255, 0.7)', 
      mb: 3,
      lineHeight: 1.6,
    }}
  >
     From: {new Date(event.startDate).toLocaleString()} <br />
     To: {new Date(event.endDate).toLocaleString()}
  </Typography>

  {/* إضافة عرض الحقول الناقصة بشكل واضح */}
  {event.missingFields && event.missingFields.length > 0 && (
    <Box sx={{ 
      color: '#f87171', 
      fontWeight: 'bold', 
      mb: 2, 
      fontSize: '0.85rem' 
    }}>
      ⚠️ Missing: {event.missingFields.join(", ")}
    </Box>
  )}
  {/* إضافة عرض الحقول الناقصة بشكل واضح */}
  {event.missingFields && event.missingFields.length > 0 && (
    <Box sx={{ 
      color: '#f87171', 
      fontWeight: 'bold', 
      mb: 2, 
      fontSize: '0.85rem' 
    }}>
      ⚠️ Missing: {event.missingFields.join(", ")}
    </Box>
  )}

                      
         

                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  {/* Edit و Preview تظهر دائماً */}
  <Button
    variant="outlined"
    size="small"
    onClick={() => navigate(`/admin/edit-event/${event.id}`)}
    sx={{ flex: 1, minWidth: '80px' }}
  >
    Edit
  </Button>

  <Button
    variant="outlined"
    size="small"
    onClick={() => alert("Preview not implemented yet.")}
    sx={{ flex: 1, minWidth: '80px' }}
  >
    Preview
  </Button>

  {/* أزرار حسب حالة الحدث */}
  {event.status === "DRAFT" && (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={() => handlePublish(event.id)}
        sx={{
          flex: 1,
          minWidth: '80px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0d9488 0%, #047857 100%)',
          },
        }}
      >
        Publish
      </Button>

      <Button
        variant="contained"
        size="small"
        onClick={() => handleDelete(event.id)}
        sx={{
          flex: 1,
          minWidth: '80px',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          },
        }}
      >
        Delete
      </Button>
    </>
  )}

  {(event.status === "ACTIVE" || event.status === "UPCOMING") && (
    <Button
      variant="contained"
      size="small"
      onClick={() => handleCancel(event.id)}
      sx={{
        flex: 1,
        minWidth: '80px',
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
        },
      }}
    >
      Cancel
    </Button>
  )}

  {event.status === "PAST" && (
    <Button
      variant="contained"
      size="small"
      onClick={() => handleArchive(event.id)}
      sx={{
        flex: 1,
        minWidth: '80px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        },
      }}
    >
      Archive
    </Button>
  )}
</Box>

                    </CardContent>
                  </GlassmorphismCard>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default ManageEvents;

