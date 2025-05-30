import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const HeroSection = () => {
  const images = [
    "/Img_1.jpg",
    "/Img_2.jpg",
    "/Img_3.jpg",
    "/Img_4.jpg"
  ];

  return (
    <Box
      sx={{
       background: "linear-gradient(to right, #03045E, #000)",
        color: "#fff",
       pt: 0, // أو pt: 1 لو بدكها قريبة جدًا
    pb: 10, // padding-bottom كما هو إذا بدك
        minHeight: "100vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Text Section */}
          <Box flex={1}>
            <Typography variant="body1" sx={{ mb: 1, color: "#aaa" }}>
              All the fun starts here.
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Book your <br />
              Tickets for Event!
            </Typography>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 2 }}>
              <li>Safe, Secure, Reliable ticketing.</li>
              <li>Your ticket to live entertainment!</li>
            </ul>
         {/*   <Button
              variant="contained"
              sx={{
                mt: 4,
                borderRadius: "10px",
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}
            >
              View More ↗
            </Button>  */}
          </Box>

          {/* Image Grid Section */}
          <Box
            flex={1}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {images.map((src, index) => (
              <Box
                key={index}
                sx={{
                  height: 200,
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                }}
              />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
