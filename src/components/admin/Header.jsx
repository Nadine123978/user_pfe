import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  CircularProgress,
  Box,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AutoAwesome as AutoAwesomeIcon,
  Star as StarIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';

// ثيم بنفسجي-أزرق مخصص (cosmic design)
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
      default: '#0f172a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          marginTop: '8px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.9)',
          padding: '12px 20px',
          borderRadius: '8px',
          margin: '4px 8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
  },
});

// Keyframe animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.6); }
`;

// Styled components
const CosmicAppBar = styled(AppBar)({
  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(45, 27, 105, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  position: 'fixed', // Keep fixed position
  width: '100%', // Ensure it takes full width
  zIndex: 1200, // Ensure it's above other content
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
    `,
    animation: `${floatAnimation} 6s ease-in-out infinite`,
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '3px',
    height: '3px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 3s linear infinite`,
  },
  '&::before': {
    top: '30%',
    left: '15%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '70%',
    right: '20%',
    animationDelay: '1.5s',
    background: '#06b6d4',
  },
});

const CosmicToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
  position: 'relative',
  zIndex: 1,
  padding: '0 24px',
  minHeight: '72px',
});

const BrandSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const BrandTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  letterSpacing: '0.5px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
});

const ActionsSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const CosmicIconButton = styled(IconButton)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '12px',
  transition: 'all 0.3s ease',
  color: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    background: 'rgba(99, 102, 241, 0.2)',
    borderColor: 'rgba(99, 102, 241, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
    color: '#6366f1',
    '& .MuiSvgIcon-root': {
      animation: `${pulseGlow} 2s ease-in-out infinite`,
    },
  },
});

const CosmicBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.75rem',
    minWidth: '20px',
    height: '20px',
    borderRadius: '10px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
    animation: `${pulseGlow} 2s ease-in-out infinite`,
  },
});

const CosmicAvatar = styled(Avatar)({
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  width: '40px',
  height: '40px',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 24px rgba(99, 102, 241, 0.5)',
  },
});

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNotificationClick = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
      handleClose();
      navigate("/admin/inbox", { state: { notificationId: id } });
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicAppBar position="fixed">
        <FloatingParticles />
        <CosmicToolbar>
          <BrandSection>
            <BrandTitle variant="h6">
                Admin Portal
            </BrandTitle>
          </BrandSection>

          <ActionsSection>
            <Tooltip title="Cosmic Notifications" arrow>
              <CosmicIconButton onClick={handleOpen}>
                <CosmicBadge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </CosmicBadge>
              </CosmicIconButton>
            </Tooltip>

            <Tooltip title="Admin Profile" arrow>
              <CosmicAvatar>
                <AccountCircleIcon />
              </CosmicAvatar>
            </Tooltip>
          </ActionsSection>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                minWidth: '320px',
                maxWidth: '400px',
                maxHeight: '400px',
              }
            }}
          >
            {loading && (
              <MenuItem sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                pointerEvents: 'none',
              }}>
                <CircularProgress 
                  size={20} 
                  sx={{ 
                    color: '#6366f1',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }} 
                />
                <Typography variant="body2">Loading cosmic notifications...</Typography>
              </MenuItem>
            )}

            {!loading && notifications.length === 0 && (
              <MenuItem sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                fontStyle: 'italic',
                textAlign: 'center',
                pointerEvents: 'none',
                flexDirection: 'column',
                py: 3,
              }}>
                <NotificationsIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.3)', mb: 1 }} />
                <Typography variant="body2">
                  No cosmic notifications
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  All clear in the galaxy! ✨
                </Typography>
              </MenuItem>
            )}

            {!loading &&
              notifications.slice(0, 10).map((notif) => (
                <MenuItem
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.id)}
                  sx={{
                    ...((!notif.read) && {
                      background: 'rgba(99, 102, 241, 0.1)',
                      borderLeft: '3px solid #6366f1',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '6px',
                        height: '6px',
                        background: '#6366f1',
                        borderRadius: '50%',
                        animation: `${pulseGlow} 2s ease-in-out infinite`,
                      },
                    }),
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: notif.read ? 400 : 600,
                        color: notif.read ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {notif.message}
                    </Typography>
                    {notif.createdAt && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '0.7rem',
                        }}
                      >
                        {new Date(notif.createdAt).toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                </MenuItem>
              ))}

            {!loading && notifications.length > 10 && (
              <MenuItem 
                onClick={() => {
                  handleClose();
                  navigate("/admin/inbox");
                }}
                sx={{ 
                  justifyContent: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  mt: 1,
                  color: '#6366f1',
                  fontWeight: 600,
                }}
              >
                View All Notifications ({notifications.length}) 🌟
              </MenuItem>
            )}
          </Menu>
        </CosmicToolbar>
      </CosmicAppBar>
    </ThemeProvider>
  );
};

export default Header;


