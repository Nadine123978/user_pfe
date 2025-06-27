import React from "react";
import { Box, Grid, Typography, Stack, Link, Container, IconButton, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Email, Phone, LocationOn, Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

// Styled components for enhanced visual appeal
const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)',
  position: 'relative',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E91E63" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const BrandSection = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  padding: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
});

const ContactItem = styled(Stack)(({ theme }) => ({
  transition: 'all 0.3s ease',
  padding: '8px 0',
  '&:hover': {
    transform: 'translateX(8px)',
    '& .MuiSvgIcon-root': {
      color: '#E91E63',
    },
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '8px 0',
  display: 'block',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    color: '#E91E63',
    transform: 'translateX(8px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#E91E63',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  width: 48,
  height: 48,
  margin: '0 8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #D81B60, #E91E63)',
    transform: 'translateY(-4px) scale(1.1)',
    boxShadow: '0 8px 25px rgba(216, 27, 96, 0.3)',
  },
}));

const Footer = () => (
  <FooterContainer
    sx={{
      px: { xs: 4, md: 6 },
      py: { xs: 8, md: 12 },
      mt: 0,
    }}
  >
    <ContentWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <BrandSection>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: 2,
                      background: 'linear-gradient(45deg, #D81B60, #E91E63)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    SOCIETHY
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontWeight: 300,
                      letterSpacing: 1,
                    }}
                  >
                    EVENTS
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.7,
                    fontSize: '1rem',
                  }}
                >
                  We provide a safe and reliable platform for event ticket booking, connecting communities through unforgettable experiences.
                </Typography>
                
                {/* Social Media Icons */}
                <Box sx={{ pt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                  >
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SocialButton>
                      <Facebook />
                    </SocialButton>
                    <SocialButton>
                      <Twitter />
                    </SocialButton>
                    <SocialButton>
                      <Instagram />
                    </SocialButton>
                    <SocialButton>
                      <LinkedIn />
                    </SocialButton>
                  </Box>
                </Box>
              </Stack>
            </BrandSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 3,
                fontSize: '1.25rem',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack spacing={0.5}>
                  {["Home", "About", "Events", "Blog"].map((text) => (
                    <FooterLink key={text} href="#">
                      {text}
                    </FooterLink>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={0.5}>
                  {["FAQ", "Careers", "Contact", "Support"].map((text) => (
                    <FooterLink key={text} href="#">
                      {text}
                    </FooterLink>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 3,
                fontSize: '1.25rem',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Get In Touch
            </Typography>
            <Stack spacing={2}>
              <ContactItem direction="row" alignItems="center" spacing={2}>
                <LocationOn sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 20 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.5,
                  }}
                >
                  303 South Lorem Street, Paris, France
                </Typography>
              </ContactItem>
              
              <ContactItem direction="row" alignItems="center" spacing={2}>
                <Phone sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 20 }} />
                <Typography 
                  variant="body2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  +33 1 23 45 67 89
                </Typography>
              </ContactItem>
              
              <ContactItem direction="row" alignItems="center" spacing={2}>
                <Email sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 20 }} />
                <Typography 
                  variant="body2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  info@societhy.events
                </Typography>
              </ContactItem>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 4 }} />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              © 2024 Societhy Events. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <FooterLink href="#" sx={{ fontSize: '0.875rem' }}>
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" sx={{ fontSize: '0.875rem' }}>
                Terms of Service
              </FooterLink>
              <FooterLink href="#" sx={{ fontSize: '0.875rem' }}>
                Cookie Policy
              </FooterLink>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </ContentWrapper>
  </FooterContainer>
);

export default Footer;

