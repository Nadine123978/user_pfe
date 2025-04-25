// src/pages/ExperienceDetails.jsx
import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";


const images = [
        "https://images.unsplash.com/photo-1581090700227-1c4e1c1f96f9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563453392215-d2a3d4bdc77e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80",    
];

const ExperienceDetails = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        La Grande Roue de Montréal: Ferris Wheel Entry Ticket
      </Typography>

      <Grid container spacing={2}>
        {images.map((src, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box
              component="img"
              src={src}
              alt={`Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: 250,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="body1" color="text.secondary" mb={1}>
          Enjoy a panoramic view of Montreal from Canada's tallest observation wheel!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Open every day | Duration: 20 minutes | Instant Confirmation
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#052641",
            color: "#fff",
            px: 4,
            py: 1,
            fontWeight: "bold",
            borderRadius: "10px",
          }}
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
};

export default ExperienceDetails;
