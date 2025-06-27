import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const steps = [
  {
    id: "01",
    title: "Go to Event Page",
    description: "Browse available events and discover exciting experiences tailored to your interests.",
    image: "/images/step1.png",
    bgColor: "linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)",
    rotate: "-3deg",
  },
  {
    id: "02",
    title: "Choose Your Event",
    description: "Select your favorite events and reserve your tickets with our seamless booking system.",
    image: "/images/step2.png",
    bgColor: "linear-gradient(135deg, #8E24AA 0%, #D81B60 100%)",
    rotate: "0deg",
  },
  {
    id: "03",
    title: "Complete Payment",
    description: "Securely complete your payment and get ready to enjoy your unforgettable event experience.",
    image: "/images/step3.png",
    bgColor: "linear-gradient(135deg, #D81B60 0%, #E91E63 100%)",
    rotate: "3deg",
  },
];

// Styled components for enhanced visual appeal
const SectionContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23D81B60" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const StepCard = styled(Box)(({ bgColor, rotate }) => ({
  background: bgColor,
  borderRadius: 24,
  padding: '32px',
  width: '100%',
  maxWidth: 350,
  transform: `rotate(${rotate})`,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  cursor: 'default',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    zIndex: 1,
  },
  '&:hover': {
    transform: `scale(1.05) rotate(${rotate})`,
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
  },
}));

const StepContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const StepNumber = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 800,
  color: 'rgba(255, 255, 255, 0.9)',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  marginBottom: '16px',
  fontFamily: "'Inter', sans-serif",
});

const StepTitle = styled(Typography)({
  fontWeight: 700,
  color: 'white',
  marginBottom: '12px',
  fontSize: '1.5rem',
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  fontFamily: "'Inter', sans-serif",
});

const StepDescription = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.95)',
  lineHeight: 1.6,
  fontSize: '0.95rem',
  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
});

const StepImage = styled(Box)({
  width: '100%',
  height: 180,
  borderRadius: 16,
  objectFit: 'cover',
  marginTop: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const HowItWorks = () => {
  return (
    <SectionContainer 
      sx={{ 
        py: 12, 
        px: { xs: 3, md: 6 },
        mt: 0,
        mb: 0,
      }}
    >
      <ContentWrapper>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #2C3E50, #4A148C, #8E24AA)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: "#555",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Follow these simple steps to book your tickets and create unforgettable memories
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={6}
            justifyContent="center"
            alignItems="center"
            sx={{ flexWrap: "wrap" }}
          >
            {steps.map(({ id, title, description, image, bgColor, rotate }) => (
              <StepCard key={id} bgColor={bgColor} rotate={rotate}>
                <StepContent>
                  <StepNumber>{id}</StepNumber>
                  <StepTitle>{title}</StepTitle>
                  <StepDescription>{description}</StepDescription>
                  <StepImage
                    component="img"
                    src={image}
                    alt={title}
                  />
                </StepContent>
              </StepCard>
            ))}
          </Stack>
        </Container>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default HowItWorks;

