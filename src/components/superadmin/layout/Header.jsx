import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // مهم جداً
import AddAdminModal from '../AddAdminModal';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // مثلا من localStorage أو Context تعرف إذا المستخدم مسجل دخول أو لا
  const isLoggedIn = !!localStorage.getItem('token'); // مثال بسيط

  const handleLogout = () => {
    localStorage.clear(); // مسح كل بيانات التخزين المحلية
    navigate('/login', { replace: true }); // إعادة توجيه لصفحة تسجيل الدخول
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Typography variant="h6">Admin</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField size="small" placeholder="Search" />
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add New Admin
        </Button>
        <AddAdminModal open={open} onClose={() => setOpen(false)} />
      </Box>
      {isLoggedIn && (
        <Button
          onClick={handleLogout}
          sx={{
            color: "#fff",
            border: "1px solid #fff",
            borderRadius: "20px",
            textTransform: "none",
            px: 2,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default Header;
