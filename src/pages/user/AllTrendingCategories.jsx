import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CircularProgress // Added CircularProgress for loading state
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles"; // Import styled for custom button

import Header from "../../components/user/Header"; // Import the Header component

// Re-using the GradientButton styled component for consistency
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 30, // Very rounded button
  color: disabled ? '#999999' : 'white',
  height: 45, // Slightly smaller height for card buttons
  padding: '0 20px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)',
    transform: 'translateY(-3px)',
    boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.6)',
  },
}));

const AllTrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTrending = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/categories" ); // No limit
        setCategories(res.data);
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        console.error("Failed to fetch all trending categories", err);
        setLoading(false); // Also set to false on error
      }
    };
    fetchAllTrending();
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#200245', color: 'white' }}>
      <CircularProgress color="inherit" />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#200245', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Box sx={{ pt: { xs: '64px', md: '80px' } }}> {/* Padding to account for fixed Header */}

        {/* Categories Hero Section */}
        <Box
          sx={{
      // A slightly different dark purple for the hero
            py: { xs: 6, md: 8 },
            textAlign: 'center',
            mb: 4
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#FFFFFF', mb: 1 }}>
            Explore All <Typography component="span" sx={{ color: '#E91E63' }}>Categories</Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Find events that match your interests.
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 4, md: 6 } }}>
          {categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" sx={{ color: '#E0E0E0', mb: 2 }}>
                No categories found.
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Please check back later.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {categories.map((category, index) => {
                let cleanedUrl = category.imageUrl || "";
                cleanedUrl = cleanedUrl.replace("//", "/").replace("/images/", "/uploads/");
                const fullImageUrl = cleanedUrl.startsWith("http" )
                  ? cleanedUrl
                  : `http://localhost:8081${cleanedUrl}`;

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        backgroundColor: 'linear-gradient(135deg, #2C0050, #3A0060 )', // Dark gradient for card
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
                        borderRadius: '16px', // More rounded corners
                        overflow: 'hidden',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.6)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={fullImageUrl}
                        alt={category.name}
                        sx={{
                          filter: "brightness(0.8)", // Slightly darken image
                          transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
                          '&:hover': {
                            filter: 'brightness(1)', // Brighten on hover
                            transform: 'scale(1.05)', // Zoom effect on hover
                          }
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", // Darker gradient overlay
                        }}
                      >
                        <Typography variant="h6" color="white" fontWeight="bold"> {/* Larger and bolder category name */}
                          {category.name}
                        </Typography>
                        <GradientButton
                          size="small"
                          endIcon={<OpenInNewIcon />}
                          onClick={() => navigate(`/category/${category.id}/events`)}
                        >
                          Preview
                        </GradientButton>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllTrendingCategories;
