import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

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
        pt: 0,
        pb: 10,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
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
          <Box flex={1} sx={{ textAlign: { xs: "center", md: "left" } }}>
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
          </Box>

          {/* Image Grid Section */}
          <Box
            flex={1}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(2, 1fr)" },
              gap: 2,
              width: "100%",
              maxWidth: { xs: "100%", md: "500px" }, // تحكم بعرض الصور في اللابتوب
            }}
          >
            {images.map((src, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  height: { xs: 150, md: 200 }, // ارتفاع مرن حسب الجهاز
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
