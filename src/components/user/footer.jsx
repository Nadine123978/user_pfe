import React from 'react';
import { Box, Grid, Typography, Link, Stack } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0b0b0b',
        color: 'white',
        px: { xs: 4, md: 16 },
        py: { xs: 6, md: 12 },
        backgroundImage:
          'repeating-linear-gradient(45deg, #0b0b0b 0px, #0b0b0b 20px, #111111 20px, #111111 40px)',
        backgroundSize: 'auto',
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={12}
      >
        {/* Column 1 - Brand */}
        <Grid item xs={12} md={3}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
                SOCIETHY
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                PARIS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.500', maxWidth: 300, lineHeight: 1.7 }}>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered
            </Typography>
          </Stack>
        </Grid>

        {/* Column 2 - Navigation */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={4}>
            {/* Left Navigation Links */}
            <Grid item xs={6}>
              <Stack spacing={1.5}>
                <Link href="#" underline="none" color="inherit">Home</Link>
                <Link href="#" underline="none" color="inherit">About</Link>
                <Link href="#" underline="none" color="inherit">Event</Link>
                <Link href="#" underline="none" color="inherit">Blog</Link>
              </Stack>
            </Grid>

            {/* Right Navigation Links with extra space */}
            <Grid item xs={6} sx={{ pl: 4 }}>
              <Stack spacing={1.5}>
                <Link href="#" underline="none" color="inherit">FAQ</Link>
                <Link href="#" underline="none" color="inherit">Careers</Link>
                <Link href="#" underline="none" color="inherit">Our approach</Link>
                <Link href="#" underline="none" color="inherit">Contact</Link>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Column 3 - Contact Info */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOn fontSize="small" sx={{ color: 'grey.400' }} />
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                303 South Iorem Street, Charlotte, NC
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Phone fontSize="small" sx={{ color: 'grey.400' }} />
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                777-444-2220
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Email fontSize="small" sx={{ color: 'grey.400' }} />
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Info@eventsociety.com
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
