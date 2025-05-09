import React from 'react';
import { Box, Grid } from '@mui/material';
import TicketHeader from '../components/TicketHeader';
import GallerySection from '../components/GallerySection';
import TicketInfoBox from '../components/TicketInfoBox';
import BookingDetailsSection from '../components/BookingDetailsSection';
import ReviewsSection from '../components/ReviewsSection';

const Bookings = () => {
  return (
    <>
      {/* ✅ الهيدر ظاهر فقط في هذه الصفحة */}
      <TicketHeader/>

      <Box sx={{ px: { xs: 2, md: 10 }, py: 4 }}>

        {/* ✅ القسم العلوي: الصور */}
        <Box sx={{ mb: 5 }}>
          <GallerySection />
        </Box>

        {/* ✅ التفاصيل والتذكرة جنب بعض */}
        <Grid container spacing={4}>
          {/* يسار: التفاصيل والمراجعات */}
          <Grid item xs={12} md={8}>
            <BookingDetailsSection />
            <Box sx={{ mt: 6 }}>
              <ReviewsSection />
            </Box>
          </Grid>

          {/* يمين: صندوق الحجز */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <TicketInfoBox />
            </Box>
          </Grid>
        </Grid>

      </Box>
    </>
  );
};

export default Bookings;
