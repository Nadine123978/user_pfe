import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiddenIds, setHiddenIds] = useState([]); // لإخفاء الإشعارات بعد الضغط

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/notifications");
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notif) => !notif.read && !hiddenIds.includes(notif.id)
  ).length;

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // عند الضغط على إشعار
  const handleNotificationClick = async (id) => {
    try {
      // تحديث حالة القراءة في الباكند
      await axios.put(`http://localhost:8081/api/notifications/${id}/read`);

      // تحديث الحالة محليًا
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );

      // إخفاء الإشعار مؤقتًا
      setHiddenIds((prev) => [...prev, id]);

      handleClose();

      // التنقل لصفحة Inbox مع إرسال الـ id لو حابب
      navigate("/admin/inbox", { state: { notificationId: id } });
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .galactic-header {
          background: linear-gradient(135deg, #0D0E2B 0%, #1A1B3A 50%, #2D1B69 100%);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 215, 0, 0.2);
        }
        
        .galactic-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
          animation: headerNebula 20s ease-in-out infinite alternate;
          z-index: 1;
        }
        
        @keyframes headerNebula {
          0% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.6;
          }
          100% { 
            transform: scale(1.05) rotate(0.5deg);
            opacity: 0.9;
          }
        }
        
        .floating-stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
        
        .star {
          position: absolute;
          width: 1px;
          height: 1px;
          background: #FFD700;
          border-radius: 50%;
          animation: twinkle 3s infinite;
          box-shadow: 0 0 3px #FFD700;
        }
        
        .star:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .star:nth-child(2) { left: 30%; top: 60%; animation-delay: 1s; }
        .star:nth-child(3) { left: 60%; top: 30%; animation-delay: 2s; }
        .star:nth-child(4) { left: 80%; top: 70%; animation-delay: 0.5s; }
        .star:nth-child(5) { left: 90%; top: 40%; animation-delay: 1.5s; }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        .header-content {
          position: relative;
          z-index: 10;
          width: 100%;
        }
        
        .galactic-title {
          font-family: 'Orbitron', monospace !important;
          font-weight: 700 !important;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5) !important;
          position: relative !important;
          letter-spacing: 1px !important;
        }
        
        .galactic-title::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
          animation: titleShimmer 4s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes titleShimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        .separator {
          color: #FFD700 !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8) !important;
          margin: 0 8px !important;
          animation: separatorGlow 2s ease-in-out infinite alternate !important;
        }
        
        @keyframes separatorGlow {
          0% { 
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
          }
          100% { 
            text-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.5);
          }
        }
        
        .notification-icon {
          color: #FFD700 !important;
          transition: all 0.3s ease !important;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5)) !important;
        }
        
        .notification-icon:hover {
          color: #FFA500 !important;
          transform: scale(1.1) !important;
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)) !important;
        }
        
        .notification-badge {
          background: linear-gradient(135deg, #FF4500 0%, #FF6347 100%) !important;
          color: white !important;
          animation: badgePulse 2s ease-in-out infinite !important;
          box-shadow: 0 0 10px rgba(255, 69, 0, 0.6) !important;
        }
        
        @keyframes badgePulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 69, 0, 0.6);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
          }
        }
        
        .galactic-menu {
          background: rgba(13, 14, 43, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 215, 0, 0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.2) !important;
          overflow: hidden !important;
        }
        
        .galactic-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }
        
        .menu-item {
          position: relative !important;
          z-index: 2 !important;
          color: #F0F0F0 !important;
          transition: all 0.3s ease !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .menu-item:hover {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%) !important;
          color: #FFD700 !important;
          transform: translateX(4px) !important;
        }
        
        .menu-item:last-child {
          border-bottom: none !important;
        }
        
        .unread-notification {
          font-weight: bold !important;
          color: #FFD700 !important;
          background: rgba(255, 215, 0, 0.05) !important;
        }
        
        .read-notification {
          color: rgba(240, 240, 240, 0.6) !important;
        }
        
        .loading-progress {
          color: #FFD700 !important;
        }
        
        .notification-message {
          color: inherit !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .notification-time {
          color: rgba(255, 215, 0, 0.7) !important;
          font-family: 'Inter', sans-serif !important;
        }
      `}</style>
      
      <AppBar
        position="fixed"
        className="galactic-header"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: 64,
          justifyContent: "center",
          px: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="floating-stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        
        <Toolbar
          disableGutters
          className="header-content"
          sx={{ flexGrow: 1, justifyContent: "space-between" }}
        >
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            className="galactic-title"
            sx={{ 
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Event Management System
            <span className="separator">|</span>
            Admin Panel
          </Typography>

          <Box>
            <IconButton 
              className="notification-icon"
              onClick={handleOpen} 
              disabled={loading}
              sx={{
                '&:disabled': {
                  color: 'rgba(255, 215, 0, 0.3) !important'
                }
              }}
            >
              <Badge 
                badgeContent={unreadCount} 
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
                    color: 'white',
                    animation: unreadCount > 0 ? 'badgePulse 2s ease-in-out infinite' : 'none',
                    boxShadow: '0 0 10px rgba(255, 69, 0, 0.6)',
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                className: 'galactic-menu',
                style: {
                  maxHeight: 250,
                  width: 320,
                  marginTop: 8,
                },
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              {loading && (
                <MenuItem className="menu-item">
                  <CircularProgress size={24} className="loading-progress" />
                  <Typography sx={{ ml: 2 }} className="notification-message">
                    Loading...
                  </Typography>
                </MenuItem>
              )}

              {!loading && notifications.filter((n) => !hiddenIds.includes(n.id)).length === 0 && (
                <MenuItem onClick={handleClose} className="menu-item">
                  <Typography className="notification-message">
                    No new notifications
                  </Typography>
                </MenuItem>
              )}

              {!loading &&
                notifications
                  .filter((notif) => !hiddenIds.includes(notif.id))
                  .map((notif) => (
                    <MenuItem
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif.id)}
                      className={`menu-item ${notif.read ? 'read-notification' : 'unread-notification'}`}
                      sx={{
                        whiteSpace: "normal",
                        cursor: "pointer",
                        py: 1.5,
                      }}
                    >
                      <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
                        <Typography 
                          variant="body1" 
                          className="notification-message"
                          sx={{
                            fontWeight: notif.read ? 'normal' : 'bold',
                          }}
                        >
                          {notif.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="notification-time"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {notif.time}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

