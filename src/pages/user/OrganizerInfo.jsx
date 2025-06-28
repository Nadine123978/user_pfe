import React from "react";
import { Box, Typography, Paper, Avatar, Chip, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Instagram, Facebook, Twitter, Language, Email, Phone } from "@mui/icons-material";

// Styled components for enhanced visual appeal
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(44, 62, 80, 0.95), rgba(74, 20, 140, 0.95))',
  backdropFilter: 'blur(15px)',
  borderRadius: 24,
  padding: theme.spacing(4),
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #E91E63, #9C27B0, #673AB7)',
    borderRadius: '24px 24px 0 0',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(233, 30, 99, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
    '33%': { transform: 'translate(10px, -10px) rotate(120deg)' },
    '66%': { transform: 'translate(-5px, 5px) rotate(240deg)' },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: '4px solid rgba(233, 30, 99, 0.3)',
  boxShadow: '0 8px 32px rgba(233, 30, 99, 0.4)',
  background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
  fontSize: '2rem',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 12px 40px rgba(233, 30, 99, 0.6)',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(233, 30, 99, 0.4)',
  },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  margin: theme.spacing(0.5),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(233, 30, 99, 0.3)',
    transform: 'scale(1.05)',
  },
}));

const OrganizerInfo = ({ organizer }) => {
  // Default data if organizer prop is not provided
  const defaultOrganizer = {
    name: "Wave Production",
    description: "Wave Production is a dynamic company that operates as both a production house and a marketing agency. We specialize in creating exceptional events and memorable experiences that resonate with audiences. Our team combines creative vision with technical expertise to deliver world-class productions.",
    email: "info@waveproduction.com",
    phone: "+961 1 234 567",
    website: "www.waveproduction.com",
    socialMedia: {
      instagram: "@waveproduction",
      facebook: "WaveProductionLB",
      twitter: "@waveproduction"
    },
    specialties: ["Event Production", "Marketing", "Creative Direction", "Technical Support"],
    establishedYear: "2018",
    location: "Beirut, Lebanon"
  };

  const organizerData = organizer || defaultOrganizer;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: '#200245' }}>
      <StyledPaper elevation={0}>
        <Grid container spacing={3} alignItems="center">
          {/* Avatar and Basic Info */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <StyledAvatar>
                {organizerData.name.charAt(0)}
              </StyledAvatar>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#E91E63', 
                  fontWeight: 'bold',
                  mt: 2,
                  mb: 1,
                  background: 'linear-gradient(45deg, #E91E63, #9C27B0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {organizerData.name}
              </Typography>
              
              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                {organizerData.email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ color: '#E91E63', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {organizerData.email}
                    </Typography>
                  </Box>
                )}
                {organizerData.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ color: '#E91E63', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {organizerData.phone}
                    </Typography>
                  </Box>
                )}
                {organizerData.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Language sx={{ color: '#E91E63', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {organizerData.website}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Description and Details */}
          <Grid item xs={12} md={8}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                lineHeight: 1.7,
                mb: 3,
                fontSize: '1.1rem'
              }}
            >
              {organizerData.description}
            </Typography>

            {/* Specialties */}
            {organizerData.specialties && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#E91E63', mb: 2, fontWeight: 'bold' }}>
                  Our Specialties
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {organizerData.specialties.map((specialty, index) => (
                    <InfoChip key={index} label={specialty} size="small" />
                  ))}
                </Box>
              </Box>
            )}

            {/* Additional Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {organizerData.establishedYear && (
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Established
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {organizerData.establishedYear}
                  </Typography>
                </Grid>
              )}
              {organizerData.location && (
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {organizerData.location}
                  </Typography>
                </Grid>
              )}
            </Grid>

            {/* Social Media */}
            {organizerData.socialMedia && (
              <Box>
                <Typography variant="h6" sx={{ color: '#E91E63', mb: 2, fontWeight: 'bold' }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {organizerData.socialMedia.instagram && (
                    <SocialIconButton size="small">
                      <Instagram />
                    </SocialIconButton>
                  )}
                  {organizerData.socialMedia.facebook && (
                    <SocialIconButton size="small">
                      <Facebook />
                    </SocialIconButton>
                  )}
                  {organizerData.socialMedia.twitter && (
                    <SocialIconButton size="small">
                      <Twitter />
                    </SocialIconButton>
                  )}
                  {organizerData.website && (
                    <SocialIconButton size="small">
                      <Language />
                    </SocialIconButton>
                  )}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default OrganizerInfo;

