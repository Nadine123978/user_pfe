import { Box, Typography } from "@mui/material";

const ContactHeader = () => (
  <Box
    textAlign="center"
    py={{ xs: 6, md: 8 }}
    px={{ xs: 2, md: 4 }}
    sx={{
      backgroundColor: '#200245', // Dark purple from your image for the header background
      color: "#FFFFFF", // White text color
      // Removed borderBottom and boxShadow to match the image's seamless blend with the page background
    }}
  >
    <Typography variant="subtitle1" sx={{ color: '#E91E63', fontWeight: 'bold', letterSpacing: 2 }}> {/* Vibrant pink, bold, and spaced out */}
      CONTACT US
    </Typography>
    <Typography
      variant="h4"
      fontWeight="bold"
      mt={1}
      mb={2}
      sx={{
        color: "#FFFFFF", // White text
        fontSize: { xs: "2rem", md: "3rem" }, // Larger font size
        lineHeight: 1.2, // Tighter line height
      }}
    >
      Reach Out for <br /> Additional Information
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: { xs: "1rem", md: "1.1rem" } }}> {/* Slightly larger and lighter text */}
      Questions or feedback? We’re here to help with anything you need—just reach out!
    </Typography>
  </Box>
);

export default ContactHeader;
