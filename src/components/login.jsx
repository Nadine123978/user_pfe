import React from 'react';
import { Button, TextField, Container, Typography, Box, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    // التأكد من أن الحقول ليست فارغة
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    // إعداد البيانات لإرسالها إلى الـ API
    const data = { email, password };

    try {
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // إذا كانت الاستجابة ناجحة (مثلاً، رمز JWT أو نجاح في التسجيل)
        alert('Login Successful');
        // هنا يمكنك توجيه المستخدم إلى صفحة أخرى باستخدام react-router
      } else {
        // إذا كانت الاستجابة غير ناجحة
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fce3f1, #dcdde1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" fontWeight="bold" mb={1} color='black'>Log In</Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Enter your account details below to log in
          </Typography>

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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
              Forgot your password?
            </Typography>
          </Box>

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
            onClick={handleLogin}
          >
            Login Now
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            Don’t have an account?{' '}
            <strong style={{ cursor: 'pointer' }}>Create an account</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
