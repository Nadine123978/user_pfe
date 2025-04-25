import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ticketCount: 1,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("🎫 Booking submitted successfully!");
    // فيك تبعت البيانات للـ backend هون عبر axios
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Book Your Ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          value={formData.fullName}
          onChange={handleChange("fullName")}
        />
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange("email")}
        />
        <TextField
          fullWidth
          label="Number of Tickets"
          type="number"
          variant="outlined"
          margin="normal"
          value={formData.ticketCount}
          onChange={handleChange("ticketCount")}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1c1c3b" }}
        >
          Confirm Booking
        </Button>
      </form>
    </Container>
  );
};

export default BookingForm;
