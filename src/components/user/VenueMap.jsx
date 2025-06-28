import React, { useState } from "react";
import { Box, Typography, Paper, Grid, IconButton, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { 
  LocationOn, 
  Directions, 
  Phone, 
  AccessTime, 
  LocalParking,
  Restaurant,
  Wc,
  Accessible,
  Wifi,
  AcUnit
} from "@mui/icons-material";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

// Styled components (كما في كودك السابق)
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(44, 62, 80, 0.95), rgba(74, 20, 140, 0.95))',
  backdropFilter: 'blur(15px)',
  borderRadius: 24,
  padding: theme.spacing(4),
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #E91E63, #9C27B0, #673AB7)',
    borderRadius: '24px 24px 0 0',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
  color: 'white',
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #C2185B, #7B1FA2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(233, 30, 99, 0.4)',
  },
}));

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

const VenueMap = ({ latitude, longitude, venueName }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // استخدم بيانات افتراضية لو ما وصل شيء
  const defaultLatitude = 33.8547;
  const defaultLongitude = 35.9016;
  const defaultVenueName = "Unknown Venue";

  // تحميل مكتبة الخرائط
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCyEBqWuZFfvqKP40iWQcDgYsIAQ5DJT8I',
  });

  if (loadError) return <div>حدث خطأ أثناء تحميل الخريطة</div>;
  if (!isLoaded) return <div>جاري تحميل الخريطة...</div>;

  const position = {
    lat: latitude || defaultLatitude,
    lng: longitude || defaultLongitude,
  };

  const getDirectionsUrl = () => {
    const query = encodeURIComponent(venueName || defaultVenueName);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  };

  const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1),
  borderRadius: 12,
  background: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(8px)',
  },
}));

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: '#200245' }}>
      <StyledPaper elevation={0}>
        <Grid container spacing={4}>

          {/* بيانات المكان مبسطة فقط الاسم */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#E91E63', 
                fontWeight: 'bold',
                mb: 1,
                background: 'linear-gradient(45deg, #E91E63, #9C27B0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Venue Details
            </Typography>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              {venueName || defaultVenueName}
            </Typography>
          </Grid>

          {/* الخريطة */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'sticky', top: 20, height: 300, borderRadius: 16, overflow: 'hidden' }}>
              <Typography 
                variant="h6" 
                sx={{ color: '#E91E63', mb: 2, fontWeight: 'bold', textAlign: 'center' }}
              >
                Location Map
              </Typography>

              {!mapLoaded && (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #2C3E50, #4A148C)',
                    zIndex: 1,
                    borderRadius: 16,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <LocationOn sx={{ fontSize: 48, color: '#E91E63', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                      {venueName || defaultVenueName}
                    </Typography>
                  </Box>

                    <Box sx={{ mb: 3 }}>
              <InfoItem>
                <LocationOn sx={{ color: '#E91E63', fontSize: 24 }} />
                <Box>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {venueData.address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {venueData.city}, {venueData.country}
                  </Typography>
                </Box>
              </InfoItem>

              {venueData.phone && (
                <InfoItem>
                  <Phone sx={{ color: '#E91E63', fontSize: 24 }} />
                  <Box>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {venueData.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Contact Number
                    </Typography>
                  </Box>
                </InfoItem>
              )}

              {venueData.openingHours && (
                <InfoItem>
                  <AccessTime sx={{ color: '#E91E63', fontSize: 24 }} />
                  <Box>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {venueData.openingHours}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Opening Hours
                    </Typography>
                  </Box>
                </InfoItem>
              )}
            </Box>

            {venueData.description && (
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body1" 
                  sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, fontSize: '1.1rem' }}
                >
                  {venueData.description}
                </Typography>
              </Box>
            )}


                </Box>
              )}

              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={16}
                onLoad={() => setMapLoaded(true)}
                options={{ disableDefaultUI: true }}
              >
                <Marker position={position} />
              </GoogleMap>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <ActionButton 
                onClick={() => window.open(getDirectionsUrl(), '_blank')}
                sx={{ px: 3 }}
              >
                <Directions sx={{ mr: 1 }} />
                Get Directions
              </ActionButton>
            </Box>
          </Grid>

        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default VenueMap;
