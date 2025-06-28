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
    <Box
      sx={{
        p: { xs: 2, md: 4 }, // Responsive padding for overall content area
        maxWidth: 1400, // Max width for the content
        mx: 'auto', // Center the content horizontally
        // Removed background, border, and shadow from this main Box
        // This allows the page's background to show through.
        mt: 4, // Margin top to separate from any header/navbar
        mb: 4, // Margin bottom for overall page flow
        color: '#FFFFFF', // Default text color for elements directly in this Box
      }}
    >
      <Typography
        variant="h3" // Larger heading for the event title
        fontWeight="bold"
        gutterBottom
        sx={{
          color: '#FFFFFF', // White color for title
          textAlign: { xs: 'center', md: 'left' }, // Center on small screens, left-align on medium and up
          mb: { xs: 1, md: 2 } // Adjust margin bottom for responsive spacing
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6" // Slightly larger for date and location for better readability
        color="text.secondary"
        gutterBottom
        sx={{
          color: '#B0B0B0', // Lighter gray for secondary information
          mb: { xs: 3, md: 4 }, // Adjust margin bottom for responsive spacing
          textAlign: { xs: 'center', md: 'left' }, // Center on small screens, left-align on medium and up
        }}
      >
        {new Date(date).toLocaleDateString()} at {location}
      </Typography>

      {/* EventDetails component - now a distinct card */}
      <EventDetails event={event} />

      <Grid container spacing={4} sx={{ mt: 4 }}> {/* Increased margin top for the main content grid */}
        <Grid item xs={12} md={8}> {/* ImageGallery takes full width on small, 2/3 width on medium and up */}
          <ImageGallery eventId={eventId} />
        </Grid>
        <Grid item xs={12} md={4}> {/* BookingPanel takes full width on small, 1/3 width on medium and up */}
          <ErrorBoundary>
            <BookingPanel event={event} onAvailabilityConfirmed={onAvailabilityConfirmed} />
          </ErrorBoundary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhirlingDervishShow;
