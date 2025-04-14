import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const events = [
  {
    id: 1,
    title: 'Live Station with Anjan Datt',
    date: '23 December, 2023',
    location: 'Moghbazar, Dhaka',
    image: '/images/anjan-dutt.jpg',
    dateOverlay: null,
  },
  {
    id: 2,
    title: 'Kabadi Champion 2025',
    date: '',
    location: 'Moghbazar, Dhaka',
    image: '/images/kabadi.jpg',
    dateOverlay: '26 Dec 2023',
  },
  {
    id: 3,
    title: 'Warfaze Rock Fest 2025',
    date: '',
    location: 'Moghbazar, Dhaka',
    image: '/images/warfaze.jpg',
    dateOverlay: '31 Dec 2023',
  },
  {
    id: 4,
    title: 'Tahsan Live',
    date: '',
    location: 'Moghbazar, Dhaka',
    image: '/images/tahsan.jpg',
    dateOverlay: '',
  },
];

const UpcomingEvents = () => {
  return (
    <Box sx={{ backgroundColor: '#111', py: 8, px: { xs: 2, md: 6 }, color: '#fff' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Upcoming <Box component="span" sx={{ color: '#f7a600' }}>Events</Box>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, maxWidth: 400 }}>
            It is a long established fact that a reader content of a page when Ipsum is that it has a more-or– this is simple less normal.
          </Typography>
        </Box>
        <Button variant="contained" sx={{ backgroundColor: '#f7a600', color: '#000', fontWeight: 'bold' }}>
          See All Events
        </Button>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={3} key={event.id}>
            <Card sx={{ borderRadius: 4, position: 'relative' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.title}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                {event.dateOverlay && (
                  <Box sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: '#fff',
                    color: '#000',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                    {event.dateOverlay}
                  </Box>
                )}
              </Box>
              <CardContent>
                {event.date && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#555' }}>
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{event.date}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#555', mb: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{event.location}</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#000' }}>
                  {event.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button sx={{ color: '#000', fontWeight: 'bold', textTransform: 'none' }}>
                    Buy Ticket
                  </Button>
                  <IconButton>
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingEvents;