import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import TicketHeader from '../components/TicketHeader';
import GallerySection from '../components/GallerySection';
import TicketInfoBox from '../components/TicketInfoBox';
import BookingDetailsSection from '../components/BookingDetailsSection';
import ReviewsSection from '../components/ReviewsSection';

const Bookings = () => {
  const { id } = useParams(); // ⬅️ من URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error("❌ Error fetching event:", error));
  }, [id]);

  console.log("Event in component:", event);
  if (!event) return <div style={{ padding: '2rem' }}>Loading event details...</div>;

  return (
    <>
      <TicketHeader event={event} />

      <Box sx={{ px: { xs: 2, md: 10 }, py: 4 }}>
        <Box sx={{ mb: 5 }}>
        image
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <BookingDetailsSection event={event} />
            <Box sx={{ mt: 6 }}>
              <ReviewsSection eventId={event.id} />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <TicketInfoBox event={event} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Bookings;
