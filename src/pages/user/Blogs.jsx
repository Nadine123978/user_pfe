import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Chip, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../../components/user/Header"; // Import the Header component
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Icon for read more button

// Re-using the GradientButton styled component for consistency
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 30, // Very rounded button
  color: disabled ? '#999999' : 'white',
  height: 45, // Slightly smaller height for blog cards
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

const blogPosts = [
  {
    title: "Top 10 Music Concerts in Paris This Month",
    description: "Discover the must-attend concerts and shows you can’t miss in June 2025!",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
    category: "Music",
    date: "June 20, 2025",
  },
  {
    title: "How to Choose the Right Event for You?",
    description: "Your guide to selecting the perfect event based on your interests and budget.",
    image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=400&fit=crop",
    category: "Tips",
    date: "June 15, 2025",
  },
  {
    title: "Behind the Scenes: Organizing a Successful Event",
    description: "Learn the step-by-step process of planning and executing a memorable event.",
    image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=600&h=400&fit=crop",
    category: "Organization",
    date: "June 10, 2025",
  },
{
  title: "The Future of Virtual Events",
  description: "Exploring how technology is shaping the landscape of online gatherings.",
  image: "https://picsum.photos/id/1025/600/400", // صورة من مصدر مضمون
  category: "Technology",
  date: "June 05, 2025",
},
  {
    title: "Mastering Event Promotion on Social Media",
    description: "Strategies to effectively promote your events and reach a wider audience.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    category: "Marketing",
    date: "May 28, 2025",
  },
  {
    title: "Sustainable Event Planning: Go Green!",
    description: "Tips and tricks for organizing eco-friendly events that leave a positive impact.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
    category: "Sustainability",
    date: "May 20, 2025",
  },
];

export default function BlogPage( ) {
  return (
    <Box sx={{ backgroundColor: '#200245', minHeight: '100vh', color: 'white' }}> {/* Main page background */}
      <Header />
      <Box sx={{ pt: { xs: '64px', md: '80px' } }}> {/* Padding to account for fixed Header */}

        {/* Blog Hero Section - Background color matches main page background */}
        <Box
          sx={{
            background: '#200245', // Matches main page background for seamless look
            py: { xs: 6, md: 8 },
            textAlign: 'center',
            mb: 4,
            // No boxShadow as it blends with the main background
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#FFFFFF', mb: 1 }}>
            Our <Typography component="span" sx={{ color: '#E91E63' }}>Blog</Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Insights, tips, and news from the world of events.
          </Typography>
        </Box>

        <Container sx={{ py: 5 }}>
          {blogPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" sx={{ color: '#E0E0E0', mb: 2 }}>
                No blog posts found.
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Check back soon for new articles!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {blogPosts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      backgroundColor: '#FFFFFF', // White background for cards
                      color: 'black', // Default text color for content on white background
                      border: '1px solid rgba(0, 0, 0, 0.1)', // Subtle border
                      borderRadius: '16px', // More rounded corners
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow for white cards
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.3)',
                      },
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.image}
                      alt={post.title}
                      sx={{
                        objectFit: 'cover',
                        filter: 'brightness(0.9)', // Slightly less bright for white cards
                        transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
                        '&:hover': {
                          filter: 'brightness(1)',
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            backgroundColor: '#E91E63', // Vibrant pink for chip
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                          }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}> {/* Darker text for date */}
                          {post.date}
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'black', mt: 1 }}> {/* Black text for title */}
                        {post.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, minHeight: '60px' }}> {/* Darker text for description */}
                        {post.description}
                      </Typography>
                      <GradientButton
                        size="small"
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                      >
                        Read More
                      </GradientButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}
