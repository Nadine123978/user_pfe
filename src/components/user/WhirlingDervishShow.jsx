import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ImageGallery from './ImageGallery';
import BookingPanel from './BookingPanel';
import EventDetails from './EventDetails';

const WhirlingDervishShow = ({ eventId, title, date, location, onAvailabilityConfirmed }) => {
  const event = {
    id: eventId,
    name: title,
    date: date,
    location: location,
  };

  return (
  <Box
  sx={{
    width: '100vw',
    p: 0,
    m: 0,
    backgroundColor: '#fff',
    overflowX: 'hidden',
  }}
>


  <Typography variant="h4" fontWeight="bold" gutterBottom>
    {title}
  </Typography>
  <Typography variant="body2" color="text.secondary" gutterBottom>
    {new Date(date).toLocaleDateString()} at {location}
  </Typography>
  <EventDetails event={event} />


      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          {/* Full width image */}
          <ImageGallery eventId={eventId} />
        </Grid>

        <Grid item xs={12} md={8}>
          {/* You can add more details or content here */}
        </Grid>

        <Grid item xs={12} md={4}>
          <BookingPanel event={event} onAvailabilityConfirmed={onAvailabilityConfirmed} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhirlingDervishShow;
