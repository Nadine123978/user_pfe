import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, Stack } from '@mui/material';

const navItems = ['Home', 'About', 'Events', 'Blogs', 'Contact'];

export default function Header() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        color: 'white',
        px: 3,
        py: 5,
      }}
    >
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
            SOCIETHY
            <Typography variant="caption" sx={{ display: 'block', letterSpacing: 1 }}>
              PARIS
            </Typography>
          </Typography>

          <Stack direction="row" spacing={3}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: 'white' }}>
                {item}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button color="inherit">Log In</Button>
            <Button variant="outlined" color="inherit" sx={{ borderRadius: '20px' }}>
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} alignItems="center">
          {/* Text section */}
          <Box flex={1}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              All the fun starts here.
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Book your <br />
              Tickets for Event!
            </Typography>
            <ul>
              <li>Safe, Secure, Reliable ticketing.</li>
              <li>Your ticket to live entertainment!</li>
            </ul>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                color: '#000',
                fontWeight: 'bold',
              }}
            >
              View More
            </Button>
          </Box>

          {/* Images section */}
          <Box
            flex={1}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {[1, 2, 3, 4].map((num) => (
              <Box
                key={num}
                sx={{
                  height: 150,
                  backgroundColor: '#222',
                  backgroundImage: `url(https://via.placeholder.com/150?text=Image+${num})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                }}
              />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
