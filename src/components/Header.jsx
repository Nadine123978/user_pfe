import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar
    position="static"
    color="inherit"
    elevation={0}
    sx={{ width: '100%', px: { xs: 2, md: 4 } }}
  >
  
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="/ticket-logo.png" // ضع شعارك هون أو استبدله برابط خارجي
            alt="logo"
            style={{ width: 30 }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Counter
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Events</Button>
          <Button color="inherit">How it Works</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">Blog</Button>
        </Box>

        {/* Contact + Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#f7a600', color: '#000', fontWeight: 'bold' }}>
            Contact Us
          </Button>
          <IconButton>
            <i className="fas fa-search"></i> {/* بدك تضمن fontawesome لو بتحب */}
          </IconButton>
          <IconButton>
            <i className="fas fa-times"></i>
          </IconButton>
        </Box>

        {/* Hamburger menu (mobile) */}
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 2 }}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
