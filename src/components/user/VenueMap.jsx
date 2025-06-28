import React, { useState } from "react";
import { Box, Typography, Paper, Grid, IconButton, Chip, Divider } from "@mui/material";
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

// Styled components for enhanced visual appeal
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

const MapContainer = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  background: 'linear-gradient(135deg, #2C3E50, #4A148C)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
  '& iframe': {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: 16,
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

const FeatureChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  margin: theme.spacing(0.5),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(233, 30, 99, 0.3)',
    transform: 'scale(1.05)',
  },
}));

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

const VenueMap = ({ venue }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Default venue data if prop is not provided
  const defaultVenue = {
    name: "Park Joseph Tohme Skaff",
    address: "Park Joseph Tohme Skaff, Zahle, Lebanon",
    city: "Zahle",
    country: "Lebanon",
    phone: "+961 8 123 456",
    coordinates: {
      lat: 33.8547,
      lng: 35.9016
    },
    features: [
      "Free Parking",
      "Restaurant",
      "Restrooms",
      "Wheelchair Accessible",
      "Free WiFi",
      "Air Conditioning"
    ],
    openingHours: "24/7 Access",
    description: "A beautiful outdoor venue perfect for cultural events and performances, located in the heart of Zahle with stunning mountain views.",
    capacity: "500+ guests",
    type: "Outdoor Park"
  };

  const venueData = venue || defaultVenue;

  const getGoogleMapsEmbedUrl = () => {
    const query = encodeURIComponent(venueData.address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${query}&zoom=15&maptype=roadmap`;
  };

  const getDirectionsUrl = () => {
    const query = encodeURIComponent(venueData.address);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  };

  const featureIcons = {
    "Free Parking": <LocalParking />,
    "Restaurant": <Restaurant />,
    "Restrooms": <Wc />,
    "Wheelchair Accessible": <Accessible />,
    "Free WiFi": <Wifi />,
    "Air Conditioning": <AcUnit />
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: '#200245' }}>
      <StyledPaper elevation={0}>
        <Grid container spacing={4}>
          {/* Venue Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
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
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  mb: 2 
                }}
              >
                {venueData.name}
              </Typography>
            </Box>

            {/* Venue Information Items */}
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

            {/* Venue Description */}
            {venueData.description && (
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    lineHeight: 1.7,
                    fontSize: '1.1rem'
                  }}
                >
                  {venueData.description}
                </Typography>
              </Box>
            )}

            {/* Quick Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {venueData.capacity && (
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Capacity
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#E91E63', fontWeight: 'bold' }}>
                    {venueData.capacity}
                  </Typography>
                </Grid>
              )}
              {venueData.type && (
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Venue Type
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#E91E63', fontWeight: 'bold' }}>
                    {venueData.type}
                  </Typography>
                </Grid>
              )}
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <ActionButton 
                onClick={() => window.open(getDirectionsUrl(), '_blank')}
                title="Get Directions"
              >
                <Directions />
              </ActionButton>
              <ActionButton 
                onClick={() => window.open(`tel:${venueData.phone}`, '_blank')}
                title="Call Venue"
              >
                <Phone />
              </ActionButton>
            </Box>

            {/* Venue Features */}
            {venueData.features && venueData.features.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ color: '#E91E63', mb: 2, fontWeight: 'bold' }}>
                  Venue Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {venueData.features.map((feature, index) => (
                    <FeatureChip 
                      key={index} 
                      icon={featureIcons[feature] || <LocationOn />}
                      label={feature} 
                      size="small" 
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#E91E63', 
                  mb: 2, 
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Location Map
              </Typography>
              <MapContainer>
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
                      zIndex: 1
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <LocationOn sx={{ fontSize: 48, color: '#E91E63', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                        {venueData.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {venueData.city}, {venueData.country}
                      </Typography>
                    </Box>
                  </Box>
                )}
                <iframe
                  title="venue-map"
                  src={getGoogleMapsEmbedUrl()}
                  loading="lazy"
                  allowFullScreen
                  onLoad={() => setMapLoaded(true)}
                  style={{ 
                    opacity: mapLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease'
                  }}
                />
              </MapContainer>
              
              {/* Map Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <ActionButton 
                  onClick={() => window.open(getDirectionsUrl(), '_blank')}
                  sx={{ px: 3 }}
                >
                  <Directions sx={{ mr: 1 }} />
                  Get Directions
                </ActionButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default VenueMap;

