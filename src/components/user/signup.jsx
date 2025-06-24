import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({}); // حالة الأخطاء

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username) newErrors.username = 'Username is required.';
    if (!email) newErrors.email = 'Email is required.';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Enter a valid email.';
    }

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!agree) newErrors.agree = 'You must agree to terms and conditions.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return; // إذا فيه أخطاء ما بكمّل

    try {
      const response = await axios.post('http://localhost:8081/api/users/create', {
        username,
        email,
        password,
        role: "USER"
      });

      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", "user");

      // ممكن تعرض رسالة نجاح بطريقة غير alert لو بتحب (مثلاً Snackbar أو redirect مباشرة)
      navigate("/");
    } catch (error) {
      console.error('❌ Error creating user:', error);
      setErrors({ submit: 'Error creating account. Please try again.' });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Google user:", user);

      localStorage.setItem("userId", user.uid);
      localStorage.setItem("role", "user");

      navigate("/");
    } catch (error) {
      console.error("❌ Google Sign-in error:", error);
      setErrors({ submit: 'Failed to sign in with Google' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #fce3f1, #dcdde1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'white',
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                color={errors.agree ? "error" : "primary"}
              />
            }
            label={
              <Typography variant="body2" color={errors.agree ? "error" : "text.primary"}>
                I agree to the <strong>Terms</strong> and <strong>Conditions of Privacy</strong>
              </Typography>
            }
            sx={{ mt: 1 }}
          />
          {errors.agree && (
            <Typography variant="caption" color="error" sx={{ ml: 1 }}>
              {errors.agree}
            </Typography>
          )}

          {errors.submit && (
            <Typography variant="body2" color="error" align="center" mt={2}>
              {errors.submit}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: '20px',
              backgroundColor: '#1c1c3b',
              '&:hover': {
                backgroundColor: '#33335c',
              },
            }}
            onClick={handleSignUp}
          >
            Create Account
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderRadius: '20px',
              borderColor: '#1c1c3b',
              color: '#1c1c3b',
              '&:hover': {
                borderColor: '#33335c',
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 'bold' }}>Login now</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
