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
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
        color: "#333",
        height: 64,
        justifyContent: "center",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        px: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold" }}>
          Event Management System | Admin Panel
        </Typography>

        <Box>
          <IconButton color="inherit" onClick={handleOpen} disabled={loading}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 250,
                width: 320,
              },
            }}
          >
            {loading && (
              <MenuItem>
                <CircularProgress size={24} />
                <Typography sx={{ ml: 2 }}>Loading...</Typography>
              </MenuItem>
            )}

            {!loading && notifications.filter((n) => !hiddenIds.includes(n.id)).length === 0 && (
              <MenuItem onClick={handleClose}>No new notifications</MenuItem>
            )}

            {!loading &&
              notifications
                .filter((notif) => !hiddenIds.includes(notif.id))
                .map((notif) => (
                  <MenuItem
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif.id)}
                    sx={{
                      fontWeight: notif.read ? "normal" : "bold",
                      whiteSpace: "normal",
                      color: notif.read ? "gray" : "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
                      <Typography variant="body1">{notif.message}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
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
  );
};

export default Header;
