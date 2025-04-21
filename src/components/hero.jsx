import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          alignItems="center"
        >
          {/* Text Section */}
          <Box flex={1}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              All the fun starts here.
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Book your <br />
              Tickets for Event!
            </Typography>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Safe, Secure, Reliable ticketing.</li>
              <li>Your ticket to live entertainment!</li>
            </ul>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              View More
            </Button>
          </Box>

          {/* Images Section */}
          <Box
            flex={1}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {[1, 2, 3, 4].map((num) => (
              <Box
                key={num}
                sx={{
                  height: 150,
                  backgroundColor: "#222",
                  backgroundImage: `url(https://via.placeholder.com/150?text=Image+${num})`,
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
