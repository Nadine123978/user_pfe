import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Stack,
  Container,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styled components for enhanced visual appeal
const SectionContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2C3E50 0%, #4A148C 50%, #8E24AA 100%)',
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
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const CategoryCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 1)',
  },
}));

const ViewButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(45deg, #D81B60, #E91E63)',
  color: 'white',
  width: 40,
  height: 40,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #C2185B, #D81B60)',
    transform: 'scale(1.1)',
  },
}));

const SeeAllButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  borderRadius: 25,
  padding: '12px 30px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
  },
}));

const FloatingShape = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(233, 30, 99, 0.2)',
  animation: 'float 8s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
    },
  },
});

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/categories/trending?limit=4"
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch trending categories", err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <SectionContainer sx={{ py: 12, px: { xs: 2, md: 4 } }}>
      {/* Floating decorative shapes */}
      <FloatingShape
        sx={{
          width: 120,
          height: 120,
          top: '10%',
          left: '5%',
          animationDelay: '0s',
        }}
      />
      <FloatingShape
        sx={{
          width: 80,
          height: 80,
          top: '70%',
          right: '10%',
          animationDelay: '3s',
        }}
      />
      <FloatingShape
        sx={{
          width: 60,
          height: 60,
          bottom: '20%',
          left: '15%',
          animationDelay: '6s',
        }}
      />

      <ContentWrapper>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: 'white',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Trending{' '}
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
                Categories
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Discover the most popular event types happening around you
            </Typography>
            <SeeAllButton
              endIcon={<ArrowForwardIcon />}
            >
              Explore All Categories
            </SeeAllButton>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {categories.map((category, index) => {
              let cleanedUrl = category.imageUrl || "";
              cleanedUrl = cleanedUrl
                .replace("//", "/")
                .replace("/images/", "/uploads/");
              const fullImageUrl = cleanedUrl.startsWith("http")
                ? cleanedUrl
                : `http://localhost:8081${cleanedUrl}`;

              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <CategoryCard>
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={fullImageUrl}
                        alt={category.name}
                        sx={{
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#333',
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {category.name}
                        </Typography>
                        <ViewButton
                          onClick={() => navigate(`/category/${category.id}/events`)}
                          size="small"
                        >
                          <OpenInNewIcon fontSize="small" />
                        </ViewButton>
                      </Stack>
                    </Box>
                  </CategoryCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default TrendingCategories;

