import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EventCard = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url("https://cdn.pixabay.com/photo/2020/10/23/17/03/confetti-5679013_960_720.jpg")`, // خلفية رمزية للتأثير
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: 4,
        borderRadius: 4,
        maxWidth: 600,
        mx: 'auto',
        boxShadow: 6,
      }}
    >
      {/* Arrow Buttons */}
      <IconButton
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Event Card */}
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        {/* Tape decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: '#f5d76e',
            width: 80,
            height: 20,
            transform: 'rotate(-20deg)',
            zIndex: 1,
          }}
        />

        {/* Image */}
        <CardMedia
          component="img"
          height="260"
          image="https://img.freepik.com/free-photo/group-people-cycling-park_23-2149376322.jpg"
          alt="Audi Event"
        />

        {/* Content */}
        <CardContent sx={{ backgroundColor: '#111', color: '#fff' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Audi Presence Cycling Event
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="body2">23 December, 2023</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">Moghbazar, Dhaka</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f7a600',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Get Event Ticket
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
