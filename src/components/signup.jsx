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
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();


  const handleSignUp = async () => {
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (!agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/api/users/create', {
        username,
        email,
        password,
      });
  
      const userId = response.data.userId;  // تأكد من أن السيرفر يعيد الـ userId بعد إنشاء الحساب
      localStorage.setItem("userId", userId);  // حفظ الـ userId في localStorage
  
      alert('Account created successfully!');
      navigate("/");  // أو توجيه المستخدم إلى الصفحة المناسبة
    } catch (error) {
      console.error('❌ Error creating user:', error);
      alert('Error creating account. Please try again.');
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
          />
          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
            label={
              <Typography variant="body2">
                I agree to the <strong>Terms</strong> and <strong>Conditions of Privacy</strong>
              </Typography>
            }
            sx={{ mt: 1 }}
          />

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

          <Typography variant="body2" align="center" mt={2}>
            Already have an account?{' '}
            <strong style={{ cursor: 'pointer' }}>Login now</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
