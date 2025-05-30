import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // التحقق من رقم الهاتف للبلد لبنان "LB"
  const validatePhone = (phone, country = "LB") => {
    try {
      return isValidPhoneNumber(phone, country);
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone, "LB"))
      newErrors.phone = "Invalid phone number for Lebanon";

    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ fullName: "", phone: "", email: "", message: "" });
        setCaptchaToken("");
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Error sending message.");
    }
  };

  return (
   <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, backgroundColor: "#e8f5e9" }}>
      <Paper
  elevation={3}
  sx={{
    maxWidth: "100%",
    width: { xs: "100%", sm: "90%", md: 600 },
    margin: "auto",
    p: { xs: 2, md: 4 },
    backgroundColor: "white",
    borderRadius: 2,
  }}
>

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
          Get in Touch
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
            Full Name *
          </Typography>
          <TextField
            fullWidth
            required
            placeholder="Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{ mt: 1, mb: 2, "& .MuiInputBase-root": { height: 48 } }}
          />

          <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Email *
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mt: 1, "& .MuiInputBase-root": { height: 48 } }}
              />
            </Grid>

             <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Phone *
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="+961 70 123 456"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{ mt: 1, "& .MuiInputBase-root": { height: 48 } }}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
            Message *
          </Typography>
          <TextField
            fullWidth
            required
            placeholder="Your message"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            sx={{ mt: 1, "& .MuiInputBase-root": { padding: "14px" } }}
          />

          {/* reCAPTCHA */}
          <Box sx={{ mt: 3 }}>
            <ReCAPTCHA
              sitekey="6LeBXT4rAAAAAIUD9ExF-CViqoLVAiVZEpStOBlK"
              onChange={(token) => setCaptchaToken(token)}
            />
          </Box>

          <Box sx={{ borderTop: "1px solid #e0e0e0", mt: 4, pt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#f4c542",
                color: "black",
                fontWeight: "bold",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#e0b43a" },
              }}
            >
              Send a Message
            </Button>
          </Box>
        </form>

        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Call us anytime
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon color="success" />
              <Typography color="textSecondary">‪+961 70 123 456‬</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Direct us anytime
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon color="success" />
              <Typography color="textSecondary">info@example.com</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
