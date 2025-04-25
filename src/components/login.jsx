import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [agreed, setAgreed] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/api/users/create", formData);
      console.log("✅ User created:", res.data);
      alert("Account created successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Signup failed.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fce3f1, #dcdde1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" mb={1}>
            Sign Up
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Enter the information below to create your account
          </Typography>

          <TextField
            fullWidth
            label="Your name"
            value={formData.username}
            onChange={handleChange("username")}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Address"
            value={formData.email}
            onChange={handleChange("email")}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            variant="outlined"
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
            label={
              <Typography variant="body2">
                I agree to the <strong>Terms</strong> and{" "}
                <strong>Conditions of Privacy</strong>
              </Typography>
            }
            sx={{ mt: 1 }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: "20px",
              backgroundColor: "#1c1c3b",
              "&:hover": {
                backgroundColor: "#33335c",
              },
            }}
            onClick={handleSubmit}
          >
            Create Account
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account? <strong style={{ cursor: "pointer" }}>Login now</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
