import React from "react";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import eventImage from '../../assets/images/img6.jpg';


// Styled components for enhanced visual appeal
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${eventImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)', // darker overlay if needed
    zIndex: 1,
  },
}));


const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #D81B60 30%, #E91E63 90%)',
  border: 0,
  borderRadius: 25,
  boxShadow: '0 3px 5px 2px rgba(216, 27, 96, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(216, 27, 96, .4)',
  },
}));

const FloatingElement = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(233, 30, 99, 0.2)',
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
});

const HeroSection = () => {
  return (
    <HeroContainer
      sx={{
        py: { xs: 8, md: 12 },
        px: 4,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Floating decorative elements */}
      <FloatingElement
        sx={{
          width: 80,
          height: 80,
          top: '20%',
          left: '10%',
          animationDelay: '0s',
        }}
      />
      <FloatingElement
        sx={{
          width: 60,
          height: 60,
          top: '60%',
          right: '15%',
          animationDelay: '2s',
        }}
      />
      <FloatingElement
        sx={{
          width: 100,
          height: 100,
          bottom: '20%',
          left: '5%',
          animationDelay: '4s',
        }}
      />

      <Container maxWidth="lg">
        <HeroContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Text Content */}
            <Box flex={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  color: "#ffffff",
                  lineHeight: 1.1,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Your Next Experience{" "}
                <Typography
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #D81B60, #E91E63)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                  }}
                >
                  Starts Here
                </Typography>
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  color: "rgba(255, 255, 255, 0.9)", 
                  mb: 4,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Discover, book, and enjoy amazing events near you. Connect with your community and create unforgettable memories.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              >
                <GradientButton size="large">
                  Explore Events
                </GradientButton>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    borderRadius: 25,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#E91E63',
                      backgroundColor: 'rgba(233, 30, 99, 0.1)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Stack>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
