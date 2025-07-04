import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddAdminModal from '../AddAdminModal';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';

// Cosmic theme (copied from AddEvent/EditEvent)
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',  // بنفسجي أزرق
    },
    secondary: {
      main: '#06b6d4',
    },
    background: {
      default: '#0a0e27',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #6366f1',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), 0 8px 32px rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-2px)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
          '&.MuiButton-outlined': {
            border: '1px solid rgba(99, 102, 241, 0.5)',
            color: '#6366f1',
            '&:hover': {
              border: '1px solid #6366f1',
              background: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  },
});

// Keyframes for animations (copied from AddEvent/EditEvent)
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components (copied from AddEvent/EditEvent)
const CosmicContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4),
}));

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(6, 182, 212, 0.8), transparent),
    radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(16, 185, 129, 0.8), transparent)
  `,
  backgroundRepeat: 'repeat',
  backgroundSize: '200px 100px',
  animation: `${sparkleAnimation} 3s linear infinite`,
  pointerEvents: 'none',
});

const GlassmorphismPaper = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(5),
  position: 'relative',
  zIndex: 10,
  maxWidth: '900px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: `linear-gradient(135deg, 
      rgba(139, 92, 246, 0.1) 0%, 
      rgba(6, 182, 212, 0.1) 50%, 
      rgba(16, 185, 129, 0.1) 100%)`,
    backgroundSize: '200% 200%',
    animation: `${shimmerAnimation} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const CosmicTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '16px',
    fontWeight: '500',
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.5)',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1), 0 8px 25px rgba(139, 92, 246, 0.15)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    '&.Mui-focused': {
      color: '#8b5cf6',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#ffffff',
    padding: '16px 20px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  },
}));

const CosmicButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: '700',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  border: 'none',
  color: '#ffffff',
  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(139, 92, 246, 0.6)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: '600',
  textTransform: 'none',
  background: 'rgba(6, 182, 212, 0.1)',
  border: '2px solid rgba(6, 182, 212, 0.3)',
  color: '#06b6d4',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(6, 182, 212, 0.2)',
    border: '2px solid rgba(6, 182, 212, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3)',
  },
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(45, 27, 105, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }}
      >
        <Typography variant="h6">Super Admin</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CosmicTextField size="small" placeholder="Search" />
          <CosmicButton variant="contained" onClick={() => setOpen(true)}>
            + Add New Admin
          </CosmicButton>
          <AddAdminModal open={open} onClose={() => setOpen(false)} />
        </Box>
       
      </Box>
    </ThemeProvider>
  );
};

export default Header;


