import React from "react";
import Header from "../../components/user/Header";
import ContactHeader from "../../components/user/ContactHeader";
import ContactForm from "../../components/user/ContactForm";
import { Box } from "@mui/material";

const ContactPage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: '#200245', // Deep, rich dark purple background for the entire page
        color: 'white', // Default text color for the page
        display: 'flex',
        flexDirection: 'column',
        // Removed alignItems: 'center' from here, as ContactHeader and ContactForm handle their own centering
      }}
    >
      <Header />
      {/* Add a Box to push content down below the fixed Header */}
      <Box sx={{ pt: { xs: '64px', md: '80px' } }}> {/* Adjust padding-top based on Header's height */}
        <ContactHeader />
        <ContactForm />
      </Box>
    </Box>
  );
};

export default ContactPage;
