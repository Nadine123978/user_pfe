import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';

const roles = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN', label: 'Admin' },
];

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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

const GlassmorphismBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(5),
  position: 'relative',
  zIndex: 10,
  maxWidth: '400px',
  margin: '0 auto',
  my: '20vh',
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
    animation: `${keyframes`
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    `} 3s ease-in-out infinite`,
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

const EditModal = ({ open, onClose, adminData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (adminData) {
      setFormData({
        ...adminData,
        email: adminData.email || adminData.username,
        password: '', // دايمًا خليه فاضي
      });
    }
  }, [adminData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!adminData) return null;

  return (
    <ThemeProvider theme={cosmicTheme}>
      <Modal open={open} onClose={onClose}>
        <GlassmorphismBox>
          <CosmicTextField
            label="Full Name"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <CosmicTextField
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="email"
          />
          <CosmicTextField
            label="Password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="password"
            helperText="Leave blank to keep current password"
          />
          <CosmicTextField
            select
            label="Role"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CosmicTextField>

          <CosmicButton variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
            Save
          </CosmicButton>
        </GlassmorphismBox>
      </Modal>
    </ThemeProvider>
  );
};

export default EditModal;


