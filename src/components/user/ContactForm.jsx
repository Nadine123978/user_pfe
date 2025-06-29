import React, { useState, useRef } from "react";
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
import { styled } from "@mui/material/styles";

const GradientButton = styled(Button)(({ disabled }) => ({
  background: disabled
    ? "linear-gradient(45deg, #444444, #555555)"
    : "linear-gradient(45deg, #D81B60, #E91E63)",
  border: 0,
  borderRadius: 30,
  color: disabled ? "#999999" : "white",
  height: 50,
  padding: "0 30px",
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  boxShadow: disabled
    ? "none"
    : "0 8px 20px rgba(0, 0, 0, 0.5)",
  "&:hover": {
    background: disabled
      ? "linear-gradient(45deg, #444444, #555555)"
      : "linear-gradient(45deg, #C2185B, #D81B60)",
    transform: disabled ? "none" : "translateY(-3px)",
    boxShadow: disabled
      ? "none"
      : "0 12px 25px rgba(0, 0, 0, 0.6)",
  },
}));

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone, "LB"))
      newErrors.phone = "Invalid phone number for Lebanon";

    if (!formData.message.trim())
      newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    validateEmail(formData.email) &&
    formData.phone.trim() !== "" &&
    validatePhone(formData.phone, "LB") &&
    formData.message.trim() !== "" &&
    captchaToken !== "" &&
    !loading;

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

  setLoading(true);
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
      if (recaptchaRef.current) recaptchaRef.current.reset();  // Reset captcha only after success
    } else {
      alert("Failed to send message.");
      // لا تعيد reset هنا حتى لا تجبر المستخدم يعيد التحقق دون داعي
    }
  } catch (error) {
    alert("Error sending message.");
    // لا تعيد reset هنا أيضاً
  } finally {
    setLoading(false);
  }
};

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, backgroundColor: "transparent" }}>
      <Paper
        elevation={6}
        sx={{
          maxWidth: "100%",
          width: { xs: "100%", sm: "90%", md: 700 },
          margin: "auto",
          p: { xs: 3, md: 5 },
          backgroundColor: "#200245",
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "white",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "#E0E0E0" }}>
          Get in Touch
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#E0E0E0" }}>
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
            variant="outlined"
            sx={{
              mt: 1,
              mb: 2,
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4A0070" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
              "& .MuiInputBase-root": {
                height: 55,
                borderRadius: "8px",
                backgroundColor: "transparent",
              },
            }}
            InputLabelProps={{ shrink: true }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#E0E0E0" }}>
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
                variant="outlined"
                sx={{
                  mt: 1,
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4A0070" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
                  "& .MuiInputBase-root": {
                    height: 55,
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#E0E0E0" }}>
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
                variant="outlined"
                sx={{
                  mt: 1,
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4A0070" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
                  "& .MuiInputBase-root": {
                    height: 55,
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#E0E0E0" }}>
            Message *
          </Typography>
          <TextField
            fullWidth
            required
            placeholder="Your message"
            multiline
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            variant="outlined"
            sx={{
              mt: 1,
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4A0070" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E91E63" },
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                backgroundColor: "transparent",
              },
            }}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ mt: 3, "& > div": { margin: "auto" } }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeBXT4rAAAAAIUD9ExF-CViqoLVAiVZEpStOBlK"
              onChange={(token) => setCaptchaToken(token)}
              theme="dark"
            />
          </Box>

          <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)", mt: 4, pt: 3 }}>
            <GradientButton type="submit" fullWidth disabled={!isFormValid}>
              {loading ? "Sending..." : "Send a Message"}
            </GradientButton>
          </Box>
        </form>

        <Grid container spacing={3} mt={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#E0E0E0" }}>
              Call us anytime
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon sx={{ color: "#E91E63" }} />
              <Typography sx={{ color: "rgba(255, 255, 255, 0.8)" }}>‪+961 70 123 456‬</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#E0E0E0" }}>
              Direct us anytime
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon sx={{ color: "#E91E63" }} />
              <Typography sx={{ color: "rgba(255, 255, 255, 0.8)" }}>info@example.com</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
