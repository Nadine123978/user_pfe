import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import BookingPanel from './BookingPanel';
import EventDetails from './EventDetails';
import ErrorBoundary from '../../components/ErrorBoundary'

const WhirlingDervishShow = ({ eventId, title, date, location, onAvailabilityConfirmed, eventData }) => {
  const event = eventData;
  console.log("eventData:", eventData);


  return (
    <Box sx={{ p: 4, maxWidth: 1300, mx: 'auto', 
      background: '#200245', // Matching your main background color
      color: 'white', // Default text color for this section
      borderRadius: 2, // Add some border radius for consistency
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', // Subtle shadow
    }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white' }}> {/* White for main title */}
        {title}
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.7)' }}> {/* Lighter white for secondary text */}
        {new Date(date).toLocaleDateString()} at {location}
      </Typography>
      
      {/* EventDetails will need its own styling for consistency */}
      <EventDetails event={event} />

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          {/* ImageGallery will need its own styling for consistency */}
          <ImageGallery eventId={eventId} />
        </Grid>
        <Grid item xs={12} md={4}>
              <ErrorBoundary>
          {/* BookingPanel will need its own styling for consistency */}
          <BookingPanel event={event} onAvailabilityConfirmed={onAvailabilityConfirmed} />
          </ErrorBoundary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhirlingDervishShow;
