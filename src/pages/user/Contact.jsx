import React from "react";
import Header from "../../components/user/Header";
import ContactHeader from "../../components/user/ContactHeader";
import ContactForm from "../../components/user/ContactForm";
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
