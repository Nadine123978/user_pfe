import React from "react";
import Header from "../components/Header";
import ContactHeader from "../components/ContactHeader";
import ContactForm from "../components/ContactForm";
import { Box } from "@mui/material";

const ContactPage = () => {
  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
      <Header />
      <ContactHeader />
      <ContactForm />
    </Box>
  );
};

export default ContactPage;
