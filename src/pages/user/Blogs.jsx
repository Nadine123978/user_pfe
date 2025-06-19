import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Chip } from "@mui/material";

const blogPosts = [
  {
    title: "Top 10 Music Concerts in Paris This Month",
    description: "Discover the must-attend concerts and shows you can’t miss in June 2025!",
    image: "https://source.unsplash.com/600x400/?concert,music",
    category: "Music",
  },
  {
    title: "How to Choose the Right Event for You?",
    description: "Your guide to selecting the perfect event based on your interests and budget.",
    image: "https://source.unsplash.com/600x400/?event,festival",
    category: "Tips",
  },
  {
    title: "Behind the Scenes: Organizing a Successful Event",
    description: "Learn the step-by-step process of planning and executing a memorable event.",
    image: "https://source.unsplash.com/600x400/?planning,event",
    category: "Organization",
  },
];

export default function BlogPage() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Blog
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Chip label={post.category} color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {post.description}
                </Typography>
                <Button size="small" variant="outlined">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
